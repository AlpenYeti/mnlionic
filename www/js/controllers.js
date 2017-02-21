angular.module('starter.controllers', ['ui-leaflet'])

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


.controller("MapCtrl",function($scope, Users) {
    markers = [];
    $scope.users = Users.all().then(function(users){
        $scope.users = users.users;
        for (var i=0;i<$scope.users.length;i++){
            markers.push( {
                title: $scope.users[i].name,
                lat: $scope.users[i].position.lat,
                lng: $scope.users[i].position.lng,
                icon: {
                    iconUrl: '/img/leaf-red.png',
                    shadowUrl: '/img/leaf-shadow.png',
                     iconSize:     [38, 95], // size of the icon
                    shadowSize:   [50, 64], // size of the shadow
                    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                    shadowAnchor: [4, 62],  // the same for the shadow
                    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
                }
            });

        }
    $scope.markers = markers;
    }, function(msg){
        alert(msg);
    });

    angular.extend($scope, {
        center: {
            lat:45.182278829823446,
            lng:5.730400085449219,
            zoom:12
        },
        markers: {
        }
    })
})

.controller('AccountCtrl', ['$scope','Users', function($scope, Users) {
  $scope.settings = {
    enableFriends: true
  };
  $scope.users = Users.all().then(function(users){
      $scope.users = users.users;
  }, function(msg){
      alert(msg);
  });

}])
.controller('ProfilCtrl', function($scope, $stateParams, Users) {
    $scope.users = Users.get($stateParams.chatId);
});
