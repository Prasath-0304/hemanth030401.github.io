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

const DEFAULT_THEME = {
  primary: "#8a2cff",
  secondary: "#22d3ee",
  accent: "#f59e0b",
  bg: "#05020c",
  panel: "#10071d",
  text: "#f6f0ff"
};

const THEME_PRESETS = {
  neon: DEFAULT_THEME,
  midnight: {
    primary: "#3b82f6",
    secondary: "#38bdf8",
    accent: "#f97316",
    bg: "#020617",
    panel: "#0f172a",
    text: "#f8fafc"
  },
  matrix: {
    primary: "#22c55e",
    secondary: "#14b8a6",
    accent: "#a3e635",
    bg: "#01130b",
    panel: "#052e1a",
    text: "#f0fdf4"
  }
};

const DEFAULT_METRICS = [
  { value: "98.6%", label: "Model Accuracy Focus" },
  { value: "5+", label: "AI & Analytics Projects" },
  { value: "1.2M", label: "Dataset Scale Practice" },
  { value: "2026", label: "M.Tech CSE" }
];

const DEFAULT_SKILLS = ["Python", "TensorFlow", "PyTorch", "YOLOv8", "OpenCV", "SQL", "Power BI", "MLflow"];

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
  }
];

const DEFAULT_LINKS = {
  github: "https://github.com/Prasath-0304",
  linkedin: "https://www.linkedin.com/in/hemanth-prasath-342278200/",
  email: "hemanrhprasath.hp@gmail.com",
  instagram: "https://www.instagram.com/hemanth_prasath/",
  instagramHandle: "@hemanth_prasath",
  instagramQr: "assets/images/instagram-qr.svg"
};

function readJSON(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || "null") || fallback;
  } catch {
    return fallback;
  }
}

function setValue(id, value) {
  const node = document.getElementById(id);
  if (node) node.value = value || "";
}

function getValue(id) {
  return document.getElementById(id)?.value || "";
}

function checkAuth() {
  const localLogin = localStorage.getItem("adminLoggedIn") === "true";
  const sessionLogin = sessionStorage.getItem("adminLoggedIn") === "true";
  if (!localLogin && !sessionLogin) {
    window.location.href = "login.html";
  }
}

function logout() {
  localStorage.removeItem("adminLoggedIn");
  localStorage.removeItem("adminEmail");
  sessionStorage.removeItem("adminLoggedIn");
  sessionStorage.removeItem("adminEmail");
  window.location.href = "login.html";
}

function setupTabs() {
  const titles = {
    content: "Content",
    theme: "Theme",
    metrics: "Metrics",
    skills: "Skills",
    projects: "Projects",
    links: "Links + QR"
  };

  document.querySelectorAll("[data-tab]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const tab = link.dataset.tab;
      document.querySelectorAll("[data-tab]").forEach((item) => item.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
      document.getElementById(`${tab}Tab`)?.classList.add("active");
      const pageTitle = document.getElementById("pageTitle");
      if (pageTitle) pageTitle.textContent = titles[tab] || "Dashboard";
    });
  });
}

function applyThemeToDashboard(theme) {
  document.documentElement.style.setProperty("--purple", theme.primary);
  document.documentElement.style.setProperty("--cyan", theme.secondary);
  document.documentElement.style.setProperty("--amber", theme.accent);
  document.documentElement.style.setProperty("--bg", theme.bg);
  document.documentElement.style.setProperty("--panel", theme.panel);
  document.documentElement.style.setProperty("--text", theme.text);
}

function loadContent() {
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
  Object.keys(DEFAULT_CONTENT).forEach((key) => setValue(key, content[key]));
  setValue("profileImageUrl", localStorage.getItem("profileImageUrl") || "assets/images/ChatGPT Image Jun 4, 2026, 03_37_11 AM.png");
}

