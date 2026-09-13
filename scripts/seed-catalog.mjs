/**
 * DEVELOPMENT SETUP ONLY — seeds the connected Wix Stores Catalog V3.
 *
 * Dry run: node scripts/seed-catalog.mjs
 * Write:   node scripts/seed-catalog.mjs --apply --site-id <wix.config.json siteId>
 *
 * Wix app catalog data is live site data even when code is tested in preview.
 * This script refuses writes when Wix reports a published site URL. It never
 * deletes or rewrites existing catalog records and stores no credentials.
 */

import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const siteId = JSON.parse(readFileSync(resolve('wix.config.json'), 'utf8')).siteId;
const cliPath = resolve('node_modules/@wix/cli/bin/wix.cjs');
const apply = process.argv.includes('--apply');
const siteFlag = process.argv.indexOf('--site-id');
const suppliedSiteId = siteFlag >= 0 ? process.argv[siteFlag + 1] : undefined;
const validFlags = new Set(['--apply', '--site-id', siteId]);
if (process.argv.slice(2).some((arg) => !validFlags.has(arg))) {
  throw new Error('Usage: node scripts/seed-catalog.mjs [--apply --site-id <configured-site-id>]');
}
if (apply && suppliedSiteId !== siteId) {
  throw new Error('Write mode requires --site-id matching wix.config.json.');
}

const treeReference = { appNamespace: '@wix/stores' };
const productAppId = '215238eb-22a5-4c36-9e7b-e7c08025e04e';
const base = 'https://www.wixapis.com';
const taxonomy = [
  ['School Bags', ['Preschool Bags', 'Boys Bags', 'Girls Bags', 'Character Bags', 'Trolley Bags', 'Backpack Sets']],
  ['Ladies Handbags', ['Handbags', 'Sling Bags', 'Tote Bags', 'Wallets', 'Clutches']],
  ['Soft Toys', ['Teddy Bears', 'Animal Plush', 'Character Plush', 'Large Soft Toys', 'Mini Soft Toys']],
  ['Bottles', ['Kids Bottles', 'Insulated Bottles', 'Steel Bottles', 'Sippers', 'Character Bottles']],
  ['Stationery', ['Pencil Cases', 'Pens & Pencils', 'Art Sets', 'School Sets', 'Diaries & Notebooks']],
  ['Gift Items', ['Birthday Gifts', 'Return Gifts', 'Gifts for Girls', 'Gifts for Boys', 'Gift Sets']],
  ['Lunch Boxes', ['Bento Lunch Boxes', 'Steel Lunch Boxes', 'Compartment Lunch Boxes', 'Character Lunch Boxes', 'Lunch Sets']],
];

