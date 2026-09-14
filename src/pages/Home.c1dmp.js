// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world
import { to } from 'wix-location-frontend';

// Navigation shortcuts to existing Wix category IDs and category-page URLs.
// Product records, prices, stock, and product media remain Wix-managed.
const categoryShortcuts = [
    { _id: '8fe8d0a5-f4fc-4b3b-b4a5-1da77dc2802a', label: 'School Bags', description: 'Ready for new adventures', link: '/category/anh-vibes-school-bags', image: 'https://static.wixstatic.com/media/339216_f561241ef8c84baa9e175aaaee7c1f29~mv2.png', alt: 'Colorful AnH Vibes school bags' },
    { _id: 'd37356e5-e3ae-4791-9769-430df403c659', label: 'Ladies Handbags', description: 'Style for every story', link: '/category/anh-vibes-ladies-handbags', image: 'https://static.wixstatic.com/media/339216_cd05ec321106425994439a78156c80c0~mv2.png', alt: 'AnH Vibes ladies handbags' },
    { _id: '6513bc42-f7c0-4f0e-9474-b2733bec2a79', label: 'Soft Toys', description: 'Little friends, big happiness', link: '/category/anh-vibes-soft-toys', image: 'https://static.wixstatic.com/media/339216_28e328c80cf246228773aac2974aace1~mv2.png', alt: 'AnH Vibes soft toys' },
    { _id: 'd07cde96-3f30-44f1-adff-d1701422688d', label: 'Bottles', description: 'Sip happy, stay refreshed', link: '/category/anh-vibes-bottles', image: 'https://static.wixstatic.com/media/339216_d28bdf6319874d299b39da2c4f51df6d~mv2.png', alt: 'AnH Vibes bottles' },
    { _id: 'c91b348a-76b7-45e9-a7e7-19d7eecc6fc4', label: 'Stationery', description: 'Create. Learn. Grow.', link: '/category/anh-vibes-stationery', image: 'https://static.wixstatic.com/media/339216_fbb962b3f74d4522a8a4979aca0f2b65~mv2.png', alt: 'AnH Vibes stationery' },
    { _id: 'a4f0d639-549f-474c-af07-f3e5698e401e', label: 'Gift Items', description: 'For every special moment', link: '/category/anh-vibes-gift-items', image: 'https://static.wixstatic.com/media/339216_5ff8f7a4c7ff4b76a745fc7ca574aa53~mv2.png', alt: 'AnH Vibes gift items' },
    { _id: '9a98a02e-664f-4d2f-b316-1d6554bfce45', label: 'Lunch Boxes', description: 'Happy meals on the go', link: '/category/anh-vibes-lunch-boxes', image: 'https://static.wixstatic.com/media/339216_6ea3fe30ef0344d08403cd407e66b50f~mv2.png', alt: 'AnH Vibes lunch boxes' },
];

// Wix Media's documented fill transform supplies one actual 4:3 image crop.
// The saved Studio image-element shape and repeater layout remain canvas settings.
const categoryCrop = (url) => `${url}/v1/fill/w_640,h_480/file.png`;

// Wix Studio loads src/styles/global.css in RUN/PLAY. Classes affect only the
// known Home elements and do not alter the saved Editor canvas.
const addPrototypeClass = (element, className) => {
    if (element.customClassList) {
        element.customClassList.add(className);
    }
};

