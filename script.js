document.addEventListener('DOMContentLoaded', function () {
    const pages = Array.from(document.querySelectorAll('.page'));
    const navBar = document.getElementById('navBar');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const pageCounter = document.getElementById('pageCounter');
    const openButton = document.querySelector('.open-button');
    const audio = document.getElementById('bgAudio');
    const audioToggle = document.getElementById('audioToggle');

    let currentPage = 0;
    const totalPages = pages.length;

    // Show the initial page
    showPage(currentPage);

    // Open button on cover triggers first chapter
    if (openButton) {
        openButton.addEventListener('click', () => {
            navigateTo(1);
        });
    }

    // Navigation buttons
    prevBtn.addEventListener('click', () => {
        if (currentPage > 0) {
            navigateTo(currentPage - 1);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages - 1) {
            navigateTo(currentPage + 1);
        }
    });

    // Audio toggle
    audioToggle.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().catch(() => {});
            audioToggle.classList.remove('muted');
        } else {
            audio.pause();
            audioToggle.classList.add('muted');
        }
    });

    function navigateTo(index) {
        currentPage = Math.max(0, Math.min(totalPages - 1, index));
        showPage(currentPage);
    }

    function showPage(index) {
        pages.forEach((page, i) => {
            page.classList.toggle('active', i === index);
        });
        // Update counter (1-based indexing)
        pageCounter.textContent = `${index + 1} / ${totalPages}`;
        // Show or hide nav bar on cover and back
        if (index === 0) {
            navBar.style.display = 'none';
        } else {
            navBar.style.display = 'flex';
        }
        // Disable prev/next buttons on edges
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === totalPages - 1;
    }
});