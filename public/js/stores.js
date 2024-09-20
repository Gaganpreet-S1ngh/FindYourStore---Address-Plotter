// Initialize map
const map = new maplibregl.Map({
    container: 'map',
    style: 'https://demotiles.maplibre.org/style.json', // stylesheet location
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 4 // starting zoom
});

// Add zoom and rotation controls to the map.
map.addControl(new maplibregl.NavigationControl());

// Sample store locations (lat, long)
const stores = [];

// Add markers to the map
function addMarkers(stores) {
    stores.forEach(function (store) {
        const el = document.createElement('div');
        el.className = 'marker';

        new maplibregl.Marker(el)
            .setLngLat(store.coordinates)
            .setPopup(new maplibregl.Popup({ offset: 25 }) // add popups
                .setText(store.name))
            .addTo(map);
    });
}

// Fetching stores from the API
async function getStores() {
    try {
        const res = await fetch("http://localhost:5001/stores/getStores");
        const data = await res.json();

        // Add API stores to the `stores` array
        data.stores.forEach(element => {
            const store = {
                coordinates: [element.location.coordinates[0], element.location.coordinates[1]],
                name: element.storeId
            };
            stores.push(store);  // Add the fetched stores to the array
        });

        // Add markers for all stores (both hardcoded and fetched ones)
        addMarkers(stores);

    } catch (error) {
        console.error('Error fetching stores:', error);
    }
}

// Zoom In/Out/Reset functionalities
function zoomIn() {
    map.zoomIn();
}

function zoomOut() {
    map.zoomOut();
}

function resetMap() {
    map.flyTo({
        center: [-74.5, 40],
        zoom: 4
    });
}

// Call the getStores function to fetch and display the data
getStores();
