# Hemanth Prasath - AI Engineer Portfolio

A premium, futuristic portfolio website for Hemanth Prasath, Generative AI Engineer, Machine Learning Developer, and Data Scientist.

## Features

- **Modern Design**: Black background with purple neon accents and glassmorphism effects
- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **Admin Dashboard**: Content management system to edit text, theme, and colors
- **Animated Elements**: Custom AI cursor, neural network background, scroll animations
- **Multiple Pages**: Home, Projects, Blog, Freelance, Contact, and Admin Dashboard

## Project Structure

```
hemanth-portfolio/
├── index.html              # Main homepage
├── style.css               # All styles and animations
├── script.js               # Interactive features
├── content-loader.js       # Applies CMS changes to site
├── README.md               # This file
├── assets/
│   ├── images/
│   │   └── profile.png     # Profile image
│   ├── icons/
│   └── animations/
├── pages/
│   ├── projects.html       # Projects showcase
│   ├── blog.html           # Blog articles
│   ├── freelance.html      # Freelance services
│   └── contact.html        # Contact form
└── admin/
    ├── login.html          # Admin login page
    ├── dashboard.html      # Admin dashboard
    └── admin-cms.js        # CMS functionality
```

## Admin Access

**Login Credentials:**
- Email: `hemanrhprasath.hp@gmail.com`
- Password: `Pr@s@th0304`

**Admin Features:**
- Edit hero section content
- Modify about section text
- Customize color theme (primary, secondary, background, text)
- Manage project details
- Update social links (GitHub, LinkedIn, Email)
- Export/Import settings

## Local Development

1. Clone the repository
2. Open `index.html` in a browser
3. Or use a local server:
   ```bash
   python -m http.server 8000
   ```
   Then visit `http://localhost:8000`

## GitHub Pages Deployment

1. Push this repository to GitHub
2. Go to repository Settings → Pages
3. Select source: Deploy from a branch
4. Select branch: `main` (or `master`) and folder: `/ (root)`
5. Click Save
6. Your site will be available at `https://yourusername.github.io/repository-name`

## Customization

### Using Admin Dashboard

1. Click the lock icon in the sidebar footer
2. Login with your credentials
3. Use the dashboard to:
   - Edit content in the Content tab
   - Change colors in the Theme tab
   - Manage projects in the Projects tab
   - Update links in the Links tab

### Manual Customization

- **Colors**: Edit CSS variables in `style.css` (lines 1-15)
- **Content**: Edit HTML directly in respective files
- **Images**: Replace files in `assets/images/`

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, animations, glassmorphism
- **JavaScript (Vanilla)**: No frameworks required
- **Lucide Icons**: Modern icon library

## Social Links

- **GitHub**: https://github.com/Prasath-0304
- **LinkedIn**: https://www.linkedin.com/in/hemanth-prasath-342278200/
- **Email**: hemanrhprasath.hp@gmail.com

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Copyright © 2026 Hemanth Prasath. All rights reserved.

## Credits

- Icons: [Lucide](https://lucide.dev/)
- Fonts: Inter & JetBrains Mono (Google Fonts)
