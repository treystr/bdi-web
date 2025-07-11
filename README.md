# BDI Astro Site

Welcome to the BDI Astro site, built with the powerful Titan Core theme for Astro JS. This modern, high-performance website template is designed to help you create stunning websites, blogs, and portfolios with ease.

[Live Demo](https://titan-core.netlify.app)

## ✨ Features

- 🎨 **Multiple Theme Options** - Choose from various color themes
- 📱 **Fully Responsive** - Looks great on all devices
- 🚀 **Performance Focused** - Optimized for speed and SEO
- 📝 **Blog Ready** - Complete blog functionality with categories and pagination
- 🔍 **SEO Optimized** - Meta tags, Open Graph, Twitter Cards, and sitemap
- 🧩 **Component-Based** - Modular architecture for easy customization
- 🎭 **Animation Ready** - Integrated AOS (Animate On Scroll) for smooth animations

## 🚀 Quick Start - Running Locally

Follow these steps to set up and run the BDI Astro site on your local machine:

```bash
# Clone the repository (if you haven't already)
git clone <repository-url>
cd bdi-astro

# Install dependencies
npm install

# Start the local development server
npm run dev
```

After running these commands, the site will be available at `localhost:4321`. Any changes you make to the code will automatically refresh in the browser.

## 📁 Project Structure

```
/
├── public/             # Static assets
│   └── favicon.ico
├── src/
│   ├── assets/         # Images and other assets
│   ├── components/     # UI components
│   │   ├── blog/       # Blog-specific components
│   │   ├── forms/      # Form components
│   │   ├── icons/      # Icon components
│   │   ├── sections/   # Page section components
│   │   ├── team/       # Team components
│   │   └── ui/         # Basic UI components
│   ├── content/        # Content collections
│   ├── data/           # Configuration and data files
│   ├── layouts/        # Page layouts
│   ├── pages/          # Page routes
│   ├── styles/         # Global styles
│   └── utils/          # Utility functions
└── package.json
```

## 📝 Creating and Editing Blog Posts

Titan Core uses Astro's content collections for managing blog posts. Here's how to create and edit blog content:

1. **Locate the Blog Content Folder**:
   - Blog posts are stored in `src/content/blog/`.

2. **Create a New Blog Post**:
   - Create a new markdown file in `src/content/blog/` with a filename like `my-new-post.md`.
   - Add the required frontmatter at the top of the file. Here's an example:

     ```markdown
     ---
     title: "My New Blog Post"
     description: "A brief description of my new post."
     pubDate: 2023-10-15
     categories: ["category1", "category2"]
     author: "Your Name"
     featured: false
     image: "/path/to/image.jpg"  # Optional hero image
     ---
     
     # My New Blog Post
     
     Write your content here using Markdown syntax.
     ```

3. **Edit an Existing Blog Post**:
   - Open the markdown file of the blog post you wish to edit in `src/content/blog/`.
   - Update the content or frontmatter as needed.

4. **Manage Blog Categories**:
   - Categories for blog posts are defined in `src/data/categories.ts`. To add or modify categories, edit this file.

After making changes, restart the development server if it's running to see the updates reflected on the site.

## ⚙️ Configuration

Customize your site by editing the configuration files in the `src/data/` directory:

- `config.ts` - Site-wide configuration including company info and SEO settings
- `menu.ts` - Navigation menu structure
- `features.ts` - Feature section content
- `faqs.ts` - FAQ content
- `logos.ts` - Partner/client logos
- `categories.ts` - Blog categories

## 🎨 Theming

BDI Astro site comes with 10 beautiful pre-configured themes. Choose a single theme by editing the `themeSetting` object in `src/data/config.ts`:

```typescript
export const themeSetting = {
  theme: 'zeus' // Choose one of the 10 available themes
}
```

Available themes include `zeus`, `poseidon`, `hades`, `apollo`, `artemis`, `ares`, `athena`, `hermes`, `dionysus`, and `demeter`.

To remove the theme switcher for a consistent theme, edit `src/layouts/Layout.astro` by removing the `ThemeSwitcher` import and component.

## 🛠️ Commands

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Install dependencies                            |
| `npm run dev`          | Start local dev server at `localhost:4321`      |
| `npm run build`        | Build your production site to `./dist/`          |
| `npm run preview`      | Preview your build locally, before deploying     |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check` |

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Credits

This site is built using the [Titan Core Astro Theme](https://github.com/rspisarski/titan-core) by rspisarski. Many thanks for providing such a robust and feature-rich starting point for modern Astro websites.
