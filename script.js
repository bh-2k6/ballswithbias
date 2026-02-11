document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     HOME PAGE LOGIC
  ========================= */

  const postList = document.getElementById("postList");
  const searchInput = document.getElementById("searchInput");

  if (postList && searchInput) {
    let allPosts = [];

    fetch("data/posts.json")
      .then(res => res.json())
      .then(posts => {
        allPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        renderPosts(allPosts);
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
  }

  /* =========================
     READING TIME (ALL ARTICLES)
  ========================= */

  const articleContent = document.querySelector(".article-content");
  if (articleContent) {
    const text = articleContent.innerText;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 200));

    const meta = document.querySelector(".post-meta, .article-meta");
    if (meta) {
      meta.innerHTML += ` · ${minutes} min read`;
    }
  }
  /* =========================
   REACTIONS (WITH TOGGLE)
========================= */

const reactionContainer = document.querySelector(".reactions");

if (reactionContainer) {
  const articleId = location.pathname;
  const buttons = reactionContainer.querySelectorAll(".reaction-btn");

  const userReactionKey = articleId + "-user-reaction";
  const currentUserReaction = localStorage.getItem(userReactionKey);

  buttons.forEach(button => {
    const reaction = button.dataset.reaction;
    const countKey = articleId + "-" + reaction;

    // Get count
    let count = Number(localStorage.getItem(countKey)) || 0;

    // Set UI count
    const countSpan = button.querySelector(".count");
    countSpan.textContent = count > 0 ? count : "";

    // Mark active if user previously selected
    if (reaction === currentUserReaction) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      const storedReaction = localStorage.getItem(userReactionKey);

      // CASE 1: Clicking same reaction → remove it
      if (storedReaction === reaction) {
        count--;
        localStorage.setItem(countKey, count);
        localStorage.removeItem(userReactionKey);

        button.classList.remove("active");
        countSpan.textContent = count > 0 ? count : "";
        return;
      }

      // CASE 2: Switching reactions
      if (storedReaction) {
        const oldKey = articleId + "-" + storedReaction;
        let oldCount = Number(localStorage.getItem(oldKey)) || 0;
        oldCount--;
        localStorage.setItem(oldKey, oldCount);

        // Remove old active state
        const oldBtn = reactionContainer.querySelector(
          `[data-reaction="${storedReaction}"]`
        );
        oldBtn.classList.remove("active");
        oldBtn.querySelector(".count").textContent =
          oldCount > 0 ? oldCount : "";
      }

      // Add new reaction
      count++;
      localStorage.setItem(countKey, count);
      localStorage.setItem(userReactionKey, reaction);

      button.classList.add("active");
      countSpan.textContent = count;
    });
  });
}

});
