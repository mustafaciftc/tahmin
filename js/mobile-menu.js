  document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');

    if (!menuBtn || !mobileMenu || !menuIcon) {
      console.warn('Mobil menü elemanları bulunamadı.');
      return;
    }

    const openMenu = () => {
      mobileMenu.classList.remove('hidden');
      menuIcon.textContent = '✕'; // X ikonuna dönüş
    };

    const closeMenu = () => {
      mobileMenu.classList.add('hidden');
      menuIcon.textContent = '☰'; // Hamburger ikonuna geri dön
    };

    // Butona (hamburger veya X) tıklayınca aç/kapa
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      
      if (mobileMenu.classList.contains('hidden')) {
        openMenu();
      } else {
        closeMenu();
      }
    });

    // Menü içindeki linklere tıklayınca kapat
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Dışarıya tıklayınca kapat
    document.addEventListener('click', (e) => {
      if (!mobileMenu.classList.contains('hidden') && 
          !mobileMenu.contains(e.target) && 
          !menuBtn.contains(e.target)) {
        closeMenu();
      }
    });

    // Esc tuşu ile kapat (ekstra erişilebilirlik)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        closeMenu();
      }
    });
  });