// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world

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
});
