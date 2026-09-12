# Sutton Garden Kitchen — SEO review

Reviewed 12 September 2026. The pre-launch website review and code improvements are complete. Public-site checks remain dependent on domain registration and deployment.

## Main finding

The owner confirmed that registration of **sutton-gardens-kitchen.co.uk** is still pending. During the review, the apex and www names did not resolve; the previously configured Sites address returned HTTP 401. This is a launch dependency, not evidence of a ranking penalty. Google needs publicly accessible content to crawl the website. The Google Maps listing and website are separate services. [Google’s local business guidance](https://developers.google.com/search/docs/appearance/structured-data/local-business)

The repository is now prepared for **https://sutton-gardens-kitchen.co.uk/**. Its canonical, sitemap, robots sitemap declaration, sharing URL and structured-data identifiers agree. The previous inaccessible preview address has been removed from production HTML. These changes do not publish the website or configure DNS. [Google’s canonical URL guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)

## Improvements completed

| Area | Finding | Change |
|---|---|---|
| Site identity | Production metadata pointed to an unpublished preview address | Prepared every site URL for the owner’s intended domain |
| Local relevance | The opening paragraph did not name the business or Sutton | Added the café name, Sutton and Norfolk naturally; clarified menu and visit labels |
| Search description | Description lacked the local place name | Added a concise description covering café, location, food and hours |
| Structured data | Café data was already substantial; site-name markup was absent | Added WebSite data and `og:site_name`; retained accurate CafeOrCoffeeShop data and supplied a Google-compatible menu URL |
| Logo | A 1.45 MB PNG was loaded for a 300px-wide header image | Added 300/600/900px WebP copies; retained the complete original logo |
| Photography | Every display image loaded its original file | Added 38 responsive WebP variants across 12 source assets, with `srcset`, `sizes`, correct dimensions and async decoding |
| Fonts | Three TTF files totalled 370 KB | Added equivalent WOFF2 files totalling 127 KB, preserving every glyph and license |
| Hidden photo viewer | A closed dialog fetched a 103 KB piano image | Replaced it with an inline transparent placeholder; full photo loads on opening |
| Gallery links | Enlargement was available only through JavaScript buttons | Added real links to original photos, enhanced by the existing dialog; modifier-clicks retain browser behaviour |
| Regression checks | Checks did not cover responsive resources or all structured-data blocks | Added checks for source candidates, dimensions, WOFF2 signatures, gallery links and consistent site identity |

The original hippy design, prominent logo, always-visible text menus, food prices, address, phone, hours, Maps and what3words links remain. No review ratings, amenities, dietary promises or awards have been invented. The site stays a focused single page instead of adding thin location pages.

Descriptive image filenames, meaningful alternative text, responsive sources and crawlable image URLs support image discovery and usability. WebSite markup helps communicate the preferred site name. [Google’s image guidance](https://developers.google.com/search/docs/appearance/google-images), [site-name guidance](https://developers.google.com/search/docs/appearance/site-names)

## Measured asset savings

| Raw file budget | Before | After | Reduction |
|---|---:|---:|---:|
| Header logo’s default file | 1,450,683 B | 36,084 B | 97.5% |
| Default eager images, including the old hidden-dialog request | 2,222,331 B | 192,372 B | 91.3% |
| Unique default image sources across the page | 4,064,133 B | 1,249,416 B | 69.3% |
| All three fonts | 370,008 B | 127,440 B | 65.6% |

These are file-size comparisons, not measured load-time improvements or Core Web Vitals scores. A browser selects responsive image candidates according to screen size and pixel density; lazy loading can also fetch nearby images. All 25 original supplied pictures, the full-size recreated logo and original fonts are preserved. Records: [image variants](image-optimization.json), [font validation](font-optimization.json), [asset budgets](seo-asset-budgets.json).

## Validation performed

- Local checks passed for 72 asset references, responsive dimensions, fonts, anchors, visible menus, original gallery links, business data and canonical consistency.
- HTML tag nesting and the XML sitemap parsed successfully.
- Local HTTP requests returned 200 for the page, styles, robots.txt, sitemap, WebP and WOFF2 files with appropriate content types. A missing path returned 404.
- All 38 image variants were checked against their recorded pixel sizes and bytes. Representative logo and hero outputs were visually inspected as image files.
- Font conversion checks found identical glyphs, character maps, names, styles and outlines. The file container changed; the typography did not.
- Gallery code was reviewed for normal activation, modified clicks, original-image selection and closing behaviour.

This review did not run browser interaction tests, Lighthouse, a live Google Rich Results Test or Search Console inspection. It cannot verify public indexing, production caching/compression, mobile Core Web Vitals or the owner’s Google account state before launch. No numerical “SEO score” or ranking guarantee is claimed.

## Launch checks, in order

1. **Finish domain registration and publish.** Connect the domain using the chosen host’s exact records. Public HTTPS must serve the café page with HTTP 200 and no authentication or `noindex` response header.
2. **Check the primary hostname.** Redirect HTTP and www aliases to the HTTPS apex domain. Confirm unknown pages return 404 rather than serving the home page with a successful status. Enable the host’s normal text compression and static-asset caching; recheck font/image content types.
3. **Finish Google Business Profile details.** The owner confirmed **Sutton Garden Kitchen**, singular. Check the actual profile name because the share-link redirect uses “Gardens”. Keep the café category, address, phone, map pin, regular and holiday hours accurate. Add the live website URL and useful approach/interior/food photos; complete any verification requested by Google. [Google’s local ranking guidance](https://support.google.com/business/answer/7091?hl=en-GB)
4. **Verify Search Console.** Use an account controlled by the owner, add the domain property and its exact DNS verification record, then submit `https://sutton-gardens-kitchen.co.uk/sitemap.xml`. Inspect the home page and request indexing after the live test succeeds. [Google’s sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
5. **Validate the live result.** Run the Google Rich Results Test for café structured data and PageSpeed Insights for mobile performance. Check the live canonical, browser layout and buttons. Site-name markup is covered by separate Google guidance; it is not a promise of a rich result.
6. **Maintain real information.** Keep menu prices and availability aligned with Emma’s chalkboard. Keep profile hours current, invite genuine customer feedback and reply helpfully. Search Console can then show the actual queries, impressions and clicks worth responding to.

No DNS changes, hosting publication, Search Console submission or Google Business Profile edits were performed as part of this review.
