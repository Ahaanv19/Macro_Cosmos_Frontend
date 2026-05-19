/**
 * Businesses API Module
 * Handles local business data and spotlight functionality for route integration
 */

import { pythonURI, fetchOptions } from './config.js';

// API endpoints
export const businessesUrl = `${pythonURI}/api/businesses`;
export const spotlightUrl = `${pythonURI}/api/businesses/spotlight`;

// Local storage key for spotlighted businesses (fallback when not logged in)
const SPOTLIGHT_STORAGE_KEY = 'sd_auto_spotlighted_businesses';

// Default businesses data (used when API is unavailable)
export const defaultBusinesses = [
  {
    id: 1,
    name: "ActiveMed Integrative Health Center",
    description: "We believe in a collaborative approach to healthcare. We offer acupuncture, massage therapy, functional medicine, physical therapy, and axon therapy.",
    address: "11588 Via Rancho San Diego, Suite 101, El Cajon, CA 92019",
    website: "https://activemedhealth.com/",
    image: "bus.png",
    category: "Healthcare",
    coordinates: { lat: 32.7914, lng: -116.9259 },
    isSpotlighted: false
  },
  {
    id: 2,
    name: "Digital One Printing",
    description: "Digital One Printing is your premier one-stop Poway printshop that offers a wide range of services, has many years of experience and a tremendous reputation. Digital, Offset, Large Format, Posters, Banners, Trade show graphics, Signs, Promotional Products, Bindery and more.",
    address: "12630 Poway Rd, Poway, CA 92064",
    website: "https://d1printing.net/",
    image: "Screenshot 2025-07-23 at 8.34.48 AM.png",
    imageLayout: "wide",
    category: "Printing Services",
    coordinates: { lat: 32.9579, lng: -117.0287 },
    isSpotlighted: false
  }
];

/**
 * Fetch all businesses from the API
 * Falls back to default data if API is unavailable
 */
export async function fetchBusinesses() {
  try {
    const response = await fetch(businessesUrl, fetchOptions);
    if (!response.ok) {
      console.warn('Businesses API unavailable, using default data');
      return getBusinessesWithSpotlightStatus(defaultBusinesses);
    }
    const businesses = await response.json();
    return getBusinessesWithSpotlightStatus(businesses);
  } catch (error) {
    console.error('Error fetching businesses:', error);
    return getBusinessesWithSpotlightStatus(defaultBusinesses);
  }
}

/**
 * Merge spotlight status with business data
 */
function getBusinessesWithSpotlightStatus(businesses) {
  const spotlighted = getSpotlightedBusinessIds();
  return businesses.map(b => ({
    ...b,
    isSpotlighted: spotlighted.includes(b.id)
  }));
}

/**
 * Get spotlighted business IDs from storage
 */
