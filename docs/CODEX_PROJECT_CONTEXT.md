# Kids Gear Shop - Codex Project Context

This is the persistent project memory and handoff document. Future Codex sessions must read it before making repository changes. Update it whenever a meaningful implementation, architecture decision, Wix API integration, CMS/data change, or milestone is completed. Keep confirmed repository facts separate from Wix-site assumptions, and refresh the Session Handoff section at the end of each such task.

## Project Overview

- Project: AnH Vibes, a Wix Studio e-commerce site (repository/context originally labeled Kids Gear Shop).
- Repository: https://github.com/himanshunavin03/toy-store
- Development workflow: Wix Studio + Wix CLI + GitHub + VS Code + Codex.
- Primary local development command: `wix dev` (also available as `npm run dev`).
- Local repository path at initial analysis: `C:\Users\himan\OneDrive\Desktop\Toy-Store\toy-store`.
- Wix site ID in `wix.config.json`: `b50d135b-16b5-440e-b168-47db49424421`; local `uiVersion` observed during recovery is `6` (the config change predated the recovery and was not edited here).

## Current Architecture

This is a Wix Git Integration & Wix CLI repository for Velo site code, not a standalone React storefront. The checked-in application surface is page-level JavaScript under `src/pages`, shared page code in `masterPage.js`, optional backend/public code folders, Wix CLI configuration, and a development-only catalog seed script under `scripts/`. The visual page structure, embedded app widgets, widget configuration, and store data are not represented as editable application source here.

Home and `masterPage.js` again contain the `ad88861` runtime text/button/menu overrides after the regression recovery below. The removal in `4349262` exposed the original template canvas, so the saved Studio canvas/native menu is not yet authoritative. The other 15 page-code files remain empty starter callbacks. There are no application imports, backend/public calls, data queries, or custom commerce calls. Wix-generated, ignored `.wix/types/` declarations list editor elements and provide limited evidence of the site design. They are generated local metadata, not proof of configured or working live behavior.

Observed source path:

```text
Wix page or embedded widget
  -> Home.c1dmp.js / masterPage.js restore ad88861 text, CTA, and menu overrides
  -> other page callbacks remain empty
  -> no custom public/backend module
  -> no Wix Stores, eCommerce, Members, or CMS API call in visitor code
```

Wix-managed widget behavior may run independently of the page callbacks. Its data flow and runtime result cannot be traced from the repository. The separate CLI seeder talks directly to the connected Wix site via official Catalog V3 REST APIs; it is not part of visitor page execution.

## Current Application State

- Sixteen named page-code files and one `masterPage.js` exist. Home and shared code again have the limited runtime copy/navigation update from `ad88861`; the other 15 page-code files remain starter stubs.
- Generated element declarations identify a category-page iframe, cart and checkout iframes, side-cart and success-popup iframes/controllers, a thank-you iframe, wishlist and order-history iframes, and shared cart/member/navigation elements.
- Home has generated declarations for two repeaters, a gallery iframe, images, text, and a button. Their content, links, and editor bindings are unknown.
- The Product Page declaration identifies a slider-gallery iframe but does not establish product data binding, options, pricing, or add-to-cart behavior.
- No custom backend or public modules exist. `src/backend/permissions.json` has an allow-all wildcard default for anonymous visitors, site members, and owners; currently there are no web methods to invoke.
- No visitor-code Wix Stores/eCommerce SDK integration, CMS collection declaration, dataset ID, or order-handling code is checked in. A development-only CLI script previously set up catalog records in the connected site; do not rerun it for the UI task.
- The presence of widget elements is evidence of a Wix-managed UI surface, not evidence that checkout or any other commerce operation currently works.

## Connected Wix MVP Implementation Status

