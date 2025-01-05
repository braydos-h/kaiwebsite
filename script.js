// Script for fade-in on scroll
const faders = document.querySelectorAll('.section-fade');

// Intersection Observer to watch when a section is in view
const appearOptions = {
  threshold: 0.1
};

const appearOnScroll = new IntersectionObserver(function(
  entries,
  appearOnScroll
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('in-view');
    appearOnScroll.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetID = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetID);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 80, // adjust offset for sticky header
        behavior: 'smooth'
      });
    }
  });
});

// Simple Calculator Logic
const bladeTypeEl = document.getElementById('blade-type');
const bladeLengthEl = document.getElementById('blade-length');
const calcBtn = document.getElementById('calculate-btn');
const resultEl = document.getElementById('calc-result');

if (calcBtn) {
  calcBtn.addEventListener('click', () => {
    const length = parseFloat(bladeLengthEl.value);
    if (isNaN(length) || length <= 0) {
      resultEl.textContent = 'Please enter a valid blade length.';
      return;
    }

    let cost = 0;
    if (bladeTypeEl.value === 'straight') {
      // $1 per cm
      cost = length * 1;
    } else {
      // serrated: $2 per cm
      cost = length * 2;
    }

    // Minimum charge: $10
    if (cost < 10) cost = 10;

    resultEl.textContent = `Estimated Cost: $${cost.toFixed(2)}`;
  });
}
