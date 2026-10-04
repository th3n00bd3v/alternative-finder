# 🔍 Alternative Software Finder  

A **static interactive website** to search for alternative software and tools, similar to OSINT Framework. This project features:  

✅ **Searchable & Categorized List**  
✅ **Static Data, No Fetch Required** (opens straight from `file://`)  
✅ **Filtering & Sorting (Ascending/Descending)**  
✅ **Collapsible Sections with Expand/Collapse All**  
✅ **Dark Mode** (system preference aware, persisted)  
✅ **Fully Responsive Design**  
✅ **Keyboard Accessible**  

---

## 🛠️ **Technologies Used**  
- HTML  
- CSS (custom properties for theming)  
- JavaScript  

No build step and no runtime dependencies. Open `index.html` in a browser and it works.

---

## 🎨 **Theming**  
Colors are defined once as CSS custom properties on `:root` and overridden under `html.dark`:

| Token | Purpose |
| --- | --- |
| `--bg`, `--surface`, `--surface-strong` | Page and panel backgrounds |
| `--border`, `--border-strong` | Hairline borders |
| `--text-primary`, `--text-secondary` | Body and muted text |
| `--accent`, `--accent-soft`, `--accent-strong` | Interactive accents and chips |
| `--font-display`, `--font-mono` | Outfit and JetBrains Mono |

The first paint resolves the theme inline from `localStorage`, falling back to
`prefers-color-scheme`, so there is no flash of the wrong theme.

---

## 📂 **Project Structure**  

```plaintext
📦 Alternative-Software-Finder
├── 📜 index.html            # Main page
├── 📁 css
│   └── 📜 style.css         # Design tokens, layout, components
├── 📁 js
│   ├── 📜 data.js           # Directory data (DIRECTORY_DATA)
│   ├── 📜 render.js         # Filtering, sorting, DOM rendering
│   ├── 📜 interactions.js   # Theme, search, sorting, accordion, scroll
│   └── 📜 script.js         # Bootstrap
└── 📜 README.md             # Project documentation
```

### 🗃️ **Adding Entries**  
Append an object to the `DIRECTORY_DATA` array in `js/data.js`:

```js
{
  category: "Category Name",
  tools: [
    {
      name: "Tool Name",
      functionality: "What it does.",
      alternatives: [
        { name: "Alternative", link: "https://example.com", note: "Optional note" }
      ]
    }
  ]
}
```

`link` and `note` are both optional — an alternative without a `link` renders as
plain text, and `note` shows as a small label beside the name.