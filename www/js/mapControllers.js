angular.module('starter.mapControllers', ['ui-leaflet','google.places'])

.controller("MapCtrl",function($scope, Users, $stateParams, $cordovaGeolocation, loc) {
    var rad = function(x) {
      return x * Math.PI / 180;
    };

    var getDistance = function(p1, p2) {
      var R = 6378137; // Earth’s mean radius in meter
      var dLat = rad(p2.latitude - p1.lat);
      var dLong = rad(p2.longitude - p1.lng);
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1.lat)) * Math.cos(rad(p2.latitude)) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      return Math.round(d/1000); // returns the distance in kilometer
    };

    markers = [];
    $scope.users = Users.getAll().then(function(users){
        $scope.users = users.users;
        for (var i=0;i<$scope.users.length;i++){
            if($scope.users[i].position !== null) {
                if($scope.users[i].position.lat !== null && $scope.users[i].position.lng !== null){
                    markers.push({
                        message: '<a ui-sref="tab.profil({idUser:' + $scope.users[i].idUser + '})">' + $scope.users[i].name + ' ' + $scope.users[i].lastname + '</a> <br/> est à ' + getDistance($scope.users[i].position,loc.coords) + ' km de vous',
                        lat: $scope.users[i].position.lat,
                        lng: $scope.users[i].position.lng,
                        zoom: 12,
                        icon: {
                            iconUrl: 'img/leaf-red.png',
                            shadowUrl: 'img/leaf-shadow.png',
                             iconSize:     [38, 95], // size of the icon
                            shadowSize:   [50, 64], // size of the shadow
                            iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                            shadowAnchor: [4, 62],  // the same for the shadow
                            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
                        }
                    });
                }
            }
        }

    $scope.markers = markers;
    }, function(msg){
        alert(msg);
    });

    var tilesDict = {
        openstreetmap: {
            url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            options: {
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }
        },
        opencyclemap: {
            url: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
            options: {
                attribution: 'All maps &copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, map data &copy; <a href="http://www.openstreetmap.org">OpenStreetMap</a> (<a href="http://www.openstreetmap.org/copyright">ODbL</a>'
            }
        },
        mapbox_outdoors: {
            name: 'Mapbox Outdoors',
            url: '//api.mapbox.com/styles/v1/{user}/{mapId}/tiles/256/{z}/{x}/{y}?access_token={apiKey}',
            type: 'xyz',
            options: {
                user: 'alpenyeti',
                apiKey: 'pk.eyJ1IjoiYWxwZW55ZXRpIiwiYSI6ImNpeDBobzk5dzAwYjQydHBoZjFtMTFkdm8ifQ.scAU-FebAaR8EEyVCsuBAA',
                mapId: 'citng3g0g003s2it88y9lg769'
            }
        },
        mapbox_satellite: {
            name: 'Mapbox Wheat Paste',
            url: '//api.mapbox.com/styles/v1/{user}/{mapId}/tiles/256/{z}/{x}/{y}?access_token={apiKey}',
            type: 'xyz',
            options: {
                user: 'alpenyeti',
                apiKey: 'pk.eyJ1IjoiYWxwZW55ZXRpIiwiYSI6ImNpeDBobzk5dzAwYjQydHBoZjFtMTFkdm8ifQ.scAU-FebAaR8EEyVCsuBAA',
                mapId: 'citngqecv00362hphvm5m7myb'
            }
        }
    };

    angular.extend($scope, {
        // tiles: tilesDict.opencyclemap,
        center: {
            lat:$stateParams.user.position.lat,
            lng:$stateParams.user.position.lng,
            zoom:$stateParams.zoom
        },
        markers: {},
        tiles:tilesDict.Opencyclemap
    })

    $scope.locate = function(){
        $scope.center.lat  = loc.coords.latitude;
        $scope.center.lng = loc.coords.longitude;
        $scope.center.zoom = 12;
    };
})
