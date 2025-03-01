window.handleSignOut = () => {
    localStorage.removeItem("currentUser");
    location.reload();
};

function getWatchlist() {
    const users = JSON.parse(localStorage.getItem("users"));
    const user = users[userIndex()]

    if (users && users.length > 0 && user.watchlist) {
        return user.watchlist;
    } else {
        console.log("No watchlist found.");
        return [];
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

function displayWatchlist() {
    const watchlist = getWatchlist();

    if (watchlist.length > 0) {
        watchlist.forEach(item => {
            fetch(`https://api.jikan.moe/v4/anime/${item.animeId}`)
                .then(response => response.json())
                .then(data => {
                    const resultsDiv = document.getElementById("watch-list");
                    const animeCard = document.createElement("div");
                    animeCard.classList.add("row", "table-item");
                    animeCard.innerHTML = `
                        <p class="col-md-1 item" id="item-id">${item.animeId}</p>
                        <p class="col-md-9 item" id="item-title">${data.data.title}</p>
                        <p class="col-md-2 item" id="item-actions"><button class="btn btn-danger" onclick="deleteAnime(${item.animeId})">Delete</button></p>
                    `
                    resultsDiv.appendChild(animeCard);
                })
                .catch(error => console.error(error))
        });
    }
}

function deleteAnime(animeId) {
    const users = JSON.parse(localStorage.getItem("users"));
    const user = users[userIndex()]

    if (users && users.length > 0 && user.watchlist) {
        const itemIndex = user.watchlist.findIndex(item => item.animeId == animeId);

        if (itemIndex !== -1) {
            user.watchlist.splice(itemIndex, 1);

            localStorage.setItem("users", JSON.stringify(users));

            const tableItems = document.querySelectorAll(".table-item");
            tableItems.forEach(tableItem => {
                const itemId = tableItem.querySelector("#item-id");

                if (itemId.innerHTML == animeId) {
                    tableItem.remove();
                }
            });
        } else {
            console.log(`Anime not found`);
        }
    } else {
        console.log("No watchlist found.");
    }
}

displayWatchlist()