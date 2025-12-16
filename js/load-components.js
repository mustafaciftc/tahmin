async function loadComponent(id, path) {
  try {
    const response = await fetch(path);
    const html = await response.text();
    document.getElementById(id).innerHTML = html;
  } catch (error) {
    console.error(`Error loading component ${id}:`, error);
  }
}

// Bileşenleri yükle
document.addEventListener('DOMContentLoaded', () => {
  loadComponent('header', '/components/header.html');
  loadComponent('footer', '/components/footer.html');
});