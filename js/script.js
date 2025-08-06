// Dark Mode Toggle
const toggleBtn = document.getElementById('darkModeToggle');
const body = document.body;

toggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  // Ganti icon
  const icon = toggleBtn.querySelector('i');
  if (body.classList.contains('dark-mode')) {
    icon.classList.replace('fa-moon', 'fa-sun');
  } else {
    icon.classList.replace('fa-sun', 'fa-moon');
  }
});

// Form Kontak Validasi & Submit Simulasi
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Validasi manual (HTML sudah wajib, ini tambahan)
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = 'Mohon isi semua kolom.';
    formStatus.style.color = 'red';
    return;
  }

  // Simulasi submit, tampilkan pesan sukses
  formStatus.textContent = 'Terima kasih, pesan Anda telah terkirim!';
  formStatus.style.color = 'green';

  form.reset();
});

// Animasi scroll (fade-in) menggunakan Intersection Observer
const faders = document.querySelectorAll('section, .project-item, .skill-item');

const appearOptions = {
  threshold: 0,
  rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add('appear');
      appearOnScroll.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});
