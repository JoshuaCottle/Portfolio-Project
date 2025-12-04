# MindfulHelp — Portfolio Project

**Live site:** https://joshuacottle.github.io/Portfolio-Project/

**Repository:** https://github.com/JoshuaCottle/Portfolio-Project

**Responsibility / Ownership**

-   Primary author: Joshua Cottle
-   Responsibilities: project structure, HTML/CSS layout, responsive styling, basic JavaScript for interactive components (carousel), image and asset management, accessibility and basic validation fixes.

**Example responsive image**

![desktop](assets\images\desktop response.png)
![tablet](assets\images\tablet.png)
![phone](assets/images/phone response .png)

**Contents**

-   `index.html` — Home / landing page
-   `tips.html` — Tips & Affirmations page with carousel
-   `contact.html`, `success.html` — contact and confirmation pages
-   `assets/css/style.css` — custom styles
-   `assets/images/` — image assets and favicons
-   `scripts/check-rel.js` — small Node script to enforce external link `rel` attributes

**UX**

-   Clear, calm layout intended for mental-health resources.
-   Simple navigation with prominent brand and quick access to Resources, Tips and Contact.
-   Large hero area and readable typography for accessibility.

    **Design**

-   Soft, approachable colour palette using CSS variables in `assets/css/style.css` for mental-health branding consistency.
    --primary-color: #0b4f6c; /_ deep teal / navy _/
    --secondary-color: #7fb3d5; /_ soft sky blue _/
    --highlight-color: #ffffff; /_ white _/
    --highlight-color-light: #7a9fc2; /_ light blue _/

-   Typography: clean, readable sans-serif fonts with strong hierarchy to support accessibility and user focus.
-   Imagery: calming, nature-inspired photography and illustrations aligned with wellness themes; optimized for fast loading and responsive display.
-   Responsive grid (Bootstrap 5) for cards and media queries for smaller screens.
-   Accessible markup (aria attributes on carousel and navigation) and visible captions on small screens.

**Website features**

-   Responsive navbar with brand/logo
-   Hero image + overlaid cover text
-   Resources/tips card grid
-   Affirmations carousel with captions
-   Footer with contact info and social links
-   `scripts/check-rel.js` to scan and optionally fix external anchors missing `rel="noopener noreferrer"`

**Tablet / Mobile view**

-   Uses Bootstrap responsive breakpoints: cards stack vertically on small devices and display in a multi-column grid on larger screens.
-   Carousel images use `object-fit: cover` and viewport-based heights to remain visually consistent.
-   Navbar collapses into a hamburger menu for small screens.

**Future features (ideas)**

-   Add semantic HTML cleanup and validation fixes (move headings out of `<p>`, fix nested lists).
-   Add automated CI step to run `scripts/check-rel.js` and basic HTML validation.
-   Add light/dark theme toggle and persist preference.
-   Add unit/integration tests for any JS components.

**Technologies used**

-   HTML5, CSS3
-   Bootstrap 5 (CDN)
-   Minimal JavaScript (Bootstrap bundle + `scripts/check-rel.js` in Node)
-   Font Awesome for icons

**Deployment**

-   Hosted via GitHub Pages. Push to the `main` branch (or `gh-pages`) and enable Pages in repository settings.

**Testing**

<h5>light house</h5>
mobile
![light house test](assets/images/image.png)
desktop
!{lighthouse test }](assets/images/image-1.png)
w3 css validity test 
![alt text](assets\images\css validiater.png)
w3 Html Validity test

**Credits**

-   Project authored by Joshua Cottle.
-   Images: credited to their respective sources (check `assets/images` filenames). Replace with licensed assets if publishing commercially.
