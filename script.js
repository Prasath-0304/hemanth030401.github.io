const loader = document.getElementById("loader");
const scrollProgress = document.getElementById("scrollProgress");
const backToTop = document.getElementById("backToTop");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
const revealItems = document.querySelectorAll(".reveal");
const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");
const canvas = document.getElementById("neuralCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
let countersStarted = false;

// Replace icon placeholders after the CDN loads and fade out the preloader.
window.addEventListener("load", () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  setTimeout(() => {
    loader.classList.add("hidden");
  }, 520);
});

// Build the animated neural network background on the full viewport canvas.
function resizeCanvas() {
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * pixelRatio;
  canvas.height = window.innerHeight * pixelRatio;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  createParticles();
}

function createParticles() {
  const count = Math.min(Math.floor(window.innerWidth / 14), 120);
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.38,
    vy: (Math.random() - 0.5) * 0.38,
    radius: Math.random() * 1.8 + 0.8
  }));
}

function drawNeuralNetwork() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  particles.forEach((particle, index) => {
    particle.x += particle.vx;
    particle.y += particle.vy;

    if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
    if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1;

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(168, 85, 247, 0.7)";
    ctx.fill();

    for (let next = index + 1; next < particles.length; next += 1) {
      const other = particles[next];
      const distance = Math.hypot(particle.x - other.x, particle.y - other.y);

      if (distance < 130) {
        const alpha = (1 - distance / 130) * 0.28;
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(other.x, other.y);
        ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(drawNeuralNetwork);
}

// Keep progress, active navigation, and utility controls in sync with scrolling.
function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
  scrollProgress.style.width = `${progress}%`;
  backToTop.classList.toggle("visible", scrollTop > 700);
}

function setActiveNav() {
  let current = "home";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 180;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}

// Count up statistics once the hero metrics enter the viewport.
function animateCounter(counter) {
  const target = Number(counter.dataset.counter);
  const duration = 1600;
  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    counter.textContent = Math.floor(eased * target);

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      counter.textContent = target;
    }
  }

  requestAnimationFrame(tick);
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.14 }
);

// Reveal cards and sections as they scroll into view.
const statsObserver = new IntersectionObserver(
  (entries) => {
    if (entries.some((entry) => entry.isIntersecting) && !countersStarted) {
      countersStarted = true;
      document.querySelectorAll("[data-counter]").forEach(animateCounter);
    }
  },
  { threshold: 0.35 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const statsGrid = document.querySelector(".stats-grid");
if (statsGrid) {
  statsObserver.observe(statsGrid);
}

window.addEventListener("scroll", () => {
  updateScrollProgress();
  setActiveNav();
});

window.addEventListener("resize", resizeCanvas);

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.addEventListener("mousemove", (event) => {
  if (!cursorDot || !cursorRing) return;

  cursorDot.style.left = `${event.clientX}px`;
  cursorDot.style.top = `${event.clientY}px`;
  cursorRing.style.left = `${event.clientX}px`;
  cursorRing.style.top = `${event.clientY}px`;
});

document.querySelectorAll("a, button, .project-card, .skill-card, .service-card").forEach((element) => {
  element.addEventListener("mouseenter", () => cursorRing?.classList.add("hover"));
  element.addEventListener("mouseleave", () => cursorRing?.classList.remove("hover"));
});

resizeCanvas();
drawNeuralNetwork();
updateScrollProgress();
setActiveNav();