function saveContent() {
  const content = {};
  Object.keys(DEFAULT_CONTENT).forEach((key) => {
    content[key] = getValue(key);
  });
  localStorage.setItem("portfolioContent", JSON.stringify(content));
  localStorage.setItem("profileImageUrl", getValue("profileImageUrl"));
  alert("All public text and profile image settings saved.");
}

function loadTheme() {
  const theme = { ...DEFAULT_THEME, ...readJSON("portfolioTheme", {}) };
  setValue("primaryColor", theme.primary);
  setValue("secondaryColor", theme.secondary);
  setValue("accentColor", theme.accent);
  setValue("bgColor", theme.bg);
  setValue("panelColor", theme.panel);
  setValue("textColor", theme.text);
  applyThemeToDashboard(theme);
}

function saveTheme() {
  const theme = {
    primary: getValue("primaryColor"),
    secondary: getValue("secondaryColor"),
    accent: getValue("accentColor"),
    bg: getValue("bgColor"),
    panel: getValue("panelColor"),
    text: getValue("textColor")
  };
  localStorage.setItem("portfolioTheme", JSON.stringify(theme));
  applyThemeToDashboard(theme);
  alert("Custom theme saved.");
}

function applyPreset(name) {
  const theme = THEME_PRESETS[name] || DEFAULT_THEME;
  localStorage.setItem("portfolioTheme", JSON.stringify(theme));
  loadTheme();
  alert(`${name} theme applied.`);
}

function resetTheme() {
  applyPreset("neon");
}

function loadMetrics() {
  const metrics = readJSON("portfolioMetrics", DEFAULT_METRICS);
  const editor = document.getElementById("metricsEditor");
  if (!editor) return;
  editor.innerHTML = metrics.slice(0, 4).map((metric, index) => `
    <div class="project-edit-item">
      <h4>Metric ${index + 1}</h4>
      <div class="form-group"><label>Value</label><input class="metric-input" data-index="${index}" data-field="value" value="${metric.value}"></div>
      <div class="form-group"><label>Label</label><input class="metric-input" data-index="${index}" data-field="label" value="${metric.label}"></div>
    </div>
  `).join("");
}

function saveMetrics() {
  const metrics = [];
  document.querySelectorAll(".metric-input").forEach((input) => {
    const index = Number(input.dataset.index);
    if (!metrics[index]) metrics[index] = {};
    metrics[index][input.dataset.field] = input.value;
  });
  localStorage.setItem("portfolioMetrics", JSON.stringify(metrics));
  alert("Metrics saved.");
}

function loadSkills() {
  setValue("skillsList", readJSON("portfolioSkills", DEFAULT_SKILLS).join(", "));
}

function saveSkills() {
  const skills = getValue("skillsList").split(",").map((skill) => skill.trim()).filter(Boolean);
  localStorage.setItem("portfolioSkills", JSON.stringify(skills));
  alert("Skills saved.");
}

function loadProjects() {
  const projects = readJSON("portfolioProjects", DEFAULT_PROJECTS);
  const editor = document.getElementById("projectsEditor");
  if (!editor) return;
  editor.innerHTML = projects.map((project, index) => `
    <div class="project-edit-item">
      <h4>${project.title || "Project " + (index + 1)}</h4>
      <div class="form-group"><label>Title</label><input class="project-input" data-index="${index}" data-field="title" value="${project.title || ""}"></div>
      <div class="form-group"><label>Category</label><input class="project-input" data-index="${index}" data-field="category" value="${project.category || ""}"></div>
      <div class="form-group"><label>Description</label><textarea class="project-input" data-index="${index}" data-field="description">${project.description || ""}</textarea></div>
      <div class="form-group"><label>Tech Stack</label><input class="project-input" data-index="${index}" data-field="stack" value="${project.stack || ""}"></div>
      <div class="form-group"><label>GitHub URL</label><input class="project-input" data-index="${index}" data-field="github" value="${project.github || ""}"></div>
    </div>
  `).join("");
}

