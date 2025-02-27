import typescript from "../node_modules/@rollup/plugin-typescript/types/index"

const container: HTMLElement | any = document.getElementById("app")
const numberOfPokemon: number = 151
const inputSearch = document.querySelector('#searchPokemon')
const randomPokemon = document.getElementById('randomPokemon')
const showAll = document.getElementById('showAll')
let dataLoaded = false

interface pokemonData {
    name: string
    image: string
    id: number
    type: string
}

 let pokemonObjects:pokemonData[] = []

const fetchData = async (): Promise<void> => {
    for (let i = 1; i <= numberOfPokemon; i++) {
        pokemonObjects.push(await getPokemon(i))
    }

    dataLoaded = true
    showAllPokemon(pokemonObjects)
}

async function getPokemon(id: number): Promise<pokemonData> {
    const newUrl: string = 'https://pokeapi.co/api/v2/pokemon/'.concat(id.toString())
    const data: Response = await fetch(newUrl)
    const pokemons: any = await data.json()
    const pokemonType: string = pokemons.types
    .map((poke: any) => poke.type.name)
    .join(" & ")

        const transformedPokemon = {
            name: pokemons.name, 
            image: pokemons.sprites.front_default.toString(),
            id: pokemons.id,
            type: pokemonType,
        }
    return transformedPokemon
}

const showPokemon = (pokemon: pokemonData): void => {
  let output: string = 
      `<div class="card">
            <img class="cardImage" src=${pokemon.image} alt=${pokemon.name} />
            <h3 class="cardName">${pokemon.name}</h3>
            <div class="cardId">
            <span>#${pokemon.id}</span>
            </div>
            <br>
            <span class="cardType">${pokemon.type}</span>
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

function searchPokemon(e:any) {

    clearPokedex()

      if (e.target.value === "") { 
        showAllPokemon(pokemonObjects)
      } else {  
        let filteredPokemons = pokemonObjects.filter((pokemon) => {
            return pokemon.name.includes(e.target.value)
        })
      showAllPokemon(filteredPokemons)
    }
 }
 
    inputSearch!.addEventListener("input", searchPokemon)

function clearPokedex() {
    container.innerHTML = ""
}

function randomNumber() : number{
   return Math.floor(Math.random() * numberOfPokemon)
 }

randomPokemon!.addEventListener("click", showRandomPokemon)

function showRandomPokemon() {

    if (dataLoaded) {
    clearPokedex()
    showPokemon(pokemonObjects[randomNumber()] )
    }

    else {
        alert("Daten wurden noch nicht geladen.")
    }
}

function showAllAgain() {
     showAllPokemon(pokemonObjects)
}

showAll!.addEventListener("click", showAllAgain)

