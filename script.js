const baseURL = "https://pokeapi.co/api/v2/";

let nextPage = "";
let prevPage = "";
let results = [];

  const get150Pokemon = async () => {
      try {
        const response = await fetch(baseURL + "pokemon?limit=150");
        return response.json();
      } catch (error) {
        console.error(error);
      }
  };
const getNextPage = (nextPageLink) => {
     
}

  get150Pokemon().then((data) => {
    console.log(data);
    const resultsDisplay = document.getElementById("resultsDisplay");
    const pokemon = data.results;
    pokemon.map((item) => {
        const card= document.createElement('div');
        const image = document.childElement('img');
        const name = document.createElement('h2');

        card.classList.add("card")
    })
});