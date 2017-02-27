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

.controller('AccountCtrl', ['$scope','Users', '$state','$stateParams', '$http', function($scope, Users, $state,$stateParams,$http) {
$scope.users = [];
    $scope.doRefresh = function() {
      $http.get('http://carbillet.net/api-digitalGrenoble/users/')
       .success(function(data,status) {

         $scope.users = data.users;
       })
       .finally(function() {
         // Stop the ion-refresher from spinning
         $scope.$broadcast('scroll.refreshComplete');
       });
    };

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

.controller('ProfilCtrl', function($scope, Users, user, $state, $stateParams) {
    console.log(user);
    $scope.user = user;
    $scope.edit = function(idUser) {
        $state.go('tab.edit', {idUser: idUser});
    };
    $scope.see = function(user) {
        $state.go('tab.map', {user:user});
    };
    $scope.post = function(data){
        sentData = {json:
                    {
                        "idUser": parseInt(data.idUser),
                        "adress": data.adress.formatted_address,
                        "age": parseInt(data.age),
                        "phone": data.phone
                    }
                }
        Users.login().then(function() {Users.save(sentData)});
        $state.go('tab.update',{user:data, idUser:data.idUser});
        $scope.user = data;
    };
})
