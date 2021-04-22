const pokeGrid = document.querySelector('.pokeGrid')
const loadButton = document.querySelector('.loadPokemon')
const fetchButton = document.querySelector('#fetchSelectedPokemon')
const newButton = document.querySelector('#newPokemon')

class Pokemon {
    constructor(name, height, weight, abilities, move, types) {
      this.id = 900
      this.name = name
      this.height = height
      this.weight = weight
      this.abilities = abilities
      this.moves = move
      this.types = types
    }
  }

  newButton.addEventListener('click', () => {
    let pokeName = prompt('What is the name of your new Pokemon?')
    let pokeHeight = prompt('Pokemon height?')
    let pokeWeight = prompt('Pokemon weight?')
    let pokeAbilities = prompt('What are the abilities of your Pokemon?')
    let pokeMove = prompt('Best moves?')
    let abilitiesArray = getAbilitiesArray(pokeAbilities)
    let newPokemon = new Pokemon(
      pokeName,
      pokeHeight,
      pokeWeight,
      abilitiesArray,
      [
          {
          move: {
              name: pokeMove
          }
      }
    ],
      [
        {
          type: {
            name: 'normal',
          },
        },
      ],
    )
    populatePokeCard(newPokemon)
  })

  function getAbilitiesArray(commaString) {
    let tempArray = commaString.split(',')
    return tempArray.map((abilityName) => {
      return {
        ability: {
          name: abilityName
        }
      }
    })
  }


loadButton.addEventListener('click', () => {
    loadPage()
})

fetchButton.addEventListener('click', () => {
    let pokeNameOrId = prompt('Enter Pokemon ID or Name:').toLowerCase()
    getAPIData(`https://pokeapi.co/api/v2/pokemon/${pokeNameOrId}`).then(
        (data) => {
            populatePokeCard(data)
        }
    )
})

async function getAPIData(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

function loadPage() {
    const response = getAPIData('https://pokeapi.co/api/v2/pokemon?limit=25').then(
            async (data) => {
            for (const singlePokemon of data.results) {
                await getAPIData(singlePokemon.url).then(
                    (pokeData) => populatePokeCard(pokeData)
                )
            }
        }
    )
}

function populatePokeCard(singlePokemon) {
    let pokeScene = document.createElement('div')
    pokeScene.className = 'scene'
    let pokeCard = document.createElement('div')
    pokeCard.className = 'card'
    pokeCard.addEventListener('click', () => {
        pokeCard.classList.toggle('is-flipped')
    })
    pokeCard.appendChild(populateCardFront(singlePokemon))
    pokeCard.appendChild(populateCardBack(singlePokemon))
    pokeScene.appendChild(pokeCard)
    pokeGrid.appendChild(pokeScene)
}

function populateCardFront(pokemon) {
    let pokeFront = document.createElement('div')
    pokeFront.className = 'card_face card_face--front'
    let frontLabel = document.createElement('p')
    frontLabel.textContent = pokemon.name
    let frontImage = document.createElement('img')
    frontImage.src = getImageFileName(pokemon)

    frontImage.addEventListener('error', (err) =>{
        frontImage.src = 'images/pokeball.png'
    })

    let pokeType = pokemon.types[0].type.name
    pokeFront.classList.add(pokeType)

    pokeFront.appendChild(frontLabel)
    pokeFront.appendChild(frontImage)
    return pokeFront
}

function populateCardBack(pokemon) {
    let pokeBack = document.createElement('div')
    pokeBack.className = 'card_face card_face--back'
    let backLabel = document.createElement('p')
    backLabel.textContent = `Moves: ${pokemon.moves.length}`
    pokeBack.appendChild(backLabel)

    let pokeType = pokemon.types[0].type.name
    pokeBack.classList.add(pokeType)

    let typeLabel = document.createElement('h3')
    typeLabel.textContent = "Types:"
    pokeBack.appendChild(typeLabel)
  
    pokemon.types.forEach((pokeType) => {
      let backType = document.createElement('p')
      backType.textContent = pokeType.type.name
      pokeBack.appendChild(backType)
    })

    let abilityLabel = document.createElement('h3')
    abilityLabel.textContent = "Abilities:"
    pokeBack.appendChild(abilityLabel)
     pokemon.abilities.forEach((pokeAbility) => {
       let ability = document.createElement('p')
       ability.textContent = pokeAbility.ability.name
       pokeBack.appendChild(ability)
     })

     /* let abilityLabel = document.createElement('div')
    abilityLabel.textContent = "Ability Experience:"
    pokeBack.appendChild(abilityLabel)
     pokemon.abilities.forEach((pokeAbility) => {
       let ability = document.createElement('p')
       ability.textContent = pokeAbility.ability.base_experience
       pokeBack.appendChild(ability)
     }) */
    return pokeBack
}

function getImageFileName(pokemon) {
    let pokeId 
    if (pokemon.id < 10) pokeId = `00${pokemon.id}`
    if (pokemon.id > 9 && pokemon.id < 100) pokeId = `0${pokemon.id}`
    if (pokemon.id > 99 && pokemon.id < 810) pokeId = pokemon.id
    if (pokemon.id === 900) {
        return `images/pokeball.png`
    }
    return `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${pokeId}.png`
    }