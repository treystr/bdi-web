# Random Hero Image Middleware

This feature allows Hero and InnerHero components to use random background images from the `src/assets/images/hero/` directory without modifying the Hero components themselves.

## Overview

The middleware utility provides an elegant way to:
- Select random hero background images at build time
- Preserve the ability to use specific background images
- Maintain all existing Hero component functionality
- Use Astro's image optimization automatically

## Installation

The middleware is already installed and available at `src/utils/randomHeroImage.ts`.

## Usage

### Basic Random Background

```astro
---
import Hero from '@components/sections/Hero.astro';
import { withRandomHeroContent } from '@utils/randomHeroImage';

const heroContent = withRandomHeroContent({
    title: 'Your Title',
    description: 'Your description',
    randomBackground: true,
    overlayOpacity: 0.7
});
---

<Hero content={heroContent} />
```

### Specific Background Image (Override)

```astro
---
import Hero from '@components/sections/Hero.astro';
import { withRandomHeroContent } from '@utils/randomHeroImage';
import specificImage from '../assets/images/hero/hero5.jpg';

const heroContent = withRandomHeroContent({
    title: 'Your Title',
    description: 'Your description',
    backgroundImage: specificImage, // This overrides random selection
    randomBackground: true, // This will be ignored
    overlayOpacity: 0.6
});
---

<Hero content={heroContent} />
```

### No Background Image

```astro
---
import Hero from '@components/sections/Hero.astro';

const heroContent = {
    title: 'Your Title',
    description: 'Your description',
    // No randomBackground or backgroundImage specified
    overlayOpacity: 0.8
};
---

<Hero content={heroContent} />
```

## API Reference

### `withRandomHeroContent(content)`

Processes Hero content to enable random background images.

**Parameters:**
- `content` (HeroContent): The content object for Hero components

**Returns:**
- Modified content object with random `backgroundImage` when `randomBackground: true`

**Properties:**
- `randomBackground?: boolean` - Enable random background selection
- `backgroundImage?: ImageMetadata` - Specific image (overrides random selection)
- All other Hero component properties are preserved

### `withRandomHeroImage(props)`

Alternative function for processing props objects directly.

### `getRandomHeroImage()`

Returns a random hero image directly without content processing.

### `getAvailableHeroImages()`

Returns array of all available hero images for debugging.

## How It Works

1. **Build-time Loading**: Uses `import.meta.glob()` to load all images from `src/assets/images/hero/` at build time
2. **Random Selection**: When `randomBackground: true`, selects a random image from available images
3. **Fallback Logic**: Preserves existing functionality - specific images always override random selection
4. **Optimization**: Leverages Astro's built-in image optimization automatically

## Examples in Existing Pages

See the commented examples in:
- `src/pages/about/index.astro` - Shows how to add random backgrounds to existing pages

## Adding New Hero Images

Simply add new image files to `src/assets/images/hero/` with supported formats:
- `.jpg`
- `.jpeg`
- `.png`
- `.webp`

The middleware will automatically include them in the random selection.

## Technical Details

- **Performance**: Images are loaded at build time, not runtime
- **TypeScript**: Full TypeScript support with proper type definitions
- **Astro Compatibility**: Works with Astro's image optimization and static generation
- **No Component Changes**: Hero components remain unchanged
- **Graceful Fallback**: If no images are available, falls back to existing behavior

## Best Practices

1. **Use Descriptive Names**: Name hero images descriptively (e.g., `hero-community.jpg`)
2. **Optimize Images**: Keep hero images reasonably sized (recommended: 1920x1080 or similar)
3. **Consistent Aspect Ratios**: Use consistent aspect ratios for better visual consistency
4. **Test Different Images**: Refresh pages to test how different random images look with your content
5. **Combine with Overlay**: Use `overlayOpacity` to ensure text readability across all random images

## Troubleshooting

**No random images appearing:**
- Check that images exist in `src/assets/images/hero/`
- Verify `randomBackground: true` is set
- Ensure no `backgroundImage` is specified (it overrides random selection)

**Build errors:**
- Verify all image files are valid formats
- Check that image paths in `src/assets/images/hero/` are accessible

**TypeScript errors:**
- Import `ImageMetadata` type if needed: `import type { ImageMetadata } from 'astro';` 