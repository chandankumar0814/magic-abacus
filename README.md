# 🧮 Magic Abacus - BOMIS Purnia Edition

Welcome to the **BOMIS Magic Abacus** Progressive Web App (PWA)! This interactive, animated abacus is a fun, visual, and school-branded educational tool designed specifically for the students of **Birla Open Minds International School, Purnia**.

It lets children learn counting and place value (from units to millions) with delightful animations and sound effects, all while feeling a connection to their school.

## ✨ Features

* **Interactive 7-Row Abacus:** Tap or slide colorful beads to calculate numbers up to 9,999,999.
* **Animated & "Magic":** Features floating titles, drifting clouds, springy beads, a score-box "pop," and magical sparkles.
* **Audio Feedback:** Includes unique sounds when moving beads and a delightful "magic" sound for resets.
* **Score Display:** Shows the total calculated number in a friendly, animated box.
* **Place Value Labels:** Clearly marked rods for 1, 10, 100, 1K, 10K, 100K, and 1M.
* **School Branding:** Proudly displays the BOMIS Purnia official name and logo in a dedicated header.
* **Progressive Web App (PWA):** Can be installed and runs as a standalone app on both Android and iOS devices, with a custom "Magic Abacus" icon.
* **Offline Capable:** Thanks to the included Service Worker, the app works seamlessly even without an internet connection once it has been loaded once.

## 🚀 Installation (PWA)

To install this "Magic Abacus" on your student's smartphone or tablet:

**For Android (Chrome):**

1.  Open the app's URL in the Google Chrome browser.
2.  Tap the menu button (three dots) in the top-right corner.
3.  Tap **"Install app"** or **"Add to Home screen."**
4.  Follow the prompts to add the app to your home screen. It will now appear as a separate, branded application.

**For iOS (Safari):**

1.  Open the app's URL in the Safari browser.
2.  Tap the **Share** button (the square with an upward arrow) in the bottom toolbar.
3.  Scroll down and tap **"Add to Home Screen."**
4.  Customize the name (it will default to "Magic Abacus"), and then tap **"Add."** It will now be accessible from your home screen like any other app.

## 🏗️ Technical Details & Setup

This is a Progressive Web App. To make it work as intended, you need a total of five (or more) specific files in your web project's root folder:

1.  **`abacus.html`** (or your main file): The core HTML/CSS/JavaScript. It registers the PWA service worker.
2.  **`manifest.json`**: This file tells the phone how to install and present the app (name, icons, colors, `start_url`). Make sure the `start_url` points *exactly* to your main HTML file (e.g., `./abacus.html`).
3.  **`sw.js`** (Service Worker): The JavaScript file that handles offline capabilities, pre-caching, and updating the application.
4.  **`logo.png`**: The official school logo, required for the PWA configuration and header branding.
5.  **Icons:** At a minimum, you should have `icon-192.png` and `icon-512.png`. It is also recommended to create `apple-touch-icon.png` (a 180x180 PNG copy of your 512x512 icon) for iOS compatibility. Place these icons in the root folder and verify their paths in `manifest.json`.

**Example `manifest.json`:**

```json
{
  "name": "BOMIS Magic Abacus",
  "short_name": "Magic Abacus",
  "description": "The interactive abacus application from BOMIS Purnia.",
  "start_url": "./abacus.html",
  "display": "standalone",
  "background_color": "#87CEEB",
  "theme_color": "#d32f2f",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