export function getSpotlightedBusinessIds() {
  try {
    const stored = localStorage.getItem(SPOTLIGHT_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

/**
 * Save spotlighted business IDs to storage
 */
function saveSpotlightedBusinessIds(ids) {
  localStorage.setItem(SPOTLIGHT_STORAGE_KEY, JSON.stringify(ids));
}

/**
 * Toggle spotlight status for a business
 * @param {number} businessId - The business ID to toggle
 * @returns {Promise<boolean>} - New spotlight status
 */
export async function toggleSpotlight(businessId) {
  const currentIds = getSpotlightedBusinessIds();
  const isCurrentlySpotlighted = currentIds.includes(businessId);
  
  let newIds;
  if (isCurrentlySpotlighted) {
    newIds = currentIds.filter(id => id !== businessId);
  } else {
    newIds = [...currentIds, businessId];
  }
  
  // Save locally
  saveSpotlightedBusinessIds(newIds);
  
  // Try to sync with backend
  try {
    const response = await fetch(spotlightUrl, {
      ...fetchOptions,
      method: 'POST',
      body: JSON.stringify({
        business_id: businessId,
        spotlight: !isCurrentlySpotlighted
      })
    });
    
    if (!response.ok) {
      console.warn('Could not sync spotlight to server, saved locally');
    }
  } catch (error) {
    console.warn('Could not sync spotlight to server:', error);
  }
  
  // Dispatch event for other components to react
  window.dispatchEvent(new CustomEvent('businessSpotlightChanged', {
    detail: {
      businessId,
      isSpotlighted: !isCurrentlySpotlighted,
      allSpotlightedIds: newIds
    }
  }));
  
  return !isCurrentlySpotlighted;
}

/**
 * Get all spotlighted businesses with full data
 */
export async function getSpotlightedBusinesses() {
  const businesses = await fetchBusinesses();
  return businesses.filter(b => b.isSpotlighted);
}

/**
 * Clear all spotlights
 */
export function clearAllSpotlights() {
  saveSpotlightedBusinessIds([]);
  
  // Dispatch event
  window.dispatchEvent(new CustomEvent('businessSpotlightChanged', {
    detail: {
      businessId: null,
      isSpotlighted: false,
      allSpotlightedIds: []
    }
  }));
}

/**
 * Create a custom marker icon for businesses on the map
 */
export function createBusinessMarkerIcon(business, isHighlighted = false) {
  const iconSize = isHighlighted ? 44 : 36;
  const bgColor = isHighlighted ? '#10b981' : '#0066cc';
  const shadowColor = isHighlighted ? 'rgba(16, 185, 129, 0.5)' : 'rgba(0, 102, 204, 0.4)';
  const emoji = getCategoryEmoji(business.category);
  
  return {
    className: 'business-marker-icon',
    html: `
      <div style="
        width: ${iconSize}px;
        height: ${iconSize}px;
        background: linear-gradient(135deg, ${bgColor} 0%, ${isHighlighted ? '#059669' : '#004d99'} 100%);
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 4px 15px ${shadowColor}${isHighlighted ? ', 0 0 20px rgba(16, 185, 129, 0.6)' : ''};
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${isHighlighted ? '20px' : '16px'};
        cursor: pointer;
        transition: all 0.3s ease;
        ${isHighlighted ? 'animation: spotlight-pulse 2s infinite;' : ''}
      ">
        ${emoji}
      </div>
    `,
    iconSize: [iconSize, iconSize],
    iconAnchor: [iconSize / 2, iconSize / 2],
    popupAnchor: [0, -iconSize / 2]
  };
}

/**
 * Get emoji for business category
 */
function getCategoryEmoji(category) {
  const emojis = {
    'Healthcare': '🏥',
    'Health': '🏥',
    'Medical': '🏥',
    'Printing Services': '🖨️',
    'Print': '🖨️',
    'Restaurant': '🍽️',
    'Food': '🍽️',
    'Cafe': '☕',
    'Coffee': '☕',
    'Shopping': '🛍️',
    'Retail': '🛍️',
    'Automotive': '🚗',
    'Auto': '🚗',
    'Gym': '💪',
    'Fitness': '💪',
    'Entertainment': '🎭',
    'Hotel': '🏨',
    'Bank': '🏦',
    'Finance': '🏦',
    'Education': '📚',
    'School': '📚',
    'Gas Station': '⛽',
    'Pharmacy': '💊',
    'Grocery': '🛒',
    'default': '🏢'
  };
  
  if (!category) return emojis.default;
  
  for (const [key, emoji] of Object.entries(emojis)) {
    if (category.toLowerCase().includes(key.toLowerCase())) {
      return emoji;
    }
  }
  
  return emojis.default;
}

/**
 * Generate popup content for business marker
 */
export function createBusinessPopupContent(business) {
  return `
    <div style="min-width: 200px; max-width: 280px;">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
        <span style="font-size: 24px;">${getCategoryEmoji(business.category)}</span>
        <strong style="color: #1e293b; font-size: 14px; line-height: 1.3;">${business.name}</strong>
      </div>
      <div style="font-size: 12px; color: #64748b; margin-bottom: 8px;">
        <span style="display: flex; align-items: flex-start; gap: 4px;">
          📍 ${business.address || 'San Diego, CA'}
        </span>
      </div>
      ${business.description ? `
        <p style="font-size: 12px; color: #475569; margin: 0 0 10px; line-height: 1.4; max-height: 60px; overflow: hidden;">
          ${business.description.substring(0, 120)}${business.description.length > 120 ? '...' : ''}
        </p>
      ` : ''}
      <div style="display: flex; gap: 8px;">
        <a href="${business.website}" target="_blank" 
           style="flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 4px; padding: 8px 12px; background: linear-gradient(135deg, #0066cc 0%, #004d99 100%); color: white; border-radius: 8px; font-size: 12px; font-weight: 600; text-decoration: none;">
          Visit Site
        </a>
        <button onclick="window.setRouteDestination && window.setRouteDestination('${business.address || business.name}')"
                style="flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 4px; padding: 8px 12px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; border-radius: 8px; font-size: 12px; font-weight: 600; border: none; cursor: pointer;">
          🧭 Navigate
        </button>
      </div>
    </div>
  `;
}

// Export for global access if needed
window.businessesAPI = {
  fetchBusinesses,
  toggleSpotlight,
  getSpotlightedBusinesses,
  getSpotlightedBusinessIds,
  clearAllSpotlights,
  createBusinessMarkerIcon,
  createBusinessPopupContent
};
