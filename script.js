const posts = [
  {
    title: "Scotland, Bangladesh, Pakistan and India fiasco in 2026 T20 World Cup",
    author: "Bharadhwaj",
    date: "Jan 26, 2026",
    excerpt: "Politics playing spoilsport once again in cricket"
  },
  {
    title: "Nepal’s near-miss against England shows the gap is shrinking",
    author: "Bharadhwaj",
    date: "Jan 27, 2026",
    excerpt: "Nepal didn’t beat England, but they exposed how fragile the so-called hierarchy has become."
  },
  {
    title: "Noor Ahmad benched for Mujeeb-ur-Rahman highlights Afghanistan’s injury gamble",
    author: "Bharadhwaj",
    date: "Jan 27, 2026",
    excerpt: "Naveen-ul-Haq’s injury reshuffled Afghanistan’s balance, and Noor Ahmad paid the price."
  },
  {
    title: "How big a loss is Aaron Jones for USA?",
    author: "Bharadhwaj",
    date: "Jan 27, 2026",
    excerpt: "USA losing Aaron Jones isn’t just about runs — it’s about leadership and belief."
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