"use strict"

//<a href="#img1" class="gallery-items">
//    <img src="./img/img1.jpg" alt="">
//</a>

const images = [
    "./img/img1.jpg",
    "./img/img2.jpg",
    "./img/img3.jpg",
    "./img/img4.jpg",
    "./img/img5.jpg",
    "./img/img6.jpg",
    "./img/img7.jpg",
    "./img/img8.jpg",
    "https://riclan.com.br/wp-content/uploads/2019/10/pasted-image-0-1.png"
]

const filterUrl = urlImage => {
    const lastBar = urlImage.lastIndexOf('/') + 1
    const lastDot = urlImage.lastIndexOf('.') 
    return urlImage.substring(lastBar, lastDot)
}

const createGalleryItem = (urlImage) => {
    const htmlGalleryConteiner = document.querySelector(".gallery-section")

    const link = document.createElement('a')
    link.href = `#${filterUrl(urlImage)}`
    link.classList.add("gallery-items")
    link.innerHTML = `<img src="${urlImage}" alt="">`
    htmlGalleryConteiner.append(link)
}

const createSlideItem = (urlImage, index, array) => {
    const conteiner = document.querySelector(".slide-section")
    const div = document.createElement('div')
    div.classList.add('slide')
    div.id = filterUrl(urlImage)

    const indexBack = index == 0 ? array.length - 1 : index - 1 
    const slideBack = filterUrl(array[indexBack])

    const indexNext = index == array.length - 1 ? 0 : index + 1
    const slideNext = filterUrl(array[indexNext])

    div.innerHTML = `
            <div class="image-conteiner">
                <a href="" class="close">&#10006;</a>
                <a href="#${slideBack}" class="navigation back">&#171;</a>
                <img src="${urlImage}" alt="">
                <a href="#${slideNext}" class="navigation next">&#187;</a>
            </div>
    `
    conteiner.appendChild(div)
}

const renderGallery = (images) => images.forEach(createGalleryItem)
const renderSlide = (images) => images.forEach(createSlideItem)


renderGallery(images)
renderSlide(images)

