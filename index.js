const baseUrl = "https://pokeapi.co/api/v2/pokemon";
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
const handleError = err => {
    alert (`Hubo un error. Intente otra vez. ${err}`);
};


const searchInput = document.querySelector("#poke-input");
let currentPokemon;
const getPokemon = async() => {
    let id = searchInput.value;
    id = id.toLowerCase();
    try {
        let pokemon = await axios.get(`${baseUrl}/${id}`);
        currentPokemon = pokemon.data.id;
        return pokemon.data;
    }   catch (err) {
        handleError(err);
    }
}

const showPokemon = async () => {
    let pokemon = await getPokemon();
    const imgPokemon = document.querySelector("#img-poke");
    imgPokemon.setAttribute("src", pokemon.sprites.front_default);
    const nameSpan = document.querySelector("#poke-name-id");
    let pokemonName = capitalizeFirstLetter(pokemon.name);
    nameSpan.innerHTML = `${pokemon.id} - ${pokemonName}`;
    const abilitySpan = document.querySelector("#poke-ability-id");
    let pokemonAbility = capitalizeFirstLetter(pokemon.abilities[0].ability.name);
    abilitySpan.innerHTML = pokemonAbility;
    const typesPokemon = document.querySelector("#poke-types-id");
    typesPokemon.innerHTML = "";
    const types = pokemon.types;
    for (let type of types) {
        let span = document.createElement("span");
        let typeName = (type.type.name).toUpperCase();
        span.innerHTML = typeName;
        span.classList.add(`type-${type.type.name}`);
        typesPokemon.appendChild(span);
    }
}

const search = document.querySelector("#poke-button");
search.addEventListener("click", showPokemon);