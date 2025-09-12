# Aleksa Vučak — Portfolio

A modern, animated developer portfolio built with **React**, **Tailwind CSS**, and **React Three Fiber**. It features a canvas starfield background, interactive 3D models, a responsive timeline with flip-cards, a projects gallery, a tilt-animated skills grid, and an EmailJS-powered contact form with toast notifications.

> **Live Demo:** _Add your hosted URL here (Vercel/Netlify/GitHub Pages/custom domain)_

---

## ✨ Features

- **Hero + Typewriter** headline with smooth anchor scrolling
- **Canvas starfield** (ShootingStars) that respects `prefers-reduced-motion`
- **3D sections** via `@react-three/fiber` + `@react-three/drei`
- **Responsive Work Experience** timeline (mobile stacked + desktop flip-cards)
- **Projects gallery** with external links and “Coming Soon” placeholders
- **Skills grid** with parallax **tilt** effects
- **EmailJS contact form** + **react-hot-toast** notifications
- **Dark theme** built with Tailwind utility classes

---

## 🧰 Tech Stack

- **Framework:** React (Create React App)
- **Styling:** Tailwind CSS
- **3D:** `@react-three/fiber`, `@react-three/drei`, `three`
- **UX/Effects:** `react-parallax-tilt`, `react-simple-typewriter`, `react-icons`
- **Notifications:** `react-hot-toast`
- **Email:** `@emailjs/browser`

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18 and **npm** ≥ 9 (or **pnpm** / **yarn**)

### Install
```bash
# after cloning the repo
npm install
Run (development)
bash
Copy code
npm start
CRA serves the app at http://localhost:3000.

Build (production)
bash
Copy code
npm run build
Outputs static files to build/.

🔐 Environment Variables (EmailJS)
The contact form uses EmailJS. Move IDs/keys to environment variables (don’t hardcode in a public repo).

Create .env in the project root:

env
Copy code
REACT_APP_EMAILJS_SERVICE_ID=service_f4wzuen
REACT_APP_EMAILJS_TEMPLATE_ID=template_bdufpmg
REACT_APP_EMAILJS_PUBLIC_KEY=PpzRCWX6v-6tCPA3S
Update the call in App.js:

js
Copy code
emailjs.sendForm(
  process.env.REACT_APP_EMAILJS_SERVICE_ID,
  process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
  form.current,
  process.env.REACT_APP_EMAILJS_PUBLIC_KEY
);
Restart your dev server after changing .env.

In the EmailJS dashboard, create a service, template, and allow your domain(s).

📁 Project Structure
bash
Copy code
src/
  App.js                 # Main page and sections
  Navbar.jsx             # Navigation bar
  ShootingStars.jsx      # Canvas starfield background
  DesktopModel.jsx       # 3D desktop scene
  GlobeModel.jsx         # 3D globe (contact section)
  index.css              # Global styles (Tailwind)
  assets/
    AleksaVucak_Resume.pdf
  images/
    ...                  # Logos, thumbnails, icons
🛠️ Customization
Branding & Hero: Update <h1> and the Typewriter words array in App.js.

Links/CTAs: Replace URLs for Resume, GitHub, and LinkedIn in App.js. The Resume button uses window.open to avoid changing the SPA URL.

Starfield: Tweak ShootingStars props (e.g., starCount, tint) in App.js. Honors prefers-reduced-motion.

3D Models: Edit lighting/camera in Canvas components (Desktop/Globe sections).

Experience Timeline: Update content under #experience.

Projects: Edit the projects array in App.js.

Skills: Add/remove entries in the arrays under #skills. Icons live in src/images.

🌐 Deployment (Hosted Options)
All builds are static assets in build/. Because this is a single-page app (SPA), ensure a fallback to index.html for unknown routes.

Option A — Vercel (recommended)
Connect your Git repo to Vercel.

Build command: npm run build

Output directory: build

Add environment variables in Vercel → Settings → Environment Variables:

REACT_APP_EMAILJS_SERVICE_ID

REACT_APP_EMAILJS_TEMPLATE_ID

REACT_APP_EMAILJS_PUBLIC_KEY

Set your custom domain (optional) and redeploy.

Vercel handles SPA routing automatically.

Option B — Netlify
Connect repo or drag-and-drop the build/ folder.

Build command: npm run build

Publish directory: build

SPA fallback: add a _redirects file to public/ before building:

bash
Copy code
/*  /index.html  200
Add environment variables under Site settings → Build & deploy → Environment.

Option C — GitHub Pages (CRA)
npm i -D gh-pages

Add to package.json:

json
Copy code
"homepage": "https://<your-user>.github.io/<your-repo>",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
Deploy with:

bash
Copy code
npm run deploy
Note: GH Pages isn’t ideal for client-side routed SPAs. The _redirects file doesn’t apply; consider Vercel/Netlify for cleaner SPA routing.

Option D — Self-Hosting (Nginx)
Serve the build/ folder from Nginx with SPA fallback:

nginx
Copy code
server {
  listen 80;
  server_name yourdomain.com;

  root /var/www/portfolio/build;
  index index.html;

  location / {
    try_files $uri /index.html;
  }

  location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|webp|woff2?)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
}
Use HTTPS (e.g., via Certbot) and set environment variables at build time on your CI.

♿ Accessibility & ⚡ Performance
Reduced Motion: Starfield swaps to a static render if the OS prefers reduced motion.

Lazy Loading: 3D models are wrapped in <Suspense>.

Images: Use optimized assets; object-contain/object-cover help layout stability.

3D: Tune dpr, light intensities, and model complexity if performance dips.

✅ Roadmap / Ideas
Add SEO metadata & Open Graph tags

Add a blog or “Now” page

Internationalization (i18n)

Unit tests for key components

📄 License
Choose a license (e.g., MIT) and add a LICENSE file. Verify third-party model/image licenses before publishing.

👋 Contact
Name: Aleksa Vucak
Email: aleksavucak@gmail.com
LinkedIn: www.linkedin.com/in/aleksa-vucak-587923298