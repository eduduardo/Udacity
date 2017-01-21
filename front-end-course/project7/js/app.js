'use strict' // use strict for avoid mistakes

var map; // global map var
var mapCenter = {
    'lat': -22.8860583,
    'lng': -47.0511767
};

var startLocations = [ // hardcoded places
    {
        'title': 'Parque Portugal',
        'lat': -22.8856425,
        'lng': -47.0550955,
        'foursquare_id': '4ba7cd59f964a520b1b439e3'
    }, {
        'title': 'Iguatemi Campinas',
        'lat': -22.8970789,
        'lng': -47.049105,
        'foursquare_id': '51c780dd498e59e2f981cc25'
    }, {
        'title': 'Miami Store',
        'lat': -22.8874547,
        'lng': -47.0475319,
        'foursquare_id': '4bc2194eb492d13a90f3a660'
    }, {
        'title': 'Puc Campinas',
        'lat': -22.8870794,
        'lng': -47.047458,
        'foursquare_id': '4fa26dcfe4b0d36f90181ae1'
    }, {
        'title': 'Cambuí Futebol Clube',
        'lat': -22.8875966,
        'lng': -47.0488521,
        'foursquare_id': '4bda207b63c5c9b6a3e02268'
    }
];

// Foursquare API documentation:
// https://developer.foursquare.com/
var foursquareClient = 'X1KCITA0JW5TX5NYSSV153ZUO4UKDKLNIN3XN0LTBFZPLKHZ';
var foursquareSecret = '20KETHYO3GHOGID1FZO2LPEQMO2LJDZPTVKSXYHJ2OT024LH';

var Place = function(data) { // model
    this.title = ko.observable(data.title);
    this.lat = ko.observable(data.lat);
    this.lng = ko.observable(data.lng);
    this.foursquareId = ko.observable(data.foursquare_id);
    this.visible = ko.observable(true);
    this.marker = ko.observable();

    // foursquare api datas
    this.address = '';
    this.rating = '';
    this.url = '';
    this.photo = '';
    this.contentInfo = '';
};

// pick some random pin marker color :)
function randomMarkerIcon(){
    var colors = ['blue', 'green', 'red', 'orange', 'purple', 'yellow'];
    var randIndex = Math.floor(Math.random() * colors.length);
    return "http://maps.google.com/mapfiles/ms/icons/"+ colors[randIndex] +"-dot.png";
}

var AppViewModel = function() {
    var self = this; // set global this
    this.listLocations = ko.observableArray([]);
    this.searchInput = ko.observable("");

    // init google maps
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: mapCenter
    });

    // global infowindow
    var infoWindow = new google.maps.InfoWindow();

    // populate the list ul with the locations hardcoded
    startLocations.forEach(function(place) {
        self.listLocations.push(new Place(place));
    });

    // let's put some stuff into the places, such marker, infowindow, events, etc.
    this.listLocations().forEach(function(place) {
        place.marker = new google.maps.Marker({
            position: new google.maps.LatLng(place.lat(), place.lng()), // google maps function for concatenate the position
            map: map,
            title: place.title(),
            animation: google.maps.Animation.DROP,
            icon: randomMarkerIcon()
        });

        place.showMarker = ko.computed(function() {
            if (place.visible()) {
                place.marker.setVisible(true);
            } else {
                place.marker.setVisible(false);
                infoWindow.close();
            }
        });

        // fire when user click on a item list
        // trigger google maps for show the marker
        place.bounce = function(place) {
            this.marker.setIcon(randomMarkerIcon());
            google.maps.event.trigger(this.marker, 'click');
        };

        // ajax request for foursquare API to get some info about the place
        // foursquare_id of the place needed
        // client_id and client_secret needed
        $.ajax({
            url: 'https://api.foursquare.com/v2/venues/' + place.foursquareId() +
            '?client_id=' + foursquareClient +
            '&client_secret=' + foursquareSecret + '&v=20130815',

            dataType: "json",
            success: function(data) {
                var result = data.response.venue;
                place.photo = result.bestPhoto.prefix + '110x110' + result.bestPhoto.suffix;
                place.url = result.canonicalUrl;
                place.address = result.location.formattedAddress.join('- ');
                place.rating = result.rating;

                place.contentInfo = "<div>" +
                    "<strong>" + place.title() + "</strong> - <a href='" + place.url + "'>(Foursquare Page)</a>" +
                    "<p><img src='" + place.photo + "' alt='location'></p>" +
                    "<p>Rating: " + place.rating + "</p>" +
                    "<p>Address: " + place.address + "</p>" + "</div>";
            },
            error: function(error) {
                place.contentInfo = "<h4>Foursquare data is unavailable :(</h4>";
            }
        });

        // link click event to infoWindow to open
        place.marker.addListener('click', function() {
            infoWindow.setContent(place.contentInfo);
            infoWindow.open(map, place.marker);
        });
    });

    // filter => 'keyup' run this function
    self.filterList = ko.computed(function() {
        var filter_search = self.searchInput();

        if (!filter_search) { // if user don't type nothing...
            self.listLocations().forEach(function(location) {
                location.visible(true);
            });
            return self.listLocations(); // return full list
        } else {
            return ko.utils.arrayFilter(self.filterList(), function(location) {
                var result = location.title().toLowerCase().indexOf(filter_search) >= 0; // search for a letter in the title, if >= 0 return true
                location.visible(result);
                return result;
            });
        }
    });
};

// google maps callback will inicialite this funciton
function AppStart() {
    ko.applyBindings(new AppViewModel());
}

// call when google maps cannot be loaded
function map_error() {
    alert("Ops! Google maps cannot be loaded, please refresh the page or get back later!");
}
