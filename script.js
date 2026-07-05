// ---------------------------------------------------------------
// YOUR ENTRIES LIVE HERE.
// Each entry needs: type ("journal" | "project" | "note"),
// callNumber (any short code you like), title, excerpt, date,
// and an optional link { label, url }.
// Add new ones to the TOP of the array — newest first.
// ---------------------------------------------------------------
const entries = [
  {
    type: "journal",
    callNumber: "J-015",
    title: "nysc orientation camp 2026",
    excerpt: "One of the best moments of my life happened at zamfara temp. orientation camp laland gusau",
    date: "2026-07-02",
    media: [
      { kind: "image", src: "media/nigerian-map.jpg" }
     {kind: "image", src: "media/zm-1.jpg" }
    ]
  },
  {
    type: "note",
    callNumber: "N-003",
    title: "Books to actually read this year",
    excerpt: "A running list instead of a mental tab I never close. Replace with your own note.",
    date: "2026-06-28"
  },
  {
    type: "project",
    callNumber: "P-002",
    title: "This website",
    excerpt: "A hand-built HTML/CSS/JS site to keep a mix of writing, projects, and notes in one place I control.",
    date: "2026-06-27",
    link: { label: "View source", url: "#" }
  },
  {
    type: "journal",
    callNumber: "J-014",
    title: "Starting the archive",
    excerpt: "First entry. Decided to stop scattering notes across apps and keep one running catalog instead.",
    date: "2026-06-25"
  },
  {
    type: "note",
    callNumber: "N-002",
    title: "Recipe worth keeping",
    excerpt: "Delete this and file your own — a note can be anything short enough not to need its own page.",
    date: "2026-06-20"
  },
  {
    type: "project",
    callNumber: "P-001",
    title: "Example project card",
    excerpt: "Swap this for something real: a build, a sketch, a repo. The link below is optional.",
    date: "2026-06-10",
    link: { label: "Visit", url: "#" }
  },
  {
    type: "journal",
    callNumber: "J-013",
    title: "Example journal entry",
    excerpt: "Journal cards are for anything dated and personal — replace freely, delete freely.",
    date: "2026-06-01"
  }
];

const catalog = document.getElementById("catalog");
const filterButtons = document.querySelectorAll(".filter-btn");

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function renderEntries(filter) {
  catalog.innerHTML = "";
  const list = filter === "all" ? entries : entries.filter(e => e.type === filter);

  if (list.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "Nothing filed under this category yet.";
    empty.style.fontFamily = "var(--mono)";
    empty.style.color = "var(--ink-soft)";
    catalog.appendChild(empty);
    return;
  }

  list.forEach(entry => {
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.type = entry.type;

    const linkHtml = entry.link
      ? `<a href="${entry.link.url}">${entry.link.label} →</a>`
      : `<span></span>`;

    const mediaList = entry.media
      ? Array.isArray(entry.media) ? entry.media : [entry.media]
      : [];

    const mediaHtml = mediaList.length
      ? `<div class="card-media-grid">` +
        mediaList.map(m =>
          m.kind === "video"
            ? `<video class="card-media" src="${m.src}" controls></video>`
            : `<img class="card-media" src="${m.src}" alt="${entry.title}" loading="lazy">`
        ).join("") +
        `</div>`
      : "";

    card.innerHTML = `
      <div class="category-strip"></div>
      <p class="call-number">${entry.callNumber}</p>
      <p class="eyebrow">${entry.type}</p>
      ${mediaHtml}
      <h3>${entry.title}</h3>
      <p class="excerpt">${entry.excerpt}</p>
      <div class="meta">
        <span>${formatDate(entry.date)}</span>
        ${linkHtml}
      </div>
    `;
    catalog.appendChild(card);
  });
}

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderEntries(btn.dataset.filter);
  });
});

// Footer years
const yearNow = new Date().getFullYear();
document.getElementById("year").textContent = yearNow;
document.getElementById("year2").textContent = yearNow;

renderEntries("all");
