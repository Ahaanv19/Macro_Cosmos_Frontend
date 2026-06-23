import { pythonURI, fetchOptions, escapeHTML, describeHttpError } from '../../assets/js/api/config.js';
import {
  createBusinessMarkerIcon,
  createBusinessPopupContent,
  fetchBusinesses,
  getCategoryEmoji,
  getSpotlightedBusinessIds,
} from '../../assets/js/api/businesses.js';
import polyline from 'https://cdn.skypack.dev/@mapbox/polyline';

const apiUrl = `${pythonURI}/api/get_routes`;
const routeUsageUrl = `${pythonURI}/api/subscription/route-usage`;
const incidentsUrl = `${pythonURI}/api/incidents`;

// Spotlight storage key
const SPOTLIGHT_STORAGE_KEY = 'sd_auto_spotlighted_businesses';

// Get the base URL from the page (set by Jekyll)
function getBaseUrl() {
  const trigger = document.querySelector('.trigger');
  if (trigger && trigger.getAttribute('data-baseurl')) {
    return trigger.getAttribute('data-baseurl');
  }
  // Fallback: try to extract from current URL or use known baseurl
  const pathMatch = window.location.pathname.match(/^(\/[^\/]+)/);
  if (pathMatch && pathMatch[1] !== '/route') {
    return pathMatch[1];
  }
  return '/SD_Auto_Frontend'; // Hardcoded fallback
}

// Mapping engine: MapLibre GL (WebGL), via the shared Leaflet-compatibility
// adapter loaded on the page (assets/js/maplibre-leaflet-adapter.js), which
// defines the global `L`. All map calls below are unchanged from the Leaflet
// implementation; only the engine underneath differs.
const map = L.map('map').setView([32.7157, -117.1611], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors',
}).addTo(map);

let polylines = [];

// =====================================================
// HAZARD/INCIDENT MARKERS SYSTEM
// =====================================================
let incidentMarkers = [];
let incidentsData = [];

// Get marker icon based on incident type
function getIncidentMarkerIcon(type) {
  const typeColors = {
    'accident': { bg: '#ef4444', emoji: '🚗' },
    'construction': { bg: '#f59e0b', emoji: '🚧' },
    'road closure': { bg: '#8b5cf6', emoji: '⛔' },
    'pothole': { bg: '#6366f1', emoji: '🕳️' },
    'flooding': { bg: '#0ea5e9', emoji: '🌊' },
    'debris': { bg: '#78716c', emoji: '🪨' },
    'other': { bg: '#6b7280', emoji: '⚠️' }
  };
  
  const config = typeColors[type?.toLowerCase()] || typeColors['other'];
  
  return L.divIcon({
    className: 'hazard-div-icon',
    html: `<div style="background: ${config.bg}; width: 28px; height: 28px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; font-size: 14px;">${config.emoji}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14]
  });
}

// Geocode a location string to coordinates
async function geocodeLocation(location) {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&limit=1`);
    const data = await response.json();
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon)
      };
    }
  } catch (err) {
    console.error('Geocoding error:', err);
  }
  return null;
}

