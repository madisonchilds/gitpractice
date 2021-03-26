import { vehicles } from '../data/vehicles.js'

console.log(vehicles.length)

const nav = document.querySelector('nav')
const navList = document.querySelector('.navList')
const vehicleView = document.querySelector('.vehicleView')

const dialog = document.querySelector('.modal')
const closeButton = document.querySelector('.modal-close')
const modalBackground = document.querySelector('.modal-background')

closeButton.addEventListener('click', () => {
    dialog.classList.toggle("is-active")
})

modalBackground.addEventListener('click', () => {
    dialog.classList.toggle("is-active")
})

function populateNav(vehicles) {
    vehicles.forEach((vehicle) => {
        let anchorWrap = document.createElement('a')
        anchorWrap.href = '#'
        anchorWrap.addEventListener('click', () => populateVehicleView(vehicle))
        let listItem = document.createElement('li')
        listItem.textContent = vehicle.name
        
        anchorWrap.appendChild(listItem)
        navList.appendChild(anchorWrap)
    })
}

function populateVehicleView(vehicleData) {
    removeChildren(vehicleView)
    let vehicleNum = getLastNumber(vehicleData.url)
    let vehicleImage = document.createElement('img')
    vehicleImage.src = `https://starwars-visualguide.com/assets/img/vehicles/${vehicleNum}.jpg`
    vehicleImage.addEventListener('error', (err) => {
        console.log(`Oops! This image doesn't exist.`)
        vehicleImage.hidden = true
        dialog.classList.toggle("is-active")
    })
    vehicleView.appendChild(vehicleImage)
}

function addStarField(element, numStars) {
    element.style.setProperty('background-color', '#000')
    for (let i = 0; i < numStars; i++) {
        let star = document.createElement('div')
        star.style.setProperty('position', 'absolute')
        star.style.setProperty('width', '2px')
        star.style.setProperty('height', '2px')
        star.style.setProperty('background-color', 'white')
        let xy = getRandomPosition()
        star.style.left = `${xy[0]}px`
        star.style.top = `${ xy[1]}px`
        element.appendChild(star)
    }
}

function getRandomPosition() {
    let y = document.body.scrollHeight
    let x = document.body.scrollWidth
    let randomY = Math.floor(Math.random() * y)
    let randomX = Math.floor(Math.random() * x)
    return [randomX, randomY]
}

populateNav(vehicles)

addStarField(document.querySelector('body'), 1000)

    function getLastNumber(url) {
        let end = url.lastIndexOf('/')
        let beginning = url.lastIndexOf('/', url.lastIndexOf('/')-1)
        return url.substring(beginning + 1, end)
    }

    function removeChildren(container) {
        while (container.firstChild) {
        container.removeChild(container.firstChild)
        }
    }