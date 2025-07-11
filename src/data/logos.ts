import type { ImageMetadata } from 'astro';

// Import your logo images
// Replace these imports with your actual logo files
//import logo1 from '../assets/images/logos/logoipsum-333.svg';

export interface Logo {
    src: ImageMetadata;
    alt: string; // The partner company's name
}

export interface LogoList {
    id: string;
    logos: Logo[];
}

// Example logo lists with imported images
export const logoLists: Record<string, LogoList> = {
    main: {
        id: 'main',
        logos: [

        ],
    },
};
