# 🏁 Endurance Racing Hub

> Your ultimate source for endurance racing coverage - WEC, IMSA, GTWC, and more.

## Quick Start

### Local Development

```bash
# Navigate to project directory
cd /Users/dillchalisas/iomotorsport

# Start local server (Python 3)
python3 -m http.server 8000

# Or use Node.js
npx serve

# Open in browser
open http://localhost:8000
```

## Project Structure

```
/iomotorsport/
├── index.html          # Homepage (Pillar Page)
├── imsa.html           # IMSA Championship
├── wec.html            # WEC Championship
├── gtwc.html           # GT World Challenge
├── css/
│   └── styles.css      # Global CSS Framework
├── js/
│   └── common.js       # Shared JavaScript
├── photos/
│   └── hero.png        # Hero Background
└── docs/
    ├── IMPROVEMENTS_V2.md
    ├── PILLAR_PAGE_UPDATE.md
    └── TRANSFORMATION_GUIDE.md
```

## Features

### ✅ Implemented

- 🎯 **Responsive Design** - Mobile-first approach
- 📱 **Mobile Navigation** - Hamburger menu with smooth animations
- ⚡ **Performance Optimized** - Lazy loading, preloading, IntersectionObserver
- ♿ **Accessible** - ARIA labels, keyboard navigation, focus management
- 🎨 **Modern Design** - Clean, professional racing aesthetic
- 🔧 **Reusable Components** - Shared CSS/JS across all pages

### 🚧 Coming Soon

- 📅 Calendar page with event filtering
- 📰 Blog system with pagination
- 🔍 Site-wide search
- 🌙 Dark mode toggle
- 📊 Live timing integration

## Pages

### Main Pages

- **Homepage** (`/`) - Hub for all championships and content
- **IMSA** (`/imsa`) - IMSA SportsCar Championship coverage
- **WEC** (`/wec`) - World Endurance Championship coverage
- **GTWC** (`/gtwc`) - GT World Challenge coverage

### Planned Pages

- `/calendar` - Complete race calendar
- `/blog` - Racing news and analysis
- `/tools` - Racing calculators and resources
- `/about` - About the site
- `/contact` - Contact form

## Technologies

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox
- **Vanilla JavaScript** - No frameworks, pure JS
- **Progressive Enhancement** - Works without JS
- **Mobile-First** - Optimized for all devices

## Development

### Code Style

- 2-space indentation
- Semantic HTML elements
- BEM-inspired CSS naming
- ES6+ JavaScript

### Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Android Chrome 90+

## Performance Targets

- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Time to Interactive:** < 3.5s
- **Lighthouse Performance:** 90+

## Color Palette

```css
--primary: #e63946    /* Red - CTAs */
--secondary: #1d3557  /* Navy - Headers */
--accent: #f77f00     /* Orange - Highlights */
--dark: #0a0e27       /* Black - Nav */
--light: #f8f9fa      /* Off-white - BG */
```

### Championship Colors

- **IMSA:** Blue (#003b7a) + Red (#c8102e)
- **WEC:** Blue (#0066cc) + Gold (#ffb81c)
- **GTWC:** Red (#d32f2f) + Black (#1a1a1a)

## Contributing

1. Create feature branch
2. Make changes
3. Test on mobile and desktop
4. Commit with clear message
5. Push and create PR

## License

All rights reserved © 2025 Endurance Racing Hub

---

**Built with ❤️ for endurance racing fans worldwide** 🏁
