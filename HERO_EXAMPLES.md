# Hero Component Examples

Quick reference for implementing the new Hero component across your site.

## 1. Centered Layout (Current Homepage)

```astro
---
import Hero from '@components/sections/Hero.astro';
import heroImage from '@assets/images/hero/hero-bizgrid.jpg';

const heroContent = {
    title: "Building a Bitcoin Circular Economy in the Nation's Capital",
    description: "The Bitcoin District Initiative is a 501(c)(3) tax-exempt not-for-profit organization dedicated to advancing grassroots Bitcoin adoption in Washington, DC.",
    height: "large", // 65vh
    layout: "centered",
    overlayOpacity: 0.7,
    backgroundImage: heroImage,
    contentPosition: "center",
    textAlign: "center",
    buttons: [
        {
            text: "Our Initiatives",
            link: "/initiatives",
            variant: "primary"
        },
        {
            text: "Donate",
            link: "/donate",
            variant: "secondary"
        }
    ]
};
---

<Hero content={heroContent} />
```

**Use for**: Landing pages, clean introductions, focused messaging

---

## 2. Split Layout with Image

```astro
---
import Hero from '@components/sections/Hero.astro';
import heroImage from '@assets/images/hero/hero-bizgrid.jpg';
import featureImage from '@assets/images/bitcoinacceptedheremarket.jpg';

const heroContent = {
    eyebrow: "OUR MISSION",
    title: "Empowering Local Businesses",
    description: "We're building a grassroots Bitcoin economy through education and adoption.",
    height: "large",
    layout: "split",
    backgroundImage: heroImage,
    overlayOpacity: 0.65,
    splitContent: {
        image: featureImage,
        imageAlt: "Bitcoin accepted here sign",
        imagePosition: "right", // or "left"
        imageAspect: "4/3"
    },
    buttons: [
        {
            text: "Learn More",
            link: "/about",
            variant: "primary"
        }
    ]
};
---

<Hero content={heroContent} />
```

**Use for**: About pages, feature showcases, stories with images

---

## 3. Offset Layout with Gradient (Left Aligned)

```astro
---
import Hero from '@components/sections/Hero.astro';
import contactBg from '@assets/images/hero/contact-bg.jpg';

const heroContent = {
    eyebrow: "GET IN TOUCH",
    title: "Let's Work Together",
    description: "Have questions? Want to get involved? We'd love to hear from you.",
    height: "half", // 50vh - compact
    layout: "offset-left",
    background: "light", // Gradient color for text readability (auto-enabled for offset)
    backgroundImage: contactBg,
    overlayOpacity: 0.3, // Lighter since gradient provides coverage
    textAlign: "left",
    contentPosition: "center",
    buttons: [
        {
            text: "Contact Us",
            link: "#contact-form",
            variant: "primary"
        }
    ],
    // showGradient: false, // Optional: disable automatic gradient
};
---

<Hero content={heroContent} />
```

**Use for**: Contact pages, forms, asymmetric designs

**New Feature**: Offset layouts now automatically show a gradient overlay that:
- Provides solid background color behind text for readability
- Gradually fades to transparent to reveal the hero image
- Color matches the `background` prop (`base`/`light`/`dark`)
- Can be disabled with `showGradient: false`

---

## 4. With Stats Display

```astro
---
import Hero from '@components/sections/Hero.astro';
import initiativesBg from '@assets/images/hero/initiatives-bg.jpg';

const heroContent = {
    eyebrow: "OUR PROGRESS",
    title: "100 Businesses by 2026",
    description: "Track our journey to onboard 100 local businesses to Bitcoin",
    height: "xlarge", // 75vh - more prominent
    layout: "centered",
    backgroundImage: initiativesBg,
    overlayOpacity: 0.7,
    textAlign: "center",
    statsContent: {
        goal2025: 25,
        date2025: "Dec 31, 2025",
        goal2026: 100,
        date2026: "Dec 31, 2026",
        count: 12,
        total: 12,
        mtd: 4,
        neededPerMonth: 2
    }
};
---

<Hero content={heroContent} />
```

**Use for**: Initiative pages, campaign tracking, progress updates

---

## 5. With Video Background

```astro
---
import Hero from '@components/sections/Hero.astro';
import posterImage from '@assets/images/hero/video-poster.jpg';

const heroContent = {
    title: "Bitcoin Is Here",
    description: "Experience the future of money in Washington, DC",
    height: "large",
    layout: "centered",
    backgroundVideo: {
        src: "/videos/bitcoin-hero.mp4",
        poster: posterImage,
        type: "video/mp4"
    },
    overlayOpacity: 0.6,
    textAlign: "center",
    buttons: [
        {
            text: "Watch Our Story",
            link: "/about",
            variant: "ghostLight"
        }
    ]
};
---

<Hero content={heroContent} />
```

