angular.module('app.form', [])

.controller('FormController', ['$scope', 'Tickets', function ($scope, Tickets) {

	$scope.ticket = {};
	$scope.addTicket = function () {
		Tickets.addTicket($scope.ticket)
		.catch(function (err) {
			console.log(err);
		});
	}
	
}]);