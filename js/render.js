const directoryState = {
  search: "",
  category: "",
  sort: "category",
  direction: "asc",
  openCategories: new Set()
};

function getTools() {
  return Array.isArray(DIRECTORY_DATA) ? DIRECTORY_DATA : [];
}

function countEntries(groups) {
  return groups.reduce(
    (total, group) => total + group.tools.reduce((sum, tool) => sum + tool.alternatives.length, 0),
    0
  );
}

function matchesSearch(tool, term) {
  if (!term) return true;
  return (
    tool.name.toLowerCase().includes(term) ||
    tool.functionality.toLowerCase().includes(term) ||
    tool.alternatives.some(alt => alt.name.toLowerCase().includes(term))
  );
}

function getVisibleGroups() {
  const term = directoryState.search.trim().toLowerCase();
  const selected = directoryState.category;

  return getTools()
    .filter(group => !selected || group.category === selected)
    .map(group => ({
      category: group.category,
      tools: group.tools.filter(tool => matchesSearch(tool, term))
    }))
    .filter(group => group.tools.length > 0);
}

function sortGroups(groups) {
  const factor = directoryState.direction === "asc" ? 1 : -1;

  if (directoryState.sort === "name") {
    return [...groups]
      .map(group => ({
        category: group.category,
        tools: [...group.tools].sort((a, b) => factor * a.name.localeCompare(b.name))
      }))
      .sort((a, b) => factor * a.category.localeCompare(b.category));
  }

  return [...groups].sort((a, b) => factor * a.category.localeCompare(b.category));
}

function renderUI() {
  const groups = getVisibleGroups();

  populateCategoryFilter();
  renderCategories(document.getElementById("category-list"), sortGroups(groups));
  renderResultsStatus(groups);
  renderStats();
  renderSortControls();
  renderExpandControl();
}

function populateCategoryFilter() {
  const select = document.getElementById("category-filter");
  const categories = getTools().map(group => group.category);

  if (select.options.length - 1 === categories.length) return;

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    select.appendChild(option);
  });
}

function createChevronIcon() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "category-chevron");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "2");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  path.setAttribute("d", "M6 9l6 6 6-6");

  svg.appendChild(path);
  return svg;
}

function renderCategories(container, groups) {
  container.replaceChildren();

  if (groups.length === 0) {
    container.appendChild(renderEmptyState());
    return;
  }

  groups.forEach(group => container.appendChild(renderCategory(group)));
}

function renderCategory(group) {
  const isOpen = directoryState.openCategories.has(group.category);
  const alternativeCount = group.tools.reduce((sum, tool) => sum + tool.alternatives.length, 0);
  const bodyId = `category-body-${slugify(group.category)}`;

  const section = document.createElement("section");
  section.className = `category surface-panel${isOpen ? " is-open" : ""}`;
  section.dataset.category = group.category;

  const heading = document.createElement("h2");
  heading.className = "category-heading";

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "category-toggle";
  toggle.dataset.category = group.category;
  toggle.setAttribute("aria-expanded", String(isOpen));
  toggle.setAttribute("aria-controls", bodyId);

  const label = document.createElement("span");
  label.textContent = group.category;

  const meta = document.createElement("span");
  meta.className = "category-meta";

  const count = document.createElement("span");
  count.className = "category-count";
  count.textContent = `${group.tools.length} ${pluralize(group.tools.length, "tool")} / ${alternativeCount} ${pluralize(alternativeCount, "option")}`;

  meta.append(count, createChevronIcon());
  toggle.append(label, meta);

  const body = document.createElement("div");
  body.className = "category-body";
  body.id = bodyId;

  const grid = document.createElement("div");
  grid.className = "tool-grid";
  group.tools.forEach(tool => grid.appendChild(renderToolCard(tool)));

  body.appendChild(grid);
  heading.appendChild(toggle);
  section.append(heading, body);

  return section;
}

