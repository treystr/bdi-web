import type { ImageMetadata } from 'astro';
import satoshiAvatar from '@assets/images/donors/satoshi.png';

// Dynamically import all donor images using import.meta.glob
// This eagerly loads all images at build time
const donorImages = import.meta.glob<{ default: ImageMetadata }>(
    '../assets/images/donors/*.{png,jpg,jpeg,gif,webp}',
    { eager: true }
);

// Create a mapping from filename to ImageMetadata
const imageMap = new Map<string, ImageMetadata>();

// Process each imported image and extract filename
Object.entries(donorImages).forEach(([path, image]) => {
    // Extract filename from path (e.g., "../assets/images/donors/trey.png" -> "trey.png")
    const filename = path.split('/').pop() || '';
    if (filename) {
        imageMap.set(filename, image.default);
    }
});

/**
 * Get the avatar image for a donor based on filename.
 * Returns the custom image if found, otherwise returns the default satoshi avatar.
 * 
 * @param imageFilename - Optional filename of the donor's image (e.g., "trey.png")
 * @returns ImageMetadata for the donor's avatar or default satoshi avatar
 */
export function getDonorAvatar(imageFilename?: string): ImageMetadata {
    if (!imageFilename) {
        return satoshiAvatar;
    }
    
    const image = imageMap.get(imageFilename);
    return image || satoshiAvatar;
}