// Original demo copy. Prices are CAD, not a statement of real inventory/value.
const demos = [
  ['Galaxy Explorer Kids Backpack', 'School Bags', 'Preschool Bags', '49.00', 'A space-inspired backpack concept for little explorers. Development demo; product details and imagery will be finalized before launch.'],
  ['Rainbow Dreams School Bag', 'School Bags', 'Girls Bags', '45.00', 'A bright school bag concept designed for colorful everyday adventures. Development demo; product details and imagery will be finalized before launch.'],
  ['Everyday Elegance Tote', 'Ladies Handbags', 'Tote Bags', '59.00', 'A versatile tote concept with an understated everyday look. Development demo; product details and imagery will be finalized before launch.'],
  ['Classic Crossbody Bag', 'Ladies Handbags', 'Sling Bags', '48.00', 'A compact crossbody concept for easy everyday carrying. Development demo; product details and imagery will be finalized before launch.'],
  ['Cuddly Teddy Bear', 'Soft Toys', 'Teddy Bears', '29.00', 'A friendly teddy bear concept ready for thoughtful gifting. Development demo; product details and imagery will be finalized before launch.'],
  ['Happy Bunny Plush', 'Soft Toys', 'Animal Plush', '27.00', 'A cheerful bunny plush concept with a playful personality. Development demo; product details and imagery will be finalized before launch.'],
  ['Space Adventure Bottle', 'Bottles', 'Kids Bottles', '22.00', 'A space-themed bottle concept for busy school days. Development demo; materials, capacity, and imagery will be finalized before launch.'],
  ['Rainbow Insulated Bottle', 'Bottles', 'Insulated Bottles', '32.00', 'A colorful insulated-bottle concept for daily use. Development demo; performance details and imagery will be finalized before launch.'],
  ['Creative Kids Stationery Set', 'Stationery', 'School Sets', '25.00', 'A school stationery set concept for creative routines. Development demo; contents and imagery will be finalized before launch.'],
  ['Unicorn Pencil Case', 'Stationery', 'Pencil Cases', '16.00', 'A whimsical pencil-case concept for keeping school essentials together. Development demo; details and imagery will be finalized before launch.'],
  ['Birthday Surprise Gift Set', 'Gift Items', 'Birthday Gifts', '39.00', 'A birthday gift-set concept made for a joyful reveal. Development demo; included items and imagery will be finalized before launch.'],
  ['Little Joy Gift Box', 'Gift Items', 'Gift Sets', '34.00', 'A small gift-box concept for an everyday celebration. Development demo; included items and imagery will be finalized before launch.'],
  ['Dino Bento Lunch Box', 'Lunch Boxes', 'Bento Lunch Boxes', '28.00', 'A dinosaur-themed bento lunch-box concept for school lunches. Development demo; materials, dimensions, and imagery will be finalized before launch.'],
  ['Rainbow Compartment Lunch Box', 'Lunch Boxes', 'Compartment Lunch Boxes', '26.00', 'A colorful compartment lunch-box concept for daily meals. Development demo; materials, dimensions, and imagery will be finalized before launch.'],
];

const slug = (value) => value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const catalogKey = (name, parentId = '') => `${parentId}\u0000${name.toLowerCase()}`;
const productHandle = (name) => `anh-vibes-demo-${slug(name)}`;

