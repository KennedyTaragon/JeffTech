# JeffTech Electronics Website

A responsive static website for electronics repair services and product sales.

## Overview

This project is a static website built with HTML, CSS, and JavaScript to showcase electronics repair services and products for sale.

## Features

- Responsive design (mobile, tablet, desktop)
- Accessible (WCAG 2.1 AA compliant)
- SEO optimized
- Fast loading performance
- Secure (HTTPS, CSP headers)

## Pages

- **Home** - Hero section, featured services and products
- **Services** - Electronics repair services with pricing
- **Products** - Electronics products for sale
- **About** - Business information and team
- **Contact** - Contact form and business details

## Tech Stack

- HTML5
- CSS3 (custom properties, responsive design)
- JavaScript (ES6+)
- Git
- GitHub Pages (hosting)

## Getting Started

### Prerequisites

- Git
- Web browser for testing
- Code editor (VS Code recommended)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/jefftech.git
cd jefftech
```

2. Open `index.html` in your browser to view the website locally.

3. For development, use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js (if npm installed)
npx serve .
```

## Project Structure

```
jefftech/
├── index.html              # Home page
├── assets/
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript files
│   └── images/            # Images and assets
├── pages/                 # Additional pages
├── docs/                  # Documentation
├── .gitignore
└── README.md
```

## Development

### Coding Standards

Follow the guidelines in [docs/Coding_Standards.md](docs/Coding_Standards.md) for:

- HTML conventions
- CSS styling
- JavaScript best practices
- Accessibility requirements
- Performance optimization
- Git workflow

### Documentation

- [SRS.md](docs/SRS.md) - Software Requirements Specification
- [Coding_Standards.md](docs/Coding_Standards.md) - Coding guidelines
- [Security_Guidelines.md](docs/Security_Guidelines.md) - Security requirements
- [Implementation_Plan.md](docs/Implementation_Plan.md) - Development roadmap

## Deployment

The website is deployed automatically to GitHub Pages when changes are pushed to the main branch.

### Manual Deployment

1. Build and optimize files
2. Push to GitHub
3. GitHub Pages will automatically deploy

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Performance Targets

- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.8s
- Cumulative Layout Shift (CLS): < 0.1
- Total Page Size: < 500KB

## License

This project is proprietary software. All rights reserved.

## Contact

JeffTech Electronics
- Email: info@jefftech.com
- Phone: (555) 123-4567
- Address: 123 Main Street, City, State 12345

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2024-02-10 | Initial project setup |
