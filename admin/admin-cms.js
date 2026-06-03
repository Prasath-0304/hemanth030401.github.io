// Admin CMS - Content Management System
// Check authentication
function checkAuth() {
  const isLoggedIn = localStorage.getItem('adminLoggedIn');
  if (!isLoggedIn || isLoggedIn !== 'true') {
    window.location.href = 'login.html';
  }
}

// Logout function
function logout() {
  localStorage.removeItem('adminLoggedIn');
  localStorage.removeItem('adminEmail');
  window.location.href = 'login.html';
}

// Tab navigation
function setupTabs() {
  const tabLinks = document.querySelectorAll('[data-tab]');
  const tabContents = document.querySelectorAll('.tab-content');
  const pageTitle = document.getElementById('pageTitle');

  tabLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const tabName = link.getAttribute('data-tab');
      
      // Update active states
      tabLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      
      tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === tabName + 'Tab') {
          content.classList.add('active');
        }
      });

      // Update page title
      const titles = {
        'content': 'Content Management',
        'theme': 'Theme Customization',
        'projects': 'Project Management',
        'links': 'Link Management'
      };
      if (pageTitle) pageTitle.textContent = titles[tabName] || 'Dashboard';
    });
  });
}

// Load saved content
function loadContent() {
  const savedContent = localStorage.getItem('portfolioContent');
  if (savedContent) {
    const content = JSON.parse(savedContent);
    
    if (content.heroName) document.getElementById('heroName').value = content.heroName;
    if (content.heroRole) document.getElementById('heroRole').value = content.heroRole;
    if (content.heroIntro) document.getElementById('heroIntro').value = content.heroIntro;
    if (content.aboutText) document.getElementById('aboutText').value = content.aboutText;
  }
  
  // Load profile image
  const savedProfileImage = localStorage.getItem('profileImageUrl');
  if (savedProfileImage) {
    document.getElementById('profileImageUrl').value = savedProfileImage;
    const preview = document.getElementById('profilePreview');
    const noMsg = document.getElementById('noProfileMsg');
    
    preview.src = savedProfileImage;
    preview.onerror = function() {
      this.style.display = 'none';
      noMsg.style.display = 'block';
    };
    preview.onload = function() {
      this.style.display = 'block';
      noMsg.style.display = 'none';
    };
  }
}

// Save content
function saveContent() {
  const content = {
    heroName: document.getElementById('heroName').value,
    heroRole: document.getElementById('heroRole').value,
    heroIntro: document.getElementById('heroIntro').value,
    aboutText: document.getElementById('aboutText').value
  };
  
  localStorage.setItem('portfolioContent', JSON.stringify(content));
  applyContentToSite(content);
  alert('Content saved successfully!');
}

// Save profile image
function saveProfileImage() {
  const profileImageUrl = document.getElementById('profileImageUrl').value;
  localStorage.setItem('profileImageUrl', profileImageUrl);
  
  // Update preview
  const preview = document.getElementById('profilePreview');
  const noMsg = document.getElementById('noProfileMsg');
  
  preview.src = profileImageUrl;
  preview.onerror = function() {
    this.style.display = 'none';
    noMsg.style.display = 'block';
  };
  preview.onload = function() {
    this.style.display = 'block';
    noMsg.style.display = 'none';
  };
  
  alert('Profile image updated successfully!');
}

// Apply content to main site
function applyContentToSite(content) {
  // This will be called from the main site to load content
  localStorage.setItem('portfolioContent', JSON.stringify(content));
}

// Load theme
function loadTheme() {
  const savedTheme = localStorage.getItem('portfolioTheme');
  if (savedTheme) {
    const theme = JSON.parse(savedTheme);
    
    if (theme.primary) document.getElementById('primaryColor').value = theme.primary;
    if (theme.secondary) document.getElementById('secondaryColor').value = theme.secondary;
    if (theme.bg) document.getElementById('bgColor').value = theme.bg;
    if (theme.text) document.getElementById('textColor').value = theme.text;
  }
}

// Save theme
function saveTheme() {
  const theme = {
    primary: document.getElementById('primaryColor').value,
    secondary: document.getElementById('secondaryColor').value,
    bg: document.getElementById('bgColor').value,
    text: document.getElementById('textColor').value
  };
  
  localStorage.setItem('portfolioTheme', JSON.stringify(theme));
  applyThemeToSite(theme);
  alert('Theme applied successfully!');
}

