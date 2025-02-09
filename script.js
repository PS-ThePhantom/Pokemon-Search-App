const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonTypes = document.getElementById("types");
const pokemonPicture = document.getElementById("picture");
const pokemonHP = document.getElementById("hp");
const pokemonAttack = document.getElementById("attack");
const pokemonDefense = document.getElementById("defense");
const pokemonSpecialAttack = document.getElementById("special-attack");
const pokemonSpecialDefense = document.getElementById("special-defense");
const pokemonSpeed = document.getElementById("speed");

const displayPokemon = async (link) => {
  try {
    const linkPromise = await fetch(link);
    const pokemonData = await linkPromise.json();
    let stats = {};

    pokemonTypes.innerHTML = "";
    pokemonData.stats.forEach(stat => stats[stat.stat.name] = stat.base_stat);

    pokemonName.innerText = pokemonData.name.toUpperCase();
    pokemonId.innerText = "#" + pokemonData.id; pokemonWeight.innerText = pokemonData.weight;
    pokemonHeight.innerText = pokemonData.height;
    pokemonData.types.forEach(({ type }) => pokemonTypes.innerHTML +=
      `<span>${type.name.toUpperCase()}</span>`);
    pokemonPicture.innerHTML = `<img class="picture"  id="sprite" src="${pokemonData.sprites.front_default}"/>`;
    pokemonHP.innerText = stats["hp"];
    pokemonAttack.innerText = stats["attack"];
    pokemonDefense.innerText = stats["defense"];
    pokemonSpecialAttack.innerText = stats["special-attack"];
    pokemonSpecialDefense.innerText = stats["special-defense"];
    pokemonSpeed.innerText = stats["speed"];

  } catch (err) {
    console.log(err);
  }
};

const removerCharsfromInput = () => {
  const allowedChars = /[a-z\d-]/;
  let name = "";

  for (const char of searchInput.value.toLowerCase())
    if (allowedChars.test(char)) name += char;

  return name;
};

const searchForPokemon = async (e) => {
  e.preventDefault();

  if (searchInput.value) {
    try {
      const linkPromise = await fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon");
      const pokemonData = await linkPromise.json();
      const searchName = removerCharsfromInput();
      let foundPokemonUrl = "";

      if (Number(searchName))
        foundPokemonUrl = pokemonData.results.find(({ id }) => Number(searchName) === id)?.url;
      else foundPokemonUrl = pokemonData.results.find(({ name }) => searchName === name)?.url;

      if (foundPokemonUrl) displayPokemon(foundPokemonUrl);
      else alert("Pokémon not found");

    } catch (err) {
      console.log(err);
    }
  }
};

searchButton.addEventListener("click", searchForPokemon);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchForPokemon(e);
});