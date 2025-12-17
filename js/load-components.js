document.addEventListener('DOMContentLoaded', function() {
    loadComponent('header', '/components/header.html');
    loadComponent('footer', '/components/footer.html');
});

function loadComponent(id, url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(id).innerHTML = data;
            
            // Header yüklendikten sonra mobile menu script'ini başlat
            if (id === 'header') {
                initializeMobileMenu();
            }
        })
        .catch(error => {
            console.error(`Error loading component ${id}:`, error);
            document.getElementById(id).innerHTML = `
                <div class="text-red-400 p-4">
                    ${id} component yüklenemedi: ${error.message}
                </div>
            `;
        });
}

function initializeMobileMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');

    if (!menuBtn || !mobileMenu || !menuIcon) {
        console.warn('Mobil menü elemanları bulunamadı – header henüz yüklenmemiş olabilir.');
        return;
    }

    console.log('Mobil menü başlatıldı');

    const openMenu = () => {
        mobileMenu.classList.remove('hidden');
        menuIcon.textContent = '✕'; // X karakteri
        document.body.style.overflow = 'hidden'; // arkadaki kaymayı engelle
    };

    const closeMenu = () => {
        mobileMenu.classList.add('hidden');
        menuIcon.textContent = '☰'; // hamburger
        document.body.style.overflow = '';
    };

    // Toggle butonu (hamburger veya X'e tıklayınca)
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
        link.addEventListener('click', closeMenu);
    });

    // Dışarı tıklayınca kapat
    document.addEventListener('click', (e) => {
        if (!mobileMenu.classList.contains('hidden') &&
            !mobileMenu.contains(e.target) &&
            !menuBtn.contains(e.target)) {
            closeMenu();
        }
    });

    // Esc tuşu ile kapat
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
            closeMenu();
        }
    });
}