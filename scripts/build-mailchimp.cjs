// Run with NODE_PATH pointing to an installation of juice (12.2.0).
const fs = require('fs');
const juiceModule = require('juice');
const juice = juiceModule.default || juiceModule;
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/\.gift\{background-color:[^}]+\}/, ".gift{background-color:#1c1d23;background-image:url('assets/gift-background.png');background-repeat:no-repeat;background-position:center;background-size:100% 100%;border-radius:11px;color:#fff}");
html = html.replace('background-size:100% 100%,55% auto!important;background-position:center,right -11px center!important', 'background-size:100% 100%!important;background-position:center!important');
html = html.replace('<body>', '<body style="margin:0;padding:0;background-color:#ffffff;color:#202126;font-family:Arial,Helvetica,sans-serif">');
html = html.replace('.shell{width:600px;max-width:600px}', '.shell{width:100%;max-width:600px}');
// Add table defaults explicitly, including nested layout tables.
html = html.replace(/<table role="presentation"/g, '<table role="presentation" cellpadding="0" cellspacing="0" border="0"');
// Use a presentation table for social marks, avoiding inline-block dependence in Outlook.
html = html.replace(/(<tr><td align="center" class="social"[^>]*>)([\s\S]*?)(<\/td><\/tr><\/table><!--\[if mso\])/,
 (_, start, content, end) => start + '<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr>' + [...content.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/g)].map(m=>'<td style="padding:0 3px">'+m[0]+'</td>').join('') + '</tr></table>' + end);
const gift = /<table role="presentation"[^>]*class="gift"[^>]*><tr><td class="gift-copy">([\s\S]*?)<\/td><td><\/td><\/tr><\/table>/;
html = html.replace(gift, (_,copy)=>`<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="gift" style="margin-top:59px"><tr><td background="assets/gift-background.png" bgcolor="#1c1d23" style="border-radius:11px;overflow:hidden;background-image:url('assets/gift-background.png');background-size:100% 100%;background-repeat:no-repeat;background-position:center">
<!--[if gte mso 9]><v:rect fill="true" stroke="false" style="width:480px;height:179px"><v:fill type="frame" src="assets/gift-background.png" color="#1c1d23"/><v:textbox inset="0,0,0,0"><![endif]-->
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td class="gift-copy">${copy}</td><td></td></tr></table>
<!--[if gte mso 9]></v:textbox></v:rect><![endif]-->
</td></tr></table>`);
if (!html.includes('background="assets/gift-background.png"')) throw new Error('Gift transformation failed');
// Mailchimp requires a working audience-based unsubscribe and mailing address.
html = html.replace('</td></tr></table><!--[if mso]></td></tr></table><![endif]--></td></tr></table></body>', `</td></tr>
<tr><td align="center" style="padding:0 30px 24px;color:#777777;font-size:11px;line-height:17px;font-family:Arial,Helvetica,sans-serif">
<p style="font-size:11px;line-height:17px">&copy; *|CURRENT_YEAR|* *|LIST:COMPANY|*. All rights reserved.</p>
<p style="font-size:11px;line-height:17px;margin-top:8px">*|HTML:LIST_ADDRESS_HTML|*</p>
<p style="font-size:11px;line-height:17px;margin-top:8px"><a href="*|UPDATE_PROFILE|*">Update preferences</a> &nbsp;|&nbsp; <a href="*|UNSUB|*">Unsubscribe</a></p>
</td></tr></table><!--[if mso]></td></tr></table><![endif]--></td></tr></table></body>`);
html = juice(html, {removeStyleTags:true, preserveMediaQueries:true, applyWidthAttributes:true, applyHeightAttributes:true, applyAttributesTableElements:true});
if (html.includes('data:image')) throw new Error('Embedded images are not allowed in the Mailchimp package');
if (!html.includes('*|UNSUB|*')) throw new Error('Missing unsubscribe footer');
fs.writeFileSync('mailchimp/index.html', html);
console.log('Built Mailchimp HTML:', Buffer.byteLength(html), 'bytes');