// Load and display incidents on map
async function loadIncidentsOnMap() {
  // Clear existing markers
  incidentMarkers.forEach(marker => map.removeLayer(marker));
  incidentMarkers = [];
  incidentsData = [];
  
  try {
    const res = await fetch(incidentsUrl, fetchOptions);
    if (!res.ok) return;
    
    const data = await res.json();
    
    if (Array.isArray(data) && data.length > 0) {
      for (const incident of data) {
        const coords = await geocodeLocation(incident.location);
        if (coords) {
          incident.coords = coords; // Store coords for route checking
          incidentsData.push(incident);
          
          const marker = L.marker([coords.lat, coords.lon], {
            icon: getIncidentMarkerIcon(incident.type)
          }).addTo(map);
          
          marker.bindPopup(`
            <div style="min-width: 150px;">
              <strong style="color: #ef4444;">${escapeHTML(incident.type)}</strong><br>
              <span style="color: #64748b; font-size: 12px;">📍 ${escapeHTML(incident.location)}</span>
              ${incident.details ? `<br><span style="font-size: 12px; color: #475569;">${escapeHTML(incident.details)}</span>` : ''}
            </div>
          `);
          
          incidentMarkers.push(marker);
        }
        // Small delay to avoid rate limiting on geocoding API
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }
  } catch (err) {
    console.error('Error loading incidents:', err);
  }
}

// Check if a route passes near any incidents
function checkRouteForHazards(routePoints) {
  const HAZARD_PROXIMITY_METERS = 500; // Alert if route is within 500m of hazard
  const hazardsNearRoute = [];
  
  for (const incident of incidentsData) {
    if (!incident.coords) continue;
    
    // Check each point on route against incident
    for (const point of routePoints) {
      const distance = getDistanceFromLatLon(
        point[0], point[1],
        incident.coords.lat, incident.coords.lon
      );
      
      if (distance < HAZARD_PROXIMITY_METERS) {
        hazardsNearRoute.push({
          ...incident,
          distanceFromRoute: Math.round(distance)
        });
        break; // Only add each incident once
      }
    }
  }
  
  return hazardsNearRoute;
}

// Show hazard warning modal
function showHazardWarning(hazards, onContinue, onReroute) {
  // Remove any existing modal
  const existingModal = document.getElementById('hazard-warning-modal');
  if (existingModal) existingModal.remove();
  
  const hazardListHtml = hazards.map(h => `
    <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: rgba(239, 68, 68, 0.1); border-radius: 10px; margin-bottom: 8px;">
      <span style="font-size: 24px;">${getHazardEmoji(h.type)}</span>
      <div>
        <div style="font-weight: 600; color: #fef2f2;">${escapeHTML(h.type)}</div>
        <div style="font-size: 12px; color: #fca5a5;">📍 ${escapeHTML(h.location)}</div>
        <div style="font-size: 11px; color: #f87171;">~${escapeHTML(h.distanceFromRoute)}m from your route</div>
      </div>
    </div>
  `).join('');
  
  const modal = document.createElement('div');
  modal.id = 'hazard-warning-modal';
  modal.className = 'fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4';
  modal.innerHTML = `
    <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border-radius: 20px; padding: 28px; max-width: 450px; width: 100%; border: 1px solid #ef4444; box-shadow: 0 0 40px rgba(239, 68, 68, 0.3);">
      <div style="text-align: center; margin-bottom: 20px;">
        <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #ef4444, #dc2626); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; font-size: 32px;">
          ⚠️
        </div>
        <h3 style="font-size: 22px; font-weight: 700; color: white; margin: 0 0 4px;">Hazard Alert!</h3>
        <p style="color: #94a3b8; font-size: 14px; margin: 0;">${hazards.length} reported incident${hazards.length > 1 ? 's' : ''} along your route</p>
      </div>
      
      <div style="max-height: 200px; overflow-y: auto; margin-bottom: 20px;">
        ${hazardListHtml}
      </div>
      
      <div style="display: flex; gap: 12px;">
        <button id="hazard-continue-btn" style="flex: 1; padding: 14px; border-radius: 12px; border: 2px solid #f59e0b; background: transparent; color: #fbbf24; font-weight: 600; cursor: pointer; transition: all 0.2s;">
          ⚡ Continue Anyway
        </button>
        <button id="hazard-acknowledged-btn" style="flex: 1; padding: 14px; border-radius: 12px; border: none; background: linear-gradient(135deg, #22c55e, #16a34a); color: white; font-weight: 600; cursor: pointer; transition: all 0.2s;">
          ✓ Acknowledged
        </button>
      </div>
      
      <p style="text-align: center; margin-top: 12px; font-size: 12px; color: #64748b;">
        Tip: Check the map for hazard markers 🔴
      </p>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Event handlers
  document.getElementById('hazard-continue-btn').addEventListener('click', () => {
    modal.remove();
    if (onContinue) onContinue();
  });
  
  document.getElementById('hazard-acknowledged-btn').addEventListener('click', () => {
    modal.remove();
    if (onContinue) onContinue();
  });
  
  // Close on background click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
      if (onContinue) onContinue();
    }
  });
}

function getHazardEmoji(type) {
  const emojis = {
    'accident': '🚗',
    'construction': '🚧',
    'road closure': '⛔',
    'pothole': '🕳️',
    'flooding': '🌊',
    'debris': '🪨',
    'other': '⚠️'
  };
  return emojis[type?.toLowerCase()] || '⚠️';
}

// Initialize incidents on map load
loadIncidentsOnMap();

// Refresh incidents periodically (every 5 minutes)
setInterval(loadIncidentsOnMap, 5 * 60 * 1000);

// =====================================================
// SPOTLIGHTED BUSINESSES MARKERS SYSTEM
// =====================================================
let businessMarkers = [];
let businessesData = [];

// Create business marker icon
function getBusinessMarkerIcon(business, isHighlighted = true) {
  return L.divIcon(createBusinessMarkerIcon(business, isHighlighted));
}

// Load and display spotlighted businesses on map
async function loadSpotlightedBusinessesOnMap() {
  // Clear existing business markers
  businessMarkers.forEach(marker => map.removeLayer(marker));
  businessMarkers = [];
  
  const spotlightedIds = getSpotlightedBusinessIds();
  
  if (spotlightedIds.length === 0) {
    // Update legend visibility
    updateBusinessLegend(false);
    return;
  }
  
  const businesses = await fetchBusinesses();
  
  // Filter to only spotlighted businesses
  const spotlightedBusinesses = businesses.filter(b => spotlightedIds.includes(b.id));
  businessesData = spotlightedBusinesses;
  
  // Add markers for spotlighted businesses
  for (const business of spotlightedBusinesses) {
    let coords = business.coordinates;

    // Helper: a usable coordinate must have non-null lat AND lng.
    const hasCoords = (c) => c && (c.lat ?? c.latitude) != null && (c.lng ?? c.lon ?? c.longitude) != null;

    // If coordinates are missing OR null/blank (e.g. admin-approved community
    // submissions that had no lat/lng), geocode the address instead.
    if (!hasCoords(coords) && business.address) {
      const geo = await geocodeLocation(business.address);
      if (geo) {
        coords = geo;
        business.coordinates = geo;
      }
    }

    if (hasCoords(coords)) {
      const lat = coords.lat ?? coords.latitude;
      const lng = coords.lng ?? coords.lon ?? coords.longitude;

      const marker = L.marker([lat, lng], {
        icon: getBusinessMarkerIcon(business, true)
      }).addTo(map);
      
      marker.bindPopup(createBusinessPopupContent(business));
      
      businessMarkers.push(marker);
    }
  }
  
  // Update legend visibility
  updateBusinessLegend(spotlightedBusinesses.length > 0);
}

// Update the business legend visibility
function updateBusinessLegend(show) {
  let legend = document.getElementById('business-legend');
  
  if (show && !legend) {
    // Create legend if it doesn't exist
    legend = document.createElement('div');
    legend.id = 'business-legend';
    legend.className = 'business-legend';
    legend.style.cssText = `
      max-width: 900px;
      margin: 16px auto 0;
      padding: 16px 20px;
      background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
      border: 1px solid #86efac;
      border-radius: 14px;
      display: flex;
      align-items: center;
      gap: 24px;
      flex-wrap: wrap;
    `;
    legend.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="font-size: 18px;">⭐</span>
        <span style="font-weight: 600; color: #166534; font-size: 14px;">Spotlighted Businesses on Map:</span>
      </div>
      <div style="display: flex; gap: 16px; flex-wrap: wrap;" id="business-legend-items">
      </div>
      <a href="${getBaseUrl()}/localbusinesses/" style="margin-left: auto; display: flex; align-items: center; gap: 6px; font-size: 13px; color: #0066cc; font-weight: 600; text-decoration: none;">
        Manage Spotlights →
      </a>
    `;
    
    // Insert after hazard legend
    const hazardLegend = document.querySelector('.hazard-legend');
    if (hazardLegend) {
      hazardLegend.parentNode.insertBefore(legend, hazardLegend.nextSibling);
    } else {
      const mapEl = document.getElementById('map');
      if (mapEl) {
        mapEl.parentNode.insertBefore(legend, mapEl.nextSibling);
      }
    }
  }
  
  if (legend) {
    legend.style.display = show ? 'flex' : 'none';
    
    if (show) {
      // Update legend items
      const itemsContainer = document.getElementById('business-legend-items');
      if (itemsContainer) {
        itemsContainer.innerHTML = businessesData.map(b => `
          <span style="display: flex; align-items: center; gap: 6px; font-size: 13px; color: #166534;">
            <span style="width: 24px; height: 24px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; box-shadow: 0 2px 6px rgba(16, 185, 129, 0.4);">${getCategoryEmoji(b.category)}</span>
            ${escapeHTML(b.name)}
          </span>
        `).join('');
      }
    }
  }
}

