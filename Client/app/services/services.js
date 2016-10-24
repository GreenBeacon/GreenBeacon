//declare 'Auth' as factory
  //pass in $http object for requests

angular.module('app.services', [])

//Tickets factory
  //retrieves ticket objects from server via GET request
.factory('Tickets', ['$http', '$window', function($http, $window) {

  var getTickets = function() {
    return $http({
      method: 'GET',
      url: '/tickets'
    })
    .then(function(resp){
      console.log(resp)
      if (resp.data === 'failed') {
        $window.location = '/#/signin'
      }
      return resp;
    })
  };

  var addTicket = function (ticket) {
    console.log('inside addTicket ', ticket)
    return $http({
      method: 'POST',
      url: '/tickets',
      data: ticket
    });
  };

  var claimTicket = function (ticket) {
    return $http({
      method: 'PUT',
      url: '/claimed',
      data: ticket
    })
  }

  var eraseClaim = function (data) {
    return $http({
      method: 'POST',
      url: '/eraseClaim',
      data: data
    })
  }

    var solveTicket = function (ticket) {
    return $http({
      method: 'PUT',
      url: '/solved',
      data: ticket
    })
  }


    var unsolveTicket = function (ticket) {
    return $http({
      method: 'PUT',
      url: '/unsolved',
      data: ticket
    })
  }

  return {
    getTickets: getTickets,
    addTicket: addTicket,
    claimTicket: claimTicket,
    eraseClaim: eraseClaim,
    solveTicket: solveTicket,
    unsolveTicket: unsolveTicket
    

  }

}])


.factory('Auth', ['$http', '$window', function($http, $window){

  var signin = function() {
    $window.location = '/auth/github';
  }

  var signout = function () {
    $window.location = '/signout'
  }

  return {
    signin: signin,
    signout: signout
  }

}])
