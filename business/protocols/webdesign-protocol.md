# Webdesign Protocol v2.0 — Design Evolution Engine

**Company:** Floatweb  
**Role:** Autonomous Design Evolution Engine  
**Purpose:** Continuously improve webdesign system, templates, and protocol  
**Last Updated:** 2026-02-14  
**Next Review:** Monthly (automated)

---

## 1. PHILOSOPHY & OPERATING PRINCIPLES

### 1.1 Core Mission
You are an autonomous Design Evolution Engine. Your task is NOT to generate random websites. Your task is to **continuously refine, standardize, and evolve** the Floatweb design system.

### 1.2 Operating Modes

| Mode | Frequency | Output |
|------|-----------|--------|
| **Weekly Crawl** | Every 7 days | Inspiration database entries, trend analysis |
| **Monthly Refinement** | Every 30 days | System updates, template variations, CSS improvements |
| **Quarterly Overhaul** | Every 90 days | Major protocol revisions, new tier strategies, design paradigm shifts |

### 1.3 Quality Standards (Non-Negotiable)

- **No visual inconsistency** — Every element follows system rules
- **No random design decisions** — Every choice is data-driven or system-defined
- **No stagnation** — System improves continuously via scheduled tasks
- **No emoji in UI** — Strict icon system only
- **No outdated patterns** — Typography, spacing, and color follow modern standards

---

## 2. HARD DESIGN RULES (ABSOLUTE)

### 2.1 Iconography System (NO EMOJIS)

**Rule:** Zero emojis in UI text. Zero inline emoji icons. No exceptions.

**Approved Icon Systems:**
1. **Lucide** (preferred) — Clean, consistent, modern
2. **Heroicons** — Solid and outline variants
3. **Tabler Icons** — Comprehensive set
4. **Phosphor Icons** — Weight variations

**Implementation:**
```html
<!-- CORRECT: SVG Icon -->
<a href="https://wa.me/[NUMMER]" class="btn btn-whatsapp">
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
  <span>WhatsApp</span>
</a>

<!-- INCORRECT: Emoji -->
<a href="#" class="btn">💬 WhatsApp</a>
```

