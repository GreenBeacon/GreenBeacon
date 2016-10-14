//Queue controller

angular.module('app.queue', [])

.controller('QueueController', ['$scope', 'Tickets', function($scope, Tickets){

  //call getTickets from Tickets factory
  $scope.data = {};

  var initializeQueue = function() {
    Tickets.getTickets()
      .then(function(tickets){
        $scope.data.tickets = tickets;
      })
      .catch(function(error){
        console.error(error);
      })
  }

  initializeQueue();

}])