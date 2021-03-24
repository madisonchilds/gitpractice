import { vehicles } from'../data/vehicles.js'

let vehicleList = document.querySelector('#vehicleList')

for (let i = 0; i <= vehicles.length; i++) {
    const foundVehicles = vehicles.find(vehicles => getLastNumber(vehicles.url) === (i + 1).toString())
    
    try{
        let posterFig = document.createElement('figure')
        let figImg = document.createElement('img')
        figImg.src = `https://starwars-visualguide.com/assets/img/vehicles/` + (i + 1) + `.jpg`
        let figCaption = document.createElement('figcaption')
    
        figCaption.textContent = foundVehicles.name
        posterFig.appendChild(figImg)
        posterFig.appendChild(figCaption)
    
        vehicleList.appendChild(posterFig)
    } catch {
        ;
    }

}

function getLastNumber(url) {
    let end = url.lastIndexOf('/')
    let beginning = url.lastIndexOf('/', url.lastIndexOf('/')-1)
    return url.substring(beginning + 1, end)
}