
// Kart yüksekliklerini eşitlemek için
document.addEventListener('DOMContentLoaded', function () {
    function equalizeCardHeights() {
        const cards = document.querySelectorAll('.pricing-card');
        let maxHeight = 0;

        // Tüm kartların yüksekliğini sıfırla
        cards.forEach(card => {
            card.style.height = 'auto';
        });

        // En yüksek kartı bul
        cards.forEach(card => {
            const cardHeight = card.offsetHeight;
            if (cardHeight > maxHeight) {
                maxHeight = cardHeight;
            }
        });

        // Tüm kartları en yüksek yüksekliğe ayarla
        cards.forEach(card => {
            card.style.height = maxHeight + 'px';
        });
    }

    // Sayfa yüklendiğinde ve pencere boyutu değiştiğinde çalıştır
    equalizeCardHeights();
    window.addEventListener('resize', equalizeCardHeights);
});