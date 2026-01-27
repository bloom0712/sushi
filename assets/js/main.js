// Language toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const langContainer = document.querySelector('.header-lang');
    const langButtons = document.querySelectorAll('.header-lang-btn');

    if (langContainer && langButtons.length > 0) {
        langButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                langButtons.forEach(btn => btn.classList.remove('is-active'));
                
                // Add active class to clicked button
                this.classList.add('is-active');
                
                // Update container class to move the orange background
                if (this.textContent.trim() === 'EN') {
                    langContainer.classList.add('lang-en');
                } else {
                    langContainer.classList.remove('lang-en');
                }
            });
        });
    }

    // Mobile menu toggle functionality
    const menuToggle = document.querySelector('.header-menu-toggle');
    const mobileMenuBar = document.querySelector('.mobile-menu-bar');

    if (menuToggle && mobileMenuBar) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('is-active');
            mobileMenuBar.classList.toggle('is-open');
        });
    }

    // Challenge diagram carousel (max-width 768px): cycle 2nd→3rd→1st→2nd…, Next always flows left
    const diagram = document.querySelector('.challenge-diagram');
    const diagramTrack = document.querySelector('.challenge-diagram-track');
    const diagramPrev = document.querySelector('.challenge-diagram-prev');
    const diagramNext = document.querySelector('.challenge-diagram-next');

    if (diagram && diagramTrack && diagramPrev && diagramNext) {
        const originalSlides = diagramTrack.querySelectorAll('.challenge-diagram-content');
        const count = originalSlides.length;
        if (count > 0) {
            // Add many clones so the loop can run smoothly for a long time (30 slides = 29 steps per wrap)
            for (let r = 0; r < 9; r++) {
                for (let i = 0; i < count; i++) {
                    diagramTrack.appendChild(originalSlides[i].cloneNode(true));
                }
            }
        }

        const slides = diagramTrack.querySelectorAll('.challenge-diagram-content');
        const total = slides.length;
        const maxIndex = total - 1; // use 1..maxIndex so Next always flows left; wrap maxIndex→1
        const TRANSITION_CSS = 'transform 0.3s ease';

        let currentIndex = 1; // start: 2nd centered

        function isSp() {
            return window.matchMedia('(max-width: 768px)').matches;
        }

        function updateCarousel() {
            if (!isSp() || total === 0) {
                diagramTrack.style.transform = '';
                return;
            }
            const containerWidth = diagram.getBoundingClientRect().width;
            const slideWidth = slides[0].getBoundingClientRect().width;
            let gap = 0;
            if (total > 1) {
                const r0 = slides[0].getBoundingClientRect();
                const r1 = slides[1].getBoundingClientRect();
                gap = r1.left - r0.right;
            }
            const offsetPx = currentIndex * (slideWidth + gap) + slideWidth / 2 - containerWidth / 2;
            diagramTrack.style.transform = `translateX(-${offsetPx}px)`;
        }

        function goNext() {
            if (!isSp()) return;
            const from = currentIndex;
            currentIndex = from >= maxIndex ? 1 : from + 1;
            const wrap = from >= maxIndex;
            if (wrap) {
                diagramTrack.style.transition = 'none';
                updateCarousel();
                diagramTrack.offsetHeight;
                diagramTrack.style.transition = TRANSITION_CSS;
            } else {
                diagramTrack.style.transition = TRANSITION_CSS;
                updateCarousel();
            }
        }

        function goPrev() {
            if (!isSp()) return;
            const from = currentIndex;
            currentIndex = from <= 1 ? maxIndex : from - 1;
            const wrap = from <= 1;
            if (wrap) {
                diagramTrack.style.transition = 'none';
                updateCarousel();
                diagramTrack.offsetHeight;
                diagramTrack.style.transition = TRANSITION_CSS;
            } else {
                diagramTrack.style.transition = TRANSITION_CSS;
                updateCarousel();
            }
        }

        diagramPrev.addEventListener('click', goPrev);
        diagramNext.addEventListener('click', goNext);

        updateCarousel();
        window.addEventListener('resize', updateCarousel);
    }
});
