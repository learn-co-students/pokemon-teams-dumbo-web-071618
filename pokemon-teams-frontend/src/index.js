const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function () {

clickAdd()
showTrainers()


function showTrainers() {
  fetch(TRAINERS_URL)
  .then(r => r.json())
  .then(trainers => {
  trainers.forEach(trainer => {
    const mainDiv = document.querySelector('main')
    mainDiv.append(createCard(trainer))
  })
  })
}

function createCard(trainer){
  const trainerCard = document.createElement('div')
  trainerCard.classList.add('card')
  trainerCard.dataset.cardId = trainer.id
  trainerCard.dataset.totalTeam = trainer.pokemons.length

  const trainerPokemons =
  document.createElement('p')

  const listOfPokemons = myPokemons(trainer.pokemons).innerText

  trainerCard.innerHTML = `
  <h2>${trainer.name}</h2>
  <button class="add" id=${trainer.id}>Add Pokemon</button>
  <br><br>
  ${listOfPokemons}`

  return trainerCard
}

function myPokemons(pokemons) {
  const pokemonList = document.createElement('p')

  pokemons.forEach(pokemon => {
    const pokemonSpecs = `<li id="pokemon_${pokemon.id}">${pokemon.nickname} (${pokemon.species}) <button class="release" id=${pokemon.id} data-trainer=${pokemon.trainer_id}>Release</button></li>`
    pokemonList.append(pokemonSpecs)
  })

  return pokemonList
}

function clickAdd(){
  document.addEventListener('click', e => {
    if (e.target.classList.contains("add")) {
      const trainerCard = document.querySelector(`[data-card-id='${e.target.id}']`)

      checkNumberofPokemons(trainerCard.dataset.totalTeam, trainerCard)
    } else if (e.target.classList.contains("release")){
      const trainerCard = document.querySelector(`[data-card-id='${e.target.dataset.trainer}']`)

      releasePokemon(e.target.id, trainerCard)
    }
  })
}
function checkNumberofPokemons(total, card) {
  if ( parseInt(total) >= 6) {
    alert('You already have 6 Pokemons. Please release a Pokemon before adding another one.')
  } else {
    card.dataset.totalTeam++
    addPokemon(card)
  }
}

function addPokemon(card){
  const data = {
    nickname: "Roberto",
    species: "Who knows!",
    trainer_id: `${card.dataset.cardId}`
  }

  fetch(POKEMONS_URL, {
    method:'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(r => r.json())
  .then(pokemonData => {
    const newPokemon = document.createElement('li')
    newPokemon.id = `pokemon_${pokemonData.id}`
    newPokemon.innerHTML = `${pokemonData.nickname} (${pokemonData.species}) <button class="release" id='${pokemonData.id}' data-trainer=${pokemonData.trainer_id}>Release</button>`

    card.append(newPokemon)
  })
}

function releasePokemon(id, trainer) {
  fetch(POKEMONS_URL + "/" + id, {
    method:'DELETE',
  })
  .then(r => r.json())

  const releasedPokemon = document.getElementById(`pokemon_${id}`)

  trainer.dataset.totalTeam--
  
  releasedPokemon.remove()
}
})
