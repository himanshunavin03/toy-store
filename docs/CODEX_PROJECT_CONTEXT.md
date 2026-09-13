# Kids Gear Shop - Codex Project Context

This is the persistent project memory and handoff document. Future Codex sessions must read it before making repository changes. Update it whenever a meaningful implementation, architecture decision, Wix API integration, CMS/data change, or milestone is completed. Keep confirmed repository facts separate from Wix-site assumptions, and refresh the Session Handoff section at the end of each such task.

## Project Overview

- Project: Kids Gear Shop, a Wix Studio e-commerce site.
- Repository: https://github.com/himanshunavin03/toy-store
- Development workflow: Wix Studio + Wix CLI + GitHub + VS Code + Codex.
- Primary local development command: `wix dev` (also available as `npm run dev`).
- Local repository path at initial analysis: `C:\Users\himan\OneDrive\Desktop\Toy-Store\toy-store`.
- Wix site ID in `wix.config.json`: `b50d135b-16b5-440e-b168-47db49424421`; `uiVersion` is `2`.

## Current Architecture

This is a Wix Git Integration & Wix CLI repository for Velo site code, not a standalone React storefront. The checked-in application surface is page-level JavaScript under `src/pages`, shared page code in `masterPage.js`, optional backend/public code folders, and Wix CLI configuration. The visual page structure, embedded app widgets, widget configuration, and store data are not represented as editable application source here.

The only executable statement in each page-code file is an empty `$w.onReady()` callback. There are no application imports, exports, API calls, event handlers, data queries, or calls between page, public, and backend modules. Wix-generated, ignored `.wix/types/` declarations list editor elements and provide limited evidence of the site design. They are generated local metadata, not proof of configured or working live behavior.

Observed source path:

```text
Wix page or embedded widget
  -> matching src/pages/*.js / masterPage.js
  -> empty $w.onReady()
  -> no custom public/backend module
  -> no Wix Stores, eCommerce, Members, or CMS API call in repository code
```

Wix-managed widget behavior may run independently of these empty callbacks. Its data flow and runtime result cannot be traced from the repository.

## Current Application State

- Sixteen named page-code files and one `masterPage.js` exist. All 17 are identical 10-line Wix starter stubs; none implements custom Velo behavior.
- Generated element declarations identify a category-page iframe, cart and checkout iframes, side-cart and success-popup iframes/controllers, a thank-you iframe, wishlist and order-history iframes, and shared cart/member/navigation elements.
- Home has generated declarations for two repeaters, a gallery iframe, images, text, and a button. Their content, links, and editor bindings are unknown.
- The Product Page declaration identifies a slider-gallery iframe but does not establish product data binding, options, pricing, or add-to-cart behavior.
- No custom backend or public modules exist. `src/backend/permissions.json` has an allow-all wildcard default for anonymous visitors, site members, and owners; currently there are no web methods to invoke.
- No custom SDK/API integration, CMS collection declaration, dataset ID, catalog record, product ID, or order-handling code is checked in.
- The presence of widget elements is evidence of a Wix-managed UI surface, not evidence that checkout or any other commerce operation currently works.

## AnH Vibes Product Vision & Requirements

**Target, not current state:** Rebrand and develop this Wix Studio store as **AnH Vibes**, a modern, responsive shop for kids' gear, toys, school essentials, gifts, and ladies handbags. The desired implementation uses Wix Stores/eCommerce with Velo and applicable Wix APIs while preserving working Wix-managed commerce. None of the taxonomy, branding, assets, or new features below is confirmed to exist in the connected Wix site yet.

### Reference and originality boundary