let token;
try {
  token = execFileSync(process.execPath, [cliPath, 'token', '-s', siteId], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
} catch {
  throw new Error('A Wix CLI site-scoped token is unavailable. Run wix login; no catalog writes occurred.');
}
if (!token) throw new Error('Wix CLI returned an empty site-scoped token.');

async function request(method, path, body) {
  const response = await fetch(`${base}${path}`, {
    method,
    headers: {
      Authorization: token,
      'wix-site-id': siteId,
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = result.message || result.details?.message || result.error || response.statusText;
    throw new Error(`${method} ${path} failed (${response.status}): ${message}`);
  }
  return result;
}

async function listCategories() {
  const result = await request('POST', '/categories/v1/categories/query', {
    treeReference,
    query: { paging: { limit: 1000 } },
  });
  if (result.pagingMetadata?.hasNext) throw new Error('Category query was paginated; refusing an incomplete duplicate check.');
  return result.categories || [];
}

async function listProducts() {
  const result = await request('POST', '/stores/v3/products/query', { query: { paging: { limit: 100 } } });
  if (result.pagingMetadata?.hasNext) throw new Error('Product query was paginated; refusing an incomplete duplicate check.');
  return result.products || [];
}

async function main() {
  const version = await request('GET', '/stores/v3/provision/version');
  if (version.catalogVersion !== 'V3_CATALOG') throw new Error(`Expected Catalog V3; received ${version.catalogVersion || 'unknown'}.`);
  const properties = await request('GET', '/site-properties/v4/properties');
  if (properties.properties?.paymentCurrency !== 'CAD') {
    throw new Error(`Site payment currency is ${properties.properties?.paymentCurrency || 'unknown'}, not CAD. No writes occurred.`);
  }
  const published = await request('GET', '/urls-server/v2/published-site-urls');
  if (apply && (published.urls || []).length) throw new Error('Site has published URLs; development seeding is disabled.');

  const categories = await listCategories();
  const products = await listProducts();
  const categoryByKey = new Map(categories.map((category) => [catalogKey(category.name, category.parentCategory?.id), category]));
  const existingByName = new Map(products.map((product) => [product.name.toLowerCase(), product]));
  const plan = { siteId, catalogVersion: version.catalogVersion, currency: 'CAD', publishedUrls: (published.urls || []).length,
    existingCategories: categories.length, existingProducts: products.length, createCategories: [], createProducts: [], reuseProducts: [] };

  for (const [rootName, leaves] of taxonomy) {
    const existingRoot = categoryByKey.get(catalogKey(rootName));
    if (!existingRoot) plan.createCategories.push(rootName);
    for (const leaf of leaves) {
      if (!existingRoot || !categoryByKey.has(catalogKey(leaf, existingRoot.id))) plan.createCategories.push(`${rootName} > ${leaf}`);
    }
  }
  for (const [name] of demos) {
    const existing = existingByName.get(name.toLowerCase());
    if (existing && existing.handle !== productHandle(name)) {
      throw new Error(`Product name collision for "${name}" with a non-demo record; refusing to proceed.`);
    }
    (existing ? plan.reuseProducts : plan.createProducts).push(name);
  }
  console.log(JSON.stringify(plan, null, 2));
  if (!apply) {
    console.log('DRY RUN ONLY. Wix catalog data was not changed.');
    return;
  }

  const changes = { categoriesCreated: [], productsCreated: [], productsReused: [], categoryAssignmentsCreated: [] };
  for (const [rootName, leaves] of taxonomy) {
    let root = categoryByKey.get(catalogKey(rootName));
    if (!root) {
      const response = await request('POST', '/categories/v1/categories', {
        treeReference, category: { name: rootName, slug: `anh-vibes-${slug(rootName)}`, visible: true },
      });
      root = response.category;
      if (!root?.id) throw new Error(`Wix did not return an ID for category ${rootName}.`);
      categoryByKey.set(catalogKey(rootName), root);
      changes.categoriesCreated.push({ name: rootName, id: root.id });
    }
    for (const leafName of leaves) {
      const key = catalogKey(leafName, root.id);
      if (categoryByKey.has(key)) continue;
      const response = await request('POST', '/categories/v1/categories', {
        treeReference, category: { name: leafName, slug: `anh-vibes-${slug(rootName)}-${slug(leafName)}`, parentCategory: { id: root.id }, visible: true },
      });
      const leaf = response.category;
      if (!leaf?.id) throw new Error(`Wix did not return an ID for ${rootName} > ${leafName}.`);
      categoryByKey.set(key, leaf);
      changes.categoriesCreated.push({ name: `${rootName} > ${leafName}`, id: leaf.id });
    }
  }

  for (const [name, rootName, leafName, price, description] of demos) {
    const root = categoryByKey.get(catalogKey(rootName));
    const leaf = categoryByKey.get(catalogKey(leafName, root.id));
    let product = existingByName.get(name.toLowerCase());
    if (!product) {
      const response = await request('POST', '/stores/v3/products-with-inventory', {
        product: {
          name, handle: productHandle(name), slug: productHandle(name), plainDescription: `<p>${description}</p>`,
          productType: 'PHYSICAL', physicalProperties: {}, mainCategoryId: leaf.id, visible: true,
          variantsInfo: { variants: [{ price: { actualPrice: { amount: price } }, physicalProperties: {}, inventoryItem: { inStock: true } }] },
        },
      });
      product = response.product;
      if (!product?.id) throw new Error(`Wix did not return an ID for product ${name}.`);
      existingByName.set(name.toLowerCase(), product);
      changes.productsCreated.push({ name, id: product.id, category: `${rootName} > ${leafName}`, cadPrice: price });
    } else {
      changes.productsReused.push({ name, id: product.id });
    }
    const details = await request('GET', `/stores/v3/products/${encodeURIComponent(product.id)}?fields=DIRECT_CATEGORIES_INFO`);
    const directIds = new Set((details.product?.directCategoriesInfo?.categories || []).map((category) => category.id));
    if (!directIds.has(leaf.id)) {
      await request('POST', `/categories/v1/bulk/categories/${encodeURIComponent(leaf.id)}/add-items`, {
        treeReference, items: [{ appId: productAppId, catalogItemId: product.id }],
      });
      changes.categoryAssignmentsCreated.push({ product: name, category: `${rootName} > ${leafName}` });
    }
  }
  console.log('APPLIED DEVELOPMENT SEED:');
  console.log(JSON.stringify(changes, null, 2));
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
