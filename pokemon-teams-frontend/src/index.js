const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", populate)
document.addEventListener("click", (e) => {
    if(e.target.className === "release")    {
        releasePokemon(e.target.dataset.id, e.target.parentElement)
    }
})

function populate() {
    fetch(TRAINERS_URL)
        .then(res => res.json())
        .then(json => {
            json.forEach((trainer) => {
                let new_trainer = document.createElement('div')
                new_trainer.className = "card"
                new_trainer.dataset.id = trainer.id
                new_trainer.innerHTML = `<p>${trainer.name}</p>`

                let pokemon_team = document.createElement('ul')
                pokemon_team.className = "team-container"

                let new_button = document.createElement('Button')
                new_button.innerText = "Add Pokemon"
                new_button.addEventListener("click", (e) => addPokemon(pokemon_team, e.target.parentElement.dataset.id))


                trainer.pokemons.forEach((pokemon) => {
                    pokemon_team.appendChild(createPokemon(pokemon))
                })

                new_trainer.append(new_button, pokemon_team)
                document.querySelector('main').appendChild(new_trainer)
            })
        })
}


function addPokemon(pokemon_team, trainerId) {
    if (pokemon_team.children.length < 6) {
        let new_pokemon = document.createElement('li')
        fetch(POKEMONS_URL, {
            method: "POST",
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
            .then(json => pokemon_team.append(createPokemon(json)))
    } else {
        alert("You need to release one of your pokemon before adding another.")
    }
}

function releasePokemon(pokemonId, pokemon_li) {
    fetch(POKEMONS_URL + `/${pokemonId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(pokemon_li.parentElement.removeChild(pokemon_li))
}

function createPokemon(pokemon) {
    let pokemon_li = document.createElement('li')

    pokemon_li.innerText = `${pokemon.nickname} (${pokemon.species})`

    let release_button = document.createElement('Button')
    release_button.className = "release"
    release_button.dataset.id = pokemon.id
    release_button.innerText = "Release!"
    // release_button.addEventListener("click", releasePokemon)

    pokemon_li.appendChild(release_button)
    return pokemon_li
}