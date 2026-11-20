// Recipe page helpers: print button and tap-to-check ingredients.
(() => {
  // Print just the recipe (print styles live in styles.css).
  document.querySelectorAll('[data-print-recipe]').forEach((btn) => {
    btn.addEventListener('click', () => window.print());
  });

  // Turn each ingredient into a checkbox the cook can tick off.
  document.querySelectorAll('ul[data-checklist]').forEach((list, listIndex) => {
    [...list.children].forEach((li, i) => {
      const id = `ing-${listIndex}-${i}`;
      const box = document.createElement('input');
      box.type = 'checkbox';
      box.id = id;
      const label = document.createElement('label');
      label.htmlFor = id;
      while (li.firstChild) label.appendChild(li.firstChild);
      li.append(box, label);
      li.classList.add('check-item');
    });
  });
})();