function renderToolCard(tool) {
  const article = document.createElement("article");
  article.className = "tool-card surface-panel";

  const title = document.createElement("h3");
  title.className = "tool-title";
  title.textContent = tool.name;

  const desc = document.createElement("p");
  desc.className = "tool-desc";
  desc.textContent = tool.functionality;

  const alternativesHeading = document.createElement("p");
  alternativesHeading.className = "alternative-heading";
  alternativesHeading.textContent = `${tool.alternatives.length} ${pluralize(tool.alternatives.length, "alternative")}`;

  const list = document.createElement("ul");
  list.className = "alternative-list";
  tool.alternatives.forEach(alt => list.appendChild(renderAlternative(alt)));

  article.append(title, desc, alternativesHeading, list);
  return article;
}

function renderAlternative(alt) {
  const item = document.createElement("li");

  if (alt.link) {
    const link = document.createElement("a");
    link.className = "alternative-link";
    link.href = alt.link;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", `${alt.name} (opens in a new tab)`);

    const name = document.createElement("span");
    name.textContent = alt.name;

    const glyph = document.createElement("span");
    glyph.className = "link-glyph";
    glyph.setAttribute("aria-hidden", "true");
    glyph.textContent = "\u2197";

    link.append(name, glyph);
    item.appendChild(link);
  } else {
    const label = document.createElement("span");
    label.className = "alternative-link is-static";
    label.textContent = alt.name;
    item.appendChild(label);
  }

  if (alt.note) {
    const note = document.createElement("span");
    note.className = "alternative-note";
    note.textContent = alt.note;
    item.appendChild(note);
  }

  return item;
}

function renderEmptyState() {
  const panel = document.createElement("div");
  panel.className = "empty-state surface-panel";

  const title = document.createElement("p");
  title.className = "empty-state-title";
  title.textContent = "No matches found";

  const copy = document.createElement("p");
  copy.className = "empty-state-copy";
  copy.textContent = "Try a different search term or reset the category filter.";

  panel.append(title, copy);
  return panel;
}

function renderResultsStatus(groups) {
  const status = document.getElementById("results-status");
  const toolCount = groups.reduce((sum, group) => sum + group.tools.length, 0);

  status.textContent = groups.length === 0
    ? "0 results"
    : `${toolCount} ${pluralize(toolCount, "tool")} in ${groups.length} ${pluralize(groups.length, "category", "categories")}`;
}

function renderStats() {
  const stats = document.getElementById("directory-stats");
  const groups = getTools();

  stats.textContent = `${groups.length} categories \u00b7 ${countEntries(groups)} alternatives indexed`;
}

function renderSortControls() {
  [["sort-category", "category"], ["sort-name", "name"]].forEach(([id, key]) => {
    const button = document.getElementById(id);
    const isActive = directoryState.sort === key;
    const indicator = button.querySelector("[data-direction]");

    button.setAttribute("aria-pressed", String(isActive));
    indicator.hidden = !isActive;
    indicator.textContent = directoryState.direction === "asc" ? "\u25b2" : "\u25bc";
  });
}

function renderExpandControl() {
  const button = document.getElementById("toggle-expand");
  const label = document.getElementById("toggle-expand-label");
  const visible = getVisibleGroups().map(group => group.category);
  const allOpen = visible.length > 0 && visible.every(category => directoryState.openCategories.has(category));

  button.setAttribute("aria-pressed", String(allOpen));
  label.textContent = allOpen ? "Collapse all" : "Expand all";
}

function renderFooter(footer) {
  const inner = document.createElement("div");
  inner.className = "footer-inner";

  const copy = document.createElement("p");
  copy.className = "footer-copy";
  copy.textContent = `\u00a9 ${new Date().getFullYear()} Alternative Finder \u00b7 Built for open source enthusiasts`;

  inner.appendChild(copy);
  footer.replaceChildren(inner);
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function pluralize(count, singular, plural) {
  return count === 1 ? singular : plural ?? `${singular}s`;
}