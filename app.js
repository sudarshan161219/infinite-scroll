const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready = false
let imagesLoaded = 0
let totalImages = 0
let photosArray = [];

// unsplash api
const count = 30
const apiKey = 'yobLbQ0Q0C8hv4lGGdDoZKJ_7fNVe0Eulk9rRtPBv48'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

function imageLoaded() {
    imagesLoaded++
    if(imagesLoaded === totalImages) {
        ready = true
        loader.hidden = true
    }
}

//Create Element for Links and Photos 
function displayPhotos() {
    imagesLoaded = 0
    totalImages = photosArray.length
    //Run Function for each object in photoArray
    photosArray.forEach((photo) => {
        // Create <a></a> to link unsplash
        const item = document.createElement('a')
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })

        //Create image for photo
        const img = document.createElement('img')
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })

        img.addEventListener('load', imageLoaded)

        // put <img> inside  <a>
        item.appendChild(img)
        imageContainer.appendChild(item)
    })
}


//Get Photos from Unsplash Api'
async function getPhotos() {
    try {
        const response = await fetch(apiUrl)
        photosArray = await response.json()
        // console.log(photosArray);
        displayPhotos()

    } catch (error) {
        console.log(error);
    }
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready)  {
        ready = false
        getPhotos()
    }
})

getPhotos()