**Use for**: Dynamic pages, storytelling, high-impact landing pages

---

## 6. Simple Progress Stats

```astro
---
import Hero from '@components/sections/Hero.astro';
import surveyBg from '@assets/images/hero/survey-bg.jpg';

const heroContent = {
    eyebrow: "COMMUNITY RESEARCH",
    title: "Local Business Survey",
    description: "Help us understand Bitcoin adoption readiness in DC",
    height: "large",
    layout: "centered",
    backgroundImage: surveyBg,
    overlayOpacity: 0.75,
    simpleStatsContent: {
        count: 45,
        goal: 100,
        label: "Surveys Completed"
    },
    buttons: [
        {
            text: "Take Survey",
            link: "/survey",
            variant: "primary"
        }
    ]
};
---

<Hero content={heroContent} />
```

**Use for**: Survey pages, simple goals, single-metric tracking

---

## 7. Offset Right with Minimal Text

```astro
---
import Hero from '@components/sections/Hero.astro';
import teamBg from '@assets/images/hero/team-bg.jpg';

const heroContent = {
    title: "Meet Our Team",
    description: "Passionate volunteers building the Bitcoin economy",
    height: "half",
    layout: "offset-right",
    backgroundImage: teamBg,
    overlayOpacity: 0.65,
    textAlign: "right",
    buttons: [
        {
            text: "View Team",
            link: "#team-grid",
            variant: "ghostLight"
        }
    ]
};
---

<Hero content={heroContent} />
```

**Use for**: Team pages, minimal designs, modern asymmetry

---

## Quick Comparison

| Layout | Best For | Height Recommendation |
|--------|----------|----------------------|
| Centered | Landing pages, clear messaging | large (65vh) |
| Split | Features, stories, visuals | large (65vh) |
| Offset-Left | Forms, contact, left-aligned content | half or large |
| Offset-Right | Asymmetric design, modern look | half or large |
| With Stats | Progress tracking, campaigns | xlarge (75vh) |
| With Video | High-impact, storytelling | large or xlarge |

## Height Guidelines

- **half (50vh)**: Compact, leaves more screen for content below
- **large (65vh)**: Recommended default, balanced modern look
- **xlarge (75vh)**: Prominent, but not full-screen

## Overlay Opacity Guidelines

- **0.5-0.6**: Light overlay, let background shine through
- **0.7-0.8**: Balanced (recommended for most cases)
- **0.8-0.9**: Heavy overlay for better text contrast
- **0.3-0.4**: Lighter overlay when using gradient (offset layouts)

## Gradient Overlay (New Feature)

**Automatic for Offset Layouts** - Provides text readability while showcasing hero image

### How It Works
- **Automatically enabled** for `offset-left` and `offset-right` layouts
- Creates solid-to-transparent gradient behind text
- Extends ~200px beyond text content for depth
- Direction follows layout (left→right for offset-left, right←left for offset-right)

### Configuration

```astro
background: "base" | "light" | "dark"  // Required: Gradient color
showGradient: true | false             // Optional: Override auto-enable (default: auto)
```

### Color Options
- **`base`**: Light blue-white (`rgb(248, 249, 255)`)
- **`light`**: Lighter blue (`rgb(238, 241, 255)`)  
- **`dark`**: Dark navy (`rgb(26, 31, 60)`)

### Best Practices
- Use lighter `overlayOpacity` (0.3-0.4) with gradient enabled
- Match `background` to your page theme for consistency
- Disable with `showGradient: false` if image is already high-contrast

## Migration from FullScreenHero

To convert existing FullScreenHero components:

```diff
---
- import FullScreenHero from '@components/sections/FullScreenHero.astro';
+ import Hero from '@components/sections/Hero.astro';

const heroContent = {
    title: "Your Title",
    description: "Your description",
+   height: "large",
+   layout: "centered",
    overlayOpacity: 0.7,
    backgroundImage: yourImage,
    contentPosition: "center",
    textAlign: "center",
    buttons: [...]
}
---

- <Layout fullscreenHero={true}>
+ <Layout>
-   <FullScreenHero content={heroContent} />
+   <Hero content={heroContent} />
```

## Pro Tips

1. **Contrast is key**: Test your hero on different screen sizes to ensure text is readable
2. **Keep it simple**: Don't use all features at once - choose what serves your message
3. **Mobile-first**: Always check how your hero looks on mobile devices
4. **Performance**: Optimize background images to 1920x1080 max, compress videos
5. **Accessibility**: Use descriptive button text and alt tags for images

## Need Help?

See the full documentation in:
- `/src/components/sections/Hero.README.md` - Complete API reference
- `/src/components/sections/Hero.astro` - Component source code

