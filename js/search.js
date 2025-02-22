window.handleSignOut = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("cart");
    location.reload();
};

document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('anime-input').value;

    const baseUrl = 'https://api.jikan.moe/v4/anime';
    const url = `${baseUrl}?q=${encodeURIComponent(query)}&limit=10`;

    // Fetch
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Clear
            const resultsDiv = document.getElementById('anime-results');
            resultsDiv.innerHTML = '';

            // Display
            data.data.forEach(anime => {
                const animeCard = document.createElement('div');
                animeCard.classList.add('card', 'mb-1');
                animeCard.innerHTML = `
                    <a href="info.html?id=${anime.mal_id}" class="text-decoration-none text-light">
                        <div class="row">
                            <div class="col-md-1">
                                <div class="img-wrapper">
                                    <img src="${anime.images.jpg.image_url}" class="img-fluid rounded-start" alt="${anime.title}">
                                </div>
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">${anime.title}</h5>
                                    <p class="card-text"><strong>Score:</strong> ${anime.score}</p>
                                    <p class="card-text"><strong>Episodes:</strong> ${anime.episodes}</p>
                                    <p class="card-text"><strong>Year:</strong> ${anime.year}</p>
                                </div>
                            </div>
                        </div>
                    </a>
                `;
                resultsDiv.appendChild(animeCard);
            });
        })
        .catch(error => {
            console.error(error);
        });
});