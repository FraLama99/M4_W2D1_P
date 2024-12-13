const API_KEY = '563492ad6f91700001000001b0ec30909a274fddaf88db2ac6d23e44';

document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const searchQuery = document.getElementById('searchInput').value;

    if (searchQuery) {
        fetchPhotos(searchQuery)
            .then(photos => {
                console.log(photos);
                let container = document.getElementById('containerCard');
                container.innerHTML = '';


                container.innerHTML = photos.map((photos) => {
                    return `
                       <div class="col">
                        <div class="card h-100 ">
                        <div class="card-header conImg">
                            <img src="${photos.src.large}" class="card-img-top img-thumbnail altImg" alt="${photos.alt}">
                        </div>
                             <div class="card-body">
                                <h5 class="card-title">Photographer: ${photos.photographer}</h5>
                                 <p class="card-text">${photos.alt}</p>
                             </div>
                             <div class="card-footer">
                                 <a href="${photos.url}" class="btn btn-outline-danger">View Photo</a>
                                <small class="text-body-secondary">Last updated 3 mins ago</small>
                             </div>
                         </div>
                     </div>
                    `;
                }).join('');

            })
            .catch(error => {
                console.error('Errore:', error.message);
                let container = document.getElementById('containerCard');
                container.innerHTML = '';
                container.innerHTML = `
                <div class="alert alert-danger">
                    Si è verificato un errore durante il caricamento delle foto
                </div>`;
            });
    }
});


function fetchPhotos(query) {
    return fetch(`https://api.pexels.com/v1/search?query=${query}`, {
        headers: {
            Authorization: API_KEY
        }
    })
        .then(response => response.json())
        .then(data => data.photos);
}

/*
FUNZIONA DA FARE PER AVERE MAGGIORI CONTROLLI CON LE PROMISE
function fetchPhotos(query) {
    if (!query || typeof query !== 'string') {
        return Promise.reject(new Error('Query parametro non valido'));
    }

    return fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}`, {
        headers: {
            Authorization: API_KEY
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (!data.photos) {
            throw new Error('Formato risposta non valido');
        }
        return data.photos;
    })
    .catch(error => {
        console.error('Errore durante il recupero delle foto:', error);
        throw error;
    });
} 
    */

/*
FORMATO RISPOSTA API
{
"id": 2014422,
"width": 3024,
"height": 3024,
"url": "https://www.pexels.com/photo/brown-rocks-during-golden-hour-2014422/",
"photographer": "Joey Farina",
"photographer_url": "https://www.pexels.com/@joey",
"photographer_id": 680589,
"avg_color": "#978E82",
"src": {
  "original": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg",
  "large2x": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "large": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "medium": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=350",
  "small": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&h=130",
  "portrait": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  "landscape": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  "tiny": "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280"
},
"liked": false,
"alt": "Brown Rocks During Golden Hour"
}
*/
