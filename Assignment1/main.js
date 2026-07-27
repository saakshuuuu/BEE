const projects = [
  {
    title: "Movie Database",
    meta: "React · API · CSS",
    year: "2025",
    desc: "A responsive movie discovery app that pulls live data from a public API. Search, filter by genre, and browse detailed pages with posters, ratings and trailers — all with smooth transitions and a clean dark UI.",
  },
  {
    title: "Address Book",
    meta: "JavaScript · LocalStorage · CSS",
    year: "2024",
    desc: "A lightweight contact manager built in vanilla JS. Add, edit, search and delete contacts with persistent storage, keyboard shortcuts and a polished card-based interface that works offline.",
  },
];

const skills = [
  "Python",
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "HTML & CSS",
  "Machine Learning",
  "Deep Learning",
  "TensorFlow",
  "PyTorch",
  "OpenCV",
  "SQL",
  "MongoDB",
  "Git & GitHub",
  "Data Structures",
  "Algorithms",
  "REST APIs",
  "Flask",
];

const interests = [
  "UI Design",
  "Video Editing",
  "Photography",
  "Sketching",
  "Gaming",
  "Content Creation",
];

const highlights = [
  {
    icon: "◎",
    title: "Sniping",
    text: "One tap, one story. Long-range flicks and no-scope 360s are my love language.",
  },
  {
    icon: "★",
    title: "Clutch Moments",
    text: "1v4 with 3 HP? That’s when the fun actually starts. Pressure = focus.",
  },
  {
    icon: "⚡",
    title: "Reflex Grind",
    text: "Aim trainers, sensitivity tweaks, and way too many hours in the practice range.",
  },
  {
    icon: "♛",
    title: "Squad Vibes",
    text: "Late-night ranked, questionable strategies, and mic screams that wake the neighbours.",
  },
];

const games = [
  { name: "BGMI / PUBG", role: "Sniper main — AWM enjoyer", hours: "1500+" },
  { name: "Valorant", role: "Duelist / occasional Operator", hours: "800+" },
  { name: "Call of Duty", role: "Quickscope specialist", hours: "600+" },
  { name: "Minecraft", role: "Redstone & chill builder", hours: "400+" },
];

/* ---------- Helpers ---------- */
const $ = (sel) => document.querySelector(sel);

/* ---------- Render ---------- */
function renderProjects() {
  const list = $("#project-list");
  list.innerHTML = projects
    .map(
      (p, i) => `
    <li class="project-item reveal" style="--i:${i}">
      <span class="project-index">${String(i + 1).padStart(2, "0")}</span>
      <div class="project-body">
        <div class="project-top">
          <h3 class="project-title">${p.title}</h3>
          <span class="project-year">${p.year}</span>
        </div>
        <p class="project-meta">${p.meta}</p>
        <p class="project-desc">${p.desc}</p>
      </div>
      <div class="project-arrow" aria-hidden="true">→</div>
    </li>
  `
    )
    .join("");
}

function renderChips(sel, items) {
  $(sel).innerHTML = items
    .map((s, i) => `<span class="chip" style="--i:${i}">${s}</span>`)
    .join("");
}

function renderHighlights() {
  $("#highlight-grid").innerHTML = highlights
    .map(
      (h, i) => `
    <div class="highlight-card reveal" style="--i:${i}">
      <div class="highlight-icon">${h.icon}</div>
      <h3>${h.title}</h3>
      <p>${h.text}</p>
    </div>
  `
    )
    .join("");
}

function renderGames() {
  $("#games-list").innerHTML = games
    .map(
      (g, i) => `
    <li class="reveal" style="--i:${i}">
      <div>
        <div class="game-name">${g.name}</div>
        <div class="game-role">${g.role}</div>
      </div>
      <span class="game-hours">${g.hours} hrs</span>
    </li>
  `
    )
    .join("");
}

function renderHeroGrid() {
  const images = [
    "images/img1.JPG",
    "images/img2.jpeg",
    "images/img3.jpeg",
    "images/img4.jpeg",
    "images/img5.jpeg",
    "images/img6.jpeg",
    "images/img7.jpeg",
    "images/img8.jpeg",
  ];

  const grid = document.getElementById("hero-grid");

  grid.innerHTML = images
    .map(
      (img, i) => `
      <div class="tile"
           style="--i:${i}; background-image:url('${img}')">
      </div>
    `
    )
    .join("");
}

/* ---------- Interactions ---------- */
function initHeader() {
  const header = $("#site-header");
  const btn = $("#menu-btn");
  const nav = $("#nav-mobile");

  window.addEventListener(
    "scroll",
    () => {
      header.classList.toggle("scrolled", window.scrollY > 20);
    },
    { passive: true }
  );

  btn.addEventListener("click", () => {
    btn.classList.toggle("open");
    nav.classList.toggle("open");
    document.body.classList.toggle("menu-open");
  });

  document.querySelectorAll("[data-nav]").forEach((a) => {
    a.addEventListener("click", () => {
      btn.classList.remove("open");
      nav.classList.remove("open");
      document.body.classList.remove("menu-open");
    });
  });
}

function initHeroParallax() {
  const hero = $(".hero");
  const grid = $("#hero-grid");
  if (!hero || !grid) return;

  hero.addEventListener("mousemove", (e) => {
    const r = hero.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
    const y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    grid.style.transform = `translate(${-x * 40}px, ${-y * 40}px) scale(1.02)`;
  });

  hero.addEventListener("mouseleave", () => {
    grid.style.transform = "translate(0,0) scale(1)";
  });
}

function initHeroTitle() {
  const title = $("#hero-title");
  if (!title) return;
  // Stagger words on load
  requestAnimationFrame(() => {
    title.classList.add("animate");
  });
}

function initReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  document
    .querySelectorAll(
      ".reveal, .section-title, .prose, .lead, .about-side, .contact-list, .quote, .chip, .project-item, .games-list li"
    )
    .forEach((el) => {
      el.classList.add("reveal");
      io.observe(el);
    });
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderHeroGrid();
  renderProjects();
  renderChips("#skills-chips", skills);
  renderChips("#interests-chips", interests);
  renderHighlights();
  renderGames();
  initHeader();
  initHeroParallax();
  initHeroTitle();
  initReveal();
  $("#year").textContent = new Date().getFullYear();
});
