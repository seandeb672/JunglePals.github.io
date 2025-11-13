const slidesContainer = document.querySelector('.slides');
const dots = document.querySelectorAll('.dot');
let index = 0;

function showSlide(i) {
  slidesContainer.style.transform = `translateX(-${i * 100}%)`;
  dots.forEach((dot, idx) => dot.classList.toggle('active', idx === i));
}

function nextSlide() {
  index = (index + 1) % dots.length;
  showSlide(index);
}

// Auto-slide
setInterval(nextSlide, 4000);

// Dot navigation
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    index = i;
    showSlide(index);
  });
});
// Newsletter live validation
const form = document.getElementById('newsletterForm');
if (form) {
  const first = document.getElementById('nlFirst');
  const email = document.getElementById('nlEmail');
  const msg = document.getElementById('nlMsg');

  // Simple name validation (letters only, min 2 chars)
  const nameValid = (v) => /^[A-Za-zÀ-ž' -]{2,}$/.test(v.trim());

  function validateFirst() {
    if (!first.value.trim()) {
      msg.textContent = 'Please enter your first name.';
      first.style.borderColor = 'red';
      return false;
    } else if (!nameValid(first.value)) {
      msg.textContent = 'Name should be at least 2 letters, no numbers.';
      first.style.borderColor = 'red';
      return false;
    }
    first.style.borderColor = '';
    msg.textContent = '';
    return true;
  }

  function validateEmail() {
    if (!email.value.trim()) {
      msg.textContent = 'Please enter your email address.';
      email.style.borderColor = 'red';
      return false;
    } else if (email.validity.typeMismatch) {
      msg.textContent = 'Please enter a valid email address.';
      email.style.borderColor = 'red';
      return false;
    }
    email.style.borderColor = '';
    msg.textContent = '';
    return true;
  }

  // Validate live as user types
  first.addEventListener('input', validateFirst);
  email.addEventListener('input', validateEmail);

  // On submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const validFirst = validateFirst();
    const validEmail = validateEmail();

    if (validFirst && validEmail) {
      msg.style.color = '#ffffffff';
      msg.textContent = 'Thanks for subscribing to Jungle Pals! 🦎';
      form.reset();
    } else {
      msg.style.color = '#ffffffff';
    }
  });
}

// Back to Top (jQuery, robust)
$(function () {
  const $btn = $('#backTop');

  function toggleBtn() {
    $btn.toggle($(window).scrollTop() > 150); // show after 150px (adjust if you like)
  }

  // Run once on load (in case user reloads mid-page)
  toggleBtn();

  // Show/hide on scroll
  $(window).on('scroll', toggleBtn);

  // Smooth scroll to top on click
  $btn.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 600);
  });
});