// Set destination from business popup
window.setRouteDestination = function(address) {
  // The value arrives URI-encoded from the popup (see businesses.js) to keep
  // it safe inside the inline handler; decode it back to a plain string here.
  let decoded = address;
  try { decoded = decodeURIComponent(address); } catch (e) { /* keep raw */ }
  const destinationInput = document.getElementById('destination');
  if (destinationInput) {
    destinationInput.value = decoded;
    destinationInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    destinationInput.focus();
    
    // Flash the input to draw attention
    destinationInput.style.transition = 'box-shadow 0.3s ease';
    destinationInput.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.5)';
    setTimeout(() => {
      destinationInput.style.boxShadow = '';
    }, 1500);
  }
};

// Initialize spotlighted businesses on map load
loadSpotlightedBusinessesOnMap();

// Listen for spotlight changes
window.addEventListener('storage', (e) => {
  if (e.key === SPOTLIGHT_STORAGE_KEY) {
    loadSpotlightedBusinessesOnMap();
  }
});

window.addEventListener('businessSpotlightChanged', () => {
  loadSpotlightedBusinessesOnMap();
});

// =====================================================
// REAL-TIME VEHICLE TRACKING SYSTEM
// =====================================================
let vehicleMarker = null;
let watchId = null;
let isNavigating = false;
let currentRouteData = null;
let currentRoutePolyline = null;
let currentStepIndex = 0;
let stepElements = [];

