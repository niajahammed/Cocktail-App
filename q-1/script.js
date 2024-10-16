document.addEventListener("DOMContentLoaded", () => {
    fetchCocktails();
});

async function fetchCocktails() {
    try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail');
        const data = await response.json();
        displayCocktails(data.drinks.slice(0, 12)); // Display only the first 12 cocktails
    } catch (error) {
        console.error("Something went wrong..", error);
    }
}

function displayCocktails(cocktails) {
    const cocktailContainer = document.getElementById('cocktail-container');
    cocktailContainer.innerHTML = "";

    cocktails.forEach(cocktail => {
        const cocktailCard = document.createElement('div');
        cocktailCard.classList.add('cocktail-card');

        cocktailCard.innerHTML = `
            <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}">
            <div class="cocktail-card-content">
                <h3>${cocktail.strDrink}</h3>
                <p>ID: ${cocktail.idDrink}</p>
            </div>
        `;

        cocktailContainer.appendChild(cocktailCard);
    });
}


function searchCocktails(query) {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`)
        .then(response => response.json())
        .then(data => {
            if (data.drinks) {
                displayCocktails(data.drinks);
            } else {
                displayCocktails(null);
            }
        })
        .catch(error => console.error("Error fetching cocktails:", error));
}


const searchBar = document.getElementById("search-bar");
searchBar.addEventListener("input", () => {
    const query = searchBar.value.trim();
    if (query) {
        searchCocktails(query);
    } else {
        document.getElementById("cocktail-container").innerHTML = "";
    }
});