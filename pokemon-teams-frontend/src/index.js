const main = document.querySelector('main')

document.addEventListener('DOMContentLoaded', () => {


  PokemonAdapter.getTrainers()
  .then(trainers => {
    console.log(trainers)
    trainers.forEach(renderDivCard)
  })

  //add event listeners
  main.addEventListener('click', (e) => {
    if (e.target.dataset.trainerId) {
      const ul = main.querySelector(`ul[data-id='${e.target.dataset.trainerId}']`)
      if (ul.children.length < 6) {
        PokemonAdapter.addPokemon(e.target.dataset.trainerId)
        .then((pokemon) => {
          ul.appendChild(makeLi(pokemon))
        })
      }
    }else if (e.target.classList.contains('release')) {
      PokemonAdapter.releasePokemon(e.target.dataset.pokemonId)
      .then((pokemon) => {
        e.target.parentNode.remove()
      })
    }
  })

  const renderDivCard = (trainer) => {
    const divCard = document.createElement('div')
    divCard.classList.add('card')
    divCard.dataset.id = trainer.id
    //create and putting stuff in p tags
    const p = document.createElement('p')
    p.innerText = trainer.name

    //create button
    const button = document.createElement('button')
    button.dataset.trainerId = trainer.id
    button.innerText = 'Add Pokemon'

    //create ul
    const ul = document.createElement('ul')
    ul.dataset.id = trainer.id
    //getting pokemon for each trainer and creating LI
    trainer.pokemons.forEach((pokemon) => {
      //might have error.........
      ul.append(makeLi(pokemon))
    })

    divCard.append(p, button, ul)
    main.append(divCard)
  }

  const makeLi = (pokemon) => {
    const li = document.createElement('li')
    li.innerText = `${pokemon.nickname} (${pokemon.species}) `
    const pokemonButton = document.createElement('button')
    pokemonButton.classList.add('release')
    pokemonButton.dataset.pokemonId = pokemon.id
    pokemonButton.innerText = 'Release'

    li.append(pokemonButton)
    return li
  }
})

// const li = document.createElement('li')
// li.innerText = `${pokemon.nickname} (${pokemon.species}) `
// //creating button inside li
// const pokemonButton = document.createElement('button')
// pokemonButton.classList.add('release')
// pokemonButton.dataset.pokemonId = pokemon.id
// pokemonButton.innerText = 'Release'
// //appending all shit
// li.appendChild(pokemonButton)