function saveProjects() {
  const projects = [];
  document.querySelectorAll(".project-input").forEach((input) => {
    const index = Number(input.dataset.index);
    if (!projects[index]) projects[index] = {};
    projects[index][input.dataset.field] = input.value;
  });
  localStorage.setItem("portfolioProjects", JSON.stringify(projects));
  alert("Projects saved.");
}

function addProject() {
  const projects = readJSON("portfolioProjects", DEFAULT_PROJECTS);
  projects.push({
    title: "New Project",
    category: "AI Project",
    description: "Describe the project, impact, and tools used.",
    stack: "Python, AI, Data",
    github: "https://github.com/Prasath-0304"
  });
  localStorage.setItem("portfolioProjects", JSON.stringify(projects));
  loadProjects();
}

function loadLinks() {
  const links = { ...DEFAULT_LINKS, ...readJSON("portfolioLinks", {}) };
  setValue("githubUrl", links.github);
  setValue("linkedinUrl", links.linkedin);
  setValue("emailUrl", links.email);
  setValue("instagramUrl", links.instagram);
  setValue("instagramHandle", links.instagramHandle);
  setValue("instagramQr", links.instagramQr);
}

function saveLinks() {
  const links = {
    github: getValue("githubUrl"),
    linkedin: getValue("linkedinUrl"),
    email: getValue("emailUrl"),
    instagram: getValue("instagramUrl"),
    instagramHandle: getValue("instagramHandle"),
    instagramQr: getValue("instagramQr")
  };
  localStorage.setItem("portfolioLinks", JSON.stringify(links));
  alert("Links and Instagram QR settings saved.");
}

function exportSettings() {
  const settings = {
    content: readJSON("portfolioContent", DEFAULT_CONTENT),
    theme: readJSON("portfolioTheme", DEFAULT_THEME),
    metrics: readJSON("portfolioMetrics", DEFAULT_METRICS),
    skills: readJSON("portfolioSkills", DEFAULT_SKILLS),
    projects: readJSON("portfolioProjects", DEFAULT_PROJECTS),
    links: readJSON("portfolioLinks", DEFAULT_LINKS),
    profileImageUrl: localStorage.getItem("profileImageUrl")
  };
  const data = new Blob([JSON.stringify(settings, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(data);
  const link = document.createElement("a");
  link.href = url;
  link.download = "portfolio-settings.json";
  link.click();
  URL.revokeObjectURL(url);
}

function importSettings(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const settings = JSON.parse(reader.result);
      if (settings.content) localStorage.setItem("portfolioContent", JSON.stringify(settings.content));
      if (settings.theme) localStorage.setItem("portfolioTheme", JSON.stringify(settings.theme));
      if (settings.metrics) localStorage.setItem("portfolioMetrics", JSON.stringify(settings.metrics));
      if (settings.skills) localStorage.setItem("portfolioSkills", JSON.stringify(settings.skills));
      if (settings.projects) localStorage.setItem("portfolioProjects", JSON.stringify(settings.projects));
      if (settings.links) localStorage.setItem("portfolioLinks", JSON.stringify(settings.links));
      if (settings.profileImageUrl) localStorage.setItem("profileImageUrl", settings.profileImageUrl);
      location.reload();
    } catch {
      alert("Import failed. Please choose a valid exported settings file.");
    }
  };
  reader.readAsText(file);
}

document.addEventListener("DOMContentLoaded", () => {
  checkAuth();
  document.getElementById("adminEmail").textContent = localStorage.getItem("adminEmail") || sessionStorage.getItem("adminEmail") || DEFAULT_LINKS.email;
  document.getElementById("logoutBtn").addEventListener("click", (event) => {
    event.preventDefault();
    logout();
  });
  setupTabs();
  loadContent();
  loadTheme();
  loadMetrics();
  loadSkills();
  loadProjects();
  loadLinks();
});