// Custom vehicle icon
const vehicleIcon = L.divIcon({
  className: 'vehicle-marker',
  html: `
    <div style="
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #0066cc 0%, #06b6d4 100%);
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 4px 15px rgba(0, 102, 204, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
    ">
      🚗
    </div>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

// Destination marker icon
const destinationIcon = L.divIcon({
  className: 'destination-marker',
  html: `
    <div style="
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 4px 15px rgba(239, 68, 68, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
    ">
      🎯
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

// Calculate distance between two points (Haversine formula)
function getDistanceFromLatLon(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Radius of Earth in meters
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Find closest point on route to current position
function findClosestPointOnRoute(lat, lon, routePoints) {
  let minDist = Infinity;
  let closestIdx = 0;
  
  for (let i = 0; i < routePoints.length; i++) {
    const dist = getDistanceFromLatLon(lat, lon, routePoints[i][0], routePoints[i][1]);
    if (dist < minDist) {
      minDist = dist;
      closestIdx = i;
    }
  }
  
  return { index: closestIdx, distance: minDist };
}

// Determine current step based on position
function determineCurrentStep(lat, lon, steps, routePoints) {
  // Find the closest point on the route
  const closest = findClosestPointOnRoute(lat, lon, routePoints);
  
  // If user is far from route (> 100m), don't change step
  if (closest.distance > 100) {
    return currentStepIndex;
  }
  
  // Calculate what percentage along the route we are
  const progressPercent = closest.index / routePoints.length;
  
  // Map that to a step index
  const estimatedStep = Math.floor(progressPercent * steps.length);
  
  // Clamp to valid range (0 to steps.length - 1)
  // Also ensure we start at 0, not at the end
  const clampedStep = Math.max(0, Math.min(estimatedStep, steps.length - 1));
  
  // Only allow moving forward (prevent jumping backwards accidentally)
  // Unless we're at the start (currentStepIndex is 0)
  if (currentStepIndex === 0) {
    return clampedStep;
  }
  
  // Don't allow going more than 1 step forward at a time to prevent jumps
  if (clampedStep > currentStepIndex + 1) {
    return currentStepIndex + 1;
  }
  
  // Don't allow going backwards
  if (clampedStep < currentStepIndex) {
    return currentStepIndex;
  }
  
  return clampedStep;
}

// Update step highlighting
function highlightStep(stepIndex) {
  stepElements.forEach((el, idx) => {
    el.classList.remove('step-active', 'step-completed', 'step-upcoming');
    
    if (idx < stepIndex) {
      el.classList.add('step-completed');
    } else if (idx === stepIndex) {
      el.classList.add('step-active');
      // Auto-scroll to active step
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      el.classList.add('step-upcoming');
    }
  });
  
  currentStepIndex = stepIndex;
  updateNavigationStatus();
}

// Update navigation status display
function updateNavigationStatus() {
  const statusEl = document.getElementById('nav-status');
  if (!statusEl || !currentRouteData) return;
  
  const currentStep = currentRouteData.details[currentStepIndex];
  const totalSteps = currentRouteData.details.length;
  
  statusEl.innerHTML = `
    <div class="nav-status-content">
      <div class="nav-current-step">
        <span class="step-number">Step ${currentStepIndex + 1} of ${totalSteps}</span>
        <span class="step-instruction">${currentStep?.instruction || 'Navigating...'}</span>
      </div>
      <div class="nav-distance">${currentStep?.distance || ''}</div>
    </div>
  `;
}

// Start real-time navigation
function startNavigation() {
  if (!currentRouteData || !currentRoutePolyline) {
    alert('Please search for a route first.');
    return;
  }
  
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser.');
    return;
  }
  
  isNavigating = true;
  
  // IMPORTANT: Reset step index to 0 when starting navigation
  currentStepIndex = 0;
  
  // Show navigation UI
  document.getElementById('nav-controls')?.classList.add('active');
  document.getElementById('start-nav-btn')?.classList.add('hidden');
  document.getElementById('stop-nav-btn')?.classList.remove('hidden');
  
  // Get route points
  const routePoints = currentRoutePolyline.getLatLngs().map(ll => [ll.lat, ll.lng]);
  
  // Create vehicle marker if not exists
  if (!vehicleMarker) {
    vehicleMarker = L.marker([32.7157, -117.1611], { icon: vehicleIcon }).addTo(map);
  }
  
  // Highlight first step immediately before GPS kicks in
  highlightStep(0);
  
  // Start watching position
  watchId = navigator.geolocation.watchPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      
      // Update vehicle marker position
      vehicleMarker.setLatLng([lat, lon]);
      
      // Center map on vehicle (with slight offset for UI)
      map.setView([lat, lon], 16, { animate: true });
      
      // Find current step and highlight
      const stepIdx = determineCurrentStep(lat, lon, currentRouteData.details, routePoints);
      if (stepIdx !== currentStepIndex) {
        highlightStep(stepIdx);
        
        // Announce step change (optional voice)
        announceStep(currentRouteData.details[stepIdx]);
      }
      
      // Check if arrived at destination
      const lastPoint = routePoints[routePoints.length - 1];
      const distToEnd = getDistanceFromLatLon(lat, lon, lastPoint[0], lastPoint[1]);
      if (distToEnd < 50) { // Within 50 meters
        arriveAtDestination();
      }
    },
    (error) => {
      console.error('Geolocation error:', error);
      if (error.code === error.PERMISSION_DENIED) {
        alert('Please enable location access to use navigation.');
        stopNavigation();
      }
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 1000
    }
  );
}

// Stop navigation
function stopNavigation() {
  isNavigating = false;
  
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }
  
  // Hide navigation UI
  document.getElementById('nav-controls')?.classList.remove('active');
  document.getElementById('start-nav-btn')?.classList.remove('hidden');
  document.getElementById('stop-nav-btn')?.classList.add('hidden');
  
  // Reset step highlighting
  stepElements.forEach(el => {
    el.classList.remove('step-active', 'step-completed', 'step-upcoming');
  });
  
  currentStepIndex = 0;
}

