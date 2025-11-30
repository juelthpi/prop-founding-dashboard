document.addEventListener("DOMContentLoaded", function () {
  /* -------------------------
     SAFE QUERY HELPERS
  -------------------------- */
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);

  /* -------------------------
     DROPDOWN SYSTEM
  -------------------------- */
  const dropdownItems = $$(".has-dropdown");

  dropdownItems.forEach((item) => {
    const link = item.querySelector(".menu-link");
    const submenu = item.querySelector(".sidebar-submenu");

    if (!link || !submenu) return;

    if (item.classList.contains("active")) {
      submenu.style.maxHeight = submenu.scrollHeight + "px";
    }

    link.addEventListener("click", function (e) {
      e.preventDefault();

      dropdownItems.forEach((other) => {
        if (other !== item) {
          const otherSub = other.querySelector(".sidebar-submenu");
          if (otherSub) {
            other.classList.remove("active");
            otherSub.style.maxHeight = 0;
          }
        }
      });

      item.classList.toggle("active");
      submenu.style.maxHeight = item.classList.contains("active")
        ? submenu.scrollHeight + "px"
        : 0;
    });
  });

  /* -------------------------
     SIDEBAR COLLAPSE LOGIC
  -------------------------- */
  const sidebar = $(".sidebar");
  const main = $(".main-section");
  const toggleBtn = $(".sidebar-toggle");

  if (!sidebar || !main) return;

  let hoverEnabled = true;

  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      sidebar.classList.toggle("small");
      main.classList.toggle("expanded");

      hoverEnabled = sidebar.classList.contains("small");

      if (!hoverEnabled) {
        sidebar.classList.remove("hover-expand");
        main.classList.remove("hover-expand");
      }
    });
  }

  sidebar.addEventListener("mouseenter", function () {
    if (hoverEnabled && sidebar.classList.contains("small")) {
      sidebar.classList.add("hover-expand");
      main.classList.add("hover-expand");
    }
  });

  sidebar.addEventListener("mouseleave", function () {
    if (hoverEnabled && sidebar.classList.contains("small")) {
      sidebar.classList.remove("hover-expand");
      main.classList.remove("hover-expand");
    }
  });

  /* -------------------------
      MOBILE MENU
  -------------------------- */
  const mobileOpen = $(".mobile-bar");
  const mobileClose = $(".mobile-close-bar");

  if (mobileOpen) {
    mobileOpen.addEventListener("click", () =>
      sidebar.classList.add("sidebar-open")
    );
  }

  if (mobileClose) {
    mobileClose.addEventListener("click", () =>
      sidebar.classList.remove("sidebar-open")
    );
  }
});
