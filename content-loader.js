// Content Loader - Applies CMS changes to the main site
// This script loads saved content, theme, and links from localStorage

// Apply saved content
function applySavedContent() {
  const savedContent = localStorage.getItem('portfolioContent');
  if (savedContent) {
    const content = JSON.parse(savedContent);
    
    // Update hero section
    if (content.heroName) {
      const heroName = document.querySelector('.hero-copy h1');
      if (heroName) heroName.textContent = content.heroName;
      
      const profileName = document.querySelector('.profile h2');
      if (profileName) profileName.textContent = content.heroName;
    }
    
    if (content.heroRole) {
      const heroRole = document.querySelector('.hero-copy h3');
      if (heroRole) heroRole.textContent = content.heroRole;
      
      const profileRole = document.querySelector('.profile p');
      if (profileRole) profileRole.textContent = content.heroRole.split('|')[0].trim();
    }
    
    if (content.heroIntro) {
      const heroIntro = document.querySelector('.intro');
      if (heroIntro) heroIntro.textContent = content.heroIntro;
    }
    
    if (content.aboutText) {
      const aboutText = document.querySelector('#about .glass-card p');
      if (aboutText) aboutText.textContent = content.aboutText;
    }
  }
  
  // Apply saved profile image
  const savedProfileImage = localStorage.getItem('profileImageUrl');
  if (savedProfileImage) {
    document.querySelectorAll('.profile-image img').forEach(img => {
      img.src = savedProfileImage;
    });
  }
}

// Apply saved theme
function applySavedTheme() {
  const savedTheme = localStorage.getItem('portfolioTheme');
  if (savedTheme) {
    const theme = JSON.parse(savedTheme);
    
    if (theme.primary) document.documentElement.style.setProperty('--purple', theme.primary);
    if (theme.secondary) document.documentElement.style.setProperty('--cyan', theme.secondary);
    if (theme.bg) document.documentElement.style.setProperty('--bg', theme.bg);
    if (theme.text) document.documentElement.style.setProperty('--text', theme.text);
  }
}

// Apply saved links
function applySavedLinks() {
  const savedLinks = localStorage.getItem('portfolioLinks');
  if (savedLinks) {
    const links = JSON.parse(savedLinks);
    
    // Update email links
    if (links.email) {
      document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.href = 'mailto:' + links.email;
        if (link.textContent.includes('@')) {
          link.textContent = links.email;
        }
      });
    }
    
    // Update GitHub links
    if (links.github) {
      document.querySelectorAll('a[href*="github.com"]').forEach(link => {
        if (!link.href.includes('admin')) {
          link.href = links.github;
        }
      });
    }
    
    // Update LinkedIn links
    if (links.linkedin) {
      document.querySelectorAll('a[href*="linkedin.com"]').forEach(link => {
        link.href = links.linkedin;
      });
    }
  }
}

// Apply saved projects
function applySavedProjects() {
  const savedProjects = localStorage.getItem('portfolioProjects');
  if (savedProjects && document.querySelector('.project-grid')) {
    const projects = JSON.parse(savedProjects);
    const projectGrid = document.querySelector('.project-grid');
    
    if (projectGrid && projects.length > 0) {
      // This would require more complex DOM manipulation
      // For now, projects are managed in the admin dashboard
      console.log('Projects loaded:', projects);
    }
  }
}

// Initialize content loader
document.addEventListener('DOMContentLoaded', function() {
  // Apply all saved settings
  applySavedContent();
  applySavedTheme();
  applySavedLinks();
  applySavedProjects();
  
  console.log('Content loader initialized');
});

// Listen for storage changes (for real-time updates from admin dashboard)
window.addEventListener('storage', function(e) {
  if (e.key === 'portfolioContent') {
    applySavedContent();
  } else if (e.key === 'portfolioTheme') {
    applySavedTheme();
  } else if (e.key === 'portfolioLinks') {
    applySavedLinks();
  } else if (e.key === 'portfolioProjects') {
    applySavedProjects();
  }
});
