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
