# Blue Square X Open House email

Open `index.html` in a browser with the `assets` folder beside it. No build or dependencies are required.

The email uses a 600px table layout with a mobile breakpoint at 480px. Text is editable HTML; artwork and speaker photos were extracted from the supplied PDFs. Browser layout checks passed at 320, 375, 480, 600, and 800px with no horizontal overflow or broken images.

Before sending:

- Both registration buttons use `https://bluesquare.my.salesforce-sites.com/BSXOpenHouseRSVP`.
- Replace the five social link placeholders with the correct brand profile URLs.
- Upload `assets/` to your email platform or public HTTPS image host, and replace all relative asset paths, including CSS backgrounds and Outlook VML sources, with their absolute URLs.
- Use your email platform's CSS inliner while retaining the responsive media query. Send test messages through your platform to Gmail, Apple Mail, and Outlook. Browser validation does not establish email-client compatibility. The hero includes Outlook VML; the gift section's background artwork may fall back to a plain dark background in classic Outlook.
- Add your mailing platform's required unsubscribe/preferences footer if this is a marketing mailing.

The mobile PDF lists the Enterprise AV Panel at 1:30 PM, while the desktop lists 3:00 PM. The HTML consistently uses the desktop's 3:00 PM; confirm before sending. PDFs supplied no clickable registration or social destinations.

For a local HTTP preview, run `python3 -m http.server 8000 --bind 127.0.0.1` from this directory.
