const container: HTMLElement | any = document.getElementById("app")
const numberOfPokemon: number = 151
const inputSearch = document.querySelector('#searchPokemon');
let dataLoaded = false

interface pokemonData {
    name: string;
    image: string;
}

 let pokemonObjects:pokemonData[] = []

const fetchData = async (): Promise<void> => {
    for (let i = 1; i <= numberOfPokemon; i++) {
        pokemonObjects.push(await getPokemon(i));
    }

    dataLoaded = true
    showAllPokemon(pokemonObjects)
}

async function getPokemon(id: number): Promise<pokemonData> {
    const newUrl: string = 'https://pokeapi.co/api/v2/pokemon/'.concat(id.toString())
    const data: Response = await fetch(newUrl)
    const pokemons: any = await data.json()

        const transformedPokemon = {
            name: pokemons.name, 
            image: pokemons.sprites.front_default.toString(), 
        }


    return transformedPokemon

}

const showPokemon = (pokemon: pokemonData): void => {
  let output: string = 
      `<div class="card">
            <img class="cardImage" src=${pokemon.image} alt=${pokemon.name} />
            <h3 class="cardName">${pokemon.name}</h1>
       </div>`
  container.innerHTML += output
}

function showAllPokemon(pokemonObjects:pokemonData[]) {
    container.innerHTML = ""
    if (dataLoaded) {
        for (let i=0; i < pokemonObjects.length; i++) {

            showPokemon(pokemonObjects[i])
        }
    }
    else {
        alert("Daten wurde noch nicht geladen.")
    }
} 
fetchData()