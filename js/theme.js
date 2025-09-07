// theme switcher with enhanced animations
const themeToggle = document.querySelector(".theme-toggle");
const htmlElement = document.documentElement;
const themeIcon = themeToggle.querySelector("i");

// check for system preference
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

// check for saved theme preference or use system preference
const savedTheme =
  localStorage.getItem("theme") ||
  (prefersDarkScheme.matches ? "dark" : "light");

// apply theme immediately when page loads
document.documentElement.setAttribute("data-theme", savedTheme);
updateThemeIcon(savedTheme);

// add a smooth transition class
document.documentElement.classList.add('theme-transition');

// listen for theme toggle clicks
themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  // add animation class
  themeToggle.style.transform = 'scale(0.8)';
  
  setTimeout(() => {
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
    themeToggle.style.transform = 'scale(1)';
  }, 150);
});

// listen for system theme changes
prefersDarkScheme.addEventListener("change", (e) => {
  if (!localStorage.getItem("theme")) {
    const newTheme = e.matches ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    updateThemeIcon(newTheme);
  }
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === "light" ? "fas fa-moon" : "fas fa-sun";
}

// add page load animation
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// add some interactive sparkle effects on hover
function createSparkle(x, y) {
  const sparkle = document.createElement('div');
  sparkle.style.position = 'fixed';
  sparkle.style.left = x + 'px';
  sparkle.style.top = y + 'px';
  sparkle.style.width = '4px';
  sparkle.style.height = '4px';
  sparkle.style.background = 'var(--accent-color)';
  sparkle.style.borderRadius = '50%';
  sparkle.style.pointerEvents = 'none';
  sparkle.style.zIndex = '9999';
  sparkle.style.opacity = '1';
  sparkle.style.transform = 'scale(0)';
  sparkle.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
  
  document.body.appendChild(sparkle);
  
  setTimeout(() => {
    sparkle.style.transform = 'scale(1)';
    sparkle.style.opacity = '0';
  }, 50);
  
  setTimeout(() => {
    document.body.removeChild(sparkle);
  }, 600);
}

// add sparkle effect to social links
document.querySelectorAll('.social-links a').forEach(link => {
  link.addEventListener('mouseenter', (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        createSparkle(
          x + (Math.random() - 0.5) * 20,
          y + (Math.random() - 0.5) * 20
        );
      }, i * 100);
    }
  });
});
