# Coding Standards Document

**Version:** 1.1  
**Last Updated:** 2024-02-10  
**Author:** Development Team

## Table of Contents

1. [General Guidelines](#general-guidelines)
2. [HTML Standards](#html-standards)
3. [CSS Standards](#css-standards)
4. [JavaScript Standards](#javascript-standards)
5. [Accessibility Guidelines](#accessibility-guidelines-wcag-21)
6. [Performance Guidelines](#performance-guidelines)
7. [SEO Guidelines](#seo-guidelines)
8. [File Organization](#file-organization)
9. [Git Workflow](#git-workflow)

---

## General Guidelines

### Naming Conventions
- **Files:** lowercase with hyphens (e.g., `contact-form.js`, `main-styles.css`)
- **CSS Classes:** BEM naming convention (e.g., `block__element--modifier`)
- **JavaScript Functions:** camelCase (e.g., `calculateTotal()`, `fetchUserData()`)
- **Constants:** UPPERCASE_SNAKE_CASE (e.g., `MAX_RETRY_COUNT`)
- **Components:** PascalCase (e.g., `Header.jsx`, `Footer.vue`)

### Code Quality
- Write clean, readable, and maintainable code
- Follow the DRY (Don't Repeat Yourself) principle
- Keep functions small and focused on a single task
- Use meaningful and descriptive names
- Avoid deep nesting (max 3-4 levels)

### Documentation
- Add comments for complex logic
- Use JSDoc for JavaScript functions
- Document all non-obvious code decisions
- Keep comments up-to-date with code changes

---

## HTML Standards

### Structure
- Use HTML5 doctype: `<!DOCTYPE html>`
- Always include language attribute: `<html lang="en">`
- Use semantic elements:
  - `<header>` for page/section header
  - `<nav>` for navigation
  - `<main>` for main content
  - `<section>` for thematic content groups
  - `<article>` for self-contained content
  - `<aside>` for sidebar content
  - `<footer>` for page/section footer
  - `<time>` for time-related content

### Head Section
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Brief description for search engines">
<meta name="keywords" content="electronics, repair, services">
<meta name="author" content="Your Company">
<link rel="canonical" href="https://www.example.com/page">
<link rel="stylesheet" href="css/main.css">
```

### Accessibility in HTML
- Add `alt` text to all images: `<img src="..." alt="Descriptive text">`
- Use `aria-label` and `aria-describedby` for interactive elements
- Ensure proper heading hierarchy (h1 → h2 → h3)
- Use `label` elements with `for` attributes for form inputs
- Add `autocomplete` attributes to form fields

### Form Accessibility
```html
<label for="email">Email Address</label>
<input type="email" id="email" name="email" autocomplete="email" required aria-describedby="email-help">
<span id="email-help">We'll never share your email</span>
```

### Formatting
- Indent with 2 spaces (no tabs)
- Use lowercase for tags and attributes
- Always quote attribute values
- Self-closing tags: `<img />`, `<br />`, `<input />`

---

## CSS Standards

### Organization
- Use external stylesheets
- Organize CSS by: Base → Components → Layout → Pages → Utilities
- Use CSS custom properties (variables) for consistent theming

### CSS Custom Properties
```css
:root {
  --primary-color: #2563eb;
  --secondary-color: #64748b;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
  --border-radius: 8px;
  --font-family: 'Inter', system-ui, sans-serif;
}
```

### Naming Convention (BEM)
```css
/* Block */
.card { }

/* Element */
.card__header { }
.card__body { }
.card__footer { }

/* Modifier */
.card--featured { }
.card__button--primary { }
```

### Responsive Design (Mobile-First)
```css
/* Base styles (mobile) */
.container { padding: var(--spacing-md); }

/* Tablet */
@media (min-width: 768px) {
  .container { padding: var(--spacing-lg); }
}

/* Desktop */
@media (min-width: 1024px) {
  .container { max-width: 1200px; margin: 0 auto; }
}
```

### Formatting
- Indent with 2 spaces
- Group related properties (Position → Display → Box Model → Typography → Visuals)
- Use shorthand properties where appropriate
- Avoid !important (use specific selectors instead)

### Accessibility in CSS
```css
/* Focus visible */
*:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }

/* Reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}

/* High contrast text */
@media (prefers-contrast: high) {
  :root { --text-color: #000; --background-color: #fff; }
}
```

---

## JavaScript Standards

### ES6+ Features
- Use `const` and `let` instead of `var`
- Use arrow functions for anonymous functions
- Use template literals for string interpolation
- Use destructuring for objects and arrays
- Use spread operator for array/object copying

### Module Structure
```javascript
// Named exports
export const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item.price, 0);
};

// Default export
export default class Cart { }
```

### Import Structure
```javascript
// External libraries
import React from 'react';

// Internal modules
import { calculateTotal } from '../utils/helpers';

// CSS imports
import './styles.css';
```

### Error Handling
```javascript
// Try-catch for async operations
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw error; // Re-throw for caller handling
  }
}
```

### DOM Manipulation
```javascript
// Use modern APIs
const element = document.querySelector('.my-element');
const elements = document.querySelectorAll('.my-elements');

// Event delegation
document.querySelector('.list').addEventListener('click', (event) => {
  if (event.target.matches('.list__item')) {
    // Handle item click
  }
});
```

### Formatting
- Indent with 2 spaces
- Use semicolons consistently
- Max line length: 100 characters
- Use trailing commas in multi-line objects/arrays

### Strict Mode
```javascript
'use strict';

// Or for modules, strict mode is automatic
```

---

## Accessibility Guidelines (WCAG 2.1)

### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Focus order must be logical (top to bottom, left to right)
- Visible focus indicator on all interactive elements
- Skip links for main content

### Color and Contrast
- Minimum contrast ratio: 4.5:1 for normal text
- Minimum contrast ratio: 3:1 for large text (18px+ or 14px bold)
- Don't use color alone to convey meaning
- Test with color blindness simulators

### Screen Readers
- Use semantic HTML (headings, landmarks, lists)
- Add ARIA labels where visual context is missing
- Use `aria-live` for dynamic content updates
- Ensure proper form labels

### Testing Accessibility
```bash
# Use these tools:
- axe DevTools (browser extension)
- WAVE (web accessibility evaluator)
- Lighthouse (built into Chrome DevTools)
- pa11y (automated testing)
```

---

## Performance Guidelines

### Critical Rendering Path
- Minimize CSS and JavaScript blocking
- Use `defer` for non-critical scripts
- Optimize images (WebP format, proper sizing)
- Implement lazy loading for below-fold content

### Image Optimization
```html
<!-- Lazy loading -->
<img src="image.jpg" alt="Description" loading="lazy" width="800" height="600">

<!-- Responsive images -->
<img 
  srcset="image-400.jpg 400w, image-800.jpg 800w, image-1200.jpg 1200w"
  sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
  src="image-800.jpg"
  alt="Description"
>
```

### CSS Performance
- Use CSS containment for isolated components
- Avoid expensive properties (box-shadow, border-radius on large elements)
- Use `will-change` sparingly for animations
- Minimize layout thrashing

### JavaScript Performance
- Debounce scroll and resize event handlers
- Use `requestAnimationFrame` for animations
- Avoid synchronous XMLHttpRequest
- Use Intersection Observer for lazy loading

### Performance Budgets
| Metric | Target |
|--------|--------|
| First Contentful Paint (FCP) | < 1.8s |
| Largest Contentful Paint (LCP) | < 2.5s |
| Time to Interactive (TTI) | < 3.8s |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Total Page Size | < 500KB |

---

## SEO Guidelines

### Meta Tags
```html
<title>Page Title | Brand Name</title>
<meta name="description" content="Unique description (150-160 characters)">
<meta name="robots" content="index, follow">

<!-- Open Graph -->
<meta property="og:title" content="Page Title">
<meta property="og:description" content="Description for social sharing">
<meta property="og:image" content="https://example.com/image.jpg">
<meta property="og:url" content="https://example.com/page">
<meta property="og:type" content="website">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Page Title">
<meta name="twitter:description" content="Description">
<meta name="twitter:image" content="https://example.com/image.jpg">
```

### Semantic HTML for SEO
- Use single h1 per page
- Proper heading hierarchy (h1 → h2 → h3)
- Use `<article>` for main content
- Use `<time datetime="2024-02-10">` for dates
- Add structured data (JSON-LD) for rich snippets

### Structured Data Example
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "JeffTech Electronics",
  "description": "Electronics repair and sales services",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "City",
    "addressRegion": "State",
    "postalCode": "12345"
  },
  "telephone": "+1-555-123-4567"
}
</script>
```

### URL Structure
- Use lowercase URLs
- Use hyphens to separate words
- Keep URLs short and descriptive
- Use HTTPS for all pages

---

## File Organization

### Project Structure
```
project/
├── index.html
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── images/
│   │   ├── optimized/
│   │   └── icons/
│   └── fonts/
├── css/
│   ├── main.css
│   ├── components/
│   └── vendor/
├── js/
│   ├── main.js
│   ├── components/
│   └── utils/
└── docs/
```

### CSS File Organization
```
css/
├── main.css (imports all other files)
├── base/
│   ├── reset.css
│   ├── typography.css
│   └── variables.css
├── components/
│   ├── buttons.css
│   ├── cards.css
│   └── forms.css
├── layout/
│   ├── header.css
│   ├── footer.css
│   └── grid.css
└── pages/
    ├── home.css
    └── contact.css
```

### JavaScript File Organization
```
js/
├── main.js (entry point)
├── vendor/
│   └── (third-party libraries)
├── components/
│   ├── navigation.js
│   ├── forms.js
│   └── modal.js
└── utils/
    ├── helpers.js
    └── validators.js
```

---

## Git Workflow

### Branch Naming
- `main` - Production-ready code
- `develop` - Development branch
- `feature/description` - New features (e.g., `feature/contact-form`)
- `bugfix/issue-number` - Bug fixes (e.g., `bugfix/header-alignment`)
- `hotfix/description` - Urgent production fixes

### Commit Message Format
```
type(scope): subject

body (optional)

footer (optional)
```

### Commit Types
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation only
- `style` - Formatting, no code change
- `refactor` - Code restructuring
- `perf` - Performance improvement
- `test` - Adding tests
- `chore` - Maintenance

### Example Commit Messages
```
feat(header): add mobile navigation menu
fix(contact): resolve form validation error on email field
docs(readme): update installation instructions
perf(images): lazy load product images below fold
```

### Pull Request Guidelines
- Create PRs for all changes (even small ones)
- Keep PRs focused and small (< 400 lines)
- Add descriptive title and description
- Link related issues
- Request review from team members
- Squash commits before merging

---

## Validation Tools

### HTML Validation
- W3C Markup Validation Service (validator.w3.org)
- HTML5 Validator (browser extension)

### CSS Validation
- W3C CSS Validation Service (jigsaw.w3.org/css-validator)
- Stylelint (CLI tool)

### JavaScript Validation
- ESLint (CLI tool)
- Prettier (code formatter)

### Accessibility Testing
- axe DevTools (browser extension)
- WAVE (wave.webaim.org)
- Lighthouse (Chrome DevTools)

### Performance Testing
- PageSpeed Insights (pagespeed.web.dev)
- Lighthouse (Chrome DevTools)
- WebPageTest (webpagetest.org)

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2024-01-01 | Initial | Initial version |
| 1.1 | 2024-02-10 | Dev Team | Added accessibility, performance, SEO, and Git workflow sections |

---

## References

- [MDN Web Docs](https://developer.mozilla.org/)
- [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [Google Web Fundamentals](https://developers.google.com/web/fundamentals)
- [ESLint Documentation](https://eslint.org/)
- [BEM Naming Convention](https://en.bem.info/methodology/naming-convention/)
