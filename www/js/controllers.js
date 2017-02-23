angular.module('starter.controllers', ['ui-leaflet','google.places','ngMaterial'], function($mdThemingProvider) {
    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();
  })

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller("MapCtrl",function($scope, Users, $stateParams, $cordovaGeolocation, loc) {
    markers = [];
    $scope.users = Users.getAll().then(function(users){
        $scope.users = users.users;
        for (var i=0;i<$scope.users.length;i++){
            if($scope.users[i].position !== null) {
                if($scope.users[i].position.lat !== null && $scope.users[i].position.lng !== null){
                    markers.push({
                        message: '<a href="#/tab/profil/' + $scope.users[i].idUser + '">' + $scope.users[i].name + ' ' + $scope.users[i].lastname + '</a>',
                        lat: $scope.users[i].position.lat,
                        lng: $scope.users[i].position.lng,
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
    angular.extend($scope, {
        center: {
            lat:$stateParams.user.position.lat,
            lng:$stateParams.user.position.lng,
            zoom:12
        },
        markers: {}
    })
    console.log(loc);
    $scope.locate = function(){
        $scope.center.lat  = loc.coords.latitude;
        $scope.center.lng = loc.coords.longitude;
        $scope.center.zoom = 12;
    };
})

.controller('AccountCtrl', ['$scope','Users', '$state','$stateParams', function($scope, Users, $state,$stateParams) {
  $scope.settings = {
    enableFriends: true,
  };
  $scope.loading = true;
  $scope.users = Users.getAll().then(function(users){
    $scope.users = users.users;
    $scope.loading = false;

  }, function(msg){
        alert(msg);
        $scope.loading = false;
  });
  $scope.edit = function(idUser) {
      $state.go('tab.edit', {idUser: idUser});
  };
}])

.controller('ProfilCtrl', function($scope, user, $state, $stateParams) {
    $scope.user = user;
    $scope.edit = function(idUser) {
        $state.go('tab.edit', {idUser: idUser});
    };
    $scope.see = function(user) {
        $state.go('tab.map', {user:user});
    };
})

.controller('ProfilEditCtrl', function($scope, user, $state, $stateParams) {
    $scope.user = user;
    $scope.age = user.age;
    $scope.adress = user.adress;
    $scope.tel = user.phone;
});