**Verified environment (2026-09-13):** `wix.config.json` connects this repo to site `b50d135b-16b5-440e-b168-47db49424421`. The Wix CLI is authenticated. A site-scoped CLI token was used in memory for read-only preflight and the explicit seed run; no token or secret was saved. [Get Catalog Version](https://dev.wix.com/docs/api-reference/business-solutions/stores/catalog-versioning/get-catalog-version) returned `V3_CATALOG`. Site Properties returned payment currency `CAD` and site display name `My Site`. The Published Site URLs API returned an empty list: the site was not published at seed time. **Wix app catalog data is live site data even in preview**; this was a real write to the connected site, not a separate local/sandbox catalog. See [Wix preview data behavior](https://dev.wix.com/docs/develop-websites-sdk/test-your-site/debug-your-code/about-testing-code-in-preview-mode).

**Architecture selected:** Wix Stores Catalog V3 categories/products/inventory are the system of record. `scripts/seed-catalog.mjs` is a local, backend-oriented development utility using the Wix CLI's site-scoped token and Wix REST endpoints. It defaults to a read-only plan; writes require `--apply --site-id <configured-site-id>`, a V3/CAD check, and an unpublished-site check. It checks existing names/handles and category parents, creates missing records, and makes no deletion or update to unrelated records. No public web method or CMS collection was introduced, so `src/backend/permissions.json` was not changed; its permissive wildcard remains a future risk if web methods are added.

**Catalog state verified after seeding:** 7 new AnH Vibes main categories and all 36 planned subcategories exist in Wix's native category tree. Fourteen distinct AnH Vibes demo products exist with original development copy, CAD variant prices, `IN_STOCK` status, and direct assignment to one planned subcategory each. Wix's pre-existing 6 categories and 13 unrelated products were retained, so the connected catalog now contains 49 categories and 27 products total. The existing `All Products` Wix category also contains the new products. A second and third apply run created **0 categories, 0 products, and 0 category assignments**; 14 products were reused. API reads verified all 14 demo products' currency, visibility, inventory status, description, price presence, and subcategory IDs.

**UI-phase category connection (2026-09-13):** A read-only `List Items In Category` check found zero direct products in the main categories, even though the subcategories held the demos. Wix documents that a parent may show zero products in that situation. After checking the exact site, Catalog V3/CAD/unpublished state, category IDs, 14 demo identities, leaf assignments, and absence of parent assignments, 14 existing demo products were added to their seven matching parent categories through the official category item API. This did not create/seed any product or category, change prices or primary leaf categories, delete data, or touch unrelated products. A separate API read verified exactly two demo product IDs directly assigned to each main category; leaf assignments remain intact. Widget rendering remains a Preview check.

| Main category > demo subcategory | Demo products and CAD prices |
| --- | --- |
| School Bags > Preschool Bags / Girls Bags | Galaxy Explorer Kids Backpack — $49.00; Rainbow Dreams School Bag — $45.00 |
| Ladies Handbags > Tote Bags / Sling Bags | Everyday Elegance Tote — $59.00; Classic Crossbody Bag — $48.00 |
| Soft Toys > Teddy Bears / Animal Plush | Cuddly Teddy Bear — $29.00; Happy Bunny Plush — $27.00 |
| Bottles > Kids Bottles / Insulated Bottles | Space Adventure Bottle — $22.00; Rainbow Insulated Bottle — $32.00 |
| Stationery > School Sets / Pencil Cases | Creative Kids Stationery Set — $25.00; Unicorn Pencil Case — $16.00 |
| Gift Items > Birthday Gifts / Gift Sets | Birthday Surprise Gift Set — $39.00; Little Joy Gift Box — $34.00 |
| Lunch Boxes > Bento Lunch Boxes / Compartment Lunch Boxes | Dino Bento Lunch Box — $28.00; Rainbow Compartment Lunch Box — $26.00 |

**Media and variants:** No retailer imagery or placeholder files were imported. The seed creates one priced physical variant and an in-stock inventory item per demo product; it does not define option choices. When original/licensed images are ready, attach them to these existing Wix product IDs through Wix Media and [Product Media](https://dev.wix.com/docs/api-reference/business-solutions/stores/catalog-v3/products-v3/introduction) operations or the Wix dashboard, then verify product cards and galleries. Product descriptions are explicitly marked as development demos; specifications and actual stock must be confirmed before a real launch.

**Status labels:** Catalog taxonomy, demo products, CAD prices, basic inventory, and seed idempotence are **VERIFIED** by Wix API reads. The seeder and `wix dev` startup/type sync are **VERIFIED** locally. Runtime code now proposes AnH Vibes copy and desktop navigation, but its visual result and site-specific links are **NOT YET VERIFIED** in Preview. Category/product page rendering, Product → Cart → Checkout, payment/shipping configuration, member/wishlist/orders, and Wix Studio navigation are also **NOT YET VERIFIED** in an interactive browser. Original media and themes are **NOT YET IMPLEMENTED**. Do not claim a working checkout until a Wix preview walk-through confirms it.

**Official API capability map used for planning:** Catalog V3 supports [product creation/update and descriptions/prices/options](https://dev.wix.com/docs/api-reference/business-solutions/stores/catalog-v3/products-v3/introduction), [product media](https://dev.wix.com/docs/api-reference/business-solutions/stores/catalog-v3/products-v3/about-product-media), [physical product plus inventory creation](https://dev.wix.com/docs/api-reference/business-solutions/stores/catalog-v3/products-v3/create-product-with-inventory), and [hierarchical categories plus assignments](https://dev.wix.com/docs/api-reference/business-solutions/stores/catalog-v3/categories/introduction); those areas were used only to the extent described above. No CMS collection was required because native catalog entities cover the MVP. Wix has [CMS collection/data-item APIs](https://dev.wix.com/docs/api-reference/business-solutions/cms/data-items/insert-data-item) if a later custom-data requirement warrants them. For any future custom cart flow, Wix's [Cart V2](https://dev.wix.com/docs/api-reference/business-solutions/e-commerce/purchase-flow/cart-v2/introduction) is the current API for cart through order placement; the older separate Cart/Checkout APIs are scheduled for removal on February 1, 2027. Standard online [orders are created through checkout](https://dev.wix.com/docs/api-reference/business-solutions/e-commerce/orders/orders/create-order?apiView=SDK). None of these cart, checkout, order, or CMS APIs is called by this repository; Wix-managed widgets remain the intended visitor flow.

**Minimum Wix Studio/Dashboard checks before calling this a working storefront:** (1) In Local Editor Preview, verify the new runtime brand, hero, button, desktop menu, and category links; the saved Editor canvas may still show Poppy & Lily until manually edited. (2) Open a new category and one of its products; confirm the native category widget lists the seeded products and the product page shows the CAD price and add-to-cart control. (3) Add a demo item to the native cart and advance into Wix checkout without making an unapproved paid purchase; note missing shipping, tax, payment, or member settings. (4) Update the Editor's saved text/menu content and mobile menu as described in the UI control-boundary section below. (5) Attach original/licensed product media later; none was copied from a retailer. (6) Decide how to handle the 13 unrelated pre-existing products and confirm development descriptions/prices/artificial stock before publication.

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

Home and masterPage now contain the limited runtime UI updates described below. All other page-code files retain empty starter callbacks. Responsibilities are indicated by page names and, where noted, generated element types; actual live settings need inspection.

| Page file | Discoverable role / element evidence |
| --- | --- |
| `Home.c1dmp.js` | Home/landing page; conditionally updates the old hero title/supporting copy and CTA in Preview. Two repeaters and a grid-gallery iframe appear in generated types. |
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
| `masterPage.js` | Shared page code; conditionally replaces Poppy & Lily text and sets Home plus seven visible main categories with 36 nested subcategory menu items at runtime. Generated types show a horizontal menu and hamburger-related containers, cart icon iframe, two member-login widgets, account navigation bars, and a Wix Forms V2 element. |

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
| `src/pages/masterPage.js` | Shared/global page callback; updates matching template brand text and the desktop horizontal menu at runtime. Mobile menu editor configuration remains unverified. |
| `src/backend/` | README and `permissions.json` only. No `.js`, `.jsw`, `.web.js`, data hooks, routers, event handlers, HTTP functions, or jobs are present. |
| `src/public/` | README only; no shared frontend modules. |
| `scripts/seed-catalog.mjs` | Development-only Wix Catalog V3 REST seeder. Run `node scripts/seed-catalog.mjs` for a read-only plan or `node scripts/seed-catalog.mjs --apply --site-id b50d135b-16b5-440e-b168-47db49424421` for an explicit write while the site remains unpublished. Requires installed Wix CLI and `wix login`; stores no token. Remove/disable before production. |
| `wix.config.json` | Wix site ID and UI version. |
| `package.json` | Wix CLI development scripts and development dependencies. Scripts: `postinstall: wix sync-types`, `dev: wix dev`, `lint: eslint .`. No application runtime dependencies are declared. |
| `.eslintrc.json` | Extends `plugin:@wix/cli/recommended`. |
| `wix.lock` | Tracked, generated Wix/Yarn dependency state; not application behavior. |
| `.wix/types/` and `jsconfig.json` | Ignored, locally generated Wix typings and page element maps. `jsconfig.json` references those local types. |
| `package-lock.json` | Tracked npm lockfile; it was untracked during the initial repository analysis but was committed later. |

Direct development dependencies declared in `package.json`: `@wix/cli` (`^1.0.0`), `@wix/eslint-plugin-cli` (`^1.0.0`), `eslint` (`^8.25.0`), and `react` (`16.14.0`). The npm lockfile resolves them to `1.1.245`, `1.0.2`, `8.57.1`, and `16.14.0`, respectively. React's presence does not mean a React storefront is implemented. The seeder uses Node's built-in APIs and adds no dependency.

## Data / CMS

No custom CMS collection schemas, dataset IDs, collection references, `wix-data` imports, data hooks, or data queries appear in tracked source. The tracked `scripts/seed-catalog.mjs` creates native Wix catalog records, not CMS records. Home-page repeaters and policy-page repeaters appear in generated element declarations, but their data sources and bindings are not recorded here. Product and category records, images, prices, inventory, policy content, member records, and orders are not contained in this repository. Inspect the Wix site's CMS and store administration to determine whether they exist and how they are connected to pages.

## Wix Stores / eCommerce

The generated local type maps identify these store-adjacent elements: `#categoryPage1`, `#sliderGallery1`, `#shoppingCart1`, `#sideCart1`, `#sideCartLightboxController1`, `#successPopup1`, `#successPopupLightboxController1`, `#checkout1`, `#thankYouPage1`, `#wishlist1`, `#orderHistory1`, and the shared `#shoppingCartIcon1`. Member login widgets and account navigation bars also appear in `masterPage` types. These are Wix editor/widget element IDs; generic Wix SDK type definitions installed under `.wix/types/wix-code-types/` are not application integrations.

No page/backend source file imports `wix-stores`, `wix-ecom`, Wix SDK packages, `wix-members`, or `wix-data`. The separate development seeder uses documented Wix REST endpoints: [Catalog Versioning](https://dev.wix.com/docs/api-reference/business-solutions/stores/catalog-versioning/get-catalog-version), [Categories](https://dev.wix.com/docs/api-reference/business-solutions/stores/catalog-v3/categories/introduction), [Products V3](https://dev.wix.com/docs/api-reference/business-solutions/stores/catalog-v3/products-v3/introduction), [Create Product With Inventory](https://dev.wix.com/docs/api-reference/business-solutions/stores/catalog-v3/products-v3/create-product-with-inventory), and [Category Item Assignment](https://dev.wix.com/docs/api-reference/business-solutions/stores/catalog-v3/categories/bulk-add-items-to-category). Determine in Wix Studio/site administration how category and product pages are configured and whether the cart/checkout are operational. Generic installed typings alone do not establish visitor behavior.

## Codex Control Matrix

“Wix API” indicates a possible integration surface to investigate, **not an API currently used or verified for this site**. “Wix Studio” refers to editor/widget configuration or inspection; catalog and transaction administration may also live in the Wix dashboard.

| Feature | Direct Code | Wix API | Wix Studio | Current Status | Notes |
| --- | --- | --- | --- | --- | --- |
| Navigation | `masterPage.js` restores the `ad88861` eight-item runtime menu and 36 children | Prior Catalog V3 read confirmed IDs/slugs | Saved native dropdown/hamburger styling remains future work | Runtime recovery code restored; fresh Wix Preview pending | At 1280px all eight top-level links must fit; verify dropdowns and actual URLs in Preview. |
| Categories | Seeder prepares native taxonomy | Catalog V3 category create/query and item assignment verified | Inspect category widget and navigation | 7 roots + 36 children verified in Wix | Category-page rendering still unknown. |
| Products | Seeder prepares 14 demo records | Catalog V3 product creation/query verified | Inspect product/store setup | 14 visible demo products verified in Wix | Existing 13 unrelated products preserved. |
| Product Images | Future media attachment script possible | Catalog V3 product media supports Wix Media IDs/URLs | Inspect gallery and store media | No new product imagery | Original/licensed assets required. |
| Prices | Seeder sets CAD variant prices | Catalog V3 price writes/reads verified | Inspect store pricing display | 14 CAD demo prices verified in Wix | Do not duplicate Wix pricing in page code. |
| Variants | Code can handle selections if needed | Catalog V3 supports variants/options | Inspect product options UI | One simple variant per demo product | No configurable choices yet. |
| Inventory | Development seed creates in-stock items | Catalog V3 product-with-inventory verified | Inspect store inventory settings | All 14 demos report `IN_STOCK` | Demo availability is not real stock confirmation. |
| Product Page | Existing page Velo file can be edited | Investigate product data/cart calls | Inspect page design and widgets | Empty page code; gallery iframe | Product widget/binding not established by types. |
| Search | Custom UI/logic could be added | Investigate search/catalog APIs | Inspect whether a search widget exists | No search implementation detected | Live editor may contain untyped behavior. |
| Filters | Custom UI/logic could be added | Investigate catalog query APIs | Inspect category widget settings | No filter code detected | Widget may provide built-in filters. |
| Cart | Velo interactions could be added | Cart V2 documented for future custom work | Inspect cart/side-cart widgets | Cart iframe and lightbox detected; no custom code | Runtime behavior unverified; preserve managed cart. |
| Checkout | Custom handoff/logic may be possible | Cart V2 documented for future custom work | Inspect checkout, payment, shipping, tax setup | Checkout iframe detected; no custom code | Runtime behavior unverified; preserve managed checkout. |
| Members | Velo UI/handlers could be added | Investigate Members APIs | Inspect login/account widgets and permissions | Login/account elements detected | Authentication behavior unverified. |
| Wishlist | Page code could augment UI | Investigate wishlist/member APIs | Inspect wishlist widget | Wishlist iframe detected | Storage and membership rules unknown. |
| Orders | Backend/page logic could be added | Wix Orders APIs documented; normal checkout creates orders | Inspect order-history widget and dashboard | Order-history iframe detected; no custom code | No order was created or verified. |
| CMS | Velo queries/hooks could be added | Wix CMS APIs exist; unused | Inspect collections, permissions, bindings | No CMS code/schema added | Native catalog covers the MVP; editor-only bindings may exist. |
| Backend APIs | Backend modules/endpoints can be added | Backend code can call authorized Wix APIs | Inspect secrets/site settings as required | No backend implementation | Review wildcard permissions before exposing methods. |

## Architecture Decisions

1. **Primary coding workflow:** VS Code + Codex, with GitHub and Wix CLI; use `wix dev` for local Wix development.
2. **Implementation preference:** Prefer code and Wix APIs where the needed behavior is actually supported and authorized for this site. Verify the relevant API and existing widget behavior first.
3. **Editor boundary:** Use Wix Studio manually for visual/editor configuration and functionality not exposed through repository code or a suitable API. Use Wix site administration where store/CMS settings live.
4. **Commerce preservation:** Do not replace working Wix-managed commerce functionality without a specific, justified reason.
5. **Evidence discipline:** Treat page names and generated element IDs as design clues. Confirm live behavior, data, and bindings before making architecture claims or changes.
6. **Handoff upkeep:** Read this file before future repository changes and update it after meaningful work. Do not rename existing Wix page-code files casually; their names map to pages.
7. **Target identity:** AnH Vibes is the intended brand; “Kids Gear Shop” remains this document's original project heading until a deliberate repository/document rename. The reference store informs structure and usability, never asset or copy reuse.
8. **Taxonomy decision:** Main categories and subcategories use the connected site's native Wix Stores Catalog V3 hierarchy. Cross-category themes remain a future architecture decision.
9. **MVP catalog decision:** The connected site is Catalog V3. Use its native hierarchical categories, products, prices, and inventory rather than a parallel database or duplicate CMS catalog. Demo products are assigned to leaf categories; Wix's category tree supplies the parent hierarchy. Theme categories/assignments are deferred until the basic commerce flow is checked.
10. **Development writes:** A local CLI/REST seeder is preferable to an anonymous or visitor-callable backend method for setup. Its explicit apply guard and unpublished-site check protect the connected catalog. Do not use it as runtime store logic.

## Work Completed

1. **Repository application-understanding analysis (2026-09-13):** Inspected tracked structure, all page code, backend/public folders, package and Wix configuration, local generated element maps, npm dependency state, Git branch/status/history, and the discoverable Category-to-Orders path. Identified that custom Velo logic is empty and that Wix-managed commerce behavior requires editor/runtime verification.
2. **Persistent context document (2026-09-13):** Created this handoff file only; no application code or store functionality was changed.
3. **AnH Vibes product-definition milestone (2026-09-13):** Recorded original-brand requirements, taxonomy, theme model, homepage/product/gift/asset direction, and a phased implementation backlog. This was documentation only; no Wix data or application functionality was changed.
4. **Connected Wix catalog MVP setup (2026-09-13):** Verified site ID, Catalog V3, CAD currency, and unpublished status; added an idempotent local Wix REST seeder; created and API-verified 43 AnH Vibes categories/subcategories and 14 demo products while preserving 13 existing products. Started `wix dev` and verified type/page sync. Interactive shopping flow remains unverified.
5. **Catalog safety and idempotence recheck (2026-09-13):** Hardened preflight collision detection, passed lint/syntax checks, applied the seed to the connected site with zero writes, and independently verified all 43 category IDs and 14 product IDs/prices/leaf assignments. Restarted `wix dev`; browser flow remains a manual check.
6. **Local storefront UI boundary and runtime MVP (2026-09-13):** Inspected page code, generated element types, Wix configuration, and official Velo/Studio guidance. Added conditional Home hero copy/CTA and shared brand-text/desktop-menu runtime code. Re-read the existing Catalog V3 roots and 14 demo products without seeding. Found empty direct memberships in main categories, added only the existing demos to their matching parents, and independently verified two demos per main category. Lint and Wix CLI sync passed; visual Preview and commerce flow still require a human browser check.

## Current Task

The AnH Vibes runtime UI changes are coded. The immediate task is to inspect Local Editor **Preview**, update saved Editor-canvas text and menus where needed, and verify category/product rendering and the native Product → Cart → Checkout flow. Do not redesign the homepage yet.

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

The catalog/data portion of Phase 1 and the initial category/product population in Phases 4 and 6 are complete. The immediate next action is browser inspection of the Wix-managed pages and checkout path, plus original media and minimum navigation/configuration. The exact split of CODE, WIX API, and WIX STUDIO can change after runtime inspection; update the matrix and this backlog when it does.

## Known Issues / Unknowns

- Whether the live/preview site and its category, product, cart, checkout, thank-you, wishlist, and order-history widgets work end to end.
- Which Wix commerce and member apps are installed, and the widgets' actual configuration, capabilities, and versions.
- Actual page URLs, menu items, link destinations, responsive behavior, and any editor-set interactions.
- The site now has 43 new AnH Vibes categories/subcategories and 14 demo products, but category-widget rendering and product images are unverified/missing. Existing Wix catalog content remains alongside the demos.
- Whether product details have a functional product widget or editor binding beyond the gallery element visible in local types.
- Search/filter UI and behavior; neither is implemented in repository code.
- Cart persistence, checkout/payment providers, shipping, taxes, fulfillment, order creation, and post-purchase behavior.
- Authentication/member permissions, account settings, wishlist storage, order-history access, and customer records.
- CMS collections, schemas, permissions, data bindings, and contents, if any.
- Copy/content of policy and accessibility pages, as well as Wix Forms V2 configuration and submission destination.
- Availability and authorization of specific Wix APIs for future changes; generic type declarations do not answer this.
- Whether the local ignored `.wix/types/` metadata exactly matches the latest published site design.
- Native V3 categories support the required main/subcategory hierarchy. The best representation and storefront UX for cross-category themes remain undecided; no CMS mapping has been introduced.
- Merchandising rules and data sources for New Arrivals, Trending, Best Sellers, and Special Offers; gift-option persistence through checkout and fulfillment.
- The site's payment currency is CAD. AnH Vibes launch market, languages, shipping regions, tax and return policies, and payment providers remain unknown. Do not inherit the reference site's geography or commercial terms.
- Whether any existing products or media can be used with documented ownership/licensing, and which original assets must be created.
- Whether customer testimonials exist and can be published with permission; newsletter consent and delivery workflow are also unknown.
- `package-lock.json` is tracked in Git, although it was untracked at the initial analysis.
- No interactive storefront/cart/checkout test has been performed. Catalog V3 API reads and a Wix Local Editor startup/type sync have been verified; this repository has no application test suite.
- The Local Editor was launched after the UI code change, but its canvas/Preview could not be inspected through the CLI. The reported Poppy & Lily template is the last confirmed visual state from the site owner. Runtime AnH Vibes copy/menu and the site-specific category URL prefix remain browser checks.
- The new main categories now each have two directly assigned existing demo products, in addition to each product's primary leaf subcategory. Whether the managed Category Page renders these records at the root-category URL is still unknown; inspect both root and leaf pages in Preview.

## Local Storefront UI Control Boundary

**Historical note:** this section describes the original `ad88861` handoff. Its runtime code was restored in the recovery entry below; the generated element-ID evidence remains useful. The actual canvas was not changed by either repository correction.

The template remains visible because catalog writes change Wix Stores records, while Wix Studio stores page text, images, menus, layout, and widget settings separately. `wix dev` syncs code and opens the Local Editor; it does not rewrite the Editor canvas. Velo `$w` changes run in Preview/visitor runtime and should be confirmed there. The generated element maps identify types/IDs, not their saved text, links, images, or widget bindings.

| UI item | Control boundary and evidence | Current action/status |
| --- | --- | --- |
| Poppy & Lily brand text/logo | **DIRECT CODE** for any `$w.Text` containing the exact old brand; **WIX STUDIO / LOCAL EDITOR** for saved canvas copy, image/vector logo, styling. Shared types show `#text2`, `#text7`, and vector/image elements but do not map the visible logo to an ID. | `masterPage.js` conditionally changes matching text to AnH Vibes in Preview. Logo/image and saved canvas require inspection. |
| Main navigation | **DIRECT CODE** for `#horizontalMenu1.menuItems` (typed `$w.Menu`); **WIX STUDIO / LOCAL EDITOR** for saved menu items, hamburger/mobile menu and breakpoint layout. Hamburger-related types are only `HiddenCollapsedElement`, not a writable `Menu`. | Runtime menu is Home plus all seven main categories, each with current Wix subcategory slug links. Responsive and link behavior unverified. Slug changes in Dashboard require menu-code updates. |
| Hero heading | **DIRECT CODE** for the existing `#text18`/`#text17` `$w.Text` pair; **WIX STUDIO / LOCAL EDITOR** for saved canvas typography/content. Exact ID of the old heading is unknown from types. | Home code updates the pair only if one contains “Handcrafted Wooden Toys” (whitespace tolerant). Preview unverified. |
| Hero subtitle | **DIRECT CODE** for the other element in the same two-text hero pair when the old heading is found; **WIX STUDIO / LOCAL EDITOR** for saved canvas. | Target supporting copy coded conditionally; Preview unverified. |
| Hero CTA button | **DIRECT CODE** for `#button6.label` and `.link`; **WIX STUDIO / LOCAL EDITOR** for saved button setting/visual design. The button appears beside the hero text IDs in generated types. | Code sets “Shop School Bags” and `/category/anh-vibes-school-bags` on Home regardless of whether the old heading remains. Actual route click unverified. |
| Hero image | **DIRECT CODE** can set an image `src` in general, but the current file/source and exact hero-image binding are absent; **WIX STUDIO / LOCAL EDITOR** controls the saved image. | Original local desktop concept exists in assets/anh-vibes/hero-desktop-concept.png, but is not uploaded to Wix. Current saved image is unchanged. |
| Home product/category sections | **WIX STUDIO / LOCAL EDITOR** or **WIX-MANAGED STORE WIDGET**, depending on the actual repeater/gallery bindings. Types show `#repeater1`, `#repeater2`, `#gridGallery1`, but no content/data source. | No safe code change yet; inspect the sections and their connections in Editor. |
| Category Page data source | **WIX-MANAGED STORE WIDGET** plus **WIX STUDIO / LOCAL EDITOR** settings. Source/types only expose `#categoryPage1` as an iframe. | Same site/catalog is configured, but rendering/category menu settings are unverified. |
| Product Page data source | **WIX-MANAGED STORE WIDGET** if Wix's installed product component is bound; **WIX STUDIO / LOCAL EDITOR** for its settings. Types show only `#sliderGallery1` as an iframe, so the precise widget/binding is unknown. | No rebuild or Velo override; product page behavior unverified. |

**Catalog connection check:** `wix.config.json` still points to site `b50d135b-16b5-440e-b168-47db49424421`. Site-scoped Wix REST reads returned `V3_CATALOG`, the same seven main-category IDs/slugs recorded above, 36 child categories, and 14 distinct AnH demo product IDs. Initially each root had zero direct items. Fourteen existing demo-to-parent memberships were added through the Category API; a separate `List Items In Category` read verified two exact demo IDs per root and no unrelated items. The seven runtime menu paths use the verified slugs and Wix's documented `/category/<slug>` convention. This verifies catalog targets, not that this site's URL prefix, menu clicks, Category Page widget, Product Page, or cart/checkout work in Preview. These were writes to the connected site's real Wix catalog, not a sandbox.

**Validation:** `node --check` passed for both modified page files, `npm run lint` and `git diff --check` passed, and `npm run dev` (`wix dev`) synced types/pages and reported “Opening the Local Editor.” The CLI exposed no screenshot or browser interaction; visual status for AnH Vibes branding, navigation, hero, categories, products, Product Page, Add to Cart, Cart, and Checkout is **MANUAL CHECK REQUIRED**, not verified.

**Current Local Editor manual steps:** Follow [WIX_STUDIO_IMPLEMENTATION.md](WIX_STUDIO_IMPLEMENTATION.md) for the 17-section Home canvas, Wix-native data connections, full desktop and mobile menus, original media upload, and exact Preview acceptance path. The earlier five-step UI MVP checklist is superseded. Do not change Cart/Checkout components or seed the catalog.

Wix's [Velo Menu API](https://dev.wix.com/docs/velo/velo-only-apis/%24w/menu/menu-items) supports runtime menu items; [Wix Stores category-menu guidance](https://support.wix.com/en/article/wix-stores-displaying-product-subcategories) explains selecting exact Category Page items in the Editor. [Studio text](https://support.wix.com/en/article/studio-editor-adding-and-customizing-text), [button](https://support.wix.com/en/article/studio-editor-managing-and-customizing-basic-buttons-2023595), and [category display](https://support.wix.com/en/article/wix-stores-displaying-product-categories) guidance support the remaining manual steps.

## AnH Vibes Storefront Design Handoff (2026-09-13)

**Historical note:** this describes the first handoff at `ad88861`. The Velo menu and hero copy were removed in `4349262`, then restored in the recovery entry below.

**Architecture decision:** Wix Stores Catalog V3 remains the only product/category/price/inventory system of record. Product sections must be Wix Stores Product Galleries or other native category-backed components. The Product Page, Category Page, Side Cart, Cart, Checkout, Thank You, Members, Wishlist and Orders remain Wix-managed. No second catalog, CMS product mirror, hard-coded product cards, storefront-only prices, seeding, or catalog write was added in this design task. A manually curated gallery may still read Wix product details but will not automatically include newly added products; prefer a category-based native source for growth. Theme product discovery stays inactive until existing products are intentionally assigned to native Wix theme categories and widget behavior is checked.

**Code completed:** `masterPage.js` now supplies Home, all seven existing main category slugs, and all 36 child slugs to the typed `#horizontalMenu1` menu, with no generic More group. Its menu labels/slug routes are a snapshot of Wix category identities, not a dynamic Wix category query: renaming a category or changing its slug requires updating the menu code or shifting menu authority to Studio. Product category assignments, prices, inventory, images and product details are not stored in this menu. `Home.c1dmp.js` changes the recognized old template hero copy and sets the interim CTA to **Shop School Bags** with the existing Wix root-category path, even after saved hero copy changes. A true New Arrivals CTA requires a real destination.

**Canvas and binding status:** The 17 requested Home sections, new logo, breakpoint layouts, saved header/menu, category cards, native Wix product galleries, review/blog/FAQ/footer content, and Wix Media attachment are **not implemented in the Wix Studio canvas** by repository code. The required order, original copy direction, editor settings, conditional placeholders, native widget connections, and Preview checks are specified in [WIX_STUDIO_IMPLEMENTATION.md](WIX_STUDIO_IMPLEMENTATION.md). Generated types expose existing Home repeaters/gallery but do not reveal their binding; therefore no existing Home product section can yet be called dynamic or current. The Wix category data and 14 demo records were verified in previous catalog work, not re-queried or changed in this visual-design task.

**Assets:** [ANH_VIBES_ASSET_PLAN.md](ANH_VIBES_ASSET_PLAN.md) defines 38 original visual briefs: logo, desktop/mobile hero, seven category cards, school campaign, brand lifestyle, seven theme tiles, animated-promo poster, About image, three editorial cards, and 14 existing-product photography briefs. The only generated concept is `assets/anh-vibes/hero-desktop-concept.png` (1,880,802 bytes). It is local, not uploaded to Wix Media, approved as a final image, or attached to a product. Existing demo product records still need approved accurate images attached in Wix Dashboard. Animation is proposed as restrained Studio motion or optimized video with static and reduced-motion fallback; none is live.

**Validation:** `npm run lint`, `node --check` for both modified Velo files, `git diff --check`, and `npx wix sync-types` passed. `npm run dev` synced UI version 4 types/pages and reported “Opening the Local Editor.” These checks validate code/tool startup only. No browser Preview, breakpoint visual, link, widget binding, product-card, Add to Cart, Checkout, member, wishlist, or order action was verified. No commit or push was made.

**Next action:** In the Local Editor, follow [WIX_STUDIO_IMPLEMENTATION.md](WIX_STUDIO_IMPLEMENTATION.md): apply the actual 17-section canvas and native Wix gallery/category bindings; upload approved assets; test at desktop/tablet/mobile; then walk Home → Category → Product → Add to Cart → Cart → Checkout. Record each actual result and stop before a real paid order. Inspect the 13 unrelated pre-existing products and current policy/payment/shipping settings before launch.

## Visual correction and editor execution handoff (2026-09-13)

The owner inspected the Local Editor after `ad88861` and reported that the saved canvas still shows wooden-toy hero, category, product, promotion, and footer visuals; a large unstyled School Bags submenu overlaps the hero. This visual report is the current observed site state. Repository type declarations cannot show image content or prove a section's exact identity. They show seven Home section IDs (`#section7`, `#section1`, `#section8`, `#section9`, `#section10`, `#section11`, `#section13`), a hero text/button/image cluster, two repeaters, and an iframe gallery. The execution checklist requires confirming these in Layers before deleting any canvas section.

**Decision:** Wix Studio's saved native menu now owns all top-level and child links and the responsive dropdown/hamburger presentation. `masterPage.js` no longer injects `#horizontalMenu1.menuItems`; `Home.c1dmp.js` no longer changes hero text/button at runtime. This removes the code that could reintroduce the broken list or override an Editor-configured hero CTA. The Local Editor must now create/configure the complete menu, choose actual Wix Category Page links, and save. No code-level product catalog, pricing, media, cart, or checkout replacement was made.

**Deliverables:** [WIX_STUDIO_IMPLEMENTATION.md](WIX_STUDIO_IMPLEMENTATION.md) is now a top-to-bottom 17-section execution checklist with action, new content, Wix data source, asset IDs, responsive settings, animation, and validation. [ANH_VIBES_ASSET_PLAN.md](ANH_VIBES_ASSET_PLAN.md) now uses requested A001–A040 IDs, includes separate desktop/mobile Back-to-School briefs, and retains 14 existing-product photo briefs P001–P014. The prior local hero image remains an unapproved concept. Neither generated asset specifications nor repository code change the Wix canvas or attach Wix Media.

**Control boundary:** Codex can edit Velo and docs, prepare/generate/review local assets, and verify repository checks. The owner must apply the documented Studio canvas operations, upload/select approved media, configure native galleries and menu, attach accurate product photos to the existing Wix records, save the UI version, and run browser Preview/commerce checks. No seed/catalog write, commit, push, image upload, UI-version save, or browser verification occurred in this correction.

## Session Handoff

### Runtime regression recovery (2026-09-13)

The owner reported that `wix dev` after `4349262` displayed the original Poppy & Lily / Shop All / Blocks & Stacking / Vehicles / Animals / Sale / Handcrafted Wooden Toys canvas, whereas the earlier `ad88861` runtime visibly displayed AnH Vibes, eight category links and “Little Things. Happy Vibes.” The exact `ad88861..4349262` diff removed both `$w.onReady` callbacks: Home's conditional hero heading/supporting copy and CTA update; and `masterPage`'s Poppy & Lily text replacement, menu helpers and `#horizontalMenu1.menuItems` assignment. Those two files alone were restored from `ad88861`. The 17-section editor checklist, asset briefs, catalog, products, categories and commerce code were not changed.

`npm run lint` passed. Existing `wix dev` processes were stopped and `npx wix dev` restarted; its logs reported UI version 6 type/page sync and “Opening the Local Editor.” An isolated execution of the restored files with a representative `$w` element map asserted AnH Vibes, the eight exact top-level labels, 36 children, the desired hero heading/supporting line and School Bags CTA. This is code execution evidence, not a Wix browser Preview confirmation; CLI startup emitted no browser-side execution logs. The owner must confirm the visible result in the newly opened Local Editor/Preview. `wix.config.json` was already modified at recovery start and was not touched.

**Current recovery status:** frontend runtime code restored, no commit/push, no seed/catalog/media/checkout/cart write. The design handoff remains future canvas work; do not remove the restored overrides again before the equivalent saved Studio UI is in place and verified.

### Catalog safety recheck and Wix read-back (2026-09-13)

The seeder was reviewed before execution. It uses the repository's configured site ID `b50d135b-16b5-440e-b168-47db49424421`, the installed Wix CLI's site-scoped token in memory, and documented Catalog V3 REST endpoints. No credentials are stored. Query, version, currency, published-URL, and product-detail requests are read-only. Potential writes are limited to creating missing categories, creating missing products with inventory, and adding products to leaf categories. There are no delete, update, or replacement calls. Apply requires the exact configured site ID, Catalog V3, CAD payment currency, and no published URLs. The script was tightened to reject duplicate category name/parent pairs, category slugs, product names, product handles, and collisions with non-demo records before writing. Existing products and categories are never overwritten. A missing product/category could be created on a future run; the current run made no writes.

**Environment:** These calls target the real Wix Stores app catalog of the connected, currently unpublished Wix site. The Local Editor/Preview is not a separate catalog sandbox. The Wix Published Site URLs API returned zero URLs at execution time; that does not turn the catalog into disposable preview data.

**Validation and execution:** `node --check scripts/seed-catalog.mjs`, `npm run lint`, and `git diff --check` passed. The read-only dry run found 49 total categories, 27 total products, and no planned creates. Command executed: `node scripts/seed-catalog.mjs --apply --site-id b50d135b-16b5-440e-b168-47db49424421`. Result: 0 categories created, 0 products created, 0 category assignments created, and 14 products reused. Independent Wix REST queries then returned 7 AnH root categories, 36 AnH leaves, and 14 AnH demo products; all 14 had the expected names, CAD prices, visible status, expected main-category IDs, and direct membership in the expected leaf. No duplicate AnH category slugs or demo product handles were found. The 6 pre-existing categories and 13 unrelated products remain, yielding 49 categories and 27 products in total.

**Wix category IDs** (all found; none created in this recheck):

| Main category (ID) | Subcategories (Wix IDs) |
| --- | --- |
| School Bags (`8fe8d0a5-f4fc-4b3b-b4a5-1da77dc2802a`) | Preschool Bags `01b7f7da-231f-43bc-8931-2cc84628392f`; Boys Bags `fa7041c2-1ad2-471c-be5e-2efd0a59e47e`; Girls Bags `70f192aa-bdb3-45d9-8db8-2bfcfc47c0e4`; Character Bags `aa6e7527-f96d-4dd7-8878-7e4b42a72b38`; Trolley Bags `e7adf34b-5e28-4b0e-9df5-bf1030153025`; Backpack Sets `1afb290d-c7dc-4b9a-bc7a-14bd22907185` |
| Ladies Handbags (`d37356e5-e3ae-4791-9769-430df403c659`) | Handbags `09c4806a-0424-4232-8932-4813c9915583`; Sling Bags `b1d8dc0e-7ccb-497a-974b-36dbe7ede231`; Tote Bags `92333705-746b-4fb0-a46e-1003f5b3140c`; Wallets `7d3e0dcd-4c31-4844-94ee-2655bb940312`; Clutches `c90746ff-95dd-4987-a059-ef49eef204af` |
| Soft Toys (`6513bc42-f7c0-4f0e-9474-b2733bec2a79`) | Teddy Bears `61e579d8-7928-4a8c-9b76-a0df36d68a1d`; Animal Plush `5a9adf54-a3b3-41bc-8ed8-7096852875b1`; Character Plush `6aa17fa8-d398-4a96-a8b5-1257dceafabb`; Large Soft Toys `f8fd5115-8502-4f1b-bbc1-f699041894c8`; Mini Soft Toys `1e0fd3e2-dfce-49eb-ab85-4ee3ea995838` |
| Bottles (`d07cde96-3f30-44f1-adff-d1701422688d`) | Kids Bottles `82ec8d76-0b2a-45a2-83af-ea418d3ded59`; Insulated Bottles `31e00b39-6456-4283-89f6-4cd55376ad80`; Steel Bottles `be146eca-5414-42ed-bd5b-03df134f2e39`; Sippers `1d7192f6-be2a-447a-8ad8-17631776b9b4`; Character Bottles `8d5f75ae-260c-4bbc-af6a-a825721fb7c6` |
| Stationery (`c91b348a-76b7-45e9-a7e7-19d7eecc6fc4`) | Pencil Cases `4dc05196-33ed-40a2-accc-00bb1feb36fc`; Pens & Pencils `10a5a182-b153-4529-9791-d4bbde93c76c`; Art Sets `38ff4faf-61d5-4b80-a0d5-806b1dfa7ffa`; School Sets `affbd281-9943-4988-98d9-d47583f82b4d`; Diaries & Notebooks `dfd3504b-9d54-40f1-afd1-fdd2023ac3e2` |
| Gift Items (`a4f0d639-549f-474c-af07-f3e5698e401e`) | Birthday Gifts `310b8595-97ca-4289-92c1-1e9f12757f53`; Return Gifts `72116e91-17da-464f-8893-90f30d7a49e3`; Gifts for Girls `86f9dfa1-73d2-4fbf-965b-085757e87e25`; Gifts for Boys `3d7f7e35-f275-4e4b-8b78-b52ee4357fe6`; Gift Sets `bbf83d24-04ae-4f0c-886c-a71f76a4d645` |
| Lunch Boxes (`9a98a02e-664f-4d2f-b316-1d6554bfce45`) | Bento Lunch Boxes `88153742-e3ac-4248-b74b-03aab0abc16d`; Steel Lunch Boxes `97b78da9-fc73-41e0-ae7e-abf2153cd565`; Compartment Lunch Boxes `9755fd4a-e51d-447b-9e36-81b01f0b516c`; Character Lunch Boxes `7d63d0ed-52d3-48d2-b869-d88523bf6cca`; Lunch Sets `66e6025e-9574-4ae3-b33f-cdcd6133ece0` |

**Demo product verification** (all found; CAD price and subcategory assignment verified):

| Main category | Subcategory | Product | CAD price | Wix product ID | Status |
| --- | --- | --- | ---: | --- | --- |
| School Bags | Preschool Bags | Galaxy Explorer Kids Backpack | $49.00 | `dc7aff67-8163-43ee-a395-20a53e1ea6a8` | VERIFIED |
| School Bags | Girls Bags | Rainbow Dreams School Bag | $45.00 | `f4d9be60-b9b6-492c-aeb3-2afc9b6e5bea` | VERIFIED |
| Ladies Handbags | Tote Bags | Everyday Elegance Tote | $59.00 | `b3e2d7ab-23df-44a2-bbe5-41cf2bb6da19` | VERIFIED |
| Ladies Handbags | Sling Bags | Classic Crossbody Bag | $48.00 | `5ba276c5-8a88-44d7-908a-d80fbedea95b` | VERIFIED |
| Soft Toys | Teddy Bears | Cuddly Teddy Bear | $29.00 | `eee69e25-1c62-4f0f-91e7-c135d0f9899d` | VERIFIED |
| Soft Toys | Animal Plush | Happy Bunny Plush | $27.00 | `1ed3c833-a47a-4fec-b31d-aa28f3a4e4b4` | VERIFIED |
| Bottles | Kids Bottles | Space Adventure Bottle | $22.00 | `4a06196b-978a-49fb-91dc-a3a4b9209b34` | VERIFIED |
| Bottles | Insulated Bottles | Rainbow Insulated Bottle | $32.00 | `3905d21c-b9f7-4cfd-a281-1ecc2879e076` | VERIFIED |
| Stationery | School Sets | Creative Kids Stationery Set | $25.00 | `2f5542b6-4ed0-4ca8-b62b-ca95b9824454` | VERIFIED |
| Stationery | Pencil Cases | Unicorn Pencil Case | $16.00 | `1147ed11-90dc-4267-86ce-d3e0b7ca30d6` | VERIFIED |
| Gift Items | Birthday Gifts | Birthday Surprise Gift Set | $39.00 | `37b3803f-09d1-42e2-9725-9c7c7b14d0f9` | VERIFIED |
| Gift Items | Gift Sets | Little Joy Gift Box | $34.00 | `91d4cc04-9a86-4179-a1a4-245635834b9d` | VERIFIED |
| Lunch Boxes | Bento Lunch Boxes | Dino Bento Lunch Box | $28.00 | `8519c1d2-4f40-4c6e-ad62-0b17ac532b08` | VERIFIED |
| Lunch Boxes | Compartment Lunch Boxes | Rainbow Compartment Lunch Box | $26.00 | `a7f439c0-966a-461b-9b87-c8d14fc4bb6d` | VERIFIED |

**Local storefront and commerce flow:** `npm run dev` (`wix dev`) synced local UI types and pages and reported “Opening the Local Editor”; this startup is **VERIFIED**. Home/category navigation, category widget rendering, product links, product-page display and price, add to cart, cart, checkout, thank-you, and order history **REQUIRE MANUAL CHECK** in the browser. No browser interaction or checkout was performed, so none of those steps is marked working. In the Local Editor, click **Preview**; navigate to **Category Page** through the Pages panel or existing storefront menu; open **School Bags → Preschool Bags** and check that **Galaxy Explorer Kids Backpack** appears; click the product and check its detail page shows **CAD $49.00** and an **Add to Cart** control; click **Add to Cart**, open the cart icon/side cart, then **Cart Page**, and proceed to **Checkout**. Record any empty page, broken link, missing image, missing payment/shipping/tax setup, or error. Stop before placing a real order or payment. If the page cannot be reached through the menu, inspect the category/product widget configuration and links in Wix Studio; the seed did not configure navigation.

**Known limits:** Product images have not been added, storefront widgets and their bindings remain unverified, and the site still has unrelated older catalog records. The safety guard relies on Wix's published-URL response at run time and does not make live app data safe for experiments. The current script checks a complete single query page (up to 1,000 categories and 100 products) and refuses an incomplete result. A concurrent catalog edit between preflight and create could still cause an API conflict; no overwrite operation is used.

- **Last completed task:** Restored the `ad88861` Home and master-page runtime overrides that `4349262` removed, then restarted `wix dev` and exercised the code with a representative `$w` map. Browser Preview confirmation remains pending.
- **Current task:** Confirm recovered AnH Vibes branding, menu and hero visibly in the newly opened Local Editor/Preview; defer redesign until this is verified.
- **Current branch:** `main`, tracking `origin/main`.
- **Git status:** Recovery modifies the two Velo files and this context; `wix.config.json` was already modified before recovery and remains untouched. No commit or push made.
- **Last commit:** `4349262` — “add”.
- **Files changed in this task:** `src/pages/Home.c1dmp.js`, `src/pages/masterPage.js`, and `docs/CODEX_PROJECT_CONTEXT.md` only.
- **Validation performed:** `npm run lint` passed; `npx wix dev` synced UI version 6 types/pages and opened Local Editor; isolated restored-code execution passed. No actual browser Preview check or catalog API read was performed.
- **Outstanding questions:** Saved Studio canvas content and actual category/Product Gallery bindings; desktop width and mobile hamburger behavior; site-specific category URLs; original media approval; themes; authentic reviews/blog; operational policies; payment/shipping/tax setup; member/wishlist/order experience.
- **Recommended next action:** Confirm the requested recovered brand, top-level navigation, heading and supporting line in Local Editor Preview. Stop recovery there; apply the design checklist only in a later task.
