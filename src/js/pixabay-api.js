const API_KEY = "46813790-fc5a4239c1de7fc02896691e1";
const BASE_URL = "https://pixabay.com/api/"


export function fetchData(searchData) {
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