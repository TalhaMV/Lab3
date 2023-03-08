mapboxgl.accessToken = 'pk.eyJ1IjoidGFsaGF2IiwiYSI6ImNsZG0wdno1MDA0dHMzb2tiNDc5YnFzcm0ifQ.QrkOG_mZti52bYP2Usy-MA'

const map = new mapboxgl.Map({

    container: 'map',

    style: 'mapbox://styles/talhav/cle0a9fvt004d01qwzhe941ll',

    center: [-79.39830123888215, 43.664695891060376], 

    zoom: 12,

});

map.addSource('streetcarstops', {
    type: 'vector',
    url: 'mapbox://talhav.6g3w7l9x'
});

map.map.addLayer({
    'id': 'stops',
    'type': 'circle',
    'source': 'streetcarstops',
    'source-layer': 'streetcarstops-bfbajq',
    'paint': {
    'circle-radius': 10,
    'circle-color': 'red'
}
})