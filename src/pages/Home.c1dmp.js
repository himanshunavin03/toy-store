// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world

// Navigation shortcuts to existing Wix category IDs and category-page URLs.
// Product records, prices, stock, and product media remain Wix-managed.
const categoryShortcuts = [
    { _id: '8fe8d0a5-f4fc-4b3b-b4a5-1da77dc2802a', label: 'School Bags', link: '/category/anh-vibes-school-bags', image: 'https://static.wixstatic.com/media/339216_f561241ef8c84baa9e175aaaee7c1f29~mv2.png', alt: 'Colorful AnH Vibes school bags' },
    { _id: 'd37356e5-e3ae-4791-9769-430df403c659', label: 'Ladies Handbags', link: '/category/anh-vibes-ladies-handbags', image: 'https://static.wixstatic.com/media/339216_cd05ec321106425994439a78156c80c0~mv2.png', alt: 'AnH Vibes ladies handbags' },
    { _id: '6513bc42-f7c0-4f0e-9474-b2733bec2a79', label: 'Soft Toys', link: '/category/anh-vibes-soft-toys', image: 'https://static.wixstatic.com/media/339216_28e328c80cf246228773aac2974aace1~mv2.png', alt: 'AnH Vibes soft toys' },
    { _id: 'd07cde96-3f30-44f1-adff-d1701422688d', label: 'Bottles', link: '/category/anh-vibes-bottles', image: 'https://static.wixstatic.com/media/339216_d28bdf6319874d299b39da2c4f51df6d~mv2.png', alt: 'AnH Vibes bottles' },
    { _id: 'c91b348a-76b7-45e9-a7e7-19d7eecc6fc4', label: 'Stationery', link: '/category/anh-vibes-stationery', image: 'https://static.wixstatic.com/media/339216_fbb962b3f74d4522a8a4979aca0f2b65~mv2.png', alt: 'AnH Vibes stationery' },
    { _id: 'a4f0d639-549f-474c-af07-f3e5698e401e', label: 'Gift Items', link: '/category/anh-vibes-gift-items', image: 'https://static.wixstatic.com/media/339216_5ff8f7a4c7ff4b76a745fc7ca574aa53~mv2.png', alt: 'AnH Vibes gift items' },
    { _id: '9a98a02e-664f-4d2f-b316-1d6554bfce45', label: 'Lunch Boxes', link: '/category/anh-vibes-lunch-boxes', image: 'https://static.wixstatic.com/media/339216_6ea3fe30ef0344d08403cd407e66b50f~mv2.png', alt: 'AnH Vibes lunch boxes' },
];

$w.onReady(function () {
    // Only replace the confirmed template hero; the visual layout is saved in Wix Studio.
    const heroTexts = [$w('#text18'), $w('#text17')];
    const heading = heroTexts.find((element) => /Handcrafted\s+Wooden\s+Toys/i.test(element.text));
    if (heading) {
        const supportingCopy = heroTexts.find((element) => element !== heading);
        heading.text = 'Little Things. Happy Vibes.';
        supportingCopy.text = 'Bags, toys, school essentials and gifts for every little adventure.';
    }

    const shopButton = $w('#button6');
    shopButton.label = 'Shop School Bags';
    shopButton.link = '/category/anh-vibes-school-bags';

    // Generated types place #imageX6 beside the hero text and CTA. RUN mode
    // must confirm this is the visible hero image, not a canvas background.
    const heroImage = $w('#imageX6');
    heroImage.src = 'https://static.wixstatic.com/media/339216_0f44dc865743436f83f3654fe6dfef9f~mv2.png';
    heroImage.alt = 'AnH Vibes bags, toys, school essentials and gifts';

    // Reuse the category repeater only when its rendered labels identify it
    // as the old three-card section. Seven items share its existing template.
    const categoryRepeater = $w('#repeater1');
    const oldCategoryLabels = new Set(['Blocks & Stacking', 'Vehicles', 'Animals']);
    const foundOldCategoryLabels = new Set();
    categoryRepeater.forEachItem(($item) => {
        const label = $item('#text20').text.trim();
        if (oldCategoryLabels.has(label)) {
            foundOldCategoryLabels.add(label);
        }
    });
    if (foundOldCategoryLabels.size === 3) {
        $w('#text19').text = 'SHOP BY CATEGORY';
        categoryRepeater.onItemReady(($item, itemData) => {
            const label = $item('#text20');
            const image = $item('#imageX7');
            label.html = `<a href="${itemData.link}">${itemData.label}</a>`;
            image.src = itemData.image;
            image.link = itemData.link;
            image.alt = itemData.alt;
            image.expand();
            image.show();
        });
        categoryRepeater.data = categoryShortcuts;
        console.info('[AnH Vibes] Replaced three template category items with seven linked Wix Media image cards.');
    } else {
        console.info('[AnH Vibes] Category repeater left unchanged; template labels were not all found.');
    }

    // Update only recognizable template claims/copy. The related images,
    // press logos, review identities and embedded galleries remain canvas work.
    for (const element of $w('Text')) {
        const copy = element.text;
        if (/wooden\s+toys?|sustainable\s+play|eco-friendly\s+toys?/i.test(copy)) {
            element.text = 'AnH Vibes brings playful school essentials, thoughtful gifts and everyday accessories together.';
        } else if (/15\s*%/.test(copy)) {
            element.text = 'Back to school, but way more fun.';
        } else if (/^(?:as\s+)?seen\s+by\s*:?.*$/i.test(copy.trim())) {
            element.collapse();
        }
    }

    // Collapse the press-logo section only if the generated heading confirms
    // the owner-reported "Seen By" claim. Leave unrelated sections untouched.
    if (/^(?:as\s+)?seen\s+by\s*:?.*$/i.test($w('#text38').text.trim())) {
        $w('#section11').collapse();
    }
    // The generated #section13 cluster contains the review repeater and star
    // vectors. The owner's current template testimonials must not imply real
    // AnH Vibes customer feedback.
    $w('#section13').collapse();
});
