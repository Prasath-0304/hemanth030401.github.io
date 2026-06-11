const DEFAULT_PROJECTS = [
  {
    title: "SmartVision AI",
    category: "Computer Vision",
    description: "Multi-class object detection and recognition using YOLOv8, MobileNetV2, OpenCV, and deployment-ready Python workflows.",
    stack: "Python, PyTorch, YOLOv8, OpenCV, Streamlit",
    github: "https://github.com/Prasath-0304"
  },
  {
    title: "PatrolIQ",
    category: "AI Monitoring",
    description: "Crime analytics and patrol intelligence platform with hotspot detection, ML-powered insights, and dashboard reporting.",
    stack: "Python, MLflow, Streamlit, Scikit-learn",
    github: "https://github.com/Prasath-0304"
  },
  {
    title: "EmiPredict AI",
    category: "Predictive ML",
    description: "Financial risk prediction system for EMI eligibility analysis with explainable classification outputs.",
    stack: "Python, MLflow, Classification, Pandas",
    github: "https://github.com/Prasath-0304"
  },
  {
    title: "Amazon India Analytics",
    category: "Data Analytics",
    description: "Business intelligence dashboard for sales trends, category performance, and decision-ready analytics.",
    stack: "Python, Pandas, Power BI, SQL",
    github: "https://github.com/Prasath-0304"
  },
  {
    title: "CricBuzz LiveStats",
    category: "Live Stats",
    description: "Real-time cricket analytics dashboard using APIs, SQL, and interactive visual reporting.",
    stack: "Python, SQL, REST API, Streamlit",
    github: "https://github.com/Prasath-0304"
  }
];

const DEFAULT_CONTENT = {
  heroName: "Hemanth Prasath",
  heroRole: "Generative AI & Machine Learning Engineer",
  heroIntro: "Building intelligent systems with artificial intelligence, machine learning, computer vision, and data analytics.",
  aboutText: "I create practical AI, machine learning, computer vision, and analytics solutions that turn complex data into useful products and decisions.",
  ownerTitle: "AI Builder and Data Problem Solver",
  userTitle: "Explore My Work",
  userText: "Browse my AI projects, freelance services, contact details, GitHub, LinkedIn, Instagram, and full project portfolio.",
  skillsEyebrow: "Technical Stack",
  skillsTitle: "AI, Data, and Product Skills",
  projectsEyebrow: "Project Side",
  projectsTitle: "Featured Projects",
  projectsIntro: "AI, machine learning, computer vision, and analytics projects connected to my GitHub portfolio.",
  freelanceEyebrow: "Freelance Side",
  freelanceTitle: "Available for Freelance Work",
  freelanceText: "I build AI-powered apps, machine learning models, computer vision systems, data dashboards, Python automation, and analytics workflows.",
  location: "Chennai, Tamil Nadu",
  footerText: "Copyright 2026 Hemanth Prasath. All rights reserved."
};

const DEFAULT_METRICS = [
  { value: "98.6%", label: "Model Accuracy Focus" },
  { value: "5+", label: "AI & Analytics Projects" },
  { value: "1.2M", label: "Dataset Scale Practice" },
  { value: "2026", label: "M.Tech CSE" }
];

const DEFAULT_SKILLS = ["Python", "TensorFlow", "PyTorch", "YOLOv8", "OpenCV", "SQL", "Power BI", "MLflow"];

const DEFAULT_LINKS = {
  github: "https://github.com/Prasath-0304",
  linkedin: "https://www.linkedin.com/in/hemanth-prasath-342278200/",
  instagram: "https://www.instagram.com/hemanth_prasath/",
  instagramHandle: "@hemanth_prasath",
  instagramQr: "assets/images/instagram-qr.svg",
  email: "hemanrhprasath.hp@gmail.com"
};

function readJSON(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || "null") || fallback;
  } catch {
    return fallback;
  }
}

