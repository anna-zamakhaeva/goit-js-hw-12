import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import "loaders.css/loaders.min.css"

// import { fetchData } from "./js/pixabay-api";
// import { createMarkup, showLoader, hideLoader } from "./js/render-functions";

const API_KEY = "46813790-fc5a4239c1de7fc02896691e1";
const BASE_URL = "https://pixabay.com/api/"

const form = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");


let galleryImage = new SimpleLightbox(".gallery a", {
    captionsData: "alt",
    captionDelay: 250,
    captionPosition: "bottom",
});


form.addEventListener("submit", handleSearch);

function handleSearch(event) {
    event.preventDefault();
    console.log(event.currentTarget.elements);
    
    showLoader();
    
    const searchData = event.currentTarget.elements.search.value;
    console.log(searchData);
    if (!searchData.trim()) {
        iziToast.show({
            message: "Sorry, there are no images matching your search query. Please try again!",
            position: "topRight",
            timeout: 5000,
            backgroundColor: "pink"
        })
        return;
        }

    fetchData(searchData)
        .then((data) => {
            console.log("then", data);
            gallery.innerHTML = createMarkup(data.hits);
            if (data.hits.length <= 0) {
                iziToast.show({
            message: "Sorry, there are no images matching your search query. Please try again!",
            position: "topRight",
            timeout: 5000,
            backgroundColor: "pink"
        })
            }
            galleryImage.refresh();
        })
        .catch(error => {
            console.log("catch", error);
            
        })
        .finally(() => hideLoader()
    )
    form.reset();
}

function fetchData(searchData) {
    const params = new URLSearchParams({
        key: API_KEY,
        q: searchData,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true
    })

    return fetch(`${BASE_URL}?${params}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json();   
        })
    
}

function createMarkup(arr) {
    return arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => `
        <li class="gallery-item">
            <div class="thumb">
            <a class="gallery-link" href="${largeImageURL}">
            <img class="gallery-image" src="${webformatURL}" alt="${tags}"/>
            </a>
            </div>
            <div class="image-card">
                <p><b>Likes</b> ${likes}</p> 
                <p><b>Views</b> ${views}</p> 
                <p><b>Comments</b> ${comments}</p> 
                <p><b>Downloads</b> ${downloads}</p> 
            </div>
        </li>
    `).join("")
}

function showLoader() {
    loader.style.display = "block";
}

function hideLoader() {
    loader.style.display = "none";
}

