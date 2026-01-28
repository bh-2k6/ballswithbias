const posts = [
  {
    title: "Scotland, Bangldesh, Pakistan and India fiasco in 2026 T20 World Cup",
    author: "Bharadhwaj",
    date: "Jan 26, 2026",
    excerpt: "Politics playing spoilsport once again in cricket"
  },
];

const postList = document.getElementById("postList");

posts.forEach(post => {
  const article = document.createElement("article");
  article.className = "post";

  article.innerHTML = `
    <h2 class="post-title">${post.title}</h2>
    <div class="post-meta">${post.date} · ${post.author}</div>
    <p class="post-excerpt">${post.excerpt}</p>
  `;

  postList.appendChild(article);
});