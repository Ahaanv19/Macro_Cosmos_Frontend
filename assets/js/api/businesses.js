/**
 * Businesses API Module
 * Handles local business data and spotlight functionality for route integration
 */

import { pythonURI, fetchOptions, escapeHTML, safeUrl } from './config.js';

// API endpoints
export const businessesUrl = `${pythonURI}/api/businesses`;
export const spotlightUrl = `${pythonURI}/api/businesses/spotlight`;

// Local storage key for spotlighted businesses (fallback when not logged in)
const SPOTLIGHT_STORAGE_KEY = 'sd_auto_spotlighted_businesses';

// Default businesses data (used when API is unavailable)
export const defaultBusinesses = [
  {
    id: 1,
    name: 'ActiveMed Integrative Health Center',
    description: 'Integrative healthcare clinic offering acupuncture, massage therapy, functional medicine, physical therapy, and axon therapy.',
    address: '6719 Alvarado Rd Ste 304, San Diego, CA 92120',
    website: 'https://activemedhealth.com/',
    category: 'Healthcare',
    neighborhood: 'College Area',
    highlights: ['Acupuncture', 'Functional medicine', 'Physical therapy'],
    review: {
      metric: 'Published patient feedback on the official site',
      source: 'activemedhealth.com testimonials and review feed',
      summary: 'Published patient feedback repeatedly calls out attentive staff, clear treatment guidance, and meaningful relief during recovery.',
    },
    isSpotlighted: false,
  },
  {
    id: 2,
    name: 'Digital One Printing',
    description: 'Poway printshop offering digital, offset, large-format, signage, trade show graphics, bindery, and promotional products.',
    address: '12630 Poway Rd, Poway, CA 92064',
    website: 'https://d1printing.net/',
    category: 'Printing Services',
    neighborhood: 'Poway',
    highlights: ['Large format', 'Trade show graphics', 'Promo products'],
    review: null,
    isSpotlighted: false,
  },
  {
    id: 3,
    name: 'Verbatim Books',
    description: 'Independent North Park bookstore with more than 50,000 used and antiquarian titles, local zines, and regular community events.',
    address: '3793 30th Street, San Diego, CA 92104',
    website: 'https://www.verbatimbooks.com/',
    category: 'Bookstore',
    neighborhood: 'North Park',
    highlights: ['50,000+ titles', 'Local zines', 'Book crawl events'],
    review: {
      metric: '300+ public Yelp reviews surfaced in search',
      source: 'Public review listings',
      summary: 'Public review snippets frequently mention the deep secondhand selection, fair prices, and a browse-friendly atmosphere.',
    },
    isSpotlighted: false,
  },
  {
    id: 4,
    name: 'Communal Coffee',
    description: 'Creative-minded cafe and shop serving craft coffee, seasonal food, fresh floral arrangements, and curated goods across San Diego locations.',
    address: '2335 University Ave, San Diego, CA 92104',
    website: 'https://www.communalcoffee.com/',
    category: 'Cafe',
    neighborhood: 'North Park',
    highlights: ['Craft coffee', 'Seasonal menu', 'Floral design'],
    review: {
      metric: '4.6/5 on Tripadvisor in public search results',
      source: 'Public review listings',
      summary: 'Public review snippets consistently point to the floral interiors, strong drinks, and an easy meet-up atmosphere.',
    },
    isSpotlighted: false,
  },
  {
    id: 5,
    name: 'Liberty Public Market',
    description: 'Seven-day Liberty Station market bringing together local food, drink, retail, and artisan vendors under one roof.',
    address: '2820 Historic Decatur Rd, San Diego, CA 92106',
    website: 'https://libertypublicmarketsd.com/',
    category: 'Market',
    neighborhood: 'Liberty Station',
    highlights: ['40+ vendors', 'Prepared foods', 'Local goods'],
    review: {
      metric: '700+ public review signals surfaced in search',
      source: 'Public review listings and travel guides',
      summary: 'Review listings highlight the vendor variety, group-friendly layout, and easy all-day browsing in Liberty Station.',
    },
    isSpotlighted: false,
  },
];

