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

    // Challenge diagram: Swiper carousel when max-width < 768px
    const diagramSwiperEl = document.querySelector('.challenge-diagram-swiper');
    const diagramPrev = document.querySelector('.challenge-diagram-prev');
    const diagramNext = document.querySelector('.challenge-diagram-next');
    const diagramBreakpoint = window.matchMedia('(max-width: 768px)');
    let diagramSwiper = null;

    function initDiagramSwiper() {
        if (!diagramSwiperEl || !diagramPrev || !diagramNext || typeof Swiper === 'undefined') return;
        if (diagramSwiper) return; // prevent double init

        diagramSwiper = new Swiper('.challenge-diagram-swiper', {
            // On mobile: one slide centered, neighbors peek at sides
            slidesPerView: 1,
            centeredSlides: true,
            spaceBetween: 16,
            loop: true,
            loopAdditionalSlides: 3,  // extra clones for smooth looping
            breakpoints: {
                // Desktop: restore original layout (all three visible)
                769: {
                    slidesPerView: 1,
                    centeredSlides: false,
                    spaceBetween: 45,
                },
            },
            navigation: {
                prevEl: '.challenge-diagram-prev',
                nextEl: '.challenge-diagram-next',
            },
        });
    }

    function destroyDiagramSwiper() {
        if (diagramSwiper) {
            diagramSwiper.destroy(true, true);
            diagramSwiper = null;
        }
    }

    function handleDiagramBreakpoint() {
        if (diagramBreakpoint.matches) {
            initDiagramSwiper();
        } else {
            destroyDiagramSwiper();
        }
    }

    if (diagramSwiperEl && diagramPrev && diagramNext) {
        handleDiagramBreakpoint();
        diagramBreakpoint.addEventListener('change', handleDiagramBreakpoint);
    }
});

var swiper = new Swiper(".solutionSwiper", {
    slidesPerView: 'auto',
    spaceBetween: "40rem",
    centeredSlides: true,
    speed: 1000, // Smooth transition speed (milliseconds)
    loop: true,
    loopedSlides: 3, // Number of slides to loop (should match or exceed your slide count)
    autoplay: {
        delay: 2000, // No delay between slides
        disableOnInteraction: false, // Continue autoplay after user interaction
        pauseOnMouseEnter: false, // Continue even when hovering
    },
    freeMode: {
        enabled: true,
        sticky: false,
    },
    allowTouchMove: true,
    grabCursor: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".solutionSwiper .swiper-button-next",
        prevEl: ".solutionSwiper .swiper-button-prev",
    }
});

var swiper = new Swiper(".newsSwiper", {
    slidesPerView: 'auto',
    spaceBetween: "30rem",
    speed: 1000, // Smooth transition speed (milliseconds)
    loop: true,
    loopedSlides: 5, // Number of slides to loop (should match or exceed your slide count)
    autoplay: {
        delay: 2000, // No delay between slides
        disableOnInteraction: false, // Continue autoplay after user interaction
        pauseOnMouseEnter: false, // Continue even when hovering
    },
    freeMode: {
        enabled: true,
        sticky: false,
    },
    allowTouchMove: true,
    grabCursor: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".newsSwiper .swiper-button-next",
        prevEl: ".newsSwiper .swiper-button-prev",
    }
});