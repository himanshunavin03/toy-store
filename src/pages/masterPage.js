// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world

const categoryLink = (slug) => `/category/anh-vibes-${slug}`;

$w.onReady(function () {
    // Wix Stores category slugs are recorded in the project context.
    for (const element of $w('Text')) {
        if (element.text.includes('Poppy & Lily')) {
            element.text = element.text.replace(/Poppy & Lily/g, 'AnH Vibes');
        }
    }

    $w('#horizontalMenu1').menuItems = [
        { label: 'Home', link: '/' },
        { label: 'School Bags', link: categoryLink('school-bags') },
        { label: 'Ladies Handbags', link: categoryLink('ladies-handbags') },
        { label: 'Soft Toys', link: categoryLink('soft-toys') },
        { label: 'Bottles', link: categoryLink('bottles') },
        { label: 'More', menuItems: [
            { label: 'Stationery', link: categoryLink('stationery') },
            { label: 'Gift Items', link: categoryLink('gift-items') },
            { label: 'Lunch Boxes', link: categoryLink('lunch-boxes') },
        ] },
    ];
});
