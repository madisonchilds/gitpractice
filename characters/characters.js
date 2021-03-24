

function getCharacters(gender) {
    //import { people } from'../data/people.js'

    let filmList = document.querySelector('#characterList')

    for (let i = 0; i <= people.length; i++) {
        const foundCharacter = people.find(character => getLastNumber(character.url) === (i + 1).toString() && character.gender === gender)
        
        try{
            let posterFig = document.createElement('figure')
            let figImg = document.createElement('img')
            figImg.src = `https://starwars-visualguide.com/assets/img/characters/` + (i + 1) + `.jpg`
            let figCaption = document.createElement('figcaption')
        
            figCaption.textContent = foundCharacter.name
            posterFig.appendChild(figImg)
            posterFig.appendChild(figCaption)
        
            filmList.appendChild(posterFig)
        } catch {
            ;
        }

    }
}

function getLastNumber(url) {
    let end = url.lastIndexOf('/')
    let beginning = url.lastIndexOf('/', url.lastIndexOf('/')-1)
    return url.substring(beginning + 1, end)
}