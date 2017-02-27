angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('Users', function($http, $q, $timeout) {
    return {
        getAll : function() {
            var deferred = $q.defer();
            $http.get('http://carbillet.net/api-digitalGrenoble/users/')
            .success(function(data,status){
                    deferred.resolve( data );
            })
            .error(function(data,status){
                deferred.reject('Nope');
            });
            return deferred.promise;
        },
        getOne: function(idUser, allUsers) {
          for (var i = 0; i < allUsers.users.length; i++) {
            if (allUsers.users[i].idUser === idUser) {
                return allUsers.users[i];
            }
          }
          return null;
      },

        login : function() {
            var deferred = $q.defer();
            var login = {
                            json:{
                              "username": "josselin.perez",
                              "password": "josselin"
                            }
                        }
            $http.post('http://carbillet.net/api-digitalGrenoble/credentials/',login)
            .success(function(login,status){
                console.log('connected');
                return deferred.resolve(login);
            })
            .error(function(login,status){
                deferred.reject('Not connected !');
            });
            return deferred.promise;
        },

        save : function(data) {
            var deferred = $q.defer();
            $http.put('http://carbillet.net/api-digitalGrenoble/users/',data)
            .success(function(data,status){
                // $timeout(function () {
                    deferred.resolve( data );
                // },50, false);
            })
            .error(function(data,status){
                deferred.reject('Nope');
            });

            return deferred.promise;
        }
    };
    // return {
    //     all: function() {
    //         return users;
    //     }
    // };
})



.factory('updateUser', function($http,$q) {
    return {

    }
});