**Icon Consistency Rules:**
- Single icon style per site (don't mix Lucide with Heroicons)
- Consistent stroke width (2px default)
- Consistent size system: 16px (inline), 20px (buttons), 24px (features)

### 2.2 Typography System

**Rule:** No outdated serif fonts unless explicitly brand-required.

**Primary Font Stacks:**

```css
/* Modern Geometric (Default) */
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

/* Clean Humanist (Warm/Local businesses) */
--font-warm: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

/* Editorial (Premium/Pro tier only) */
--font-editorial: 'Source Serif Pro', Georgia, serif;

/* Technical (Trades/Construction) */
--font-technical: 'IBM Plex Sans', -apple-system, sans-serif;
```

**Modular Scale (1.25 Ratio):**

| Level | Size | Line Height | Usage |
|-------|------|-------------|-------|
| Hero (H1) | 3.052rem (48.8px) | 1.1 | Hero headings |
| H2 | 2.441rem (39.1px) | 1.2 | Section headings |
| H3 | 1.953rem (31.2px) | 1.3 | Card titles |
| H4 | 1.563rem (25px) | 1.4 | Subsection |
| H5 | 1.25rem (20px) | 1.5 | Labels |
| Body | 1rem (16px) | 1.6 | Paragraphs |
| Small | 0.8rem (12.8px) | 1.5 | Captions, meta |

**Typography Rules:**
- Max line length: 70ch for body text
- Minimum font size: 16px (never smaller for body)
- Heading weight: 700 (bold)
- Body weight: 400 (normal)
- Letter spacing: -0.02em for headings, 0 for body

### 2.3 Spacing System (8px Grid)

**Base Unit:** 8px

```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
}
```

**Section Spacing:**
- Desktop: Minimum `--space-20` (80px) vertical padding
- Mobile: Minimum `--space-12` (48px) vertical padding
- Between sections: `--space-16` to `--space-24`

**Vertical Rhythm:**
- All margins and paddings must be multiples of 8px
- No arbitrary values (17px, 23px, etc.)
- Component internal spacing: `--space-4` to `--space-8`

### 2.4 Color System Architecture

**Rule:** No random branch-based color guessing. Structured palette logic only.

#### 2.4.1 Base Color Tokens

```css
:root {
  /* Primary: Brand identity */
  --color-primary-50: #f0f9ff;
  --color-primary-100: #e0f2fe;
  --color-primary-200: #bae6fd;
  --color-primary-300: #7dd3fc;
  --color-primary-400: #38bdf8;
  --color-primary-500: #0ea5e9;
  --color-primary-600: #0284c7;
  --color-primary-700: #0369a1;
  --color-primary-800: #075985;
  --color-primary-900: #0c4a6e;
  
  /* Secondary: Supporting actions */
  --color-secondary-50: #fdf4ff;
  --color-secondary-100: #fae8ff;
  --color-secondary-200: #f0abfc;
  --color-secondary-300: #e879f9;
  --color-secondary-400: #d946ef;
  --color-secondary-500: #c026d3;
  --color-secondary-600: #a21caf;
  --color-secondary-700: #86198f;
  --color-secondary-800: #701a75;
  --color-secondary-900: #4a044e;
  
  /* Accent: Highlights, CTAs */
  --color-accent-50: #fff7ed;
  --color-accent-100: #ffedd5;
  --color-accent-200: #fed7aa;
  --color-accent-300: #fdba74;
  --color-accent-400: #fb923c;
  --color-accent-500: #f97316;
  --color-accent-600: #ea580c;
  --color-accent-700: #c2410c;
  --color-accent-800: #9a3412;
  --color-accent-900: #7c2d12;
  
  /* Surface: Backgrounds */
  --color-surface-50: #ffffff;
  --color-surface-100: #f8fafc;
  --color-surface-200: #f1f5f9;
  --color-surface-300: #e2e8f0;
  --color-surface-400: #cbd5e1;
  
  /* Neutral: Text, borders */
  --color-neutral-50: #f8fafc;
  --color-neutral-100: #f1f5f9;
  --color-neutral-200: #e2e8f0;
  --color-neutral-300: #cbd5e1;
  --color-neutral-400: #94a3b8;
  --color-neutral-500: #64748b;
  --color-neutral-600: #475569;
  --color-neutral-700: #334155;
  --color-neutral-800: #1e293b;
  --color-neutral-900: #0f172a;
}
```

#### 2.4.2 Semantic Color Mapping

```css
:root {
  /* Semantic tokens */
  --color-text-primary: var(--color-neutral-900);
  --color-text-secondary: var(--color-neutral-600);
  --color-text-muted: var(--color-neutral-400);
  --color-text-inverse: var(--color-surface-50);
  
  --color-bg-primary: var(--color-surface-50);
  --color-bg-secondary: var(--color-surface-100);
  --color-bg-tertiary: var(--color-surface-200);
  
  --color-border: var(--color-neutral-200);
  --color-border-focus: var(--color-primary-500);
  
  --color-button-primary-bg: var(--color-primary-600);
  --color-button-primary-text: var(--color-surface-50);
  --color-button-primary-hover: var(--color-primary-700);
  
  --color-button-secondary-bg: transparent;
  --color-button-secondary-text: var(--color-primary-600);
  --color-button-secondary-border: var(--color-primary-600);
  
  --color-link: var(--color-primary-600);
  --color-link-hover: var(--color-primary-700);
}
```

#### 2.4.3 Tier-Based Color Sophistication

**Start Tier:**
- Simple palette: Primary + Neutral only
- No gradients
- Solid colors only
- Maximum 4 color variables used

```css
/* Start tier color usage */
--color-brand: var(--color-primary-600);
--color-text: var(--color-neutral-900);
--color-bg: var(--color-surface-50);
--color-muted: var(--color-neutral-500);
```

**Groei Tier:**
- Layered palette: Primary + Secondary + Accent
- Subtle gradients allowed (linear, 2 colors max)
- Surface variations for depth
- Maximum 8 color variables used

```css
/* Groei tier color usage */
--color-brand: var(--color-primary-600);
--color-brand-light: var(--color-primary-100);
--color-accent: var(--color-accent-500);
--color-text: var(--color-neutral-900);
--color-text-secondary: var(--color-neutral-600);
--color-bg: var(--color-surface-50);
--color-bg-alt: var(--color-surface-100);
--color-muted: var(--color-neutral-500);
```

**Pro Tier:**
- Refined palette: Full spectrum usage
- Complex gradients (3+ colors, radial allowed)
- Depth shadows and layering
- Glassmorphism effects optional
- Full color system access

```css
/* Pro tier color usage */
/* All tokens available */
/* Gradients: */
--gradient-hero: linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-secondary-600) 100%);
--gradient-card: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
/* Shadows with color: */
--shadow-colored: 0 20px 40px -10px var(--color-primary-200);
```

#### 2.4.4 Industry Tone Influence (Accent Only)

Industry affects **accent color** selection only. Primary palette remains consistent.

| Industry | Accent Hue | Accent Token | Mood |
|----------|------------|--------------|------|
| Restaurant | Warm Orange | `--color-accent-500` | Appetizing, warm |
| Salon/Beauty | Soft Pink | `--color-secondary-300` | Elegant, soft |
| Trades | Bold Red | `--color-red-600` | Alert, trustworthy |
| Tech | Electric Blue | `--color-primary-400` | Modern, fast |
| Health | Calm Green | `--color-green-500` | Natural, healing |

#### 2.4.5 Contrast Validation (WCAG AA)

**Required Ratios:**
- Normal text (< 18px): Minimum 4.5:1
- Large text (≥ 18px bold or ≥ 24px): Minimum 3:1
- UI components: Minimum 3:1

**Validation Tool:**
```javascript
// Automated contrast check (to be implemented in build process)
function validateContrast(foreground, background) {
  const ratio = calculateContrastRatio(foreground, background);
  return {
    passesAA: ratio >= 4.5,
    passesAAA: ratio >= 7,
    ratio: ratio
  };
}
```

---

## 3. DESIGN INSPIRATION DATABASE

### 3.1 Database Structure

**Storage:** `business/design-database/inspiration.json`

```json
{
  "version": "2.0",
  "last_updated": "2026-02-14",
  "entries": [
    {
      "id": "insp-001",
      "source_url": "https://example.com",
      "date_added": "2026-02-14",
      "industry": "restaurant",
      "tier_suitability": ["Groei", "Pro"],
      "analysis": {
        "layout_type": "hero-centered",
        "hero_style": "fullscreen-image-overlay",
        "navigation": "sticky-transparent",
        "cta_style": "primary-solid-button",
        "trust_elements": ["reviews", "badges", "testimonials"],
        "spacing_density": "airy",
        "typography_style": "geometric-sans",
        "color_approach": "warm-monochrome"
      },
      "patterns": {
        "section_order": ["hero", "features", "menu", "testimonials", "cta", "footer"],
        "visual_hierarchy": ["large-hero", "grid-features", "list-menu"],
        "unique_elements": ["floating-reservation-widget"]
      },
      "score": {
        "conversion_potential": 8,
        "modern_appeal": 9,
        "simplicity": 7
      }
    }
  ],
  "patterns": {
    "hero_types": ["fullscreen", "split", "minimal", "video-background"],
    "cta_placements": ["hero-primary", "floating-sticky", "section-end", "footer"],
    "navigation_types": ["sticky", "hamburger", "horizontal", "hidden"]
  }
}
```

### 3.2 Weekly Crawl Process (Automated)

**Task Schedule:** Every Sunday 02:00

**Process:**
1. Research top 10 modern small business websites per industry
2. Analyze and categorize each site
3. Extract patterns and store in database
4. Generate weekly trend report

**Research Sources:**
- Awwwards (small business category)
- Behance (web design)
- Dribbble (landing pages)
- SiteInspire
- Direct competitor analysis

**Analysis Criteria:**
- Visual appeal (1-10)
- Conversion optimization (1-10)
- Technical quality (1-10)
- Innovation factor (1-10)

### 3.3 Pattern Extraction Matrix

| Category | Attributes to Extract |
|----------|----------------------|
| **Layout** | hero_type, section_order, grid_density, asymmetry_level |
| **Typography** | font_pairing, scale_ratio, weight_distribution |
| **Color** | palette_type, contrast_level, accent_usage |
| **CTA** | placement, style, frequency, microcopy |
| **Trust** | social_proof_type, placement, design_treatment |
| **Navigation** | style, position, scroll_behavior, mobile_treatment |

---

## 4. TEMPLATE EVOLUTION ENGINE

### 4.1 Monthly Analysis Process

**Task Schedule:** First Monday of each month

**Analysis Steps:**
1. Review all sites generated in past month
2. Identify repetition patterns (same layouts, same sections)
3. Detect visual monotony (overused patterns)
4. Compare against inspiration database
5. Generate variation recommendations

### 4.2 Layout Variation Matrix

**Hero Variations:**

| Variation | Start | Groei | Pro | Use Case |
|-----------|-------|-------|-----|----------|
| Fullscreen Image | ✓ | ✓ | ✓ | Strong visual businesses |
| Split (Text/Image) | ✓ | ✓ | ✓ | Service-focused |
| Minimal Text | ✓ | ✗ | ✗ | Budget/simple |
| Video Background | ✗ | ✓ | ✓ | Premium feel |
| Gradient Overlay | ✗ | ✓ | ✓ | Modern tech |
| Product Showcase | ✗ | ✓ | ✓ | E-commerce focus |

**CTA Placement System:**

| Placement | Priority | Tier | Effectiveness |
|-----------|----------|------|---------------|
| Hero Primary | 1 (required) | All | High |
| Floating Sticky | 2 | Groei+ | Medium-High |
| Section End | 3 | All | Medium |
| Footer | 4 (required) | All | Low-Medium |
| Exit Intent | 5 | Pro | High |

**Footer Variations:**

| Type | Start | Groei | Pro | Description |
|------|-------|-------|-----|-------------|
| Minimal | ✓ | ✓ | ✓ | Links + copyright only |
| Multi-column | ✗ | ✓ | ✓ | Organized link sections |
| Newsletter | ✗ | ✓ | ✓ | Email capture focus |
| Full-featured | ✗ | ✗ | ✓ | Map, social, newsletter, links |

### 4.3 Anti-Monotony Rules

**Never use the same:**
- Hero layout for > 40% of sites in a month
- Section ordering for > 50% of sites
- Color palette for > 30% of same-industry sites
- CTA microcopy for > 60% of sites

**Variation Triggers:**
- If pattern detected > 5 times in 10 sites: Force variation
- If client industry already has 3 similar sites this month: Force different approach
- If inspiration database shows trending new pattern: Prioritize adoption

---

## 5. TIER DIFFERENTIATION SYSTEM

### 5.1 Visual Sophistication by Tier

**Start Tier Characteristics:**
- Single-page only
- Solid colors only (no gradients)
- Maximum 4 sections
- Basic typography scale
- Static images only
- Simple grid layouts (single column mobile, 2-col desktop)

**Groei Tier Characteristics:**
- Multi-page (up to 5)
- Subtle gradients allowed
- Up to 6 sections per page
- Full typography scale
- Image galleries/portfolios
- Complex grids (up to 3-col desktop)
- Basic animations (fade-in on scroll)

**Pro Tier Characteristics:**
- Multi-page (up to 10)
- Complex gradients and effects
- Unlimited sections
- Advanced typography (custom fonts)
- Full media support (video backgrounds)
- Complex layouts (asymmetric, overlapping)
- Advanced animations (parallax, micro-interactions)
- E-commerce integration (iDEAL)
- Multi-language support

### 5.2 Feature Differentiation

| Feature | Start | Groei | Pro |
|---------|-------|-------|-----|
| Pages | 1 | 5 | 10 |
| Gradients | ✗ | Simple | Complex |
| Animations | ✗ | Basic | Advanced |
| Gallery | ✗ | ✓ | ✓ |
| Reviews Section | ✗ | ✓ | ✓ |
| Booking System | ✗ | ✗ | ✓ |
| Multi-language | ✗ | ✗ | ✓ |
| E-commerce | ✗ | ✗ | ✓ |
| Video Background | ✗ | ✗ | ✓ |
| Custom Fonts | ✗ | ✗ | ✓ |

---

## 6. AUTONOMOUS EXECUTION SCHEDULE

### 6.1 Weekly Tasks (Every Sunday 02:00)

**Crawl Task:**
```javascript
// Pseudo-code for weekly inspiration crawl
task weeklyInspirationCrawl() {
  industries = ["restaurant", "salon", "trades", "retail", "health"];
  
  for (industry in industries) {
    sites = researchTopSites(industry, limit: 10);
    
    for (site in sites) {
      analysis = analyzeSite(site);
      storeInDatabase(analysis);
    }
  }
  
  generateTrendReport();
  suggestTemplateVariations();
}
```

**Outputs:**
- New inspiration database entries (up to 50/week)
- Weekly trend report
- Recommended pattern adoptions

### 6.2 Monthly Tasks (First Monday 03:00)

**Refinement Task:**
```javascript
task monthlySystemRefinement() {
  // Analyze generated sites
  sites = getSitesGeneratedThisMonth();
  patterns = detectPatterns(sites);
  monotony = detectMonotony(sites);
  
  // Update templates
  if (monotony.score > 0.6) {
    generateNewVariations();
  }
  
  // Update color system
  trendingColors = extractTrendingColors(inspirationDB);
  updateColorRecommendations(trendingColors);
  
  // Update protocol
  protocolVersion += 0.1;
  updateChangelog();
}
```

**Outputs:**
- Updated template variations
- Refreshed color recommendations
- Protocol version bump
- System improvement report

### 6.3 Quarterly Tasks (First of March, June, September, December)

**Overhaul Task:**
- Comprehensive design paradigm review
- Major template system updates
- New tier feature proposals
- Competitive analysis report
- Strategic direction recommendations

**Outputs:**
- Major protocol revision (v3.0, v4.0, etc.)
- New template blueprints
- Strategic roadmap
- Quarterly evolution report

---

## 7. QUALITY CHECKLIST (PRE-DELIVERY)

### 7.1 Design System Compliance

- [ ] No emojis in UI (verified)
- [ ] Icons from approved system only (Lucide/Heroicons/Tabler/Phosphor)
- [ ] Typography follows modular scale (1.25 ratio)
- [ ] Spacing follows 8px system
- [ ] Colors use token system (no hex codes inline)
- [ ] WCAG AA contrast validated
- [ ] Section padding meets minimums (80px desktop, 48px mobile)

### 7.2 Tier Compliance

- [ ] Start: No gradients, 1 page, 4 sections max
- [ ] Groei: Simple gradients only, 5 pages max
- [ ] Pro: Full feature set, complex effects allowed

### 7.3 Technical Quality

- [ ] All placeholders replaced
- [ ] Phone numbers click-to-call
- [ ] WhatsApp links functional
- [ ] Images < 200KB
- [ ] Meta description present
- [ ] Lighthouse Performance > 90
- [ ] No console errors

---

## 8. PHASE 6 — INDUSTRY BEHAVIOR INTELLIGENCE (CRITICAL)

### 8.1 Core Principle: Never Design on Assumptions

**Rule:** Before generating or refining ANY template, you MUST analyze how that specific industry actually behaves online. Research beats assumption. Always.

**Minimum Research Requirement:**
- Analyze at least **10 real Dutch websites** per industry
- Document patterns, standards, and outliers
- Identify what converts and what fails
- Update industry database before template creation

### 8.2 Industry Cluster Organization

**Priority Industries for Floatweb:**

| Industry | Tier Focus | Research Priority |
|----------|------------|-------------------|
| Restaurant / Cafe | Start/Groei | High |
| Kapper / Salon | Groei/Pro | High |
| Installatietechniek / Vakman | Start/Groei | High |
| Loodgieter | Start/Groei | Critical |
| Schoonheidssalon | Groei | Medium |
| Horeca algemeen | Start/Groei | Medium |
| Coach / ZZP dienstverlener | Start | Medium |
| Winkel / Retail | Groei | Low |

### 8.3 Industry Analysis Template

For each industry, research and document:

```json
{
  "industry": "restaurant",
  "sample_size": 12,
  "research_date": "2026-02-14",
  
  "common_navigation_structure": "Logo + Home + Menu + Over Ons + Contact",
  
  "homepage_structure": [
    "Hero with atmosphere image",
    "Short about/ambiance text",
    "Highlighted dishes (3-4 items)",
    "Opening hours",
    "Address + map",
    "Reservation CTA"
  ],
  
  "menu_strategy": "Separate menu page or PDF download. NOT full menu on homepage.",
  
  "booking_strategy": "Primary CTA: Reserveer tafel. Integration: Form, phone, or external (Resengo, etc.)",
  
  "pricing_strategy": "Often not shown on homepage. Visible on menu page.",
  
  "cta_patterns": [
    "Reserveer tafel (primary)",
    "Bekijk menu (secondary)",
    "Bel direct (tertiary)"
  ],
  
  "trust_elements": [
    "Reviews/testimonials",
    "Photos of interior",
    "Chef/team photos",
    "Awards or mentions"
  ],
  
  "gallery_usage": "Heavy use of food and interior photography. Instagram integration common.",
  
  "common_mistakes": [
    "Full text menu on homepage (clutter)",
    "No reservation method visible",
    "Missing opening hours",
    "PDF-only menu (not mobile-friendly)"
  ],
  
  "modern_trends": [
    "Online reservation integration",
    "Storytelling about ingredients",
    "Sustainability messaging",
    "Dietary options highlighted"
  ],
  
  "conversion_patterns": [
    "Large 'Reserveer' button in hero",
    "Click-to-call phone number",
    "WhatsApp booking option",
    "Limited-time offers"
  ]
}
```

### 8.4 Industry-Specific Rules (Documented)

#### RESTAURANT / CAFE

**Homepage Structure (Standard):**
1. Hero with atmosphere image + reservation CTA
2. Short intro (2-3 sentences max)
3. 3-4 highlighted dishes (image + name, no full menu)
4. Opening hours
5. Location/address
6. Final reservation CTA

**Menu Strategy:**
- NEVER full text menu on homepage
- Options: Separate page, downloadable PDF, or image-based highlights
- Mobile-friendly required (no PDF-only)

**Required Elements:**
- Opening hours (prominent)
- Address with map link
- Phone number (click-to-call)
- Reservation method
- Atmosphere photography

**CTA Priority:**
1. Reserveer tafel (primary)
2. Bekijk menu (secondary)
3. Bel direct (tertiary)

**Avoid:**
- Long service description blocks
- Full text menu on homepage
- Cluttered hero with too much text

---

#### KAPPER / SALON

**Homepage Structure (Standard):**
1. Hero with salon atmosphere + booking CTA
2. Service categories (not full price list)
3. Team introduction (trust building)
4. Before/after gallery or portfolio
5. Reviews/testimonials
6. Location + opening hours

**Services Strategy:**
- Categorized services (Dames, Heren, Kleuren, etc.)
- Pricing: vanaf-prijzen or full list (industry standard varies)
- Online booking integration (Groei/Pro tier)

**Required Elements:**
- Clear service categories
- Pricing visibility (even if 'vanaf')
- Online booking or phone booking
- Team photos (personal connection)
- Instagram integration (common)

**CTA Priority:**
1. Maak afspraak / Boek online (primary)
2. Bekijk prijzen (secondary)
3. Bel salon (tertiary)

**Trust Elements:**
- Customer reviews
- Before/after photos
- Brand/products used
- Certifications

---

#### INSTALLATIETECHNIEK / VAKMAN / LOODGIETER

**Homepage Structure (Standard):**
1. Hero with service area emphasis + phone CTA
2. Emergency service highlight (if applicable)
3. Service overview (categories, not details)
4. Service area/regions
5. Trust elements (certifications, years in business)
6. Contact form + phone

**Service Strategy:**
- Service categories (CV, Sanitair, Elektra, etc.)
- NOT detailed technical descriptions
- Focus on benefits, not features

**Required Elements:**
- Phone number DOMINANT (primary CTA)
- Service area clearly stated
- Emergency service mention (24/7 if applicable)
- Trust badges (KVK, certifications, garantie)
- Years in business

**CTA Priority:**
1. Bel direct (primary - phone)
2. Offerte aanvragen (secondary - form)
3. WhatsApp (tertiary)

**Trust Elements (Critical):**
- KVK number
- Certifications (Techniek Nederland, etc.)
- Garantie terms
- Years in business
- Local/regional presence
- Customer reviews

**Avoid:**
- Aesthetic-heavy design (credibility over beauty)
- Long technical descriptions
- No clear service area
- Missing phone number

---

#### COACH / ZZP DIENSTVERLENER

**Homepage Structure (Standard):**
1. Hero with personal photo + value proposition
2. Problem/solution framing
3. Services/packages
4. About/personal story
5. Testimonials
6. Contact/CTA

**Service Strategy:**
- Clear packages or session types
- Pricing: transparent or 'investering'
- Focus on transformation/results

**Required Elements:**
- Personal photo (face builds trust)
- Clear value proposition
- Methodology explanation (brief)
- Client results/testimonials
- Call booking or contact form

**CTA Priority:**
1. Plan kennismaking (primary)
2. Bekijk aanbod (secondary)
3. Stuur bericht (tertiary)

**Trust Elements:**
- Client testimonials
- Credentials/certifications
- Media mentions
- Personal story

---

### 8.5 Industry Rule Enforcement Process

**Before Generating Any Template:**

```
STEP 1: Check Industry Database
  ↓ Query: business/design-database/industries/{industry}.json
  ↓ If not exists or outdated (>30 days): Trigger research

STEP 2: Apply Industry-Specific Structure Rules
  ↓ Use documented homepage_structure
  ↓ Apply documented CTA patterns
  ↓ Include required trust elements

STEP 3: Apply Tier Complexity Rules
  ↓ Start: Simplified industry structure
  ↓ Groei: Full industry structure
  ↓ Pro: Full structure + advanced features

STEP 4: Apply Modern Design System
  ↓ Color tokens
  ↓ Typography scale
  ↓ Spacing system
  ↓ Icon system

STEP 5: Apply Conversion Strategy
  ↓ Industry-specific CTAs
  ↓ Trust element placement
  ↓ Mobile optimization
```

**Template Formula:**
```
Final Template = Industry Behavior Patterns
                + Tier Complexity Level
                + Modern Design System
                + Conversion Strategy
```

### 8.6 Autonomous Industry Research Schedule

**Weekly:**
- Analyze 2-3 new websites per priority industry
- Update industry database entries
- Detect new patterns or shifting standards
- Flag outdated template elements

**Monthly:**
- Comprehensive industry review
- Refactor templates if standards shifted
- Update industry-specific rules
- Generate industry trend report

**Quarterly:**
- Full industry landscape analysis
- Add new industries if needed
- Archive outdated patterns
- Update template blueprints

### 8.7 Industry Database Structure

**Storage:** `business/design-database/industries/{industry-name}.json`

**Required Fields:**
- `industry` (string)
- `sample_size` (number)
- `research_date` (ISO date)
- `common_navigation_structure` (string)
- `homepage_structure` (array)
- `menu_strategy` (string)
- `booking_strategy` (string)
- `pricing_strategy` (string)
- `cta_patterns` (array)
- `trust_elements` (array)
- `gallery_usage` (string)
- `common_mistakes` (array)
- `modern_trends` (array)
- `conversion_patterns` (array)
- `example_sites` (array of analyzed sites)

---

## 9. VERSION HISTORY

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2026-02-14 | Initial protocol | ChiefOperator |
| 1.1 | 2026-02-14 | Added floatweb tiers, intake form | ChiefOperator |
| 2.0 | 2026-02-14 | **MAJOR**: Design Evolution Engine, Hard Rules, Color System, Inspiration DB, Autonomous Schedule | Design Evolution Engine |

---

## 9. NEXT ACTIONS (Immediate)

1. **Replace existing templates** with v2.0 compliant versions
2. **Build inspiration database** with initial crawl
3. **Set up automated cron jobs** for weekly/monthly/quarterly tasks
4. **Create icon sprite sheet** (Lucide icons, all common actions)
5. **Build contrast validator** tool for automated checks

---

**System Status:** OPERATIONAL  
**Next Evolution Cycle:** 2026-03-01 (Monthly Refinement)  
**Next Major Overhaul:** 2026-06-01 (Q2 Overhaul)

---

**Design Evolution Engine v2.0 — Autonomous Operation Enabled**
