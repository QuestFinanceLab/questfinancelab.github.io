/* =========================================================
   QUEST FINANCE LAB — RESEARCH ARCHIVE
========================================================= */

(() => {
  const archiveRoot = document.querySelector("[data-research-archive]");
  if (!archiveRoot) return;

  const lang = document.documentElement.lang === "en" ? "en" : "ko";
  const indexUrl = "https://raw.githubusercontent.com/QuestFinanceLab/research-archive/main/index.json";
  const filterButtons = Array.from(document.querySelectorAll(".research-filter .filter-button"));

  const copy = {
    ko: {
      loading: "Research Archive를 불러오는 중입니다.",
      empty: "Quest의 기업 리포트와 상시보고서는 검수 완료 후 순차적으로 공개됩니다.",
      error: "Research Archive를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
      report: "Report",
      presentation: "Presentation",
      summary: "Summary"
    },
    en: {
      loading: "Loading the Research Archive.",
      empty: "Quest's company reports and ongoing research notes will be published progressively after internal review.",
      error: "The Research Archive could not be loaded. Please try again later.",
      report: "Report",
      presentation: "Presentation",
      summary: "Summary"
    }
  }[lang];

  const categoryMap = {
    All: null,
    Company: "Company Research",
    Industry: "Industry Research",
    Macro: "Macro & Markets",
    Quant: "Quantitative Analysis"
  };

  let allEntries = [];
  let activeFilter = "All";

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function formatDate(dateString) {
    const date = new Date(`${dateString}T00:00:00`);
    if (Number.isNaN(date.getTime())) return dateString;

    return new Intl.DateTimeFormat(lang === "ko" ? "ko-KR" : "en-US", {
      year: "numeric",
      month: lang === "ko" ? "2-digit" : "short",
      day: "2-digit"
    }).format(date);
  }

  function linkHtml(url, label) {
    if (!url) return "";
    return `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${label} ↗</a>`;
  }

  function entryHtml(entry) {
    const title = lang === "ko" ? entry.title_ko : entry.title_en;
    const authors = lang === "ko" ? entry.authors_ko : entry.authors_en;
    const summary = lang === "ko" ? entry.summary_ko : entry.summary_en;
    const year = escapeHtml(String(entry.date).slice(0, 4));
    const tags = (entry.tags || [])
      .map((tag) => `<span>#${escapeHtml(tag)}</span>`)
      .join("");

    const links = [
      linkHtml(entry.files?.report, copy.report),
      linkHtml(entry.files?.presentation, copy.presentation),
      linkHtml(entry.files?.summary, copy.summary)
    ].filter(Boolean).join("");

    return `
      <article class="publication-example research-publication" data-category="${escapeHtml(entry.category)}">
        <p class="publication-type">${escapeHtml(entry.category.toUpperCase())} · ${year} · ${escapeHtml(formatDate(entry.date))}</p>
        <h3>${escapeHtml(title)}</h3>
        <p class="publication-authors">${(authors || []).map(escapeHtml).join(" · ")}</p>
        ${summary ? `<p class="publication-summary">${escapeHtml(summary)}</p>` : ""}
        ${tags ? `<div class="publication-tags">${tags}</div>` : ""}
        ${links ? `<div class="publication-links">${links}</div>` : ""}
      </article>
    `;
  }

  function render(entries) {
    if (!entries.length) {
      archiveRoot.innerHTML = `<div class="research-empty-state"><p class="research-empty-title">${copy.empty}</p></div>`;
      return;
    }

    const grouped = entries.reduce((acc, entry) => {
      const year = String(entry.date).slice(0, 4);
      (acc[year] ||= []).push(entry);
      return acc;
    }, {});

    archiveRoot.innerHTML = Object.keys(grouped)
      .sort((a, b) => Number(b) - Number(a))
      .map((year) => `
        <div class="research-year">
          <h3 class="year-heading">${escapeHtml(year)}</h3>
          <div class="research-publication-list">
            ${grouped[year].map(entryHtml).join("")}
          </div>
        </div>
      `)
      .join("");
  }

  function applyFilter() {
    const category = categoryMap[activeFilter];
    const filtered = category
      ? allEntries.filter((entry) => entry.category === category)
      : allEntries;
    render(filtered);
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.textContent.trim();
      filterButtons.forEach((item) => item.classList.toggle("active", item === button));
      applyFilter();
    });
  });

  archiveRoot.innerHTML = `<div class="research-empty-state"><p>${copy.loading}</p></div>`;

  fetch(`${indexUrl}?v=${Date.now()}`, { cache: "no-store" })
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then((payload) => {
      allEntries = Array.isArray(payload.research) ? payload.research : [];
      applyFilter();
    })
    .catch((error) => {
      console.error("Research archive load failed:", error);
      archiveRoot.innerHTML = `<div class="research-empty-state"><p class="research-empty-title">${copy.error}</p></div>`;
    });
})();
