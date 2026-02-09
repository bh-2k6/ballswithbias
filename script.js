const postList = document.getElementById("postList");
const searchInput = document.getElementById("searchInput");

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

    // hide posts that don’t match search
    if (query && !titleMatch && !subtitleMatch) return;

    const article = document.createElement("article");
    article.className = "post";

    article.innerHTML = `
      <img
        class="post-thumb"
        src="${post.thumbnail}"
        alt="${post.thumbnailAlt || post.title}"
      />

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
