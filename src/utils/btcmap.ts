/**
 * BTCMap API Utilities
 * Provides functions to interact with the BTCMap API
 * API Documentation: https://api.btcmap.org/
 */

export interface BTCMapElement {
    'osm_json': {
        lat: number;
        lon: number;
        tags: {
            [key: string]: string;
        };
    };
    deleted_at?: string;
}

export interface LocationBounds {
    minLat: number;
    maxLat: number;
    minLon: number;
    maxLon: number;
}

/**
 * Washington DC center coordinates and radius
 */
export const DC_CENTER = {
    lat: 38.9072,
    lon: -77.0369
};

export const DC_RADIUS_MILES = 25;

/**
 * Washington DC bounding box coordinates (legacy, kept for reference)
 */
export const DC_BOUNDS: LocationBounds = {
    minLat: 38.7916,
    maxLat: 39.0000,
    minLon: -77.1198,
    maxLon: -76.9094
};

/**
 * Check if an element accepts Bitcoin based on its tags
 */
export function acceptsBitcoin(element: BTCMapElement): boolean {
    if (!element['osm_json'] || !element['osm_json']['tags']) return false;
    
    const tags = element['osm_json']['tags'];
    return tags['payment:bitcoin'] === 'yes' || 
           tags['currency:XBT'] === 'yes' ||
           tags['payment:lightning'] === 'yes';
}

/**
 * Check if an element is an ATM (to be filtered out)
 */
export function isATM(element: BTCMapElement): boolean {
    if (!element['osm_json'] || !element['osm_json']['tags']) return false;
    
    const tags = element['osm_json']['tags'];
    return tags['amenity'] === 'atm';
}

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param lat1 Latitude of first point
 * @param lon1 Longitude of first point
 * @param lat2 Latitude of second point
 * @param lon2 Longitude of second point
 * @returns Distance in miles
 */
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 3958.8; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in miles
}

/**
 * Check if an element is within specified geographic bounds
 */
export function isWithinBounds(element: BTCMapElement, bounds: LocationBounds): boolean {
    if (!element['osm_json']) return false;
    
    const lat = element['osm_json']['lat'];
    const lon = element['osm_json']['lon'];
    
    return lat >= bounds.minLat && 
           lat <= bounds.maxLat && 
           lon >= bounds.minLon && 
           lon <= bounds.maxLon;
}

/**
 * Check if an element is within specified radius from a center point
 * @param element The BTCMap element to check
 * @param centerLat Center point latitude
 * @param centerLon Center point longitude
 * @param radiusMiles Radius in miles
 */
export function isWithinRadius(element: BTCMapElement, centerLat: number, centerLon: number, radiusMiles: number): boolean {
    if (!element['osm_json']) return false;
    
    const lat = element['osm_json']['lat'];
    const lon = element['osm_json']['lon'];
    
    const distance = calculateDistance(centerLat, centerLon, lat, lon);
    return distance <= radiusMiles;
}

/**
 * Fetch all merchants from BTCMap API
 */
export async function fetchAllMerchants(): Promise<BTCMapElement[]> {
    const apiUrl = 'https://api.btcmap.org/v2/elements';
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
        throw new Error(`BTCMap API error: ${response.statusText}`);
    }
    
    return await response.json();
}

/**
 * Get count of Bitcoin-accepting merchants within specific radius (excluding ATMs)
 * @param centerLat Center point latitude (defaults to DC center)
 * @param centerLon Center point longitude (defaults to DC center)
 * @param radiusMiles Radius in miles (defaults to 25 miles)
 */
export async function getMerchantCount(
    centerLat: number = DC_CENTER.lat,
    centerLon: number = DC_CENTER.lon,
    radiusMiles: number = DC_RADIUS_MILES
): Promise<number> {
    try {
        const merchants = await fetchAllMerchants();
        
        const filteredMerchants = merchants.filter(element => {
            // Skip deleted elements
            if (element.deleted_at) return false;
            
            // Skip ATMs
            if (isATM(element)) return false;
            
            // Check if within radius and accepts Bitcoin
            return isWithinRadius(element, centerLat, centerLon, radiusMiles) && acceptsBitcoin(element);
        });
        
        return filteredMerchants.length;
    } catch (error) {
        console.error('Error fetching merchant count:', error);
        throw error;
    }
}

/**
 * Get list of merchants within specific radius (excluding ATMs)
 * @param centerLat Center point latitude (defaults to DC center)
 * @param centerLon Center point longitude (defaults to DC center)
 * @param radiusMiles Radius in miles (defaults to 25 miles)
 */
export async function getMerchantsByLocation(
    centerLat: number = DC_CENTER.lat,
    centerLon: number = DC_CENTER.lon,
    radiusMiles: number = DC_RADIUS_MILES
): Promise<BTCMapElement[]> {
    try {
        const merchants = await fetchAllMerchants();
        
        return merchants.filter(element => {
            // Skip deleted elements
            if (element.deleted_at) return false;
            
            // Skip ATMs
            if (isATM(element)) return false;
            
            // Check if within radius and accepts Bitcoin
            return isWithinRadius(element, centerLat, centerLon, radiusMiles) && acceptsBitcoin(element);
        });
    } catch (error) {
        console.error('Error fetching merchants:', error);
        throw error;
    }
}

/**
 * Cache utilities for merchant count
 */
export const cache = {
    CACHE_KEY: 'btcmap-dc-count',
    TIMESTAMP_KEY: 'btcmap-dc-count-timestamp',
    CACHE_DURATION: 60 * 60 * 1000, // 1 hour in milliseconds
    
    get(): number | null {
        if (typeof window === 'undefined') return null;
        
        const cachedTimestamp = localStorage.getItem(this.TIMESTAMP_KEY);
        const cachedCount = localStorage.getItem(this.CACHE_KEY);
        
        if (!cachedTimestamp || !cachedCount) return null;
        
        const age = Date.now() - parseInt(cachedTimestamp);
        if (age > this.CACHE_DURATION) return null;
        
        return parseInt(cachedCount);
    },
    
    set(count: number): void {
        if (typeof window === 'undefined') return;
        
        localStorage.setItem(this.CACHE_KEY, count.toString());
        localStorage.setItem(this.TIMESTAMP_KEY, Date.now().toString());
    },
    
    clear(): void {
        if (typeof window === 'undefined') return;
        
        localStorage.removeItem(this.CACHE_KEY);
        localStorage.removeItem(this.TIMESTAMP_KEY);
    }
};