// Apply theme to site
function applyThemeToSite(theme) {
  document.documentElement.style.setProperty('--purple', theme.primary);
  document.documentElement.style.setProperty('--cyan', theme.secondary);
  document.documentElement.style.setProperty('--bg', theme.bg);
  document.documentElement.style.setProperty('--text', theme.text);
}

// Reset theme
function resetTheme() {
  const defaultTheme = {
    primary: '#a855f7',
    secondary: '#22d3ee',
    bg: '#030207',
    text: '#f4f0ff'
  };
  
  document.getElementById('primaryColor').value = defaultTheme.primary;
  document.getElementById('secondaryColor').value = defaultTheme.secondary;
  document.getElementById('bgColor').value = defaultTheme.bg;
  document.getElementById('textColor').value = defaultTheme.text;
  
  localStorage.setItem('portfolioTheme', JSON.stringify(defaultTheme));
  applyThemeToSite(defaultTheme);
  alert('Theme reset to default!');
}

// Apply preset themes
function applyPreset(preset) {
  const presets = {
    'default': { primary: '#a855f7', secondary: '#22d3ee', bg: '#030207', text: '#f4f0ff' },
    'blue': { primary: '#3b82f6', secondary: '#06b6d4', bg: '#020617', text: '#f8fafc' },
    'green': { primary: '#22c55e', secondary: '#14b8a6', bg: '#022c22', text: '#f0fdf4' },
    'red': { primary: '#ef4444', secondary: '#f97316', bg: '#1c0a0a', text: '#fef2f2' },
    'orange': { primary: '#f97316', secondary: '#eab308', bg: '#1c0a02', text: '#fffbeb' },
    'pink': { primary: '#ec4899', secondary: '#a855f7', bg: '#1c0514', text: '#fdf2f8' }
  };
  
  const theme = presets[preset];
  if (theme) {
    document.getElementById('primaryColor').value = theme.primary;
    document.getElementById('secondaryColor').value = theme.secondary;
    document.getElementById('bgColor').value = theme.bg;
    document.getElementById('textColor').value = theme.text;
    
    localStorage.setItem('portfolioTheme', JSON.stringify(theme));
    applyThemeToSite(theme);
    alert(`${preset.charAt(0).toUpperCase() + preset.slice(1)} theme applied!`);
  }
}

// Load projects
function loadProjects() {
  const savedProjects = localStorage.getItem('portfolioProjects');
  const projectsEditor = document.getElementById('projectsEditor');
  
  const defaultProjects = [
    {
      title: 'SmartVision AI',
      category: 'Computer Vision',
      description: 'Advanced AI vision system for real-time object detection, monitoring, and intelligent scene analysis using deep learning pipelines.',
      stack: 'YOLOv8, Python, OpenCV, PyTorch',
      github: 'https://github.com/Prasath-0304'
    },
    {
      title: 'PatrolIQ',
      category: 'AI Monitoring',
      description: 'Smart patrol intelligence platform for surveillance workflows, anomaly detection, and operational reporting.',
      stack: 'Python, Computer Vision, Analytics, TensorFlow',
      github: 'https://github.com/Prasath-0304'
    },
    {
      title: 'EmiPredict AI',
      category: 'Predictive ML',
      description: 'Machine learning solution for EMI prediction with feature engineering, model evaluation, and explainable outputs.',
      stack: 'Scikit-learn, MLflow, Streamlit, Pandas',
      github: 'https://github.com/Prasath-0304'
    },
    {
      title: 'Amazon India Sales Analytics',
      category: 'Data Analytics',
      description: 'Comprehensive sales intelligence dashboard for trend discovery, regional performance, category insights, and business decisions.',
      stack: 'Power BI, SQL, Python, Excel',
      github: 'https://github.com/Prasath-0304'
    },
    {
      title: 'CricBuzz LiveStats',
      category: 'Live Stats',
      description: 'Real-time cricket analytics interface for live score tracking, match summaries, and performance visualization.',
      stack: 'JavaScript, API, Charts, React',
      github: 'https://github.com/Prasath-0304'
    }
  ];
  
  const projects = savedProjects ? JSON.parse(savedProjects) : defaultProjects;
  
  projectsEditor.innerHTML = projects.map((project, index) => `
    <div class="project-edit-item">
      <h4>${project.title}</h4>
      <div class="form-group">
        <label>Title</label>
        <input type="text" value="${project.title}" data-index="${index}" data-field="title" class="project-input">
      </div>
      <div class="form-group">
        <label>Category</label>
        <input type="text" value="${project.category}" data-index="${index}" data-field="category" class="project-input">
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea data-index="${index}" data-field="description" class="project-input" rows="3">${project.description}</textarea>
      </div>
      <div class="form-group">
        <label>Tech Stack</label>
        <input type="text" value="${project.stack}" data-index="${index}" data-field="stack" class="project-input">
      </div>
      <div class="form-group">
        <label>GitHub URL</label>
        <input type="url" value="${project.github}" data-index="${index}" data-field="github" class="project-input">
      </div>
    </div>
  `).join('');
}

