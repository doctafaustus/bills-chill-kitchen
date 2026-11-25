#!/usr/bin/env python3
"""Write the shared header, sidebar, and footer into every page in public/.

Run this after adding or renaming a page:
    python3 tools/sync_layout.py

Edit SITE_NAV / RECIPES / SERIES below to change the menus. The script replaces the
contents of <header class="site-header">, <nav class="side-nav">, and
<footer class="site-footer"> on each page and marks the current page as active.
"""
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent / "public"
YOUTUBE = "https://www.youtube.com/@BillsChillKitchen"

# (url, label)
SITE_NAV = [("/", "Overview"), ("/about/", "About")]
# Newest first. Use None as the url for a recipe that's coming soon (shown, not linked).
RECIPES = [
    ("/recipes/cracker-crusted-chicken-tenders/", "Cracker-crusted chicken tenders"),
    ("/recipes/crispy-cranberry-chicken/", "Crispy cranberry chicken"),
    ("/recipes/balsamic-figs-blue-cheese/", "Balsamic figs with blue cheese"),
    ("/recipes/asian-fried-eggs/", "Asian fried eggs"),
]
SERIES = {
    "Bangers on a Budget": [
        ("/recipes/crispy-cranberry-chicken/", "Crispy cranberry chicken"),
    ],
}
HEADER_TABS = [("/", "Overview"), ("/#recipes", "Recipes"), ("/about/", "About")]


def page_url(path: pathlib.Path) -> str:
    rel = path.relative_to(ROOT).as_posix()
    if rel == "index.html":
        return "/"
    if rel.endswith("/index.html"):
        return "/" + rel[: -len("index.html")]
    return "/" + rel


def link(url, label, current, cls=""):
    active = url == current
    classes = " ".join(c for c in [cls, "active" if active else ""] if c)
    attr = f' class="{classes}"' if classes else ""
    return f'<a{attr} href="{url}">{label}</a>'


def header(current):
    def tab_active(url):
        if url == "/#recipes":
            return current.startswith("/recipes/")
        return url == current

    tabs = "\n".join(
        f'      <a{" class=\"active\"" if tab_active(u) else ""} href="{u}">{l}</a>' for u, l in HEADER_TABS
    )
    return (
        '\n    <a class="brand" href="/"><span class="brand-mark" aria-hidden="true">🍳</span> '
        'Bill\'s Chill Kitchen <span class="brand-sub">Recipes</span></a>\n'
        '    <nav class="header-tabs" aria-label="Sections">\n'
        f"{tabs}\n"
        "    </nav>\n"
        f'    <div class="header-right"><a href="{YOUTUBE}" rel="noopener">YouTube</a></div>\n  '
    )


def side_nav(current):
    def section(title, items):
        lis = "\n".join(
            f"        <li>{link(u, l, current)}</li>" if u else f'        <li><span class="soon">{l}</span></li>'
            for u, l in items
        )
        return f"      <h2>{title}</h2>\n      <ul>\n{lis}\n      </ul>\n"

    out = "\n" + section("Get started", SITE_NAV) + section("Recipes", RECIPES)
    for name, items in SERIES.items():
        out += section(name, items)
    return out + "    "


def footer():
    return (
        "\n    © 2026 Bill's Chill Kitchen · <a href=\"/about/\">About</a> · "
        f'<a href="{YOUTUBE}" rel="noopener">YouTube</a>\n  '
    )


def replace_block(html, tag, cls, inner):
    pattern = re.compile(rf'(<{tag} class="{cls}"[^>]*>)(.*?)(</{tag}>)', re.S)
    if not pattern.search(html):
        return html, False
    return pattern.sub(lambda m: m.group(1) + inner + m.group(3), html, count=1), True


def main():
    for path in sorted(ROOT.rglob("index.html")):
        current = page_url(path)
        html = path.read_text()
        html, h = replace_block(html, "header", "site-header", header(current))
        html, n = replace_block(html, "nav", "side-nav", side_nav(current))
        html, f = replace_block(html, "footer", "site-footer", footer())
        path.write_text(html)
        print(f"{current:45} header={h} sidebar={n} footer={f}")


if __name__ == "__main__":
    main()
