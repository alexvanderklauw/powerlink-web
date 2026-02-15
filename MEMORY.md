# Long-Term Memory

## Web Development

### Preloading Responsive Images (2025)
- Use `<link rel="preload" as="image" imagesrcset="..." imagesizes="...">` in `<head>` to start loading hero/LCP images before HTML parser discovers them.
- Combine with `fetchpriority="high"` on the actual `<img>` tag to signal browser priority.
- Critical for slideshows, dynamic galleries, and CSS background-images loaded via image-set.
- Eliminates unnecessary delays between HTML download and image discovery, improving LCP by 100-500ms.
- Always pair with responsive srcset to serve correctly-sized images for each device.

### Core Web Vitals (2025)
- INP (Interaction to Next Paint) replaced FID — measures responsiveness to ALL interactions, not just first input. Target: <200ms.
- LCP (Largest Contentful Paint) — target <2.5s by optimizing images, server response, and render-blocking resources.
- CLS (Cumulative Layout Shift) — target <0.1 by reserving space for dynamic content and avoiding late-loading assets.
- Key optimization: Preload hero images, use modern formats (WebP/AVIF), defer non-critical JS.
- Single-page sites benefit from minimal JS — vanilla JS + CSS often outperforms frameworks for simple sites.

### CSS Container Queries (2025)
- Use `@container` instead of `@media` for component-level responsive behavior — components adapt to their container, not the viewport.
- Define `container-type: inline-size` on the parent element to establish a containment context.
- Essential for reusable components in design systems that appear in multiple layouts (sidebar, full-width, grid cells).
- 95%+ browser support; progressive enhancement with `@supports` or graceful degradation.
- Makes components truly portable — drop them anywhere and they just work.

### CSS :has() Parent Selector (2025)
- Style parent elements based on child content without JavaScript — e.g., `.card:has(img)` for image-containing cards.
- Reduces JS dependency for conditional styling; declarative CSS beats imperative DOM manipulation.
- 96%+ browser support; safe fallback with `@supports selector(:has(*))`.
- Combine with container queries for truly adaptive components that respond to both structure and size.

### Web Vitals Priority (2025)
- INP + LCP are the SEO-critical metrics; INP measures all interactions (not just first), LCP tracks largest content render.
- Preloading responsive hero images is the highest-impact LCP optimization — eliminates parser-discovery delays.
- Vanilla JS single-page sites have inherent INP advantages over framework-heavy architectures.

### View Transitions API (2025)
- Native browser API for smooth transitions between page states (SPAs) and cross-document navigations (MPAs).
- Reduces cognitive load and perceived loading latency by animating between views instead of hard cuts.
- Opt-in via CSS `@view-transition { navigation: auto; }` for MPAs or `document.startViewTransition()` for SPAs.
- Use `view-transition-name` CSS property on elements to animate them individually between states.
- ~85% browser support (Chrome/Edge); progressive enhancement — unsupported browsers get standard navigation.

### Accessibility-First Development (2025)
- EU Accessibility Act mandates WCAG 2.2 AA compliance by June 2025 for digital services.
- Accessibility improves SEO and conversion rates (15-35% lift) via curb-cut effect.
- Test every site with keyboard-only navigation before delivery; focus indicators must be visible.

## Sales - Micro-Commitment Tactics (Feb 2026)
- **Tactic:** Future-pace intake questions get prospects envisioning success before discussing logistics.
- **Tactic:** Choice close (2 specific times) beats open-ended scheduling — removes cognitive load.
- **Tactic:** Risk reversal (pay after live) + specific ROI (480 searches/mo × 2% = 10 customers/yr) handles "too expensive."
- **Key insight:** Ask for tiny yes (info curiosity) → specific when → close. Don't ask for the sale first.
- **Draft updated:** `/business/sales-improvements/2025-02-15-micro-commitment-updates.md` — awaiting Chief approval.

## Decision Autonomy Framework (Feb 2026)
Operating framework for autonomous vs. escalated decisions.

### 🟢 Green Zone: Act → Report
Execute without pre-approval, report in batch or summary.
- WhatsApp outreach messages and follow-ups
- Template CSS/HTML tweaks (<2 hours)
- Scheduling meetings (offer specific times)
- File organization and documentation
- Minor copy edits and content updates
- Routine customer status updates

### 🟡 Yellow Zone: Act → Notify
Execute but notify immediately after with rationale.
- Pricing experiments (A/B tests on quotes)
- New service offerings (up to €25 setup cost)
- Vendor/tool trials (free tier only)
- Template overhauls (2-4 hours work)
- Customer timeline adjustments
- **Limit:** Max 2 hours work or €25 impact

### 🔴 Red Zone: Ask First
Explicit approval required before action.
- Strategic direction changes (target market, service focus)
- Pricing model changes (base rates, tiers)
- Customer disputes, refunds, or credit
- Public posts, testimonials, case studies
- Brand-affecting decisions (naming, positioning)
- Anything irreversible or legally binding
- Any spend requiring actual payment (I propose, Chief pays)
- **Website changes (branding, hero, copy):** ALWAYS ask before pushing to production
- **Customer website changes:** ALWAYS ask before pushing live

### 🟡 Yellow Zone: Act → Notify
Execute but notify immediately after with rationale.
- Pricing experiments (A/B tests on quotes)
- New service offerings (up to €25 setup cost)
- Vendor/tool trials (free tier only)
- Template overhauls (2-4 hours work)
- Customer timeline adjustments
- **Limit:** Max 2 hours work or €25 impact

### 🔴 Red Zone: Ask First
Explicit approval required before action.
- Strategic direction changes (target market, service focus)
- Pricing model changes (base rates, tiers)
- Customer disputes, refunds, or credit
- Public posts, testimonials, case studies
- Brand-affecting decisions (naming, positioning)
- Anything irreversible or legally binding
- Any spend requiring actual payment (I propose, Chief pays)

### Key Principle
When uncertain, bias toward Green. Better to apologize for a minor overreach than create a bottleneck on revenue-generating work.

## Payment & Purchase Rules (Feb 2026)

### Propose, Don't Purchase
I research, compare, recommend. You click "buy." I never have payment control.
- **Applies to:** Domains, tools, templates, ads, software, refunds, any spend
- **Process:** I send purchase link with rationale → You approve & pay
- **No exceptions:** Even €5 purchases require your click

### 24-Hour Yellow Window
Yellow zone actions proceed unless stopped within 24 hours.
- **Why:** Prevents bottlenecks on time-sensitive experiments
- **Notification:** Immediate message with "Proceeding in 24hrs unless you stop me"
- **Override:** Reply "STOP" or "Wait" and I halt immediately
- **Applies to:** Pricing tests, new service offerings, template overhauls, vendor trials

### Edge Case Quick Reference
| Scenario | Zone | Rationale |
|----------|------|-----------|
| Auto-post positive review | 🟡 Yellow | Reputation is irreversible |
| Quote custom €400 project | 🟡 Yellow | Outside standard pricing |
| Respond to customer complaint | 🟡 Yellow | Customer relationship risk |
| Pause outreach for 2 days | 🟡 Yellow | Revenue impact, reversible |
| Create new service (e.g., logos) | 🟡 Yellow | New offering, test first |
| Purchase €80 template | 🔴 Propose → You pay | Requires actual payment |
