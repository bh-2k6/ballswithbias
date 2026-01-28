const posts = [
  {
    title: "Why the Good Length Is Dying in T20 Cricket",
    author: "Bharadhwaj",
    date: "Jan 26, 2026",
    excerpt: "Batters are no longer waiting for errors — they’re creating them."
  },
  {
    title: "What Watching Rahul Dravid Taught Me About Time",
    author: "Bharadhwaj",
    date: "Jan 22, 2026",
    excerpt: "Test cricket doesn’t reward speed. It rewards stubbornness."
  },
  {
    title: "Bias in the Ball: How Narratives Shape Bowling Greatness",
    author: "Bharadhwaj",
    date: "Jan 18, 2026",
    excerpt: "We judge bowlers by moments, not spells."
  }
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