// Save projects
function saveProjects() {
  const projectInputs = document.querySelectorAll('.project-input');
  const projects = [];
  
  projectInputs.forEach(input => {
    const index = parseInt(input.dataset.index);
    const field = input.dataset.field;
    
    if (!projects[index]) {
      projects[index] = {};
    }
    projects[index][field] = input.value;
  });
  
  localStorage.setItem('portfolioProjects', JSON.stringify(projects));
  alert('Projects saved successfully!');
}

// Load links
function loadLinks() {
  const savedLinks = localStorage.getItem('portfolioLinks');
  const defaultLinks = {
    github: 'https://github.com/Prasath-0304',
    linkedin: 'https://www.linkedin.com/in/hemanth-prasath-342278200/',
    email: 'hemanrhprasath.hp@gmail.com'
  };
  
  const links = savedLinks ? JSON.parse(savedLinks) : defaultLinks;
  
  if (links.github) document.getElementById('githubUrl').value = links.github;
  if (links.linkedin) document.getElementById('linkedinUrl').value = links.linkedin;
  if (links.email) document.getElementById('emailUrl').value = links.email;
}

// Save links
function saveLinks() {
  const links = {
    github: document.getElementById('githubUrl').value,
    linkedin: document.getElementById('linkedinUrl').value,
    email: document.getElementById('emailUrl').value
  };
  
  localStorage.setItem('portfolioLinks', JSON.stringify(links));
  alert('Links saved successfully!');
}

// Export settings
function exportSettings() {
  const settings = {
    content: JSON.parse(localStorage.getItem('portfolioContent') || '{}'),
    theme: JSON.parse(localStorage.getItem('portfolioTheme') || '{}'),
    projects: JSON.parse(localStorage.getItem('portfolioProjects') || '[]'),
    links: JSON.parse(localStorage.getItem('portfolioLinks') || '{}')
  };
  
  const dataStr = JSON.stringify(settings, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'portfolio-settings.json';
  link.click();
  
  URL.revokeObjectURL(url);
}

// Import settings
function importSettings(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const settings = JSON.parse(e.target.result);
      
      if (settings.content) localStorage.setItem('portfolioContent', JSON.stringify(settings.content));
      if (settings.theme) localStorage.setItem('portfolioTheme', JSON.stringify(settings.theme));
      if (settings.projects) localStorage.setItem('portfolioProjects', JSON.stringify(settings.projects));
      if (settings.links) localStorage.setItem('portfolioLinks', JSON.stringify(settings.links));
      
      alert('Settings imported successfully! Reloading...');
      location.reload();
    } catch (error) {
      alert('Error importing settings. Please check the file format.');
    }
  };
  reader.readAsText(file);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  checkAuth();
  
  // Set admin email
  const adminEmail = localStorage.getItem('adminEmail');
  if (adminEmail) {
    document.getElementById('adminEmail').textContent = adminEmail;
  }
  
  // Setup logout
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      logout();
    });
  }
  
  // Setup tabs
  setupTabs();
  
  // Load data
  loadContent();
  loadTheme();
  loadProjects();
  loadLinks();
  
  // Initialize icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
