function filterBy(cat, el) {
    document.querySelectorAll('.filter-btn')
        .forEach(b => b.classList.remove('active'));
    el.classList.add('active');

    const h2 = document.querySelector('.shop-header h2');
    h2.classList.add('glitch-text');
    setTimeout(() => h2.classList.remove('glitch-text'), 600);

    document.querySelectorAll('#product-grid .card').forEach(card => {
        const match = (cat === 'all' || card.dataset.cat === cat);

        if (match) {
            card.classList.remove('hide');
        } else {
            card.classList.add('hide');
        }
    });
}



// 2. ANIMACIÓN DE EVENTOS AL HACER SCROLL
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
    });
}, { threshold: 0.3 });
document.querySelectorAll('.event').forEach(e => observer.observe(e));

// 3. CONTADOR DINÁMICO CON AUTOCULTADO
function initCountdown() {
    const firstEvent = document.querySelector('.event[data-date]');
    const display = document.getElementById("countdown");

    if (!firstEvent || !display) return;

    const targetDate = new Date(firstEvent.dataset.date).getTime();

    const update = () => {
        const now = new Date().getTime();
        const diff = targetDate - now;

        // Si la fecha ya pasó, ocultamos el contador
        if (diff <= 0) {
            display.classList.add('hidden');
            // Opcional: Ocultar también la tarjeta del evento si ya pasó
            // firstEvent.classList.add('hidden');
            return clearInterval(timer);
        }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / (1000 * 60)) % 60);

        display.textContent = `Próximo evento en ${d}d · ${h}h · ${m}m`;
    };

    const timer = setInterval(update, 1000);
    update();
}

initCountdown();

/* ================= CARRUSEL INFINITO NOVEDADES ================= */

const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

let items = document.querySelectorAll('.carousel-item');
const gap = 30;
let itemWidth = items[0].offsetWidth + gap;

/* Clonar primero y último */
const firstClone = items[0].cloneNode(true);
const lastClone = items[items.length - 1].cloneNode(true);

track.appendChild(firstClone);
track.insertBefore(lastClone, items[0]);

items = document.querySelectorAll('.carousel-item');

let index = 1;

/* Posición inicial */
track.style.transform = `translateX(-${index * itemWidth}px)`;

/* Movimiento base */
function moveCarousel() {
    track.style.transition = 'transform 0.6s ease';
    track.style.transform = `translateX(-${index * itemWidth}px)`;
}

/* Flechas */
nextBtn.addEventListener('click', () => {
    index++;
    moveCarousel();
});

prevBtn.addEventListener('click', () => {
    index--;
    moveCarousel();
});

/* Reset invisible al llegar a clones */
track.addEventListener('transitionend', () => {
    const current = items[index];

    if (current === firstClone) {
        track.style.transition = 'none';
        index = 1;
        track.style.transform = `translateX(-${index * itemWidth}px)`;
    }

    if (current === lastClone) {
        track.style.transition = 'none';
        index = items.length - 2;
        track.style.transform = `translateX(-${index * itemWidth}px)`;
    }
});

/* Autoplay */
let autoplay = setInterval(() => {
    index++;
    moveCarousel();
}, 4000);

/* Recalcular tamaños */
window.addEventListener('resize', () => {
    itemWidth = items[0].offsetWidth + gap;
    track.style.transition = 'none';
    track.style.transform = `translateX(-${index * itemWidth}px)`;
});


/* ================= LIGHTBOX ================= */

const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
const closeBtn = document.querySelector('.lightbox-close');

document.querySelectorAll('.carousel-item img').forEach(img => {
    img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.remove('hidden');
    });
});

closeBtn.addEventListener('click', () => {
    lightbox.classList.add('hidden');
});

/* Cerrar al hacer click fuera */
lightbox.addEventListener('click', e => {
    if (e.target === lightbox) {
        lightbox.classList.add('hidden');
    }
});


document.querySelectorAll('.filter-nav a').forEach(link => {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    const href = link.getAttribute('href');

    if (href === current) {
        link.classList.add('active');
    }
});