# 1С:ЗУП Базовая — отдельная посадочная страница

Production entry: `../software-1c_business1c_zrp_uprav_personal_base.html`.
Local full-layout preview: `preview.html`. Regenerate: `node zup-basic/build-preview.mjs` from project root.
Check: `node zup-basic/verify.mjs`. Serve project root with an ordinary local HTTP server.

## What was inspected

Local original accounting page, both supplied copies, the three global stylesheets; published ZUP, Trade Management, consulting and 1C:Fresh pages. The project is plain HTML with server-side includes, not a JS framework. No hosting.json, component library, package manifest or existing local ZUP route was found.

Design reused: Verdana/Tahoma 15px; Arial headings 36/30/24px; 1080px W3 container; blue #2196F3, navy #090E99, yellow #FFFFCC, brown #795548 buttons; square corners; W3 cards, responsive table wrapper, native details/summary. Breakpoints 600/992px. New styling is scoped to this page; existing global CSS is untouched.

## Existing layout and publication

Production HTML retains the site's `sidebar.html`, `header.html`, `menu_nav7.html`, `footer.html` SSI directives. These files were absent locally. Their public snapshots and branding images are stored in reference solely to render a faithful preview. Do not replace production includes with the snapshots. The existing theme stylesheet and jQuery were vendored for the shared layout's dependencies.

Deploy the root HTML, `zup-basic/page.css`, `page.js`, `config.js`, `assets/*.webp`, and `reference/jquery-1.10.2.min.js`, `reference/w3-theme-indigo.css` to the existing SSI-enabled host. Do not deploy preview.html, build scripts, reference HTML snapshots or PNG masters. Add an incoming link from the published general ZUP page/menu and sitemap; those live sources are not available for editing in this workspace. No remote publication was performed.

## Real actions, not simulated orders

Buying opens the existing live basket in a native dialog iframe with the verified item `2900001856744&users=0`. With JS disabled or iframe restrictions, a normal basket link remains available. No client-created invoice, fake success message or new form backend is used. Invoice PDF, email and payment are entirely the existing basket's responsibility. No personal details or test order were submitted.

Consultation uses the company's existing phone number, with a link to its consultation service page. No new claim of free support or included installation is made.

The route map is in config.js. PROF/CORP point to real local explanatory sections until dedicated routes exist. General ZUP and cloud use verified published routes. No distinct software-rental route was found (the site's arenda-named product is real-estate management, not software rental); rental CTA calls the existing sales number. Replace this map when dedicated routes are published.

## Verified facts — 2026-09-02

Primary: https://v8.1c.ru/hrm/1s-zarplata-i-upravlenie-personalom-8-bazovaya/
Comparison: https://solutions.1c.ru/catalog/hrm/comparison
Versions: https://v8.1c.ru/hrm/versii-zup/
Functions: https://solutions.1c.ru/catalog/hrm/features
Working time: https://v8.1c.ru/hrm/uchet-ispolzovaniya-rabochego-vremeni/
Reporting service: https://v8.1c.ru/hrm/1s-otchetnost-v-sfr-fns-i-rosstat/
Upgrade: https://v8.1c.ru/hrm/perekhod-mezhdu-versiyami/
Price: https://v8.1c.ru/price/

Recommended retail electronic supply prices: Basic 11,100 RUB (2900001856744); PROF 39,700 RUB (2900001850223); CORP 190,900 RUB (2900001850230). These are not installation/support prices. Static checked price snapshot, not a live price feed. On price changes update config.js, static HTML (including title/description/FAQ/table) and verification expectations together.

Basic: one simultaneous user/computer/base, one organization per base, separate bases for different organizations allowed; no config code changes, client-server, RIB, COM/Automation, web client; thin client only with file base, no opening PROF/CORP databases. PROF adds collaboration with suitable licenses, multi-company and code changes. CORP adds expanded HR. Upgrade within edition 3 preserves data; no invented automatic/free upgrade promise.

## Photos and rationale

Built-in image generation, category ads-marketing; three unique scene assets, PNG masters plus optimized WebP. Full prompt set: image-prompts.json.
basic-payroll: a single payroll specialist checks time records and payroll — illustrates one-user Basic.
prof-team: two people at independent desktops — illustrates simultaneous work.
corp-hr: HR planning and recruitment — illustrates expanded HR processes rather than ordinary payroll.
Images are labelled as generated usage illustrations, not real clients, staff, endorsements, or software screenshots.

The conversion hypothesis: explicit product identity and price first; version switch prevents wrong-product purchases; honest limits before ordering; visual scenarios plus comparison explain why a more expensive edition may be needed; services are priced separately; purchase reuses familiar checkout. This is a design rationale, not a conversion guarantee. Validate with analytics after publication.

## Checks and limitations

Static verification is automated in verify.mjs. Full page and responsive browser QA are performed on the preview with actual shared layout snapshots. Live routes and basket are read-only checked; full payment/email/PDF fulfillment needs an authorized test on production. Legacy shared navigation/footer retain their existing markup and unrelated placeholder links; this page does not rewrite them.

Browser QA completed at 1280px desktop, 768px tablet and 390px mobile: no page-level horizontal overflow; the comparison table scrolls in its own region; all three WebP images load; FAQ opens; mobile menu opens/closes; version anchors navigate within the preview. The live basket renders in the dialog with the correct product SKU; closing clears the frame and restores button focus. No order was submitted. The older downloaded jQuery snapshot was incompatible with the shared footer's `.on()` usage; the page now uses the same 1.10.2 version referenced by the original site. Temporary viewport overrides were reset after checks.

Final fresh-tab browser console was empty. `node --check zup-basic/page.js` and `node zup-basic/verify.mjs` passed. The production URL itself remains untested until deployment; a local preview is not proof of publication.