function escapeHTML(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function publicAssetPath(path) {
  if (!path || path.startsWith("http") || path.startsWith("data:") || path.startsWith("/") || path.startsWith("../")) {
    return path;
  }
  return window.location.pathname.includes("/pages/") ? `../${path}` : path;
}

function applySavedContent() {
  const saved = readJSON("portfolioContent", {});
  if (String(saved.aboutText || "").startsWith(["This", "private", "side"].join(" "))) {
    saved.aboutText = DEFAULT_CONTENT.aboutText;
  }
  if (saved.ownerTitle === ["Owner", "Side"].join(" ")) saved.ownerTitle = DEFAULT_CONTENT.ownerTitle;
  if (saved.userTitle === ["User", "Side"].join(" ")) saved.userTitle = DEFAULT_CONTENT.userTitle;
  if (saved.userText === "Visitors can explore my AI work, freelance services, contact details, GitHub, LinkedIn, and project portfolio.") {
    saved.userText = DEFAULT_CONTENT.userText;
  }
  const content = { ...DEFAULT_CONTENT, ...saved };
  const fieldMap = {
    ...content,
    heroRoleShort: content.heroRole ? content.heroRole.split("|")[0].trim() : DEFAULT_CONTENT.heroRole
  };

  Object.entries(fieldMap).forEach(([field, value]) => {
    document.querySelectorAll(`[data-field="${field}"]`).forEach((node) => {
      node.textContent = value;
    });
  });

  const profileImage = localStorage.getItem("profileImageUrl");
  if (profileImage) {
    document.querySelectorAll(".profile img, .hero-visual img").forEach((img) => {
      img.src = publicAssetPath(profileImage);
    });
  }
}

function applySavedTheme() {
  const theme = readJSON("portfolioTheme", {});
  const keys = {
    primary: "--purple",
    secondary: "--cyan",
    bg: "--bg",
    text: "--text",
    panel: "--panel",
    panelTwo: "--panel-2",
    accent: "--amber"
  };

  Object.entries(keys).forEach(([key, cssVar]) => {
    if (theme[key]) document.documentElement.style.setProperty(cssVar, theme[key]);
  });
}

function applySavedLinks() {
  const links = { ...DEFAULT_LINKS, ...readJSON("portfolioLinks", {}) };

  document.querySelectorAll('[data-link="github"]').forEach((node) => {
    node.href = links.github;
  });

  document.querySelectorAll('[data-link="linkedin"]').forEach((node) => {
    node.href = links.linkedin;
  });

  document.querySelectorAll('[data-link="instagram"]').forEach((node) => {
    node.href = links.instagram;
  });

  document.querySelectorAll('[data-link="email"]').forEach((node) => {
    node.href = `mailto:${links.email}`;
    if (node.textContent.includes("@")) node.textContent = links.email;
  });

  document.querySelectorAll("[data-instagram-handle]").forEach((node) => {
    node.textContent = links.instagramHandle;
  });

  document.querySelectorAll("[data-instagram-qr]").forEach((img) => {
    img.src = publicAssetPath(links.instagramQr);
  });
}

function applySavedMetrics() {
  const metrics = readJSON("portfolioMetrics", DEFAULT_METRICS);
  metrics.slice(0, 4).forEach((metric, index) => {
    document.querySelectorAll(`[data-metric-value="${index}"]`).forEach((node) => {
      node.textContent = metric.value;
    });
    document.querySelectorAll(`[data-metric-label="${index}"]`).forEach((node) => {
      node.textContent = metric.label;
    });
  });
}

function applySavedSkills() {
  const skills = readJSON("portfolioSkills", DEFAULT_SKILLS);
  document.querySelectorAll("#skillGrid").forEach((grid) => {
    grid.innerHTML = skills.map((skill) => `<span>${escapeHTML(skill)}</span>`).join("");
  });
}

function projectCard(project) {
  const stack = String(project.stack || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => `<span>${escapeHTML(item)}</span>`)
    .join("");

  return `
    <article class="project-card">
      <div class="project-top"><span>${escapeHTML(project.category || "Project")}</span><span>AI</span></div>
      <h3>${escapeHTML(project.title || "Untitled Project")}</h3>
      <p>${escapeHTML(project.description || "")}</p>
      <div class="stack">${stack}</div>
      <div class="project-actions">
        <a class="btn ghost" href="${escapeHTML(project.github || DEFAULT_LINKS.github)}" target="_blank" rel="noreferrer">GitHub</a>
      </div>
    </article>
  `;
}

function applySavedProjects() {
  const projects = readJSON("portfolioProjects", DEFAULT_PROJECTS);
  document.querySelectorAll("#projectGrid, .project-grid").forEach((grid) => {
    if (grid.dataset.static === "true") return;
    grid.innerHTML = projects.map(projectCard).join("");
  });
}

function applyPortfolioSettings() {
  applySavedTheme();
  applySavedContent();
  applySavedLinks();
  applySavedMetrics();
  applySavedSkills();
  applySavedProjects();
}

document.addEventListener("DOMContentLoaded", applyPortfolioSettings);
window.addEventListener("storage", applyPortfolioSettings);
