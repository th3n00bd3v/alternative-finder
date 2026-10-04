const DIRECTORY_DATA = [
  {
    category: "Alternative Software",
    tools: [
      {
        name: "Alternativeto.net",
        functionality: "Alternate Tools/Site Finder.",
        alternatives: [
          { name: "PrivacyTools.io", link: "https://www.privacytools.io", note: "Privacy-focused alternatives" },
          { name: "Alternative.me", link: "https://alternative.me" },
          { name: "Slant.co", link: "https://www.slant.co" },
          { name: "Product Hunt", link: "https://www.producthunt.com" },
          { name: "Open Source Alternative To", link: "https://www.opensourcealternative.to" },
          { name: "Sitelike", link: "http://sitelike.org", note: "Only for websites" }
        ]
      }
    ]
  },
  {
    category: "API & Testing Tools",
    tools: [
      {
        name: "Postman",
        functionality: "API Development and Testing.",
        alternatives: [
          { name: "Hoppscotch", link: "https://hoppscotch.io" },
          { name: "Requestly", link: "https://requestly.com" },
          { name: "Insomnia", link: "https://insomnia.rest" },
          { name: "Thunder Client", link: "https://www.thunderclient.com" },
          { name: "HTTPie", link: "https://httpie.io" },
          { name: "Apidog", link: "https://apidog.com" },
          { name: "REST Assured", link: "https://rest-assured.io" },
          { name: "Rapid API", link: "https://rapidapi.com", note: "API Marketplace" },
          { name: "Katalon", link: "https://katalon.com/api-testing" },
          { name: "Karate", link: "https://www.karatelabs.io" },
          { name: "SoapUI", link: "https://www.soapui.org" },
          { name: "Chapar", link: "https://chapar.rest" },
          { name: "Advanced REST Client", link: "https://install.advancedrestclient.com" },
          { name: "Apiary", link: "https://apiary.io" },
          { name: "Restlet", link: "https://restlet.talend.com" }
        ]
      },
      {
        name: "Selenium",
        functionality: "Automation Testing Framework.",
        alternatives: [
          { name: "Cypress", link: "https://www.cypress.io" },
          { name: "Playwright", link: "https://www.playwright.dev" },
          { name: "Puppeteer", link: "https://pptr.dev/" },
          { name: "Testcafe", link: "https://testcafe.io" }
        ]
      }
    ]
  },
  {
    category: "Web Browsers",
    tools: [
      {
        name: "Google Chrome",
        functionality: "Web Browser",
        alternatives: [
          { name: "Brave Browser", link: "https://brave.com" },
          { name: "Vivaldi", link: "https://vivaldi.com" },
          { name: "Opera", link: "https://opera.com" },
          { name: "Iridium Browser", link: "https://iridiumbrowser.de/" },
          { name: "Ungoogled Chromium", link: "https://ungoogled-software.github.io/" },
          { name: "Chromium", link: "https://www.chromium.org/" },
          { name: "Microsoft Edge", link: "https://www.microsoft.com/en-us/edge" },
          { name: "Bromite/Cromite", link: "https://github.com/bromite/bromite", note: "Android" },
          { name: "Ecosia", link: "https://ecosia.org", note: "Android/PC" },
          { name: "Helium", link: "https://helium.computer" }
        ]
      },
      {
        name: "Mozilla Firefox",
        functionality: "Web Browser",
        alternatives: [
          { name: "Waterfox", link: "https://waterfox.net/" },
          { name: "Librewolf", link: "https://librewolf.net/" },
          { name: "Zen Browser", link: "https://zen-browser.app/" },
          { name: "Ice Raven", link: "https://github.com/fork-maintainers/iceraven-browser", note: "Android" },
          { name: "Ironfox Browser", link: "https://github.com/ironfox-browser/ironfox-browser", note: "Android" }
        ]
      }
    ]
  },
  {
    category: "Productivity Tools",
    tools: [
      {
        name: "Keep Notes",
        functionality: "Note-taking app",
        alternatives: [
          { name: "OneNote", link: "https://www.onenote.com/" },
          { name: "Joplin", link: "https://joplinapp.org/" },
          { name: "Standard Notes", link: "https://standardnotes.com/" },
          { name: "Evernote", link: "https://evernote.com/" },
          { name: "Simplenote", link: "https://simplenote.com/" },
          { name: "Privacy Notes", link: "https://privacynotes.app/" },
          { name: "Flux Notes", link: "https://github.com/chindaronit/Flux" }
        ]
      },
      {
        name: "Notion",
        functionality: "Knowledge management and note-taking",
        alternatives: [
          { name: "Obsidian", link: "https://obsidian.md/" },
          { name: "Appflowy", link: "https://www.appflowy.io/" },
          { name: "AnyType", link: "https://anytype.io/" },
          { name: "Logseq", link: "https://logseq.com/" }
        ]
      }
    ]
  },
  {
    category: "Virtualization & Emulation",
    tools: [
      {
        name: "Virtualbox",
        functionality: "Virtualization Platform",
        alternatives: [
          { name: "VMWare", link: "https://www.vmware.com/" },
          { name: "QEmu/QTemu", link: "https://www.qemu.org/" },
          { name: "Multipass", link: "https://multipass.run/", note: "Ubuntu-only VM" },
          { name: "VectrasVM", link: "https://getvectras.com/", note: "Android" }
        ]
      },
      {
        name: "Bluestacks",
        functionality: "Android Emulator",
        alternatives: [
          { name: "Anbox/Anbox Cloud", link: "https://anbox.io/" },
          { name: "Waydroid", link: "https://waydroid.io/" }
        ]
      }
    ]
  },
  {
    category: "Development & Code Editors",
    tools: [
      {
        name: "VSCode",
        functionality: "Code Editor",
        alternatives: [
          { name: "VSCodium", link: "https://vscodium.com/" },
          { name: "Neovim", link: "https://neovim.io/" },
          { name: "Geany", link: "https://www.geany.org/" },
          { name: "Fleet", link: "https://fleet.sh/" }
        ]
      },
      {
        name: "Sublime",
        functionality: "Text Editor",
        alternatives: [
          { name: "Light Table", link: "http://lighttable.com/" },
          { name: "Phoenix", link: "https://phcode.dev/" },
          { name: "Brackets", link: "https://brackets.io/" }
        ]
      }
    ]
  },
  {
    category: "PDF & Document Management",
    tools: [
      {
        name: "Adobe PDF Reader",
        functionality: "PDF Reader and Editor",
        alternatives: [
          { name: "SumatraPDF", link: "https://www.sumatrapdfreader.org/free-pdf-reader" }
        ]
      },
      {
        name: "PDFSam (Basic)",
        functionality: "PDF Modifier and Merger",
        alternatives: [
          { name: "Stirling PDF", link: "https://stirling.io" },
          { name: "PDF24 Creator" },
          { name: "Tinywow", link: "https://tinywow.com" },
          { name: "Sejda", link: "https://www.sejda.com" },
          { name: "PDF Candy", link: "https://pdfcandy.com" },
          { name: "iLovePDF", link: "https://www.ilovepdf.com" },
          { name: "PDF-XChange Editor", link: "https://www.tracker-software.com/product/pdf-xchange-editor" }
        ]
      }
    ]
  },
  {
    category: "AI & Machine Learning",
    tools: [
      {
        name: "ChatGPT",
        functionality: "AI Chatbot and Assistant",
        alternatives: [
          { name: "ClaudeAI", link: "https://claude.ai/" },
          { name: "Perplexity", link: "https://www.perplexity.ai/" },
          { name: "OpenAI", link: "https://openai.com/" },
          { name: "Gemini", link: "https://gemini.google.com/" },
          { name: "DeepAI", link: "https://www.deepai.org/" },
          { name: "Agent GPT", link: "https://agentgpt.reworkd.ai/" },
          { name: "DeepSeek-R1", link: "https://www.deepseek.com/" }
        ]
      },
      {
        name: "Ollama",
        functionality: "AI chat application",
        alternatives: [
          { name: "Jan AI", link: "https://jan.ai/" },
          { name: "Private GPT", link: "https://privategpt.ai/" },
          { name: "Anything LLM", link: "https://anythingllm.com/" }
        ]
      },
      {
        name: "Codex",
        functionality: "AI IDE and Pair Programmer",
        alternatives: [
          { name: "OpenCode", link: "https://opencode.ai/" },
          { name: "Google Antigravity", link: "https://antigravity.google.com/" },
          { name: "Github Copilot App", link: "https://github.com/features/ai/github-app" },
          { name: "Claude Code", link: "https://claude.ai/" },
          { name: "Cursor", link: "https://www.cursor.so/" },
          { name: "Devin Desktop", link: "https://devin.ai/desktop" },
          { name: "Kiro", link: "https://kiro.dev" },
          { name: "Zed Editor", link: "https://zed.dev/" }
        ]
      }
    ]
  }
];