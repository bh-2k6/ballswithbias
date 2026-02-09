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
    const excerptMatch = post.excerpt.toLowerCase().includes(query);

    if (query && !titleMatch && !excerptMatch) return;

    const article = document.createElement("article");
    article.className = "post";

    article.innerHTML = `
      <h2 class="post-title">
        <a href="articles/${post.slug}.html">
          ${highlight(post.title, query)}
        </a>
      </h2>
      <div class="post-meta">${formatDate(post.date)} · ${post.author}</div>
      <p class="post-excerpt">
        ${highlight(post.excerpt, query)}
      </p>
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
