angular.module('starter.controllers', [])

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
    angular.extend($scope, {
        center: {
            lat:45.182278829823446,
            lng:5.730400085449219,
            zoom:12
        }
    });
})


.controller('AccountCtrl', ['$scope','Users', function($scope, Users) {
  $scope.settings = {
    enableFriends: false
  };
  $scope.users = Users.all().then(function(users){
      $scope.users = users.users;
  }, function(msg){
      alert(msg);
  });
}]);
