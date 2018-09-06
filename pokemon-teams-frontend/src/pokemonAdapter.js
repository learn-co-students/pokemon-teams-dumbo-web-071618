const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

class PokemonAdapter {
  static getTrainers(){
    return fetch(TRAINERS_URL)
    .then(res => res.json())
  }
  static addPokemon(id){
    return fetch(POKEMONS_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({trainer_id: id})
    })
    .then(res => res.json())
  }
  static releasePokemon(id){
    return fetch(`${POKEMONS_URL}/${id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({trainer_id: null})
    })
    .then(res => res.json())
  }
}
