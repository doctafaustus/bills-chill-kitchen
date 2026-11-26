// Temporary dev tools: try accent colors. Remove before launch.
(() => {
  const ACCENTS = {
    green:      { name: "Deep green", link: "#1e6b4f", hover: "#17563f", soft: "#e3f1ea" },
    navy:       { name: "Navy",       link: "#233a7a", hover: "#1b2d60", soft: "#e6ebf7" },
    terracotta: { name: "Terracotta", link: "#b8461f", hover: "#9a3a19", soft: "#fbeae3" },
    blue:       { name: "Original blue", link: "#1a73e8", hover: "#1765cc", soft: "#e8f0fe" }
  };
  const KEY = "rkl-accent", OPEN = "rkl-devtools-open";
  const get = (k, d) => { try { return localStorage.getItem(k) ?? d; } catch { return d; } };
  const set = (k, v) => { try { localStorage.setItem(k, v); } catch {} };

  function apply(id) {
    const a = ACCENTS[id] || ACCENTS.green;
    const s = document.documentElement.style;
    s.setProperty("--link", a.link);
    s.setProperty("--link-hover", a.hover);
    s.setProperty("--nav-active-text", a.link);
    s.setProperty("--nav-active-bg", a.soft);
    s.setProperty("--note-bg", a.soft);
    s.setProperty("--note-border", a.link);
    document.querySelectorAll(".rkl-dev [data-accent]").forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.accent === id)));
    set(KEY, id);
  }

  const wrap = document.createElement("div");
  wrap.className = "rkl-dev";
  wrap.innerHTML = `
    <button class="rkl-dev-tab" type="button" aria-expanded="false">🛠 Dev tools</button>
    <div class="rkl-dev-panel" hidden>
      <div class="rkl-dev-title">Accent color</div>
      ${Object.entries(ACCENTS).map(([id, a]) =>
        `<button type="button" data-accent="${id}"><span style="background:${a.link}"></span>${a.name}<code>${a.link}</code></button>`
      ).join("")}
    </div>`;
  document.body.appendChild(wrap);

  const tab = wrap.querySelector(".rkl-dev-tab");
  const panel = wrap.querySelector(".rkl-dev-panel");
  const setOpen = (open) => { panel.hidden = !open; tab.setAttribute("aria-expanded", String(open)); set(OPEN, open ? "1" : "0"); };
  tab.addEventListener("click", () => setOpen(panel.hidden));
  wrap.querySelectorAll("[data-accent]").forEach((b) => b.addEventListener("click", () => apply(b.dataset.accent)));

  apply(get(KEY, "green"));
  setOpen(get(OPEN, "1") === "1");
})();
