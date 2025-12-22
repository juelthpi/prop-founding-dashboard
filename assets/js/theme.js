// Theme & Color Preset Toggle
document.getElementById("themeToggle")?.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("light-mode") ? "light" : "dark"
  );
});
// Load saved theme
if (localStorage.getItem("theme") === "light")
  document.body.classList.add("light-mode");

// Preloader js
document.addEventListener("DOMContentLoaded", () => {
  const progress = document.querySelector(".page-load-progress");
  let width = 0;
  const demoLoad = setInterval(() => {
    if (width < 90) {
      width += Math.random() * 10;
      progress.style.width = width + "%";
    }
  }, 300);
  window.addEventListener("load", () => {
    clearInterval(demoLoad);
    progress.style.width = "100%";
    setTimeout(() => {
      document.body.classList.add("page-load-loaded");
    }, 500);
  });
});
