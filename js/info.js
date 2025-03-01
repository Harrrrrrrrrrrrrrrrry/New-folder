window.handleSignOut = () => {
    localStorage.removeItem("currentUser");
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
            let genres = [];
            data.data.genres.forEach(genre => {
                genres.push(genre.name)
            });
            document.getElementById("anime-genres").textContent = genres.join(", ") || "N/A";
            let themes = [];
            data.data.themes.forEach(theme => {
                themes.push(theme.name)
            });
            document.getElementById("anime-themes").textContent = themes.join(", ") || "N/A";
        })
        .catch(error => console.error(error));
} else {
    document.getElementById("anime-title").textContent = "Anime ID not found";
}


function addItemtoWatchList() {
    if (animeId) {
        if (localStorage.getItem("users")) {
            const users = JSON.parse(localStorage.getItem("users"));
            const user = users[userIndex()];
            if (!user.watchlist) {
                user.watchlist = [];
            }
            user.watchlist.push({ animeId });

            localStorage.setItem("users", JSON.stringify(users));

            location.href = "./crud.html"
        }
    } else {
        console.error("Anime ID missing.")
    }
}

function userIndex() {
    const users = JSON.parse(localStorage.getItem("users"));
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (users && currentUser) {
        return users.findIndex(user => user.email === currentUser.email);
    }

    return -1;
}
