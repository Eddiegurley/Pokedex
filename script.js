const pokedex = document.getElementById("pokedex");
const searchInput = document.getElementById("search");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

let offset = 0;
const limit = 150;

// Fetch Pokémon from API
async function fetchPokemon(offset, limit) {
    pokedex.innerHTML = "Loading...";
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    const data = await response.json();
    
    const pokemonPromises = data.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        return res.json();
    });

    const pokemonList = await Promise.all(pokemonPromises);
    displayPokemon(pokemonList);
}

// Display Pokémon in the UI
function displayPokemon(pokemonList) {
    pokedex.innerHTML = "";
    pokemonList.forEach(pokemon => {
        const types = pokemon.types.map(type => type.type.name).join(", ");
        
        const card = document.createElement("div");
        card.classList.add("pokemon-card");
        card.innerHTML = `
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <h3>${pokemon.name.toUpperCase()}</h3>
            <p>Type: ${types}</p>
        `;
        pokedex.appendChild(card);
    });
}

// Search Pokémon by name
searchInput.addEventListener("input", async () => {
    const query = searchInput.value.toLowerCase();
    if (query === "") {
        fetchPokemon(offset, limit);
        return;
    }

    pokedex.innerHTML = "Searching...";
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
    
    if (response.ok) {
        const pokemon = await response.json();
        displayPokemon([pokemon]);
    } else {
        pokedex.innerHTML = "<p>Pokémon not found!</p>";
    }
});

// Pagination buttons
prevButton.addEventListener("click", () => {
    if (offset >= 150) {
        offset -= 150;
        fetchPokemon(offset, limit);
        nextButton.disabled = false;
    }
    if (offset === 0) {
        prevButton.disabled = true;
    }
});

nextButton.addEventListener("click", () => {
    offset += 150;
    fetchPokemon(offset, limit);
    prevButton.disabled = false;
});

// Initial Fetch
fetchPokemon(offset, limit);