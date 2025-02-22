window.handleSignOut = () => {
    localStorage.removeItem("currentUser");
    location.reload();
};

// Fetch current season anime
const fetchSeasonAnime = () => {
    const baseUrl = 'https://api.jikan.moe/v4/seasons/now';
    fetch(baseUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const resultsDiv = document.getElementById('anime-results');
            for (let i = 0; i < data.data.length; i++) {
                const anime = data.data[i];
                const animeCard = document.createElement('div');
                animeCard.classList.add('col-md-2', 'mb-3', 'carousel-item');
                if (i == 0) {
                    animeCard.classList.add('active');
                }
                animeCard.innerHTML = `
                    <a href="info.html?id=${anime.mal_id}" class="text-decoration-none text-light">
                        <div class="card">
                            <div class="img-wrapper">
                                <img src="${anime.images.jpg.image_url}" class="card-img-top" alt="${anime.title}">
                            </div>
                            <div class="card-body">
                                <h6 class="card-title">${truncateTitle(anime.title)}</h6>
                            </div>
                        </div>
                    </a>
                `;
                resultsDiv.appendChild(animeCard);
            }

        })
        .catch(error => {
            console.error(error);
        });
};

// Fetch anime recommendations
const fetchRecommendations = () => {
    const baseUrl = 'https://api.jikan.moe/v4/recommendations/anime';
    fetch(baseUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const recommendationsDiv = document.getElementById('recommendations-results');

            for (let i = 0; i < data.data.length; i++) {
                const recommendation = data.data[i];
                const animeCard = document.createElement('div');
                animeCard.classList.add('col-md-2', 'mb-3', 'carousel-item');
                animeCard.innerHTML = `
                    <a href="info.html?id=${recommendation.entry[0].mal_id}" class="text-decoration-none text-light">
                        <div class="card">
                            <div class="img-wrapper">
                                <img src="${recommendation.entry[0].images.jpg.image_url}" class="card-img-top" alt="${recommendation.entry[0].title}">
                            </div>
                            <div class="card-body">
                                <h6 class="card-title">${truncateTitle(recommendation.entry[0].title)}</h6>
                            </div>
                        </div>
                    </a>
                `;
                recommendationsDiv.appendChild(animeCard);
            }

        })
        .catch(error => {
            console.error(error);
        });
};

// Truncate
const truncateTitle = (title) => {
    const maxLength = 60; // Maximum length of the title
    if (!title) return 'No title available.';
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
};

// Fetch data on page load
window.onload = () => {
    fetchSeasonAnime();
    fetchRecommendations();
};