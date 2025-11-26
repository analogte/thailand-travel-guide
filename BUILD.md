# 🚀 Production Build Guide

This guide explains how to prepare the Thailand Travel Guide for production deployment.

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## 🛠️ Build Steps

### 1. Install Dependencies (Optional - for minification)

```bash
npm install --save-dev cssnano postcss-cli terser
```

### 2. Minify CSS

```bash
# Using cssnano
npx postcss css/styles.css --use cssnano -o css/styles.min.css

# Or using CSS minifier online tool
# https://cssminifier.com/
```

### 3. Minify JavaScript

```bash
# Minify all JS files
npx terser js/main.js -o js/main.min.js -c -m
npx terser js/ui-utils.js -o js/ui-utils.min.js -c -m
npx terser js/data-loader.js -o js/data-loader.min.js -c -m
npx terser js/province-detail.js -o js/province-detail.min.js -c -m
npx terser js/place-detail.js -o js/place-detail.min.js -c -m
npx terser js/provinces.js -o js/provinces.min.js -c -m
npx terser js/destinations.js -o js/destinations.min.js -c -m
npx terser js/culture.js -o js/culture.min.js -c -m
npx terser js/guide.js -o js/guide.min.js -c -m
npx terser sw.js -o sw.min.js -c -m
```

### 4. Optimize Images

```bash
# Convert to WebP format (smaller file size)
# For PNG/JPG images in the images/ directory

# Using ImageMagick
for file in images/*.{jpg,png}; do
  convert "$file" "${file%.*}.webp"
done

# Or using online tool:
# https://squoosh.app/
```

### 5. Update HTML References (Production Mode)

When deploying to production, update script/style references:

```html
<!-- Replace -->
<link rel="stylesheet" href="css/styles.css">
<!-- With -->
<link rel="stylesheet" href="css/styles.min.css">

<!-- Replace -->
<script src="js/main.js"></script>
<!-- With -->
<script src="js/main.min.js"></script>
```

## 🔒 Security Checklist

- [ ] Enable HTTPS
- [ ] Set proper CORS headers
- [ ] Implement CSP (Content Security Policy)
- [ ] Add rate limiting on server side
- [ ] Validate all user inputs
- [ ] Sanitize data before storage

## ⚡ Performance Checklist

- [ ] Minified CSS and JS
- [ ] Optimized images (WebP format)
- [ ] Service Worker enabled
- [ ] PWA manifest configured
- [ ] CDN for static assets (optional)
- [ ] Gzip/Brotli compression enabled

## 📊 SEO Checklist

- [ ] robots.txt file
- [ ] sitemap.xml file
- [ ] Meta tags on all pages
- [ ] Open Graph images
- [ ] Structured data (JSON-LD)

## 🌐 Deployment

### Static Site Hosting (Recommended)

**Netlify:**
```bash
# netlify.toml
[build]
  publish = "."
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Vercel:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.html",
      "use": "@vercel/static"
    }
  ]
}
```

**GitHub Pages:**
```bash
# Just push to main branch and enable GitHub Pages in settings
```

## 🔧 Environment Variables

Create `.env` file (not committed to git):

```env
# Newsletter API
NEWSLETTER_API_ENDPOINT=https://api.example.com/newsletter/subscribe
NEWSLETTER_API_KEY=your_api_key_here

# Analytics (optional)
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Error tracking (optional)
SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
```

## 📱 PWA Configuration

The app is PWA-ready with:
- ✅ Service Worker (`sw.js`)
- ✅ Web App Manifest (`manifest.json`)
- ✅ Offline support
- ✅ Installable on mobile devices

## 🧪 Testing

```bash
# Test Service Worker locally
npx serve . -p 8080

# Test on mobile device
# Use your local IP address
http://192.168.1.x:8080
```

## 📈 Analytics Integration

Add Google Analytics:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🚨 Monitoring

Consider adding:
- Sentry for error tracking
- Google Analytics for user behavior
- Lighthouse CI for performance monitoring

## 📞 Support

For deployment issues, check:
- Console errors (F12)
- Network tab for failed requests
- Service Worker status in DevTools
