# Import this email into Mailchimp

Use **bsx-email-mailchimp.zip**, not the standalone browser HTML or `bsx-email-download.zip`.

1. In Mailchimp's custom-code template workflow, choose **Import ZIP** (often under **Code your own**). Availability and labels depend on your plan and editor.
2. Upload `bsx-email-mailchimp.zip` as-is. It contains `index.html` at the ZIP root and its image files in `assets/`. Do not unzip and paste the HTML into a drag-and-drop content block: the relative images need to be uploaded and rewritten by the ZIP importer.
3. Preview desktop and mobile. Mailchimp should host and rewrite local image references. Confirm the hero building, gradient banner, portraits, and button arrows all load. If a background is missing, upload `hero-building.jpg` and `gift-background.png` to Content Studio and replace the matching `background`, inline CSS `url(...)`, and VML `src` references with those hosted HTTPS URLs.
4. Both registration buttons link to https://bluesquare.my.salesforce-sites.com/BSXOpenHouseRSVP. Replace the five social links, which still use clearly named example.com placeholders, before sending.
5. Preview using audience data so Mailchimp resolves the company, year, mailing address, unsubscribe, and preference merge tags. Confirm the audience's physical address is correct.
6. Send a test through Mailchimp and check the actual desktop/mobile inboxes before sending a campaign. No Mailchimp account, import, or inbox testing was performed from this workspace.

## Changes for Mailchimp

- Critical desktop CSS is inline, including the hero padding, fonts, buttons, portraits, speaker row spacing, and company alignment. Media queries remain for mobile.
- Uses regular image files instead of embedded base64 images. HTML is approximately 23 KB before Mailchimp processing.
- The swag banner gradient is rendered into one background image with the editable text on top. This avoids dependence on CSS gradients or multiple background layers. Outlook VML fallbacks are included for the hero and swag banner.
- Presentation tables have explicit cell padding, spacing, and border settings. Social icons use a table row.
- Includes Mailchimp audience-based unsubscribe, preferences, and mailing-address footer tags.

The editable source for this variant is `mailchimp/index.html`. To rebuild it after changing `index.html`, run `scripts/build-mailchimp.cjs` with Node and Juice 12.2.0 installed (for example in a temporary directory with `NODE_PATH` set). The flattened banner asset is already retained in `mailchimp/assets/gift-background.png`; update it too if the original banner artwork or gradient changes. Package only `mailchimp/index.html` and `mailchimp/assets/` at the ZIP root.
