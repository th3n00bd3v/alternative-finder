document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search");
    const categoryFilter = document.getElementById("category-filter");
    const toolsContainer = document.getElementById("tools-container");
    const darkModeButton = document.getElementById("toggle-dark-mode");
    const sortByNameButton = document.getElementById("sort-name");
    const sortByCategoryButton = document.getElementById("sort-category");

    let toolsData = [];
    let nameSortAsc = true;
    let categorySortAsc = true;

    // Load JSON Data
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            toolsData = data;
            populateCategoryFilter(data);
            displayTools(toolsData);
        });

    // Populate Category Filter
    function populateCategoryFilter(data) {
        const categories = new Set();
        data.forEach(category => categories.add(category.category));
        categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    }

    // Display Tools
    function displayTools(tools) {
        toolsContainer.innerHTML = "";
        tools.forEach(category => {
            const categoryDiv = document.createElement("div");
            categoryDiv.classList.add("category", "collapsed");
            
            const categoryHeader = document.createElement("h2");
            categoryHeader.textContent = category.category;
            categoryHeader.addEventListener("click", () => {
                categoryDiv.classList.toggle("collapsed");
            });

            const toolsList = document.createElement("div");
            toolsList.classList.add("tools-list");

            category.tools.forEach(tool => {
                const toolDiv = document.createElement("div");
                toolDiv.classList.add("tool");
                toolDiv.innerHTML = `
                    <h3>${tool.name}</h3>
                    <p>${tool.functionality}</p>
                    <ul>
                        ${tool.alternatives.map(alt => 
                            `<li>${alt.link ? `<a href="${alt.link}" target="_blank">${alt.name}</a>` : alt.name}</li>`
                        ).join("")}
                    </ul>
                `;
                toolsList.appendChild(toolDiv);
            });

            categoryDiv.appendChild(categoryHeader);
            categoryDiv.appendChild(toolsList);
            toolsContainer.appendChild(categoryDiv);
        });
    }

    // Search and Filter Tools
    function filterTools() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        const filteredTools = toolsData.map(category => ({
            ...category,
            tools: category.tools.filter(tool => 
                (tool.name.toLowerCase().includes(searchTerm) || 
                tool.functionality.toLowerCase().includes(searchTerm) ||
                tool.alternatives.some(alt => alt.name.toLowerCase().includes(searchTerm))) &&
                (selectedCategory === "" || category.category === selectedCategory)
            )
        })).filter(category => category.tools.length > 0);

        displayTools(filteredTools);
    }

    searchInput.addEventListener("input", filterTools);
    categoryFilter.addEventListener("change", filterTools);

    // Sorting Functions
    function sortByName() {
        nameSortAsc = !nameSortAsc;
        toolsData.forEach(category => {
            category.tools.sort((a, b) => nameSortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
        });
        sortByNameButton.textContent = nameSortAsc ? "🔤 Name ▲" : "🔤 Name ▼";
        displayTools(toolsData);
    }

    function sortByCategory() {
        categorySortAsc = !categorySortAsc;
        toolsData.sort((a, b) => categorySortAsc ? a.category.localeCompare(b.category) : b.category.localeCompare(a.category));
        sortByCategoryButton.textContent = categorySortAsc ? "📂 Category ▲" : "📂 Category ▼";
        displayTools(toolsData);
    }

    sortByNameButton.addEventListener("click", sortByName);
    sortByCategoryButton.addEventListener("click", sortByCategory);

    // Dark Mode Toggle
    darkModeButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
});
