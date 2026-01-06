// ==========================================
// COUNTDOWN TIMER
// ==========================================
function initCountdown() {
    const weddingDate = new Date('2026-04-09T16:00:00').getTime();
    const countdownElement = document.getElementById('countdown');

    if (!countdownElement) return;

    function update() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            countdownElement.innerHTML = '<p style="font-size: 2rem; font-family: var(--font-heading);">¡Es hoy! 🎉</p>';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
}

// ==========================================
// NAVIGATION BAR SCROLL EFFECT
// ==========================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            navbar.classList.add('visible');
        } else {
            navbar.classList.remove('visible');
        }
    }, { passive: true });
}

// ==========================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ==========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ==========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe animatable elements
    document.querySelectorAll('.event-card, .fade-in-up, .itinerary-item').forEach(el => {
        observer.observe(el);
    });
}

/*
// ==========================================
// MUSIC PLAYER
// ==========================================
function initMusicPlayer() {
    const musicToggle = document.getElementById('music-toggle');
    if (!musicToggle) return;

    let isPlaying = false;
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0.3;

    // Note: Link your wedding music file here
    // audio.src = 'path/to/your/wedding-music.mp3';

    musicToggle.addEventListener('click', () => {
        if (!audio.src || audio.src.includes('undefined')) {
            console.log('No music file set. Add audio.src in script.js');
            return;
        }

        if (isPlaying) {
            audio.pause();
            musicToggle.classList.remove('playing');
        } else {
            audio.play().catch(e => console.log('Audio play failed:', e));
            musicToggle.classList.add('playing');
        }
        isPlaying = !isPlaying;
    });
}
*/

// ==========================================
// GALLERY GENERATION
// ==========================================
function initGallery() {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;

    const photos = [
        'assets/photos/photo1.jpeg',
        'assets/photos/photo2.jpeg',
        'assets/photos/photo3.jpeg',
        'assets/photos/photo4.jpeg',
        'assets/photos/photo5.jpeg',
        'assets/photos/photo6.jpeg'
    ];

    photos.forEach((src, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item fade-in-up';
        item.innerHTML = `
            <img src="${src}" alt="Momento ${index + 1}" loading="lazy">
            <div class="gallery-overlay">
                <span>+</span>
            </div>
        `;
        gallery.appendChild(item);
    });
}

// ==========================================
// RSVP FORM HANDLING
// ==========================================
function initRSVPForm() {
    const form = document.getElementById('rsvp-form');
    const formMessage = document.getElementById('form-message');

    if (!form || !formMessage) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            attendance: document.getElementById('attendance').value,
            message: document.getElementById('message').value
        };

        // Simulate form submission
        console.log('RSVP Data:', formData);

        // Show success message
        formMessage.className = 'form-message success';
        formMessage.textContent = '¡Gracias por confirmar! Hemos recibido tu respuesta. 💕';
        formMessage.style.display = 'block';

        // Reset form
        form.reset();

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);

        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
}

// ==========================================
// PARALLAX EFFECT FOR HERO
// ==========================================
function initParallax() {
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / 700);
        }
    }, { passive: true });
}

// ==========================================
// DYNAMIC GUEST LIMIT & PERSONALIZATION
// ==========================================
function initGuestLimit() {
    const params = new URLSearchParams(window.location.search);

    // Handle Seats (pass)
    const passValue = params.get('pass');
    let seats = '?';
    if (passValue && !isNaN(passValue) && passValue > 0 && passValue <= 10) {
        seats = passValue;
    }

    const displayElement = document.getElementById('seats-display');
    if (displayElement) {
        displayElement.textContent = seats;
    }

    // Handle Guest Name (guest)
    const guestName = params.get('guest');
    const nameInput = document.getElementById('name');
    if (guestName && nameInput) {
        nameInput.value = guestName;
    }
}

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initNavbar();
    initSmoothScroll();
    // initMusicPlayer();
    initGallery();
    initScrollAnimations();
    initRSVPForm();
    initGuestLimit();
    initParallax();

    console.log('Carlos & Bianca Wedding Invitation - Optimized ✅');
});