// Announce step (optional voice navigation)
function announceStep(step) {
  if (!step || !('speechSynthesis' in window)) return;
  
  // Only announce if user enabled voice (check localStorage)
  if (localStorage.getItem('voiceNavigation') !== 'true') return;
  
  const utterance = new SpeechSynthesisUtterance(step.instruction);
  utterance.rate = 0.9;
  utterance.pitch = 1;
  speechSynthesis.speak(utterance);
}

// Handle arrival at destination
function arriveAtDestination() {
  stopNavigation();
  
  // Show arrival modal
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4';
  modal.innerHTML = `
    <div class="bg-gray-800 rounded-2xl p-8 max-w-md w-full border border-gray-700 shadow-2xl text-center">
      <div class="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <span style="font-size: 40px;">🎉</span>
      </div>
      <h3 class="text-2xl font-bold text-white mb-2">You've Arrived!</h3>
      <p class="text-gray-400 mb-6">You have reached your destination.</p>
      <button onclick="this.closest('.fixed').remove()" 
        class="py-3 px-8 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold hover:from-green-600 hover:to-green-700 transition-all">
        Close
      </button>
    </div>
  `;
  document.body.appendChild(modal);
}

// Make functions globally accessible
window.startNavigation = startNavigation;
window.stopNavigation = stopNavigation;

