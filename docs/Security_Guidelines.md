# Security Guidelines for Static Website

**Version:** 1.0  
**Last Updated:** 2024-02-10  
**Author:** Development Team

## Table of Contents

1. [Overview](#1-overview)
2. [HTTPS Configuration](#2-https-configuration)
3. [Content Security Policy](#3-content-security-policy)
4. [Form Security](#4-form-security)
5. [Third-Party Integrations](#5-third-party-integrations)
6. [File Security](#6-file-security)
7. [Server/Hosting Security](#7-serverhosting-security)
8. [Monitoring and Incident Response](#8-monitoring-and-incident-response)
9. [Security Checklist](#9-security-checklist)

---

## 1. Overview

### Purpose
This document outlines security requirements and best practices for the electronics website. As a static site, security risks are minimized compared to dynamic websites, but proper measures are still essential.

### Scope
- HTTPS enforcement
- Content Security Policy (CSP)
- Form validation and submission
- Third-party script management
- File and directory protection
- Hosting security

### Security Principles
- **Defense in Depth:** Multiple layers of security
- **Least Privilege:** Minimal permissions for all components
- **Fail Secure:** Default to secure states on failure
- **Keep It Simple:** Avoid unnecessary complexity

---

## 2. HTTPS Configuration

### Requirements
- All pages must be served over HTTPS
- HTTP requests must redirect to HTTPS (301 redirect)
- Mixed content (HTTP resources on HTTPS pages) is not allowed

### Implementation
```html
<!-- Force HTTPS in HTML -->
<link rel="canonical" href="https://www.example.com/">
```

### Hosting-Specific Configuration

**GitHub Pages:**
- HTTPS is automatically enabled
- Enforce HTTPS option available in settings

**Netlify:**
```toml
# netlify.toml
[[redirects]]
  from = "http://*"
  to = "https://:host/:splat"
  status = 301
  conditions = {Role = ["*"]}
```

### SSL/TLS Requirements
- Use TLS 1.2 or higher
- Disable TLS 1.0 and 1.1
- Use strong cipher suites
- Keep SSL certificates up to date (Let's Encrypt auto-renewal)

---

## 3. Content Security Policy (CSP)

### Purpose
Prevent Cross-Site Scripting (XSS) attacks by defining allowed content sources.

### Basic CSP Header
```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; frame-ancestors 'none';
```

### CSP Directives Explained
| Directive | Purpose | Value |
|-----------|---------|-------|
| `default-src` | Fallback for other directives | `'self'` |
| `script-src` | Allowed JavaScript sources | `'self'` |
| `style-src` | Allowed CSS sources | `'self'` |
| `img-src` | Allowed image sources | `'self' data: https:` |
| `font-src` | Allowed font sources | `'self'` |
| `connect-src` | Allowed fetch/XHR sources | `'self'` |
| `frame-ancestors` | Who can embed this page | `none` |
| `form-action` | Where forms can submit | `'self'` |

### Strict CSP Example
```http
Content-Security-Policy: 
  default-src 'none';
  script-src 'self';
  style-src 'self' 'sha256-...';
  img-src 'self';
  font-src 'self';
  connect-src 'self';
  form-action 'self';
  base-uri 'self';
  upgrade-insecure-requests;
```

### Testing CSP
- Use Content-Security-Policy-Report-Only header initially
- Monitor reports for blocked resources
- Gradually tighten the policy

---

## 4. Form Security

### Contact Form Requirements

#### Client-Side Validation
```html
<form id="contact-form" novalidate>
  <label for="name">Name</label>
  <input type="text" id="name" name="name" required minlength="2" maxlength="100">
  
  <label for="email">Email</label>
  <input type="email" id="email" name="email" required autocomplete="email">
  
  <label for="message">Message</label>
  <textarea id="message" name="message" required minlength="10" maxlength="1000"></textarea>
  
  <button type="submit">Send Message</button>
</form>
```

#### Server-Side Validation (Third-Party Service)
When using form services like Formspree or Netlify Forms:

1. **Validate on client:** HTML5 + JavaScript validation
2. **Validate on server:** Third-party service handles server-side validation
3. **Sanitize inputs:** Remove potentially harmful characters
4. **Rate limiting:** Prevent spam submissions
5. **CAPTCHA:** Consider reCAPTCHA or hCAPTCHA for spam prevention

#### Form Submission Service Options
| Service | Free Tier | Features |
|---------|-----------|----------|
| Formspree | 50 submissions/month | Email notifications, file uploads |
| Netlify Forms | Unlimited | Spam filtering, exports |
| FormCarry | 100 submissions/month | Email forwarding, webhooks |

### Input Validation Rules
| Field | Validation |
|-------|------------|
| Name | 2-100 characters, letters and spaces only |
| Email | Valid email format, max 254 characters |
| Phone | Optional, numbers and basic symbols only |
| Message | 10-1000 characters, HTML stripped |

---

## 5. Third-Party Integrations

### Trusted Sources Only
- Use established, reputable services only
- Avoid obscure or undocumented libraries
- Prefer services with active maintenance and security track records

### Common Third-Party Scripts
| Purpose | Recommended Services |
|---------|---------------------|
| Analytics | Google Analytics, Plausible (privacy-focused) |
| Forms | Formspree, Netlify Forms, FormCarry |
| Maps | Google Maps, Mapbox (with API key protection) |
| Social | Official platform SDKs only |

### Third-Party Script Security
```html
<!-- Use defer to load scripts after HTML -->
<script src="https://analytics.example.com/tracker.js" defer></script>

<!-- Use integrity attribute for subresource integrity -->
<script 
  src="https://cdn.example.com/library.js" 
  integrity="sha256-abc123..." 
  crossorigin="anonymous">
</script>
```

### Subresource Integrity (SRI)
- Include `integrity` attribute on external scripts/styles
- Use SHA-256, SHA-384, or SHA-512 hashes
- Verify hash matches downloaded resource

### API Key Protection
```javascript
// Never expose API keys in client-side code
// Use serverless functions or proxy endpoints instead

// Instead of this (insecure):
const apiKey = 'AIzaSy...';

// Use a proxy (secure):
const response = await fetch('/api/proxy-endpoint');
```

---

## 6. File Security

### Sensitive Files Protection

#### Files That Should Not Be Public
- `.env` files (never commit these)
- `node_modules/` directory
- `.git/` directory
- Backup files (`*.bak`, `*.backup`)
- Configuration files with secrets
- Source maps in production

#### .gitignore Example
```
# Environment variables
.env
.env.local
.env.*.local

# Dependencies
node_modules/
bower_components/

# Build outputs
dist/
build/
*.min.js

# IDE
.idea/
.vscode/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Testing
coverage/
.nyc_output/
```

### Directory Structure Security
```bash
# Prevent directory listing
# Create empty index.html in each directory
/assets/
  /css/
    index.html  # Empty file to prevent directory listing
  /js/
    index.html
  /images/
    index.html
```

### robots.txt Configuration
```txt
# Allow all crawlers
User-agent: *
Allow: /

# Disallow sensitive paths
Disallow: /admin/
Disallow: /api/
Disallow: /private/
Disallow: /assets/css/
Disallow: /assets/js/
```

---

## 7. Server/Hosting Security

### GitHub Pages Security
1. **Enable HTTPS:** Automatically available
2. **Domain management:** Use custom domain with HTTPS
3. **Branch protection:** Protect main branch
4. **Disable GitHub Pages admin features:** Prevent builds from certain branches

### Netlify Security
```toml
# netlify.toml security headers
[[headers]]
  for = "/*"
  [headers.values]
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "geolocation=(), microphone=(), camera=()"

[[headers]]
  for = "*.html"
  [headers.values]
    Cache-Control = "public, max-age=3600"
```

### Security Headers

| Header | Purpose | Value |
|--------|---------|-------|
| `X-Content-Type-Options` | Prevent MIME sniffing | `nosniff` |
| `X-Frame-Options` | Prevent clickjacking | `DENY` or `SAMEORIGIN` |
| `X-XSS-Protection` | XSS filter (legacy) | `1; mode=block` |
| `Referrer-Policy` | Control referrer info | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | Disable browser features | `geolocation=(), microphone=()` |
| `Strict-Transport-Security` | HSTS (use with HTTPS) | `max-age=31536000; includeSubDomains` |

### Cache Control
```http
# Static assets (images, CSS, JS)
Cache-Control: public, max-age=31536000, immutable

# HTML pages
Cache-Control: no-cache, must-revalidate
```

---

## 8. Monitoring and Incident Response

### Security Monitoring

#### Recommended Services
| Service | Purpose | Free Tier |
|---------|---------|-----------|
| UptimeRobot | Uptime monitoring (99.9%) | 5 monitors |
| Google Analytics | Traffic anomalies | Unlimited |
| Mozilla HTTP Observatory | Security scanning | Web tool |
| SecurityHeaders.com | Header analysis | Web tool |

### Regular Security Audits

#### Weekly Tasks
- [ ] Check uptime status
- [ ] Review analytics for suspicious traffic

#### Monthly Tasks
- [ ] Run security header scans
- [ ] Check for outdated dependencies
- [ ] Review form spam reports
- [ ] Verify SSL certificate status

#### Quarterly Tasks
- [ ] Penetration testing (automated tools)
- [ ] Accessibility audit
- [ ] Performance security review
- [ ] Update security documentation

### Incident Response Plan

#### Step 1: Detection
- Monitor uptime and analytics
- Set up alerts for unusual activity
- Use automated security scanning

#### Step 2: Assessment
- Identify the type and scope of incident
- Determine if real or false positive
- Assess potential impact

#### Step 3: Containment
- Isolate affected resources
- Disable compromised features
- Implement temporary fixes

#### Step 4: Eradication
- Remove malicious code
- Reset credentials if compromised
- Update affected dependencies

#### Step 5: Recovery
- Restore from clean backup if needed
- Verify integrity of all files
- Monitor for recurring issues

#### Step 6: Documentation
- Document the incident
- Update security measures
- Review and improve processes

---

## 9. Security Checklist

### Pre-Launch Checklist
- [ ] HTTPS enabled and working
- [ ] CSP header configured
- [ ] Security headers implemented
- [ ] Form validation in place
- [ ] Third-party scripts reviewed
- [ ] Sensitive files protected
- [ ] .gitignore configured
- [ ] robots.txt configured
- [ ] No exposed API keys
- [ ] SSL certificate valid

### Ongoing Maintenance
- [ ] Regular backups
- [ ] Monitor uptime
- [ ] Review analytics
- [ ] Update dependencies
- [ ] Security header scans
- [ ] Incident documentation

### Emergency Contacts
| Type | Contact |
|------|---------|
| Hosting Support | GitHub Support / Netlify Support |
| Security Incident | Local authorities if needed |
| SSL Issues | Let's Encrypt / Certificate authority |

---

## References

- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [Mozilla Security Guidelines](https://wiki.mozilla.org/Security)
- [Google Security Blog](https://security.googleblog.com/)
- [Content Security Policy Guide](https://content-security-policy.com/)

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2024-02-10 | Dev Team | Initial security guidelines document |
