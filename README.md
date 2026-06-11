# Hemanth Prasath - AI Portfolio Dashboard

A static GitHub Pages portfolio for Hemanth Prasath with a dark AI dashboard theme, owner-side admin controls, visitor-side freelance/contact sections, and project links.

## Features

- Dashboard-inspired design based on `assets/images/ChatGPT Image Jun 4, 2026, 03_37_11 AM.png`
- Public visitor side for projects, freelance services, mail contact, GitHub, and LinkedIn
- Hidden owner gate: click the `HP` button 5 times on the home page to reveal owner login
- Admin dashboard for editing public text, metrics, skills, theme colors, project data, profile image path, links, and Instagram QR settings
- Three built-in theme presets: Neon AI, Midnight Blue, and Matrix Green
- Works as a static site on GitHub Pages

## Admin Access

Email: `hemanrhprasath.hp@gmail.com`

Password: `Pr@s@th0304`

Important: this is a static website, so the credentials are visible in the front-end JavaScript. Use this as a convenience gate, not as real security for private data.

## Project Structure

```text
index.html
style.css
script.js
content-loader.js
assets/
  images/
    ChatGPT Image Jun 4, 2026, 03_37_11 AM.png
    instagram-qr.svg
pages/
  projects.html
  blog.html
  freelance.html
  contact.html
admin/
  login.html
  dashboard.html
  admin-cms.js
```

## Local Preview

Open `index.html` directly in a browser, or run a small local server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## GitHub Pages Deployment

1. Push the repository to GitHub.
2. Open repository Settings, then Pages.
3. Select `Deploy from a branch`.
4. Choose the `main` branch and `/ (root)` folder.
5. Save the settings.

## Links

- GitHub: https://github.com/Prasath-0304
- LinkedIn: https://www.linkedin.com/in/hemanth-prasath-342278200/
- Instagram: https://www.instagram.com/hemanth_prasath/
- Email: hemanrhprasath.hp@gmail.com

## Instagram QR

The default QR artwork is `assets/images/instagram-qr.svg`. To use your exact Instagram QR image, place it in `assets/images/`, then update the `Instagram QR Image Path` field in the admin dashboard.
