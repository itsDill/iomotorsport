# 🖼️ Image Organization Guide

## Folder Structure

```
images/
├── hero/           # Homepage & page hero backgrounds
├── cars/           # Hypercar, GT3, LMP2 car images
├── drivers/        # Esports driver portraits
├── circuits/       # Track maps & circuit photos
├── logos/          # Manufacturer & series logos
├── store/          # Product images for the store
└── backgrounds/    # Section backgrounds & textures
```

## Naming Conventions

Use lowercase, hyphens for spaces, and descriptive names:

```
# Cars
cars/toyota-gr010-hypercar.png
cars/ferrari-499p-hypercar.png
cars/porsche-911-gt3r.png
cars/bmw-m4-gt3.png

# Drivers
drivers/max-benecke.png
drivers/moreno-sirica.png
drivers/bono-huis.png

# Circuits
circuits/le-mans-map.png
circuits/spa-track.png
circuits/daytona-aerial.png

# Logos
logos/toyota.png
logos/ferrari.png
logos/porsche.png
logos/wec.png
logos/imsa.png

# Hero images
hero/homepage-hypercar.png
hero/endurance-hero.png
hero/esports-hero.png

# Store products
store/t-shirt-front.png
store/hoodie-black.png
store/poster-lemans.png

# Backgrounds
backgrounds/carbon-texture.png
backgrounds/racing-blur.png
```

## Recommended Image Sizes

| Type        | Dimensions | Format   | Notes                        |
| ----------- | ---------- | -------- | ---------------------------- |
| Hero        | 1920x1080  | PNG/WebP | Full-width backgrounds       |
| Cars        | 800x450    | PNG      | Transparent background ideal |
| Drivers     | 400x400    | PNG      | Square, face centered        |
| Circuits    | 1200x800   | PNG      | Track layout visible         |
| Logos       | 200x200    | PNG      | Transparent, square          |
| Products    | 600x600    | PNG      | Transparent, centered        |
| Backgrounds | 1920x1080  | PNG/WebP | Seamless patterns            |

## Using Images in HTML

### Hero Background

```html
<section
  class="hero-image"
  style="background-image: url('images/hero/homepage-hypercar.png')"
>
  <div class="hero-image-content">
    <h1>Welcome to iO Motorsport</h1>
  </div>
</section>
```

### Car Card

```html
<div class="card">
  <div class="car-image">
    <img
      src="images/cars/toyota-gr010-hypercar.png"
      alt="Toyota GR010 Hypercar"
      loading="lazy"
    />
  </div>
  <div class="card-content">
    <h3>Toyota GR010</h3>
  </div>
</div>
```

### Driver Portrait

```html
<div class="driver-card">
  <div class="driver-portrait">
    <img
      src="images/drivers/max-benecke.png"
      alt="Max Benecke"
      loading="lazy"
    />
  </div>
  <h4>Max Benecke</h4>
</div>
```

### Product Image

```html
<div class="product-card">
  <div class="product-image">
    <span class="product-badge bestseller">Bestseller</span>
    <img
      src="images/store/t-shirt-front.png"
      alt="iO Motorsport T-Shirt"
      loading="lazy"
    />
  </div>
</div>
```

### Manufacturer Logo

```html
<div class="manufacturer-logo">
  <img src="images/logos/toyota.png" alt="Toyota" />
</div>
```

### General Card Image

```html
<div class="img-container ratio-16-9">
  <img
    src="images/circuits/le-mans-map.png"
    alt="Le Mans Circuit Map"
    loading="lazy"
  />
</div>
```

## CSS Classes Available

| Class                | Use For                                        |
| -------------------- | ---------------------------------------------- |
| `.hero-image`        | Full-width hero sections with gradient overlay |
| `.car-image`         | Racing car showcase with hover effects         |
| `.driver-portrait`   | Circular driver photos with glow               |
| `.circuit-image`     | Track maps with subtle styling                 |
| `.manufacturer-logo` | Small logo badges                              |
| `.product-image`     | Store product cards                            |
| `.img-container`     | General responsive image wrapper               |
| `.card-image`        | Card header images with hover zoom             |
| `.gallery-item`      | Image gallery tiles                            |

### Aspect Ratios

- `.ratio-16-9` - Widescreen (videos, heroes)
- `.ratio-4-3` - Classic (photos)
- `.ratio-3-2` - Film format
- `.ratio-1-1` - Square (products, avatars)
- `.ratio-21-9` - Ultra-wide (cinematic)

## Optimization Tips

1. **Compress your PNGs** - Use TinyPNG or similar
2. **Consider WebP** - Smaller file sizes, great quality
3. **Use `loading="lazy"`** - Improves initial page load
4. **Add `alt` text** - Accessibility & SEO
5. **Keep transparent PNGs for cars** - They look better with effects

## Quick Start

1. Place your Grok-generated images in the appropriate folder
2. Rename to follow the naming convention
3. Use the HTML examples above to add them to your pages
4. The CSS will handle hover effects, overlays, and responsiveness automatically!
