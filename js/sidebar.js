document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("sidebarToggle");
  const closeBtn = document.getElementById("sidebarClose");
  const backdrop = document.getElementById("sidebarBackdrop");
  let isDesktopCollapsed = false;
  function isDesktop() {
    return window.innerWidth >= 1024;
  }
  function openMobileSidebar() {
    sidebar.classList.remove("-translate-x-full");
    backdrop.classList.remove("hidden");
  }
  function closeMobileSidebar() {
    sidebar.classList.add("-translate-x-full");
    backdrop.classList.add("hidden");
  }
  function toggleDesktopSidebar() {
    isDesktopCollapsed = !isDesktopCollapsed;
    if (isDesktopCollapsed) {
      sidebar.classList.add(
        "lg:w-0",
        "lg:p-0",
        "lg:overflow-hidden",
        "lg:opacity-0"
      );
    } else {
      sidebar.classList.remove(
        "lg:w-0",
        "lg:p-0",
        "lg:overflow-hidden",
        "lg:opacity-0"
      );
    }
  }
  toggleBtn.addEventListener("click", () => {
    if (isDesktop()) {
      toggleDesktopSidebar();
    } else {
      openMobileSidebar();
    }
  });
  closeBtn.addEventListener("click", closeMobileSidebar);
  backdrop.addEventListener("click", closeMobileSidebar);
  window.addEventListener("resize", () => {
    if (isDesktop()) {
      closeMobileSidebar();
    }
  });
});