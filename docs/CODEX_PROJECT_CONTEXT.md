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

## Work Completed

1. **Repository application-understanding analysis (2026-09-13):** Inspected tracked structure, all page code, backend/public folders, package and Wix configuration, local generated element maps, npm dependency state, Git branch/status/history, and the discoverable Category-to-Orders path. Identified that custom Velo logic is empty and that Wix-managed commerce behavior requires editor/runtime verification.
2. **Persistent context document (2026-09-13):** Created this handoff file only; no application code or store functionality was changed.

## Current Task

Application understanding and development-environment setup. Repository analysis and this context document are complete. Wix Studio/site configuration inspection and runtime flow verification have not yet been performed; no store implementation has begun.

## Next Steps

1. Open the connected site in Wix Studio and inspect each store/member widget, its page URL, links, settings, and responsive navigation. Record observed behavior here.
2. Inspect the Wix store dashboard and CMS: installed apps, catalog, categories/collections, product data, media, variants, inventory, CMS collections, permissions, and any editor data bindings.
3. Use `wix dev` or a Wix preview to walk Category -> Product -> Cart -> Checkout -> Thank You and member order history. Record what works, what fails, and what is already Wix-managed. Avoid a real paid transaction unless specifically authorized.
4. Define the target feature scope and prioritize verified gaps. Decide per feature whether existing Wix configuration, Velo code, or an applicable Wix API is the right control surface.
5. Before adding backend methods, specify the callers and tighten `permissions.json` for sensitive operations.
6. Implement the highest-priority verified gap in a small reviewable change; validate it in Wix preview and update this document with the resulting architecture and status.

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
- Whether `package-lock.json` should become tracked; it was already untracked at analysis time.
- No runtime test or live-site audit has been performed, and this repository has no application tests.

## Session Handoff

- **Last completed task:** Read-only repository analysis, followed by creation of this project-context document.
- **Current task:** Application understanding and development-environment setup; next phase is Wix Studio/site inspection and preview verification.
- **Current branch:** `main`, tracking `origin/main`.
- **Git status:** The pre-existing `package-lock.json` is untracked; this new `docs/CODEX_PROJECT_CONTEXT.md` is also untracked until committed. No tracked application files were modified.
- **Last commit:** `d38237f` — “Initial commit” (2026-09-13 16:00:50 UTC).
- **Files changed in this task:** Created `docs/CODEX_PROJECT_CONTEXT.md` only.
- **Validation performed:** Inspected every application page-code file and confirmed all 17 are identical starter stubs; reviewed configuration, dependency declarations/local lockfile, generated element maps, and Git history/status. Reviewed the created document and final Git status. No Wix runtime tests were run.
- **Outstanding questions:** All site-only, catalog/CMS, widget-configuration, API-access, and transaction-flow unknowns listed above.
- **Recommended next action:** Inspect the connected Wix Studio site and store/CMS dashboard, then preview the shopping flow and update this document with verified findings before implementing store changes.
