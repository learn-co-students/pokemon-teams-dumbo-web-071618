const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', populate)
document.addEventListener('click', (e) => {
    if (e.target.className === 'release') {
        releasePokemon(e.target.dataset.id,e.target.parentElement)
    }
})

function populate() {
    fetch(TRAINERS_URL)
        .then(res => res.json())
        .then(json => {
            json.forEach(trainer => {
                let newTrainer = document.createElement('div')
                newTrainer.className = "card"
                newTrainer.dataset.id = trainer.id
                newTrainer.innerHTML = `<p>${trainer.name}</p>`
                let newButton = document.createElement('button') 
                let pokemonTeam = document.createElement('ul')
                pokemonTeam.className = 'team-obtainer'

                trainer.pokemons.forEach(pokemon => {
                    pokemonTeam.appendChild(createPokemon(pokemon))
                })
                newTrainer.append(newButton,pokemonTeam)
                document.querySelector('main').appendChild(newTrainer)
                newButton.innerText = "Add Pokémon"
                newButton.addEventListener('click', (e) => {
                    addPokemon(pokemonTeam, e.target.parentElement.dataset.id)
                })
            })
        })
    }


function addPokemon(pokemonTeam,trainerId) {
    if (pokemonTeam.children.length < 6){
        let newPokemon = document.createElement('li')

        fetch(POKEMONS_URL, {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                pokemon: {
                    trainer_id: trainerId
                }
            })
        })
            .then(res => res.json())
            .then(pokemon => {
                newPokemon.innerText = `${pokemon.nickname} (${pokemon.species})`
                pokemonTeam.appendChild(createPokemon(pokemon))
            })
    } else {
        alert("You need to release one of your Pokemon before adding another")
    }
}

function releasePokemon(pokemonId,pokemonLi){
    fetch(POKEMONS_URL + `/${pokemonId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(pokemonLi.parentElement.removeChild(pokemonLi))
}

function createPokemon(pokemonObj) {
    let pokemonLi = document.createElement('li')
    pokemonLi.innerText = `${pokemonObj.nickname} (${pokemonObj.species})`
    let releaseButton = document.createElement('button')
    releaseButton.className = 'release'
    releaseButton.dataset.id = pokemonObj.id
    releaseButton.innerText = "Release!"
    pokemonLi.appendChild(releaseButton)

    return pokemonLi
}