[Harsh Stores](https://harshstores.com/) is a functional, information-architecture, merchandising, and user-experience reference only. Its observed homepage uses category entry points, product and campaign sections, theme merchandising, testimonials, and newsletter/footer areas; a [collection page](https://harshstores.com/collections/bags-for-kids) exposes availability/price filters and sorting; a [product page](https://harshstores.com/products/unicorn-backpackmagical-unicorn-kids-backpack-holographic-ra) shows product detail and gifting information. These observations do not establish what the Wix site supports. Do not copy its images, logo, text, product content, brand styling, promotional assets, or page layouts pixel-for-pixel. AnH Vibes needs original branding, logo, palette, typography, photography/illustrations, banners, animations, product copy, and UI styling. Use properly licensed or original product imagery; use licensed character/franchise material only with the rights to do so.

### Catalog information architecture

The desired browse model is **main category -> subcategory**, plus an independent, cross-category **Shop By Theme** dimension. A product should be discoverable from its relevant subcategory and from one or more themes without duplicate product records; for example, a Unicorn School Bag could appear under `School Bags > Girls Bags` and `Shop By Theme > Unicorn`. The taxonomy must remain editable and extensible. Decide the actual Wix catalog/CMS representation only after checking the installed catalog model, current records, widget support, and relevant APIs; do not assume nested store categories or multi-assignment work a particular way.

| Main category | Initial subcategories |
| --- | --- |
| School Bags | Preschool Bags; Boys Bags; Girls Bags; Character Bags; Trolley Bags; Backpack Sets |
| Ladies Handbags | Handbags; Sling Bags; Tote Bags; Wallets; Clutches |
| Soft Toys | Teddy Bears; Animal Plush; Character Plush; Large Soft Toys; Mini Soft Toys |
| Bottles | Kids Bottles; Insulated Bottles; Steel Bottles; Sippers; Character Bottles |
| Stationery | Pencil Cases; Pens & Pencils; Art Sets; School Sets; Diaries & Notebooks |
| Gift Items | Birthday Gifts; Return Gifts; Gifts for Girls; Gifts for Boys; Gift Sets |
| Lunch Boxes | Bento Lunch Boxes; Steel Lunch Boxes; Compartment Lunch Boxes; Character Lunch Boxes; Lunch Sets |

Initial themes: **Unicorn, Princess, Space, Dino, Superhero, Kawaii / Cute, Sports**. Theme names describe merchandising concepts; visual treatments and product content must be original or properly licensed.

### Homepage and shared storefront requirements

Plan a cohesive homepage with approximately these elements, grouping or simplifying them responsively rather than forcing all sections above the fold:

1. Announcement/promotional bar; AnH Vibes header and original logo.
2. Search, account, wishlist, cart, and responsive main navigation/mega menu.
3. Animated hero/banner with a clear shopping action.
4. Shop By Category and New Arrivals.
5. Shop By Theme and a Back To School campaign section.
6. Trending Products, Best Sellers, and a Gift section.
7. A selected promotional animated/GIF-style banner and Special Offers.
8. Authentic customer reviews/testimonials, newsletter/social section, and a full e-commerce footer.

Merchandising labels such as New Arrivals, Best Sellers, Trending, and Special Offers need explicit, maintainable selection rules and available product data. Do not publish fabricated testimonials or unsupported offers.

### Product, discovery, and gifting requirements

- Product detail: multi-image gallery; current and original/sale price where applicable; variants/options; stock/availability; description; specifications/features; category/subcategory and theme context; add to cart; buy now where appropriate; wishlist; related and recommended products.
- Discovery: search, category/subcategory and theme browsing, filtering, sorting, New Arrivals, Best Sellers, Trending, and Special Offers.
- Gift experience: gift wrapping, optional gift message, gift recommendations, and birthday/return-gift collections. Define how gift choices and message reach the order and fulfillment workflow before implementing them.
- Preserve Wix-managed cart, checkout, member, and order behavior when it meets the requirement. Validate any proposed customization against actual widget/API capabilities first.

### Design and asset principles

The store should feel modern, premium, colorful, playful, family friendly, and clean. Its visual language must work for both children's products and ladies handbags. Design desktop and mobile together, with legible type, accessible contrast and controls, clear product information, and fast image/media loading. Use animation strategically in the main hero, campaigns, and selected category/theme moments; provide a reduced-motion-friendly experience and avoid performance-heavy motion throughout the page.

Create or properly license an original AnH Vibes logo, hero banners, category graphics, theme graphics, promotional graphics, selected GIF/animated/video-style assets, product imagery where appropriate, and any needed icons. Asset generation/sourcing and Wix media integration are separate future tasks. No Harsh Stores asset is approved for reuse.

## Pages

Each page listed below has only the empty starter callback. Responsibilities are indicated by page names and, where noted, generated element types; actual live settings need inspection.

| Page file | Discoverable role / element evidence |
| --- | --- |
| `Home.c1dmp.js` | Home/landing page; two repeaters and a grid-gallery iframe appear in generated types. |
| `Category Page.pdx15.js` | Category browsing; `#categoryPage1` iframe. |
| `Product Page.lrp4k.js` | Product-detail destination by name; `#sliderGallery1` iframe is the only product-adjacent element identified by generated types. |
| `Cart Page.v8jzb.js` | Cart destination; `#shoppingCart1` iframe. |
| `Checkout.rclo9.js` | Checkout destination; `#checkout1` iframe. |
| `Thank You Page.v71nm.js` | Post-checkout destination; `#thankYouPage1` iframe. |
| `Side Cart.c8ueu.js` | Cart lightbox; `#sideCart1` iframe and `#sideCartLightboxController1`. |
| `Success Popup.iyh1p.js` | Success lightbox; `#successPopup1` iframe and `#successPopupLightboxController1`. |
| `My Wishlist.q1hpw.js` | Member wishlist area; `#wishlist1` iframe. |
| `My Orders.vrcvv.js` | Member order-history area; `#orderHistory1` iframe. |
| `Account Settings.foxut.js` | Member account area; three iframe elements with opaque numeric IDs. |
| `Privacy Policy.s0709.js` | Policy page; displayed copy is not in page code. |
| `Refund Policy.fu5wu.js` | Policy page; displayed copy is not in page code. |
| `Shipping Policy.qhhyn.js` | Policy page; displayed copy is not in page code. |
| `Terms & Conditions.lr953.js` | Policy page; displayed copy is not in page code. |
| `Accessibility Statement.t3gbt.js` | Accessibility page; displayed copy is not in page code. |
| `masterPage.js` | Shared page code; generated types show horizontal and hamburger menus, cart icon iframe, two member-login widgets, account navigation bars, and a Wix Forms V2 element. |

## E-Commerce Flow

The discoverable page/widget sequence is **Category -> Product -> Cart -> Checkout -> Thank You / Orders**. This is an inventory of destinations and elements, not a verified working transaction:

1. **Category:** `Category Page` includes a Wix-managed-looking category iframe. Category records, filters, item links, and collection mapping are not in source.
2. **Product:** `Product Page` exists and has a slider-gallery iframe. The repository does not show how a product is selected, displayed, priced, configured, or added to cart.
3. **Cart:** `Cart Page`, `Side Cart`, and the shared cart icon have corresponding generated iframe/controller elements. No cart mutation or cart-state code exists in Velo source.
4. **Checkout:** `Checkout` includes a generated checkout iframe. Payment, tax, shipping, customer capture, checkout creation, and placement behavior are not visible in source.
5. **After checkout / account:** `Thank You Page` and `My Orders` include thank-you and order-history iframe elements. No order query, event handler, or post-purchase custom code exists.

Wix-managed widgets may supply parts or all of this flow outside repository code. Verify page links, widget setup, product availability, and an end-to-end preview before treating the sequence as operational.

## Code Structure

| Path | Purpose and current contents |
| --- | --- |
| `src/pages/` | Sixteen page Velo JavaScript files, `masterPage.js`, and a Wix-generated explanatory README. Page filenames contain Wix internal IDs; keep names intact so Wix associates code with the intended page. The README says new pages are created in the Wix editor and synced to the IDE. |
| `src/pages/masterPage.js` | Shared/global page callback; currently empty. Shared UI elements are only visible through generated types. |
| `src/backend/` | README and `permissions.json` only. No `.js`, `.jsw`, `.web.js`, data hooks, routers, event handlers, HTTP functions, or jobs are present. |
| `src/public/` | README only; no shared frontend modules. |
| `wix.config.json` | Wix site ID and UI version. |
| `package.json` | Wix CLI development scripts and development dependencies. Scripts: `postinstall: wix sync-types`, `dev: wix dev`, `lint: eslint .`. No application runtime dependencies are declared. |
| `.eslintrc.json` | Extends `plugin:@wix/cli/recommended`. |
| `wix.lock` | Tracked, generated Wix/Yarn dependency state; not application behavior. |
| `.wix/types/` and `jsconfig.json` | Ignored, locally generated Wix typings and page element maps. `jsconfig.json` references those local types. |
| `package-lock.json` | Local, untracked npm lockfile present before this document was created. Do not silently treat it as part of the initial commit. |

Direct development dependencies declared in `package.json`: `@wix/cli` (`^1.0.0`), `@wix/eslint-plugin-cli` (`^1.0.0`), `eslint` (`^8.25.0`), and `react` (`16.14.0`). The local untracked npm lockfile resolves them to `1.1.245`, `1.0.2`, `8.57.1`, and `16.14.0`, respectively. React's presence does not mean a React storefront is implemented.

## Data / CMS

No custom CMS collection schemas, dataset IDs, collection references, `wix-data` imports, data hooks, data queries, or seed files appear in tracked source. Home-page repeaters and policy-page repeaters appear in generated element declarations, but their data sources and bindings are not recorded here. Product and category records, images, prices, inventory, policy content, member records, and orders are not contained in this repository. Inspect the Wix site's CMS and store administration to determine whether they exist and how they are connected to pages.

## Wix Stores / eCommerce

The generated local type maps identify these store-adjacent elements: `#categoryPage1`, `#sliderGallery1`, `#shoppingCart1`, `#sideCart1`, `#sideCartLightboxController1`, `#successPopup1`, `#successPopupLightboxController1`, `#checkout1`, `#thankYouPage1`, `#wishlist1`, `#orderHistory1`, and the shared `#shoppingCartIcon1`. Member login widgets and account navigation bars also appear in `masterPage` types. These are Wix editor/widget element IDs; generic Wix SDK type definitions installed under `.wix/types/wix-code-types/` are not application integrations.

No source file imports `wix-stores`, `wix-ecom`, Wix SDK packages, `wix-members`, or `wix-data`. Determine in Wix Studio/site administration which commerce apps and widgets are installed, how category and product pages are configured, whether the cart/checkout are operational, and what permissions/API access the site supports. Do not infer a particular Wix API capability or live store state from the installed typings alone.

## Codex Control Matrix

“Wix API” indicates a possible integration surface to investigate, **not an API currently used or verified for this site**. “Wix Studio” refers to editor/widget configuration or inspection; catalog and transaction administration may also live in the Wix dashboard.

| Feature | Direct Code | Wix API | Wix Studio | Current Status | Notes |
| --- | --- | --- | --- | --- | --- |
| Navigation | Velo handlers/links in `masterPage.js` can be added | Investigate if needed | Inspect/edit actual menu items, links, responsive layout | Shared menu elements detected; no code | Destinations and behavior unknown. |
| Categories | Custom page logic can be added | Investigate catalog access | Inspect category widget and page setup | Category iframe detected | Category records and links unknown. |
| Products | Custom display/logic can be added | Investigate catalog access | Inspect product/store setup | Product page exists; no product logic | No products or IDs in repo. |
| Product Images | Code can render known image data | Investigate media/catalog access | Inspect gallery and store media | Gallery iframe detected | Assets and bindings unknown. |
| Prices | Code can display returned prices | Investigate pricing APIs and permissions | Inspect store pricing settings | No price code/data | Do not duplicate a working Wix price source. |
| Variants | Code can handle selections if needed | Investigate catalog/cart APIs | Inspect product options UI | Not evidenced in source | Option model and inventory relationship unknown. |
| Inventory | Backend logic could react to supported events | Investigate inventory APIs | Inspect store inventory settings | No inventory code/data | Source of truth unknown. |
| Product Page | Existing page Velo file can be edited | Investigate product data/cart calls | Inspect page design and widgets | Empty page code; gallery iframe | Product widget/binding not established by types. |
| Search | Custom UI/logic could be added | Investigate search/catalog APIs | Inspect whether a search widget exists | No search implementation detected | Live editor may contain untyped behavior. |
| Filters | Custom UI/logic could be added | Investigate catalog query APIs | Inspect category widget settings | No filter code detected | Widget may provide built-in filters. |
| Cart | Velo interactions could be added | Investigate cart APIs | Inspect cart/side-cart widgets | Cart iframe and lightbox detected; no custom code | Runtime behavior unverified. |
| Checkout | Custom handoff/logic may be possible | Investigate checkout APIs | Inspect checkout, payment, shipping, tax setup | Checkout iframe detected; no custom code | Do not replace Wix checkout without a concrete reason. |
| Members | Velo UI/handlers could be added | Investigate Members APIs | Inspect login/account widgets and permissions | Login/account elements detected | Authentication behavior unverified. |
| Wishlist | Page code could augment UI | Investigate wishlist/member APIs | Inspect wishlist widget | Wishlist iframe detected | Storage and membership rules unknown. |
| Orders | Backend/page logic could be added | Investigate orders APIs/events | Inspect order-history widget and dashboard | Order-history iframe detected; no custom code | Order records and access rules unknown. |
| CMS | Velo queries/hooks could be added | Investigate Wix Data/CMS APIs | Inspect collections, permissions, bindings | No CMS code/schema found | Editor-only bindings may exist. |
| Backend APIs | Backend modules/endpoints can be added | Backend code can call authorized Wix APIs | Inspect secrets/site settings as required | No backend implementation | Review wildcard permissions before exposing methods. |

## Architecture Decisions

1. **Primary coding workflow:** VS Code + Codex, with GitHub and Wix CLI; use `wix dev` for local Wix development.
2. **Implementation preference:** Prefer code and Wix APIs where the needed behavior is actually supported and authorized for this site. Verify the relevant API and existing widget behavior first.
3. **Editor boundary:** Use Wix Studio manually for visual/editor configuration and functionality not exposed through repository code or a suitable API. Use Wix site administration where store/CMS settings live.
4. **Commerce preservation:** Do not replace working Wix-managed commerce functionality without a specific, justified reason.
5. **Evidence discipline:** Treat page names and generated element IDs as design clues. Confirm live behavior, data, and bindings before making architecture claims or changes.
6. **Handoff upkeep:** Read this file before future repository changes and update it after meaningful work. Do not rename existing Wix page-code files casually; their names map to pages.
7. **Target identity:** AnH Vibes is the intended brand; “Kids Gear Shop” remains this document's original project heading until a deliberate repository/document rename. The reference store informs structure and usability, never asset or copy reuse.
8. **Taxonomy decision pending:** Main categories, subcategories, and themes are product requirements. Their Wix Stores/CMS representation remains an architecture decision to make after inspecting actual site data and supported APIs.

## Work Completed

1. **Repository application-understanding analysis (2026-09-13):** Inspected tracked structure, all page code, backend/public folders, package and Wix configuration, local generated element maps, npm dependency state, Git branch/status/history, and the discoverable Category-to-Orders path. Identified that custom Velo logic is empty and that Wix-managed commerce behavior requires editor/runtime verification.
2. **Persistent context document (2026-09-13):** Created this handoff file only; no application code or store functionality was changed.
3. **AnH Vibes product-definition milestone (2026-09-13):** Recorded original-brand requirements, taxonomy, theme model, homepage/product/gift/asset direction, and a phased implementation backlog. This was documentation only; no Wix data or application functionality was changed.

## Current Task

AnH Vibes product definition and architecture/data discovery. The vision and backlog are documented. Wix Studio/site configuration inspection and runtime flow verification have not yet been performed; no store implementation has begun.

## Next Steps

Ordered implementation backlog and proposed phases below. **CODE**, **WIX API**, **WIX STUDIO**, and **ASSET GENERATION** identify likely work surfaces to evaluate, not confirmed Wix API access or authorization. Wix dashboard/store administration is included under **WIX STUDIO** for planning purposes. Each phase should finish with evidence recorded in this document before dependent work proceeds.

| Phase | Control surfaces | Planned outcome and dependency |
| --- | --- | --- |
| 1. Architecture/data planning | CODE + WIX API + WIX STUDIO | Inspect site/widgets, catalog/CMS, permissions, URLs, current transactions, and `wix dev` preview. Validate available APIs. Decide the source of truth for categories, subcategories, themes, merchandising flags, specifications, gift metadata, and the product-to-theme relationship. Document model and IDs before migration/population. |
| 2. Branding/design system | WIX STUDIO + ASSET GENERATION + CODE | Create original logo, palette, typography, spacing, components, tone of voice, and accessible responsive patterns; record design tokens and how they are applied in Studio versus Velo. |
| 3. Navigation | CODE + WIX API + WIX STUDIO | Configure the header, category/subcategory and theme destinations, search/account/wishlist/cart access, responsive menu, and footer links. Use code/API only where site menu behavior supports it; verify routes and mobile usability. |
| 4. Categories/subcategories | WIX API + WIX STUDIO + CODE | Establish the seven main categories and initial subcategories in the chosen catalog model; validate hierarchy or equivalent navigation, stable slugs/URLs, and extensibility. No catalog mutation before phase 1's data-model decision. |
| 5. Images/assets | ASSET GENERATION + WIX STUDIO + WIX API | Produce or license brand, category, theme, hero, campaign, icon, animation, and product assets; document ownership, alt text, crop ratios, file budgets, and Wix media integration. Do not reuse reference-site assets. |
| 6. Product/catalog population | WIX API + WIX STUDIO + CODE | Prepare a validated product import/edit workflow for original titles/copy, category/theme assignments, image sets, prices, variants, stock, specifications, and merchandising fields. Populate only after permissions, content, and data model are approved. |
| 7. Homepage | CODE + WIX API + WIX STUDIO + ASSET GENERATION | Build the planned header, hero, category/theme entry points, product campaigns, gift and offers sections, authentic reviews, newsletter/social area, and footer. Use maintainable selection rules and performance-conscious motion. |
| 8. Product experience | CODE + WIX API + WIX STUDIO | Validate Wix's existing product page first; fill verified gaps in gallery, options, pricing, availability, description/specifications, related/recommended products, wishlist, and add-to-cart/buy-now behavior. |
| 9. Search/filter | CODE + WIX API + WIX STUDIO | Establish product search, category/theme/availability/price filters as supported, sorting, empty states, and mobile filter UX. Prefer existing capable Wix widgets where they meet the requirements. |
| 10. Cart/checkout | CODE + WIX API + WIX STUDIO | Verify existing cart, side cart, checkout, shipping, tax, payment, and order handoff; customize only confirmed gaps without duplicating Wix-managed transaction logic. |
| 11. Members/wishlist | CODE + WIX API + WIX STUDIO | Verify sign-in, account, wishlist, order-history access, privacy, and guest/member behavior; add only needed integrations. |
| 12. Gift functionality | CODE + WIX API + WIX STUDIO + ASSET GENERATION | Design gift-wrap choice, gift message persistence to the order/fulfillment view, gift recommendations, birthday/return-gift merchandising, and original gift graphics. |
| 13. Responsive/mobile | CODE + WIX STUDIO + ASSET GENERATION | Audit every page and widget at common widths; refine menu, cards, gallery, filters, forms, checkout, image crops, touch targets, and reduced-motion/performance behavior. |
| 14. SEO | CODE + WIX API + WIX STUDIO | Define original titles/descriptions, category/product URL strategy, structured data where supported, image alt text, indexability, redirects, and sitemap behavior; check Wix's existing SEO controls before adding code. |
| 15. Testing | CODE + WIX STUDIO | Test taxonomy navigation, search/filter/sort, product options, inventory states, cart, checkout preview, member/wishlist, order display, gift metadata, accessibility, performance, and desktop/mobile behavior. Use sandbox/test payment settings where available; do not make an unapproved paid purchase. |
| 16. Production readiness | CODE + WIX API + WIX STUDIO | Review permissions and secrets, catalog/content accuracy, store policies, payment/shipping/tax setup, analytics, legal copy, backup/rollback steps, publish workflow, and monitoring. Obtain a final site-owner review before release. |

Phase 1 is the immediate next action. The exact split of CODE, WIX API, and WIX STUDIO can change after site/API inspection; update the matrix and this backlog when it does.

## Known Issues / Unknowns

- Whether the live/preview site and its category, product, cart, checkout, thank-you, wishlist, and order-history widgets work end to end.
- Which Wix commerce and member apps are installed, and the widgets' actual configuration, capabilities, and versions.
- Actual page URLs, menu items, link destinations, responsive behavior, and any editor-set interactions.
- Product catalog contents, category/collection relationships, product images, prices, options/variants, and inventory.
- Whether product details have a functional product widget or editor binding beyond the gallery element visible in local types.
- Search/filter UI and behavior; neither is implemented in repository code.
- Cart persistence, checkout/payment providers, shipping, taxes, fulfillment, order creation, and post-purchase behavior.
- Authentication/member permissions, account settings, wishlist storage, order-history access, and customer records.
- CMS collections, schemas, permissions, data bindings, and contents, if any.
- Copy/content of policy and accessibility pages, as well as Wix Forms V2 configuration and submission destination.
- Availability and authorization of specific Wix APIs for future changes; generic type declarations do not answer this.
- Whether the local ignored `.wix/types/` metadata exactly matches the latest published site design.
- Which Wix catalog representation can maintain main categories, subcategories, and cross-category themes without duplicate products; whether a CMS mapping is needed.
- Merchandising rules and data sources for New Arrivals, Trending, Best Sellers, and Special Offers; gift-option persistence through checkout and fulfillment.
- AnH Vibes launch market, currency, languages, shipping regions, tax and return policies, and payment providers. Do not inherit the reference site's geography or commercial terms.
- Whether any existing products or media can be used with documented ownership/licensing, and which original assets must be created.
- Whether customer testimonials exist and can be published with permission; newsletter consent and delivery workflow are also unknown.
- `package-lock.json` is now tracked in Git, although it was untracked at the initial analysis; the commit that added it has not been audited for purpose.
- No runtime test or live-site audit has been performed, and this repository has no application tests.

## Session Handoff

- **Last completed task:** Documented the AnH Vibes product vision and phased implementation backlog in this context file.
- **Current task:** Product definition and architecture/data discovery; the immediate next phase is Wix Studio/site inspection and preview verification.
- **Current branch:** `main`, tracking `origin/main`.
- **Git status:** `docs/CODEX_PROJECT_CONTEXT.md` modified; no other working-tree changes at the end of this documentation task. No commit or push made by Codex.
- **Last commit:** `fe9479e` — “add” (2026-09-13 11:40:59 -0600). The branch has two commits after the initial repository analysis; both the context file and `package-lock.json` are tracked as of this task.
- **Files changed in this task:** Updated `docs/CODEX_PROJECT_CONTEXT.md` only.
- **Validation performed:** Re-read the context document; inspected the supplied requirements and the public reference homepage, collection, and product page for structural patterns; checked current Git history/status and the documentation diff. No Wix runtime, API, or store-data test was run.
- **Outstanding questions:** All site-only, catalog/CMS, widget-configuration, API-access, transaction-flow, taxonomy-model, market, and original-asset unknowns listed above.
- **Recommended next action:** Complete Phase 1 architecture/data planning: inspect the connected Wix Studio site and store/CMS dashboard, preview the existing shopping flow, verify available APIs, and record the chosen taxonomy/theme model before implementing store changes.
