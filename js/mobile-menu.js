  document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');
    const menuItems = document.querySelectorAll('.mobile-menu-item');
    
    // Debug için
    console.log('Menu elements:', { menuBtn, mobileMenu, menuIcon, menuItems });

    if (menuBtn && mobileMenu) {
      console.log('Mobile menu functionality initialized');
      
      menuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Menu button clicked');
        
        // Toggle visibility
        const isHidden = mobileMenu.classList.contains('hidden');
        console.log('Is menu hidden?', isHidden);
        
        if (isHidden) {
          mobileMenu.classList.remove('hidden');
          mobileMenu.classList.add('flex');
          if (menuIcon) menuIcon.textContent = '✕';
        } else {
          mobileMenu.classList.add('hidden');
          mobileMenu.classList.remove('flex');
          if (menuIcon) menuIcon.textContent = '☰';
        }
      });
      
      // Close when clicking items
      menuItems.forEach(item => {
        item.addEventListener('click', () => {
          mobileMenu.classList.add('hidden');
          mobileMenu.classList.remove('flex');
          if (menuIcon) menuIcon.textContent = '☰';
        });
      });
      
      // Close when clicking outside
      document.addEventListener('click', (e) => {
        if (!mobileMenu.classList.contains('hidden') && 
            !mobileMenu.contains(e.target) && 
            e.target !== menuBtn) {
          mobileMenu.classList.add('hidden');
          mobileMenu.classList.remove('flex');
          if (menuIcon) menuIcon.textContent = '☰';
        }
      });
    } else {
      console.error('Menu elements not found!');
    }
  });