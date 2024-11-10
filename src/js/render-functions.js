const loader = document.querySelector(".loader");

export function createMarkup(arr) {
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

export function showLoader() {
    loader.style.display = "block";
}

export function hideLoader() {
    loader.style.display = "none";
}