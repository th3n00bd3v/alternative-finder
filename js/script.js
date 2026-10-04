document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  populateCategoryFilter();
  renderUI();
  renderFooter(document.getElementById("main-footer"));
  initSearch();
  initSorting();
  initCategoryToggles();
  initScrollEffects();
  finishBoot();
});