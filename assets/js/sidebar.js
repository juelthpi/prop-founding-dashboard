document.addEventListener("DOMContentLoaded", function () {
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);

  const sidebar = $(".sidebar");
  const main = $(".main-section");
  const toggleBtn = $(".sidebar-toggle");
  if (!sidebar || !main) return;

  // detect hover support
  const hasHover = window.matchMedia("(hover: hover)").matches;
  let hoverEnabled = hasHover;

  /* ------------------------- TOGGLE BUTTON -------------------------- */
  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      if (sidebar.classList.contains("small")) {
        sidebar.classList.remove("small");
        main.classList.remove("expanded");
        hoverEnabled = hasHover;
        toggleBtn.classList.remove("active"); // icon-bar
      } else {
        sidebar.classList.add("small");
        main.classList.add("expanded");
        hoverEnabled = hasHover;
        toggleBtn.classList.add("active"); // icon-close
      }
      sidebar.classList.remove("hover-expand");
      main.classList.remove("hover-expand");
    });
  }

  /* ------------------------- HOVER LOGIC -------------------------- */
  if (hasHover) {
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
  }

  /* ------------------------- DROPDOWN SYSTEM -------------------------- */
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

      if (item.classList.contains("active")) {
        submenu.style.maxHeight = submenu.scrollHeight + "px";
        submenu.offsetHeight; // force reflow
        submenu.style.maxHeight = submenu.scrollHeight + "px";
      } else {
        submenu.style.maxHeight = 0;
      }
      if (!hasHover && sidebar.classList.contains("small")) {
        sidebar.classList.remove("small");
        main.classList.remove("expanded");
        toggleBtn.classList.remove("active");
      }
    });
  });

  /* ------------------------- ANY ITEM CLICK (non-hover devices only) -------------------------- */
  const allMenuItems = $$(".menu-link");
  allMenuItems.forEach((link) => {
    link.addEventListener("click", function () {
      if (!hasHover && sidebar.classList.contains("small")) {
        sidebar.classList.remove("small");
        main.classList.remove("expanded");
        toggleBtn.classList.remove("active");
      }
    });
  });

  /* ------------------------- MOBILE MENU -------------------------- */
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

/* ------------------------- FULLSCREEN BUTTON -------------------------- */
document.getElementById("fullscreenBtn").addEventListener("click", function () {
  let dashboard = document.getElementById("dashboard");
  if (!document.fullscreenElement) {
    dashboard.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});