const curatedBusinessesById = new Map(defaultBusinesses.map((business) => [business.id, business]));

function mergeBusinesses(apiBusinesses = []) {
  const mergedBusinesses = new Map(defaultBusinesses.map((business) => [business.id, { ...business }]));

  for (const apiBusiness of apiBusinesses) {
    const curatedBusiness = apiBusiness.id
      ? curatedBusinessesById.get(apiBusiness.id)
      : defaultBusinesses.find((business) => business.name === apiBusiness.name || business.website === apiBusiness.website);

    const mergedBusiness = {
      ...(curatedBusiness ?? {}),
      ...apiBusiness,
      neighborhood: apiBusiness.neighborhood ?? curatedBusiness?.neighborhood,
      highlights: apiBusiness.highlights ?? curatedBusiness?.highlights ?? [],
      review: apiBusiness.review ?? curatedBusiness?.review ?? null,
    };

    const businessKey = mergedBusiness.id ?? mergedBusiness.name;
    mergedBusinesses.set(businessKey, mergedBusiness);
  }

  return Array.from(mergedBusinesses.values());
}

/**
 * Fetch all businesses from the API
 * Falls back to curated default data if API is unavailable
 */
export async function fetchBusinesses() {
  try {
    const response = await fetch(businessesUrl, fetchOptions);
    if (!response.ok) {
      console.warn('Businesses API unavailable, using default data');
      return getBusinessesWithSpotlightStatus(defaultBusinesses);
    }

    const businesses = await response.json();
    return getBusinessesWithSpotlightStatus(mergeBusinesses(businesses));
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
  return businesses.map((business) => ({
    ...business,
    isSpotlighted: spotlighted.includes(business.id),
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
    newIds = currentIds.filter((id) => id !== businessId);
  } else {
    newIds = [...currentIds, businessId];
  }

  saveSpotlightedBusinessIds(newIds);

  try {
    const response = await fetch(spotlightUrl, {
      ...fetchOptions,
      method: 'POST',
      body: JSON.stringify({
        business_id: businessId,
        spotlight: !isCurrentlySpotlighted,
      }),
    });

    if (!response.ok) {
      console.warn('Could not sync spotlight to server, saved locally');
    }
  } catch (error) {
    console.warn('Could not sync spotlight to server:', error);
  }

  window.dispatchEvent(new CustomEvent('businessSpotlightChanged', {
    detail: {
      businessId,
      isSpotlighted: !isCurrentlySpotlighted,
      allSpotlightedIds: newIds,
    },
  }));

  return !isCurrentlySpotlighted;
}

/**
 * Get all spotlighted businesses with full data
 */
export async function getSpotlightedBusinesses() {
  const businesses = await fetchBusinesses();
  return businesses.filter((business) => business.isSpotlighted);
}

/**
 * Clear all spotlights
 */
export function clearAllSpotlights() {
  saveSpotlightedBusinessIds([]);

  window.dispatchEvent(new CustomEvent('businessSpotlightChanged', {
    detail: {
      businessId: null,
      isSpotlighted: false,
      allSpotlightedIds: [],
    },
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
        transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 220ms cubic-bezier(0.22, 1, 0.36, 1), background 220ms ease;
        ${isHighlighted ? 'animation: spotlight-pulse 2.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;' : ''}
      ">
        ${emoji}
      </div>
    `,
    iconSize: [iconSize, iconSize],
    iconAnchor: [iconSize / 2, iconSize / 2],
    popupAnchor: [0, -iconSize / 2],
  };
}

/**
 * Get emoji for business category
 */
export function getCategoryEmoji(category) {
  const emojis = {
    Healthcare: '🏥',
    Health: '🏥',
    Medical: '🏥',
    'Printing Services': '🖨️',
    Print: '🖨️',
    Bookstore: '📚',
    Restaurant: '🍽️',
    Food: '🍽️',
    Cafe: '☕',
    Coffee: '☕',
    Market: '🧺',
    Shopping: '🛍️',
    Retail: '🛍️',
    Automotive: '🚗',
    Auto: '🚗',
    Gym: '💪',
    Fitness: '💪',
    Entertainment: '🎭',
    Hotel: '🏨',
    Bank: '🏦',
    Finance: '🏦',
    Education: '📚',
    School: '📚',
    'Gas Station': '⛽',
    Pharmacy: '💊',
    Grocery: '🛒',
    default: '🏢',
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
  // URI-encode (and escape the single quote) so the value is safe inside the
  // single-quoted JS string in the onclick handler. setRouteDestination decodes it.
  const destination = encodeURIComponent(business.address || business.name || '').replace(/'/g, '%27');
  // All free-text fields below come from the API and may be user-submitted,
  // so every interpolated value is HTML-escaped to prevent stored XSS.
  const name = escapeHTML(business.name);
  const category = escapeHTML(business.category || 'Local business');
  const neighborhood = escapeHTML(business.neighborhood);
  const address = escapeHTML(business.address || 'San Diego, CA');
  const website = safeUrl(business.website);
  const description = business.description
    ? escapeHTML(business.description.substring(0, 120)) + (business.description.length > 120 ? '...' : '')
    : '';
  const reviewMetric = business.review?.metric
    ? `
      <div style="display: inline-flex; align-items: center; gap: 6px; padding: 5px 10px; margin-bottom: 10px; background: linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(6, 182, 212, 0.1)); border-radius: 999px; font-size: 11px; font-weight: 600; color: #0f766e;">
        <span>★</span>
        <span>${escapeHTML(business.review.metric)}</span>
      </div>
    `
    : '';

  return `
    <div style="min-width: 220px; max-width: 300px;">
      <div style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 10px;">
        <span style="font-size: 24px;">${getCategoryEmoji(business.category)}</span>
        <div>
          <strong style="display: block; color: #1e293b; font-size: 14px; line-height: 1.3; margin-bottom: 3px;">${name}</strong>
          <span style="display: inline-flex; align-items: center; gap: 6px; font-size: 11px; color: #64748b;">
            <span>${category}</span>
            ${business.neighborhood ? `<span>• ${neighborhood}</span>` : ''}
          </span>
        </div>
      </div>
      ${reviewMetric}
      <div style="font-size: 12px; color: #64748b; margin-bottom: 8px;">
        <span style="display: flex; align-items: flex-start; gap: 4px;">
          📍 ${address}
        </span>
      </div>
      ${business.description ? `
        <p style="font-size: 12px; color: #475569; margin: 0 0 10px; line-height: 1.4; max-height: 60px; overflow: hidden;">
          ${description}
        </p>
      ` : ''}
      ${business.review?.summary ? `
        <p style="font-size: 12px; color: #0f766e; margin: 0 0 10px; line-height: 1.45;">
          ${escapeHTML(business.review.summary)}
        </p>
      ` : ''}
      <div style="display: flex; gap: 8px;">
        <a href="${website}" target="_blank" rel="noopener noreferrer"
           style="flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 4px; padding: 8px 12px; background: linear-gradient(135deg, #0066cc 0%, #004d99 100%); color: white; border-radius: 8px; font-size: 12px; font-weight: 600; text-decoration: none;">
          Visit Site
        </a>
        <button onclick="window.setRouteDestination && window.setRouteDestination('${destination}')"
                style="flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 4px; padding: 8px 12px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; border-radius: 8px; font-size: 12px; font-weight: 600; border: none; cursor: pointer;">
          🧭 Navigate
        </button>
      </div>
    </div>
  `;
}

window.businessesAPI = {
  fetchBusinesses,
  toggleSpotlight,
  getSpotlightedBusinesses,
  getSpotlightedBusinessIds,
  clearAllSpotlights,
  createBusinessMarkerIcon,
  createBusinessPopupContent,
  getCategoryEmoji,
};
