// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world

const categoryLink = (slug) => `/category/anh-vibes-${slug}`;
const categoryMenu = (label, slug, subcategories) => ({
    label,
    link: categoryLink(slug),
    menuItems: subcategories.map(([name, childSlug]) => ({
        label: name,
        link: categoryLink(`${slug}-${childSlug}`),
    })),
});

$w.onReady(function () {
    // These are the verified Wix Catalog V3 category slugs, not a product catalog.
    // The Editor controls menu layout and the mobile hamburger at each breakpoint.
    for (const element of $w('Text')) {
        if (element.text.includes('Poppy & Lily')) {
            element.text = element.text.replace(/Poppy & Lily/g, 'AnH Vibes');
        }
    }

    $w('#horizontalMenu1').menuItems = [
        { label: 'Home', link: '/' },
        categoryMenu('School Bags', 'school-bags', [
            ['Preschool Bags', 'preschool-bags'], ['Boys Bags', 'boys-bags'],
            ['Girls Bags', 'girls-bags'], ['Character Bags', 'character-bags'],
            ['Trolley Bags', 'trolley-bags'], ['Backpack Sets', 'backpack-sets'],
        ]),
        categoryMenu('Ladies Handbags', 'ladies-handbags', [
            ['Handbags', 'handbags'], ['Sling Bags', 'sling-bags'],
            ['Tote Bags', 'tote-bags'], ['Wallets', 'wallets'], ['Clutches', 'clutches'],
        ]),
        categoryMenu('Soft Toys', 'soft-toys', [
            ['Teddy Bears', 'teddy-bears'], ['Animal Plush', 'animal-plush'],
            ['Character Plush', 'character-plush'], ['Large Soft Toys', 'large-soft-toys'],
            ['Mini Soft Toys', 'mini-soft-toys'],
        ]),
        categoryMenu('Bottles', 'bottles', [
            ['Kids Bottles', 'kids-bottles'], ['Insulated Bottles', 'insulated-bottles'],
            ['Steel Bottles', 'steel-bottles'], ['Sippers', 'sippers'],
            ['Character Bottles', 'character-bottles'],
        ]),
        categoryMenu('Stationery', 'stationery', [
            ['Pencil Cases', 'pencil-cases'], ['Pens & Pencils', 'pens-and-pencils'],
            ['Art Sets', 'art-sets'], ['School Sets', 'school-sets'],
            ['Diaries & Notebooks', 'diaries-notebooks'],
        ]),
        categoryMenu('Gift Items', 'gift-items', [
            ['Birthday Gifts', 'birthday-gifts'], ['Return Gifts', 'return-gifts'],
            ['Gifts for Girls', 'gifts-for-girls'], ['Gifts for Boys', 'gifts-for-boys'],
            ['Gift Sets', 'gift-sets'],
        ]),
        categoryMenu('Lunch Boxes', 'lunch-boxes', [
            ['Bento Lunch Boxes', 'bento-lunch-boxes'], ['Steel Lunch Boxes', 'steel-lunch-boxes'],
            ['Compartment Lunch Boxes', 'compartment-lunch-boxes'],
            ['Character Lunch Boxes', 'character-lunch-boxes'], ['Lunch Sets', 'lunch-sets'],
        ]),
    ];
});
