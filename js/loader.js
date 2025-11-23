/**
 * Asynchronously loads HTML partials into elements with the `data-include` attribute.
 *
 * This function scans the document for elements with the `data-include` attribute,
 * fetches the content of the file specified in the attribute, and replaces the
 * element with the fetched HTML content.
 *
 * After all partials are loaded:
 * 1. Dispatches a custom 'partialsLoaded' event on the document.
 * 2. Hides and removes the global loading overlay ('#global-loader').
 *
 * @async
 * @function loadPartials
 * @returns {Promise<void>} A promise that resolves when all partials have been loaded and processed.
 */
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

  // Hide global loader
  const loader = document.getElementById('global-loader');
  if (loader) {
    loader.classList.add('opacity-0', 'pointer-events-none');
    setTimeout(() => loader.remove(), 500);
  }
}

document.addEventListener('DOMContentLoaded', loadPartials);
