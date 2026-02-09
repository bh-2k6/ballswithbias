const postList = document.getElementById("postList");

fetch("data/posts.json")
  .then(response => response.json())
  .then(posts => {
    // sort posts by date (latest first)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    posts.forEach(post => {
      const article = document.createElement("article");
      article.className = "post";

      article.innerHTML = `
        <h2 class="post-title">
            <a href="articles/${post.slug}.html">${post.title}</a>
        </h2>
        <div class="post-meta">${formatDate(post.date)} · ${post.author}</div>
        <p class="post-excerpt">${post.excerpt}</p>
      `;

      postList.appendChild(article);
    });
  })
  .catch(error => {
    console.error("Error loading posts:", error);
    postList.innerHTML = "<p>Failed to load articles.</p>";
  });

function formatDate(dateString) {
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-GB", options);
}
