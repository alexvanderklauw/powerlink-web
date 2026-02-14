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
