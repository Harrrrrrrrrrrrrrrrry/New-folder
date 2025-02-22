window.handleSignOut = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("cart");
    location.reload();
};

// Get anime ID from URL
const params = new URLSearchParams(window.location.search);
const animeId = params.get('id');

if (animeId) {
    fetch(`https://api.jikan.moe/v4/anime/${animeId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("anime-title").textContent = data.data.title;
            document.getElementById("anime-image").src = data.data.images.jpg.image_url;
            document.getElementById("anime-episodes").textContent = data.data.episodes || "Unknown";
            document.getElementById("anime-score").textContent = data.data.score || "N/A";
            document.getElementById("anime-synopsis").textContent = data.data.synopsis || "No synopsis available.";
        })
        .catch(error => console.error(error));
} else {
    document.getElementById("anime-title").textContent = "Anime ID not found";
}