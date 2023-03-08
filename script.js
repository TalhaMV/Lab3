mapboxgl.accessToken = 'pk.eyJ1IjoidGFsaGF2IiwiYSI6ImNsZG0wdno1MDA0dHMzb2tiNDc5YnFzcm0ifQ.QrkOG_mZti52bYP2Usy-MA'

const map = new mapboxgl.Map({

    container: 'map',

    style: 'mapbox://styles/mapbox/navigation-night-v1',

    center: [-79.39830123888215, 43.664695891060376],

    zoom: 12,

});


map.on('load', () => {



    //Add datasource from GeoJSON

    map.addSource('streetcar', {

        type: 'geojson',

        data: 'https://raw.githubusercontent.com/TalhaMV/Lab3/main/streetcarstops.geojson'

    });



    map.addLayer({

        'id': 'scar',

        'type': 'circle',

        'source': 'streetcar',

        'paint': {

            'circle-radius': 3,

            'circle-color': 'red'

        }

    });

   

    map.addSource('neighborhood',{
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/TalhaMV/Lab3/main/neighborhood.geojson'

    });

    map.addLayer({
        'id': 'census',
        'type': 'fill',
        'source': 'neighborhood',
        'maxzoom': 11,
        'paint': {

            'fill-color': '#000000',

            'fill-opacity': 1,

            'fill-outline-color': 'purple'

        },
    })



    map.on('click', 'scar', (e) => {
        // Making popup correspond to individual coordinates of point, we are also making features of the points into variables.
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.name;
        const network = e.features[0].properties.network;
        const shelter = e.features[0].properties.shelter;


        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // This determines how the popup will look
        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML("<p2> " + "name:" + description + "</p2>" + "<br>" + "<p2>" + "network:" + network + "</p2>" + "<br>" + "<p2>" + "shelter:" + shelter + "</p2>")
            .addTo(map);
    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'scar', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'scar', () => {
        map.getCanvas().style.cursor = '';
    });


  // We will do a fly out to enable/disable our neighborhood filter
    const start = {
        center: [-79.39830123888215, 43.664695891060376], // // starting center in [lng, lat]
        zoom: 12,
    };

    const end = {
        center: [-79.6543, 43.5870],
        zoom: 10,
    };


    let isAtStart = true;

    document.getElementById('fly').addEventListener('click', () => {
        // Zoom out to show census tracts
        const target = isAtStart ? end : start;
        isAtStart = !isAtStart;


        map.flyTo({
            ...target,
            center: [-79.39830123888215, 43.664695891060376], //NE coordinates
            duration: 1000,
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
    });

});
