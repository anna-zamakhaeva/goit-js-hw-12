import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import "loaders.css/loaders.min.css"

import { fetchData } from "./js/pixabay-api";
import { createMarkup, showLoader, hideLoader } from "./js/render-functions";


const form = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");


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
