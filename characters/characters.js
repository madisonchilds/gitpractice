import { people } from'../data/people.js'


const mainElement = document.querySelector('#characterList')

const mainHeader = document.createElement('header') 

document.body.insertBefore(mainHeader, mainElement)

const maleButton = document.createElement('button')
maleButton.textContent = 'Male Characters'
mainHeader.appendChild(maleButton)
maleButton.addEventListener('click', () => getCharacters(maleCharacters))

const femaleButton = document.createElement('button')
femaleButton.textContent = 'Female Characters'
mainHeader.appendChild(femaleButton)
femaleButton.addEventListener('click', () => getCharacters(femaleCharacters))

const othersButton = document.createElement('button')
othersButton.textContent = 'Other Characters'
mainHeader.appendChild(othersButton)
othersButton.addEventListener('click', () => getCharacters(otherCharacters))

const maleCharacters = people.filter(person => person.gender === 'male')
const femaleCharacters = people.filter(person => person.gender === 'female')
const otherCharacters = people.filter(person => {
    if (person.gender === 'n/a' ||
        person.gender === 'hermaphrodite' ||
        person.gender === 'none') {
        return person
    } 
})

function getCharacters(characters) {
    removeChildren(mainElement)

    let filmList = document.querySelector('#characterList')

    characters.forEach((person) => {
            let posterFig = document.createElement('figure')
            let figImg = document.createElement('img')
            let charNum = getLastNumber(person.url)
            figImg.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`
            let figCaption = document.createElement('figcaption')
        
            figCaption.textContent = person.name
            posterFig.appendChild(figImg)
            posterFig.appendChild(figCaption)
        
            filmList.appendChild(posterFig)
    })

}

function getLastNumber(url) {
    let end = url.lastIndexOf('/')
    let beginning = url.lastIndexOf('/', url.lastIndexOf('/')-1)
    return url.substring(beginning + 1, end)
}

export function removeChildren(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }
}