mapboxgl.accessToken = 'pk.eyJ1IjoidGFsaGF2IiwiYSI6ImNsZG0wdno1MDA0dHMzb2tiNDc5YnFzcm0ifQ.QrkOG_mZti52bYP2Usy-MA'

const map = new mapboxgl.Map({

    container: 'map',

    style: 'mapbox://styles/talhav/cle0a9fvt004d01qwzhe941ll',

    center: [-79.39830123888215, 43.664695891060376],

    zoom: 12,

});


map.on('load', () => {



    //Add datasource from GeoJSON

    map.addSource('streetcar', {

        type: 'geojson',

        data: 'https://raw.githubusercontent.com/TalhaMV/Lab3/main/streetcarstops.geojson'

        //'https://smith-lg.github.io/ggr472-wk6-demo/data/torontomusicvenues.geojson'

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

    map.addSource('college', {

        'type': 'vector',

        'url': 'mapbox://talhav.0d4na3al'

    });




    map.addLayer({

        'id': 'provterr-fill',

        'type': 'fill',

        'source': 'college',

        'paint': {

            'fill-color': '#000000',

            'fill-opacity': 0.5,

            'fill-outline-color': 'purple'

        },

        'source-layer': 'uoftcolleges-5imo5h'

    });


    map.on('click', 'scar', (e) => {
        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.name;
        const network = e.features[0].properties.netowrk;
        const position = e.features[0].properties.stop_position;


        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML("<h1> " + description + "</h1>" + "<br>" + decription + "<br>" + network + "<br>" + position)
            .addTo(map);
    });



});
