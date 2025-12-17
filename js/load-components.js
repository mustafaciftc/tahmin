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
    const menuItems = document.querySelectorAll('.mobile-menu-item');
    
    console.log('Initializing mobile menu...', { menuBtn, mobileMenu, menuIcon });

    if (menuBtn && mobileMenu) {
        console.log('Mobile menu elements found, adding listeners...');
        
        menuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Menu button clicked');
            
            const isHidden = mobileMenu.classList.contains('hidden');
            console.log('Is menu hidden?', isHidden);
            
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            } else {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });
        
        // Close when clicking items
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            });
        });
        
        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.classList.contains('hidden') && 
                !mobileMenu.contains(e.target) && 
                e.target !== menuBtn) {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });
    } else {
        console.warn('Mobile menu elements not found, check your HTML structure');
    }
}