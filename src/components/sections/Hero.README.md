# Hero Component Documentation

A flexible, modern hero section component with multiple height options, layout variants, and advanced features.

## Features

- **Multiple Heights**: Choose from 50vh (half), 65vh (large), or 75vh (xlarge)
- **Layout Variants**: Split panel, centered, offset-left, offset-right
- **Media Backgrounds**: Support for both images and videos
- **Advanced Content**: Stats displays, form embeds, and more
- **Fully Responsive**: Optimized for mobile, tablet, and desktop
- **Accessibility**: ARIA support, reduced motion preferences, and proper contrast

## Basic Usage

```astro
---
import Hero from '@components/sections/Hero.astro';
import heroImage from '@assets/images/your-hero.jpg';

const heroContent = {
    title: "Your Compelling Headline",
    description: "Supporting text that explains your value proposition",
    height: "large", // 50vh, 65vh, or 75vh
    layout: "centered",
    backgroundImage: heroImage,
    buttons: [
        {
            text: "Get Started",
            link: "/contact",
            variant: "primary"
        }
    ]
};
---

<Hero content={heroContent} />
```

## Layout Options

### 1. Centered Layout (Default)
Perfect for clean, focused messaging.

```astro
const heroContent = {
    title: "Welcome to Our Site",
    description: "A centered, balanced approach",
    layout: "centered",
    textAlign: "center"
};
```

### 2. Split Layout
Showcase content alongside an image.

```astro
const heroContent = {
    title: "Our Mission",
    description: "Building something amazing",
    layout: "split",
    splitContent: {
        image: yourImage,
        imageAlt: "Description of image",
        imagePosition: "right", // or "left"
        imageAspect: "4/3" // square, 4/3, 16/9, 3/2
    }
};
```

### 3. Offset Layout
Create asymmetric, modern designs.

```astro
const heroContent = {
    title: "Innovation Starts Here",
    description: "Pushing boundaries",
    layout: "offset-left", // or "offset-right"
    textAlign: "left"
};
```

## Height Variants

```astro
// Half screen - 50vh (compact)
height: "half"

// Large - 65vh (recommended default for modern look)
height: "large"

// Extra Large - 75vh (more prominent)
height: "xlarge"
```

## Advanced Features

### Video Background

```astro
const heroContent = {
    title: "Dynamic Content",
    backgroundVideo: {
        src: "/videos/hero-video.mp4",
        poster: posterImage, // Fallback image
        type: "video/mp4"
    },
    overlayOpacity: 0.6
};
```

### Eyebrow Text

```astro
const heroContent = {
    eyebrow: "INTRODUCING",
    title: "The Future is Here",
    // ...
};
```

### Stats Display

```astro
const heroContent = {
    title: "Our Progress",
    statsContent: {
        goal2025: 100,
        date2025: "Dec 31, 2025",
        goal2026: 250,
        date2026: "Dec 31, 2026",
        count: 45,
        total: 45,
        mtd: 12,
        neededPerMonth: 5
    }
};
```

### Simple Progress Stats

```astro
const heroContent = {
    title: "Campaign Goals",
    simpleStatsContent: {
        count: 75,
        goal: 100,
        label: "Surveys Completed"
    }
};
```

## Content Positioning

Control where content appears vertically:

```astro
contentPosition: "top"    // Near the top
contentPosition: "center" // Vertically centered (default)
contentPosition: "bottom" // Near the bottom
```

## Overlay Opacity

Adjust the background overlay darkness (0 = transparent, 1 = fully dark):

```astro
overlayOpacity: 0.5  // Light overlay
overlayOpacity: 0.7  // Medium (default)
overlayOpacity: 0.9  // Heavy overlay
```

## Button Variants

```astro
buttons: [
    {
        text: "Primary Action",
        link: "/action",
        variant: "primary"
    },
    {
        text: "Secondary",
        link: "/learn-more",
        variant: "secondary"
    },
    {
        text: "Ghost Light",
        link: "/info",
        variant: "ghostLight", // For dark backgrounds
        target: "_blank"
    }
]
```

## Complete Example

```astro
---
import Hero from '@components/sections/Hero.astro';
import heroImage from '@assets/images/hero-bg.jpg';
import featureImage from '@assets/images/feature.jpg';

const heroContent = {
    eyebrow: "NEW RELEASE",
    title: "Transform Your Business",
    description: "Discover innovative solutions that drive real results",
    height: "large",
    layout: "split",
    backgroundImage: heroImage,
    overlayOpacity: 0.65,
    contentPosition: "center",
    textAlign: "left",
    buttons: [
        {
            text: "Start Free Trial",
            link: "/signup",
            variant: "primary"
        },
        {
            text: "Watch Demo",
            link: "/demo",
            variant: "ghostLight"
        }
    ],
    splitContent: {
        image: featureImage,
        imageAlt: "Product showcase",
        imagePosition: "right",
        imageAspect: "4/3"
    }
};
---

<Hero content={heroContent} />
```

## Best Practices

1. **Keep titles concise**: 5-12 words for maximum impact
2. **Use high-quality images**: Minimum 1920x1080 for backgrounds
3. **Test contrast**: Ensure text is readable against your background
4. **Optimize media**: Compress images and videos for fast loading
5. **Mobile-first**: Test on mobile devices for proper responsiveness
6. **Accessibility**: Use descriptive alt text and maintain contrast ratios

## Comparison with FullScreenHero

Use **Hero** when:
- You want a modern, balanced layout (not full viewport)
- You need split panel or offset layouts
- You want more layout flexibility

Use **FullScreenHero** when:
- You need maximum visual impact
- You want full viewport height (100vh)
- You have featured initiatives to showcase

## TypeScript Support

Full TypeScript interfaces are included for type safety:

```typescript
interface HeroContent {
    title: string;
    description?: string;
    eyebrow?: string;
    height?: 'half' | 'large' | 'xlarge';
    layout?: 'split' | 'centered' | 'offset-left' | 'offset-right';
    // ... and more
}
```

## Examples Across the Site

- **Homepage**: Centered layout with large height
- **About Page**: Split layout with team image
- **Contact**: Offset layout with form emphasis
- **Initiatives**: With stats display

## Performance Notes

- Background images are automatically optimized to WebP format
- Lazy loading is enabled for better performance
- Video backgrounds include poster images as fallbacks
- Responsive images serve appropriate sizes per device

## Accessibility

- Text shadows ensure readability on any background
- Reduced motion preferences are respected
- Proper ARIA labels on interactive elements
- Sufficient color contrast for WCAG compliance

## Browser Support

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

