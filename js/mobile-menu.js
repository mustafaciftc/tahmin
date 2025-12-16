document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuIcon = document.getElementById('menuIcon');
  const menuItems = document.querySelectorAll('.mobile-menu-item');

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      mobileMenu.classList.toggle('flex');
      menuIcon.textContent = mobileMenu.classList.contains('hidden') ? '☰' : '✕';
    });
  }

  // Close mobile menu when clicking on a menu item
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('flex');
      if (menuIcon) menuIcon.textContent = '☰';
    });
  });
});