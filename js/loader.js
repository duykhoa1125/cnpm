async function loadPartials() {
  const includes = document.querySelectorAll('[data-include]');
  const promises = [];

  includes.forEach(include => {
    const file = include.getAttribute('data-include');
    const promise = fetch(file)
      .then(response => {
        if (!response.ok) throw new Error(`Could not load ${file}`);
        return response.text();
      })
      .then(html => {
        include.outerHTML = html;
      })
      .catch(err => console.error(err));
    promises.push(promise);
  });

  await Promise.all(promises);

  // Dispatch an event to signal that partials are loaded
  document.dispatchEvent(new Event('partialsLoaded'));
}

document.addEventListener('DOMContentLoaded', loadPartials);
