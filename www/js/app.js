// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.mapControllers', 'starter.services','ui-leaflet','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
      cordova.plugins.geolocation.getCurrentLocation().then(success, error);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$httpProvider) {
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'; $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

    .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

    .state('tab.map', {
      cache:false,
      url: '/map',
      views: {
        'tab-map': {
          templateUrl: 'templates/tab-map.html',
          controller: 'MapCtrl'
        }
      },
      resolve: {
          loc : function($cordovaGeolocation){
            return $cordovaGeolocation.getCurrentPosition();
          }
      },
      params: {
          user:{position:{lat:45.182278829823446,lng:5.730400085449219}},
          zoom:12
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('tab.eval', {
      url: '/eval',
      views: {
          'tab-eval': {
              templateUrl: 'templates/tab-eval.html',
              controller: 'EvalCtrl'
          }
      }
  })

  .state('tab.profil', {
    url: '/profil/:idUser',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-profil.html',
        controller: 'ProfilCtrl'
      }
    },
    resolve: {
        user:   function(Users,$stateParams) {
                    return Users.getAll().then(function(allUsers){
                        return Users.getOne($stateParams.idUser, allUsers);
                    })
                }
    }
})

    .state('tab.edit', {
      url: '/profil/:idUser/edit',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-edit.html',
          controller: 'ProfilCtrl'
        }
    },
    resolve: {
        user:   function(Users,$stateParams) {
                    return Users.getAll().then(function(allUsers){
                        return Users.getOne($stateParams.idUser, allUsers);
                    })
                }
    }
    })

    .state('tab.update', {
      url: '/profil/:idUser',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-profil.html',
          controller: 'ProfilCtrl'
        }
      },
        resolve: {
            user:   function(Users,$stateParams) {
                console.log($stateParams.user);
                    if($stateParams.user == null){
                        // console.log('wut');
                        return Users.getAll().then(function(allUsers){
                            return Users.getOne($stateParams.idUser, allUsers);
                        })
                    } else {
                        // console.log('bite');
                        return $stateParams.user;
                    }
            }
        },
        params: {
            user:{}
        }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/account');
  function runBlock($rootScope) {
   angular.extend($rootScope, {
     center: {},
     markers: {},
   });
 }
});
