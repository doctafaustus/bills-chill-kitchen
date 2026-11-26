# Real Kitchen Labs

A B2B landing page for a real-kitchen testing service: brands pay for filmed,
unscripted cook tests by real home cooks (mostly small cooking creators) on the
appliances their customers actually own. They get a findings report, a fix
list, and optional licensable footage.

## Where it lives

- Page: `public/real-kitchen-labs/index.html` and `labs.css`
- Live at `https://billschillkitchen.com/real-kitchen-labs/` until the
  `realkitchenlabs.com` domain is bought, then move it there.
- It reuses `/styles.css`, so it matches the main site's look.

## Kept hidden (accessible, not indexable)

- `<meta name="robots" content="noindex, nofollow">` on the page.
- `public/_headers` sends `X-Robots-Tag: noindex, nofollow` for `/real-kitchen-labs/*`.
- Not linked from any Bill's Chill Kitchen page and not in `sitemap.xml`.
  Don't add it to `robots.txt` either: a disallow would stop crawlers from
  seeing the noindex.
- The header and footer use `rkl-` class names, so `tools/sync_layout.py`
  won't inject the Bill's Chill Kitchen nav into this page.

## Pricing (on the page)

| Tier     | Cooks | Price   |
| -------- | ----- | ------- |
| Pilot    | 6     | $7,000  |
| Standard | 12    | $12,500 |
| Full     | 20    | $19,500 |

Priced at a modest discount to traditional in-home use tests ($15K to $75K+ per
study, per Peekage and Simporter estimates). Creator pay target: $50 to $100 per
session plus product reimbursement.

## Note to self: verifying appliances and wattage

Easy, and it doubles as the equipment database:

1. When a cook joins, they send a photo of each appliance's rating label (the
   sticker on the bottom or back with brand, model number, and wattage).
2. Look up the model number online if the label is hard to read.
3. For Full studies, optionally mail a plug-in watt meter (Kill A Watt type,
   about $20 to $30) so cooks can show actual draw while cooking. Labeled
   wattage often differs from real draw, which is itself a selling point.

## To do

- [ ] Buy `realkitchenlabs.com` (whois showed it unregistered) and move the page.
- [ ] Have a trademark attorney check the name. USPTO had no "Real Kitchen
      Labs" filing, but BRANDED LLC holds a live REAL KITCHEN mark for
      kitchen goods (classes 8, 21, 24).
- [ ] Replace the contact email (currently bill@billschillkitchen.com).
- [ ] Replace photo placeholders.
- [ ] Run the self-funded pilot: 5 sessions on one product, sample reel and
      one-page report, then pitch 20 brands.
