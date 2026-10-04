function renderDirectory() {
  renderUI();
}

function initTheme() {
  const root = document.documentElement;
  const themeBtn = document.getElementById("theme-toggle");
  const lightIcon = document.getElementById("theme-toggle-light-icon");
  const darkIcon = document.getElementById("theme-toggle-dark-icon");

  const updateIcons = () => {
    const isDark = root.classList.contains("dark");
    lightIcon?.classList.toggle("hidden", !isDark);
    darkIcon?.classList.toggle("hidden", isDark);
    themeBtn?.setAttribute("aria-pressed", String(isDark));
    themeBtn?.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
  };

  updateIcons();

  themeBtn?.addEventListener("click", () => {
    root.classList.toggle("dark");
    try {
      localStorage.setItem("color-theme", root.classList.contains("dark") ? "dark" : "light");
    } catch (error) {
      // Ignore storage failures in restricted browsing contexts.
    }
    updateIcons();
  });
}

function initSearch() {
  const searchInput = document.getElementById("search");
  const categoryFilter = document.getElementById("category-filter");
  const clearButton = document.getElementById("clear-filters");
  let debounceId;

  searchInput.addEventListener("input", () => {
    window.clearTimeout(debounceId);
    debounceId = window.setTimeout(() => {
      directoryState.search = searchInput.value;
      renderDirectory();
    }, 120);
  });

  categoryFilter.addEventListener("change", () => {
    directoryState.category = categoryFilter.value;
    renderDirectory();
  });

  clearButton.addEventListener("click", () => {
    window.clearTimeout(debounceId);
    searchInput.value = "";
    categoryFilter.value = "";
    directoryState.search = "";
    directoryState.category = "";
    renderDirectory();
    searchInput.focus();
  });
}

function initSorting() {
  ["sort-category", "sort-name"].forEach(id => {
    const button = document.getElementById(id);

    button.addEventListener("click", () => {
      const key = id === "sort-name" ? "name" : "category";

      if (directoryState.sort === key) {
        directoryState.direction = directoryState.direction === "asc" ? "desc" : "asc";
      } else {
        directoryState.sort = key;
        directoryState.direction = "asc";
      }

      renderDirectory();
    });
  });
}

function initCategoryToggles() {
  const categoryList = document.getElementById("category-list");

  categoryList.addEventListener("click", event => {
    const toggle = event.target.closest(".category-toggle");
    if (!toggle) return;

    const category = toggle.dataset.category;
    const section = toggle.closest(".category");

    if (directoryState.openCategories.has(category)) {
      directoryState.openCategories.delete(category);
    } else {
      directoryState.openCategories.add(category);
    }

    const isOpen = directoryState.openCategories.has(category);
    section.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));

    renderExpandControl();
  });

  document.getElementById("toggle-expand").addEventListener("click", () => {
    const visible = getVisibleGroups().map(group => group.category);
    const allOpen = visible.length > 0 && visible.every(category => directoryState.openCategories.has(category));

    visible.forEach(category => {
      if (allOpen) {
        directoryState.openCategories.delete(category);
      } else {
        directoryState.openCategories.add(category);
      }
    });

    renderDirectory();
  });
}

function initScrollEffects() {
  const backToTop = document.getElementById("back-to-top");
  let hideButtonTimeout;

  const updateScrollState = () => {
    if (!backToTop) return;

    window.clearTimeout(hideButtonTimeout);

    if (window.scrollY > 320) {
      backToTop.classList.remove("hidden");
      return;
    }

    hideButtonTimeout = window.setTimeout(() => {
      if (window.scrollY <= 320) backToTop.classList.add("hidden");
    }, 220);
  };

  window.addEventListener("scroll", updateScrollState, { passive: true });
  window.addEventListener("resize", updateScrollState);
  updateScrollState();

  backToTop?.addEventListener("click", event => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function finishBoot() {
  window.requestAnimationFrame(() => {
    document.documentElement.classList.remove("booting");
  });
}