// Route usage tracking
async function updateRouteUsageDisplay() {
  try {
    const response = await fetch(routeUsageUrl, fetchOptions);
    if (response.ok) {
      const usage = await response.json();
      const usageDisplay = document.getElementById('route-usage-display');
      if (usageDisplay) {
        if (usage.unlimited) {
          usageDisplay.innerHTML = `<span class="text-green-400">✓ Unlimited routes</span>`;
        } else {
          const remaining = usage.remaining;
          const colorClass = remaining <= 1 ? 'text-red-400' : remaining <= 2 ? 'text-yellow-400' : 'text-green-400';
          usageDisplay.innerHTML = `<span class="${colorClass}">${remaining}/${usage.limit} routes remaining today</span>`;
        }
        usageDisplay.classList.remove('hidden');
      }
    }
  } catch (e) {
    console.log('Could not fetch route usage:', e);
  }
}

// Show limit reached modal
function showLimitReachedModal(data) {
  // Remove any existing modal
  const existingModal = document.getElementById('limit-reached-modal');
  if (existingModal) existingModal.remove();

  const modal = document.createElement('div');
  modal.id = 'limit-reached-modal';
  modal.className = 'fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4';
  modal.innerHTML = `
    <div class="bg-gray-800 rounded-2xl p-8 max-w-md w-full border border-gray-700 shadow-2xl">
      <div class="text-center">
        <div class="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-white mb-2">Daily Limit Reached</h3>
        <p class="text-gray-400 mb-4">${data.message || 'You have used all your routes for today.'}</p>
        <div class="bg-gray-700/50 rounded-lg p-4 mb-6">
          <p class="text-sm text-gray-300">
            <span class="font-semibold text-white">${data.used || 0}/${data.limit || 0}</span> routes used today
          </p>
          <p class="text-xs text-gray-500 mt-1">Current plan: <span class="text-yellow-400 capitalize">${data.tier || 'free'}</span></p>
        </div>
        <p class="text-sm text-green-400 mb-6">${data.upgrade_message || 'Upgrade for more routes!'}</p>
        <div class="flex gap-3">
          <button onclick="document.getElementById('limit-reached-modal').remove()" 
            class="flex-1 py-3 px-4 rounded-xl bg-gray-700 text-white font-semibold hover:bg-gray-600 transition-colors">
            Close
          </button>
          <a href="${getBaseUrl()}/pricing" 
            class="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold text-center hover:from-yellow-600 hover:to-yellow-700 transition-all">
            Upgrade Now
          </a>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  
  // Close on background click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
}

// Initialize route usage display on load
updateRouteUsageDisplay();

// Center map on user's location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    map.setView([lat, lon], 13);
  });
}

// Pre-fill logic: read from URL if present
const urlParams = new URLSearchParams(window.location.search);
const originParam = urlParams.get('origin');
const destinationParam = urlParams.get('destination');
const modeParam = urlParams.get('mode');

// Pre-fill form if values exist in URL
if (originParam) document.getElementById('origin').value = originParam;
if (destinationParam) document.getElementById('destination').value = destinationParam;
if (modeParam) document.getElementById('mode').value = modeParam;

// Auto-fetch routes if origin + destination present
if (originParam && destinationParam) {
  document.getElementById('fetch_routes_btn').click();
}

document.getElementById('fetch_routes_btn').addEventListener('click', async () => {
  // Client-side validation mirroring the backend (origin/destination required,
  // max 200 chars, mode restricted). Prevents sending requests the API rejects.
  const origin = document.getElementById('origin').value.trim();
  const destination = document.getElementById('destination').value.trim();
  const mode = document.getElementById('mode').value || 'driving';
  const ALLOWED_MODES = ['driving', 'walking', 'bicycling', 'transit'];

  if (!origin || !destination) {
    alert('Please enter both origin and destination.');
    return;
  }
  if (origin.length > 200 || destination.length > 200) {
    alert('Origin and destination must be 200 characters or fewer.');
    return;
  }
  if (!ALLOWED_MODES.includes(mode)) {
    alert('Please choose a valid travel mode.');
    return;
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',  // Required for authentication
      body: JSON.stringify({ origin, destination, mode }),
    });

    // Handle 401 Unauthorized - redirect to login
    if (response.status === 401) {
      alert('Please log in to use the route finder.');
      window.location.href = '/login';
      return;
    }

    // Handle 403 Forbidden
    if (response.status === 403) {
      alert(describeHttpError(response));
      return;
    }

    // Handle 429 Rate Limit. This can be either the daily route-limit
    // (JSON with limit/tier info -> upgrade modal) or the edge rate-limiter
    // (generic throttling -> friendly message). Parse defensively.
    if (response.status === 429) {
      let limitData = null;
      try { limitData = await response.json(); } catch (e) { /* non-JSON body */ }
      if (limitData && (limitData.limit !== undefined || limitData.tier !== undefined)) {
        showLimitReachedModal(limitData);
        updateRouteUsageDisplay();
      } else {
        alert(describeHttpError(response));
      }
      return;
    }

    const routes = await response.json();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    if (!Array.isArray(routes)) {
      resultDiv.innerHTML = `<p>Error: ${escapeHTML(routes.error || 'No routes found')}</p>`;
      return;
    }

    // Update route usage display after successful request
    updateRouteUsageDisplay();

    // Clear old polylines and reset navigation
    polylines.forEach(p => map.removeLayer(p));
    polylines = [];
    stepElements = [];
    currentRouteData = null;
    currentRoutePolyline = null;
    if (isNavigating) stopNavigation();
    
    // Remove old destination marker
    map.eachLayer(layer => {
      if (layer.options?.icon?.options?.className === 'destination-marker') {
        map.removeLayer(layer);
      }
    });

    routes.forEach((route, idx) => {
      // Route header with enhanced styling
      const header = document.createElement('div');
      header.className = 'route-header';
      header.innerHTML = `
        <h4 class="route-title">
          <span class="route-badge">${idx === 0 ? '⭐ Recommended' : `Route ${idx + 1}`}</span>
          <span class="route-distance">${escapeHTML(route.total_distance)}</span>
          <span class="route-duration">Est. ${escapeHTML(route.traffic_adjusted_duration || route.total_duration)}</span>
        </h4>
      `;
      resultDiv.appendChild(header);

      // Directions list with step highlighting support
      const ul = document.createElement('ul');
      ul.className = 'directions-list';
      ul.id = `directions-list-${idx}`;
      
      route.details.forEach((step, stepIdx) => {
        const li = document.createElement('li');
        li.className = 'direction-step';
        li.dataset.stepIndex = stepIdx;
        li.innerHTML = `
          <div class="step-indicator">
            <span class="step-number-badge">${stepIdx + 1}</span>
          </div>
          <div class="step-content">
            <span class="step-instruction">${escapeHTML(step.instruction)}</span>
            <span class="step-meta">${escapeHTML(step.distance)} • ${escapeHTML(step.duration)}</span>
          </div>
        `;
        ul.appendChild(li);
        
        // Store step elements for first route (the one we navigate)
        if (idx === 0) {
          stepElements.push(li);
        }
      });
      resultDiv.appendChild(ul);

      if (route.geometry) {
        const decoded = polyline.decode(route.geometry);
        const polylineLayer = L.polyline(decoded, {
          color: idx === 0 ? '#0066cc' : '#94a3b8',
          weight: idx === 0 ? 6 : 4,
          opacity: idx === 0 ? 1 : 0.6,
        }).addTo(map);
        polylines.push(polylineLayer);
        
        // Store first route data for navigation
        if (idx === 0) {
          currentRouteData = route;
          currentRoutePolyline = polylineLayer;
          map.fitBounds(polylineLayer.getBounds(), { padding: [50, 50] });
          
          // Add destination marker
          const lastPoint = decoded[decoded.length - 1];
          L.marker(lastPoint, { icon: destinationIcon }).addTo(map);
          
          // Check for hazards along the route
          const hazardsOnRoute = checkRouteForHazards(decoded);
          if (hazardsOnRoute.length > 0) {
            showHazardWarning(hazardsOnRoute, () => {
              console.log('User acknowledged hazards');
            });
          }
        }
      }
    });
    
    // Add navigation controls after results
    const navControls = document.createElement('div');
    navControls.id = 'nav-controls-container';
    navControls.innerHTML = `
      <div class="nav-controls-wrapper">
        <button id="start-nav-btn" type="button" onclick="startNavigation()" class="nav-btn start-btn">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" style="width: 20px; height: 20px;">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Start Navigation
        </button>
        <button id="stop-nav-btn" type="button" onclick="stopNavigation()" class="nav-btn stop-btn hidden">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" style="width: 20px; height: 20px;">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
          </svg>
          Stop Navigation
        </button>
        <label class="voice-toggle">
          <input type="checkbox" id="voice-nav-toggle" onchange="localStorage.setItem('voiceNavigation', this.checked)">
          <span>🔊 Voice</span>
        </label>
      </div>
      <div id="nav-controls" class="nav-status-bar">
        <div id="nav-status"></div>
      </div>
    `;
    resultDiv.appendChild(navControls);
    
    // Restore voice preference
    const voiceToggle = document.getElementById('voice-nav-toggle');
    if (voiceToggle && localStorage.getItem('voiceNavigation') === 'true') {
      voiceToggle.checked = true;
    }
  } catch (error) {
    console.error('Route fetch error:', error);
    alert('An error occurred while fetching routes.');
  }
});














