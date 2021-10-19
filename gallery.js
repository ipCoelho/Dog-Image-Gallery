"use strict"

const clearElement = (htmlElement) => {
    while (htmlElement.firstChild) {
        htmlElement.removeChild(htmlElement.lastChild)
    }
}
const searchImages = async (event) => {
    if (event.key === 'Enter') {
        const url = `https://ghibliapi.herokuapp.com/films`
        const imageMessage = await fetch(url)
        const images = await imageMessage.json()
        console.log(images)

        // clearElement(document.querySelector('.gallery-section'))
        // clearElement(document.querySelector('.slide-section'))

        renderGallery(images.image)
        renderSlide(images.image)
    }
}




const filterUrl = urlImage => {
    const lastBar = urlImage.lastIndexOf('/') + 1
    const lastDot = urlImage.lastIndexOf('.') 
    return urlImage.substring(lastBar, lastDot)
}
const createGalleryItem = (urlImage) => {
    const htmlGallerycontainer = document.querySelector(".gallery-section")
    const link = document.createElement('a')
    link.href = `#${filterUrl(urlImage)}`
    link.classList.add("gallery-items")
    link.innerHTML = `<img src="${urlImage}" alt="">`
    htmlGallerycontainer.append(link)
}
const createSlideItem = (urlImage, index, array) => {
    const container = document.querySelector(".slide-section")
    const div = document.createElement('div')
    div.classList.add('slide')
    div.id = filterUrl(urlImage)

    const indexBack = index == 0 ? array.length - 1 : index - 1 
    const slideBack = filterUrl(array[indexBack])

    const indexNext = index == array.length - 1 ? 0 : index + 1
    const slideNext = filterUrl(array[indexNext])

    div.innerHTML = `
            <div class="image-container">
                <a href="" class="close">&#10006;</a>
                <a href="#${slideBack}" class="navigation back">&#171;</a>
                <img src="${urlImage}" alt="">
                <a href="#${slideNext}" class="navigation next">&#187;</a>
            </div>
    `
    container.appendChild(div)
}

const renderGallery = (images) => images.forEach(createGalleryItem)
const renderSlide = (images) => images.forEach(createSlideItem)


document.querySelector('.search-container input').addEventListener('keypress', searchImages)