$w.onReady(function () {
    addPrototypeClass($w('#box41'), 'anh-hero-card');
    addPrototypeClass($w('#imageX6'), 'anh-hero-image');
    addPrototypeClass($w('#button6'), 'anh-primary-cta');
    addPrototypeClass($w('#section8'), 'anh-category-section');

    // Only replace the confirmed template hero; the visual layout is saved in Wix Studio.
    const heroTexts = [$w('#text18'), $w('#text17')];
    const heading = heroTexts.find((element) => /Handcrafted\s+Wooden\s+Toys/i.test(element.text));
    if (heading) {
        const supportingCopy = heroTexts.find((element) => element !== heading);
        addPrototypeClass(heading, 'anh-hero-heading');
        addPrototypeClass(supportingCopy, 'anh-hero-copy');
        heading.html = '<p style="color: #b35e71; font-size: 14px; font-weight: 700; letter-spacing: 2px">WELCOME TO ANH VIBES</p><h1>Little Things.<br><span style="color: #df7897">Happy Vibes.</span></h1>';
        supportingCopy.text = 'Playful essentials, thoughtful gifts and everyday accessories for brighter days.';
    }

    const shopButton = $w('#button6');
    shopButton.label = 'Shop All Categories →';
    shopButton.link = '';
    shopButton.onClick(() => $w('#section8').scrollTo());

    // Generated types place #imageX6 beside the hero text and CTA. RUN mode
    // must confirm this is the visible hero image, not a canvas background.
    const heroImage = $w('#imageX6');
    heroImage.src = 'https://static.wixstatic.com/media/339216_0f44dc865743436f83f3654fe6dfef9f~mv2.png';
    heroImage.alt = 'AnH Vibes bags, toys, school essentials and gifts';

    // Reuse the category repeater only when its rendered labels identify it
    // as the old three-card section. Seven items share its existing template.
    const categoryRepeater = $w('#repeater1');
    addPrototypeClass(categoryRepeater, 'anh-category-grid');
    const oldCategoryLabels = new Set(['Blocks & Stacking', 'Vehicles', 'Animals']);
    const foundOldCategoryLabels = new Set();
    categoryRepeater.forEachItem(($item) => {
        const label = $item('#text20').text.trim();
        if (oldCategoryLabels.has(label)) {
            foundOldCategoryLabels.add(label);
        }
    });
    if (foundOldCategoryLabels.size === 3) {
        $w('#text19').html = '<p style="color: #b35e71; font-size: 14px; font-weight: 700; letter-spacing: 2px">EXPLORE OUR COLLECTION</p><h2>Shop By Category <span style="color: #df7897">♥</span></h2><p style="color: #5a6070; font-size: 17px">Discover playful essentials for every happy moment.</p>';
        addPrototypeClass($w('#text19'), 'anh-category-heading');
        categoryRepeater.onItemReady(($item, itemData) => {
            const label = $item('#text20');
            const image = $item('#imageX7');
            addPrototypeClass($item('#box46'), 'anh-category-card');
            addPrototypeClass(label, 'anh-category-label');
            addPrototypeClass(image, 'anh-category-image');
            label.html = `<a href="${itemData.link}"><span style="font-size: 22px; font-weight: 700; color: #27304a">${itemData.label}</span><span style="font-size: 22px; color: #df7897"> →</span><br><span style="font-size: 14px; color: #5a6070">${itemData.description}</span></a>`;
            image.src = categoryCrop(itemData.image);
            image.link = itemData.link;
            image.alt = itemData.alt;
            $item('#box46').onClick(() => {
                // The image and title remain native links for keyboard navigation.
                // This container handler makes the card's blank area clickable.
                to(itemData.link);
            });
            image.expand();
            image.show();
        });
        categoryRepeater.data = categoryShortcuts;
        console.info('[AnH Vibes] Replaced three template category items with seven linked Wix Media image cards.');
    } else {
        console.info('[AnH Vibes] Category repeater left unchanged; template labels were not all found.');
    }

    // These generated text clusters sit in the old sections reported by the
    // owner. Hide a whole section only when its own text still identifies
    // wooden-toy/template merchandising; an unidentified section is retained.
    const templateSections = [
        { section: '#section9', texts: ['#text21', '#text22'], pattern: /wooden\s+toys?|handcrafted\s+wooden/i },
    ];
    for (const { section, texts, pattern } of templateSections) {
        const sectionCopy = texts.map((id) => $w(id).text).join(' ');
        if (pattern.test(sectionCopy)) {
            $w(section).collapse();
            console.info(`[AnH Vibes] Collapsed old template Home section ${section}.`);
        }
    }

    // Keep the existing Best Sellers area available for RUN/PLAY inspection.
    // Its #gridGallery1 data source still needs verification in Wix Studio.
    $w('#section10').expand();
    $w('#section10').show();

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
