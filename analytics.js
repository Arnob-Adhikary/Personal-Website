// Google Analytics 4. Paste your Measurement ID (e.g. 'G-ABC123XYZ') below.
// While it is empty, nothing is loaded and no data is collected.
const GA_MEASUREMENT_ID = 'G-1F3DG13JB5';

if (GA_MEASUREMENT_ID) {
    const tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
    document.head.appendChild(tag);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);

    // CV downloads and LinkedIn/GitHub clicks are tracked by GA4's enhanced measurement;
    // email clicks are not, so record them as their own event.
    document.addEventListener('click', e => {
        const link = e.target.closest('a[href^="mailto:"]');
        if (link) gtag('event', 'email_click', { page_path: location.pathname });
    });
}
