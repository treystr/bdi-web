import type { ImageMetadata } from 'astro';

// Load all hero images at build time using eager import
const heroImages = import.meta.glob<{ default: ImageMetadata }>('/src/assets/images/hero/*.{jpg,jpeg,png,webp}', { eager: true });

// Debug: Log available images (remove in production)
if (import.meta.env.DEV) {
    console.log('Available hero images:', Object.keys(heroImages));
    console.log('Hero images count:', Object.keys(heroImages).length);
}

interface HeroProps {
    randomBackground?: boolean;
    backgroundImage?: ImageMetadata;
    [key: string]: any;
}

interface HeroContent {
    title: string;
    description: string;
    randomBackground?: boolean;
    backgroundImage?: ImageMetadata;
    buttons?: {
        text: string;
        link: string;
        variant?: 'primary' | 'secondary' | 'ghostLight' | 'ghostDark';
        target?: string;
    }[];
    overlayOpacity?: number;
    [key: string]: any;
}

/**
 * Middleware function that processes Hero component props to enable random background images.
 * 
 * @param props - The props object that can contain randomBackground and backgroundImage
 * @returns Modified props with a random backgroundImage when randomBackground is true
 */
export function withRandomHeroImage(props: HeroProps): HeroProps {
    // If randomBackground is true and no backgroundImage is specified, select a random one
    if (props.randomBackground && !props.backgroundImage) {
        const imageKeys = Object.keys(heroImages);
        
        if (imageKeys.length > 0) {
            // Select a random image from the available hero images
            const randomIndex = Math.floor(Math.random() * imageKeys.length);
            const randomImageKey = imageKeys[randomIndex];
            const randomImage = heroImages[randomImageKey]?.default;
            
            return {
                ...props,
                backgroundImage: randomImage || props.backgroundImage
            };
        }
    }
    
    // Return original props if randomBackground is false or backgroundImage is already set
    return props;
}

/**
 * Middleware function specifically for Hero content objects.
 * This version works with the content prop structure used by Hero components.
 * 
 * @param content - The content object for Hero components
 * @returns Modified content with a random backgroundImage when randomBackground is true
 */
export function withRandomHeroContent(content: HeroContent): HeroContent {
    // If randomBackground is true and no backgroundImage is specified, select a random one
    if (content.randomBackground && !content.backgroundImage) {
        const imageKeys = Object.keys(heroImages);
        
        if (imageKeys.length > 0) {
            // Select a random image from the available hero images
            const randomIndex = Math.floor(Math.random() * imageKeys.length);
            const randomImageKey = imageKeys[randomIndex];
            const randomImage = heroImages[randomImageKey]?.default;
            
            if (import.meta.env.DEV) {
                console.log('Random hero image selected:', randomImageKey);
            }
            
            return {
                ...content,
                backgroundImage: randomImage || content.backgroundImage
            };
        } else if (import.meta.env.DEV) {
            console.warn('No hero images found in src/assets/images/hero/');
        }
    }
    
    // Return original content if randomBackground is false or backgroundImage is already set
    return content;
}

/**
 * Get the list of available hero images for debugging or other purposes.
 * 
 * @returns Array of hero image metadata objects
 */
export function getAvailableHeroImages(): ImageMetadata[] {
    const imageKeys = Object.keys(heroImages);
    return imageKeys.map(key => heroImages[key].default).filter(Boolean);
}

/**
 * Get a random hero image directly.
 * 
 * @returns A random hero image metadata object or null if no images are available
 */
export function getRandomHeroImage(): ImageMetadata | null {
    const imageKeys = Object.keys(heroImages);
    
    if (imageKeys.length === 0) {
        return null;
    }
    
    const randomIndex = Math.floor(Math.random() * imageKeys.length);
    const randomImageKey = imageKeys[randomIndex];
    return heroImages[randomImageKey]?.default || null;
}

/**
 * Diagnostic function to check if the middleware is working properly.
 * 
 * @returns Object with diagnostic information
 */
export function diagnoseRandomHeroImages() {
    const imageKeys = Object.keys(heroImages);
    const randomImage = getRandomHeroImage();
    
    return {
        totalImages: imageKeys.length,
        imageKeys: imageKeys,
        randomImageSelected: !!randomImage,
        randomImageSrc: randomImage?.src || null,
        globPattern: '/src/assets/images/hero/*.{jpg,jpeg,png,webp}',
        heroImagesObject: heroImages
    };
} 