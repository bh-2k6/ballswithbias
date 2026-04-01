document.addEventListener("DOMContentLoaded", () => {

  const searchInput = document.getElementById("searchInput");
  const postList = document.getElementById("postList");
  const articleContent = document.querySelector(".article-content");

  const isArticlePage = window.location.pathname.includes("/articles/");

  if (!searchInput) return;

  // =========================
  // ARTICLE PAGE SEARCH (LOCAL SEARCH)
  // =========================
  if (isArticlePage && articleContent) {

    const originalHTML = articleContent.innerHTML;

    searchInput.addEventListener("input", () => {
      const query = searchInput.value.trim();

      if (!query) {
        articleContent.innerHTML = originalHTML;
        return;
      }

      const regex = new RegExp(`(${query})`, "gi");

      articleContent.innerHTML = originalHTML.replace(
        regex,
        `<span class="highlight">$1</span>`
      );
    });

    return;
  }

  // =========================
  // HOME PAGE SEARCH (GLOBAL)
  // =========================

  if (!postList) return;

  let allPosts = [];

  fetch("data/posts.json")
    .then(res => res.json())
    .then(posts => {
      allPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
      renderPosts(allPosts);
    })
    .catch(err => {
      console.error("Failed to load posts:", err);
    });

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    renderPosts(allPosts, query);
  });

  function renderPosts(posts, query = "") {
    postList.innerHTML = "";

    posts.forEach(post => {
      const titleMatch = post.title.toLowerCase().includes(query);
      const subtitleMatch = post.subtitle.toLowerCase().includes(query);

      if (query && !titleMatch && !subtitleMatch) return;

      const article = document.createElement("article");
      article.className = "post";

      article.innerHTML = `
        <h2 class="post-title">
          <a href="articles/${post.slug}.html">
            ${highlight(post.title, query)}
          </a>
        </h2>

        <p class="post-subtitle">
          ${highlight(post.subtitle, query)}
        </p>

        <div class="post-meta">
          ${formatDate(post.date)} · ${post.author}
        </div>
      `;

      postList.appendChild(article);
    });
  }

  function highlight(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, `<span class="highlight">$1</span>`);
  }

  function formatDate(dateString) {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  }

});