// Basic interactivity: mobile nav, theme toggle, modal, testimonials slider

const menuButton = document.getElementById('menu-bars');
const navMenu = document.querySelector('.menu');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const modal = document.getElementById('property-modal');
const modalMedia = document.getElementById('modal-media');
const modalTitle = document.getElementById('modal-title');
const modalLocation = document.getElementById('modal-location');
const modalAmenities = document.getElementById('modal-amenities');
const modalPrice = document.getElementById('modal-price');
const modalRating = document.getElementById('modal-rating');
const closeModalBtn = document.getElementById('close-modal');
const testimonialTrack = document.getElementById('testimonial-track');
const testimonialDots = document.getElementById('testimonial-dots');

// Highlight active nav link based on current page
const navLinks = navMenu ? Array.from(navMenu.querySelectorAll('a')) : [];
if (navLinks.length) {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const isHome = currentPath === '' || currentPath === 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    const target = href.split('#')[0];
    const isAnchor = href.startsWith('#');
    const matchPage = target === currentPath || (isHome && (target === '' || target === 'index.html'));
    if (isAnchor && isHome) {
      link.classList.add('active');
    } else if (!isAnchor && target && target === currentPath) {
      link.classList.add('active');
    }
  });
}

// Mobile nav toggle
if (menuButton) {
  menuButton.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
}

// Theme toggle (light / dark)
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark')) {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    } else {
      icon.classList.add('fa-sun');
      icon.classList.remove('fa-moon');
    }
  });
}

// Property modal
function openModal(card) {
  const img = card.dataset.img;
  modalMedia.style.backgroundImage = `url('${img}')`;
  modalTitle.textContent = card.dataset.title;
  modalLocation.textContent = card.dataset.location;
  modalAmenities.textContent = card.dataset.amenities;
  modalPrice.textContent = card.dataset.price;
  modalRating.innerHTML = `<i class="fas fa-star"></i> ${card.dataset.rating}`;
  modal.setAttribute('aria-hidden', 'false');
  modal.classList.add('show');
}

function closeModal() {
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
}

const openButtons = document.querySelectorAll('.open-modal');
openButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.property-card');
    if (card) openModal(card);
  });
});

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', closeModal);
}

if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) closeModal();
  });
}

// Testimonials slider (auto + dots)
if (testimonialTrack && testimonialDots) {
  const slides = Array.from(testimonialTrack.children);
  slides.forEach((_, idx) => {
    const dot = document.createElement('button');
    dot.className = 'dot';
    if (idx === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(idx));
    testimonialDots.appendChild(dot);
  });

  let current = 0;
  const dots = Array.from(testimonialDots.children);

  function goTo(index) {
    current = index;
    const offset = -index * 100;
    testimonialTrack.style.transform = `translateX(${offset}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }

  function next() {
    const nextIndex = (current + 1) % slides.length;
    goTo(nextIndex);
  }

  let timer = setInterval(next, 4500);
  testimonialTrack.addEventListener('mouseenter', () => clearInterval(timer));
  testimonialTrack.addEventListener('mouseleave', () => { timer = setInterval(next, 4500); });
}
