//signin controller
  //signin function attached to scope
  //trigger Auth.signin

angular.module('app.auth', [])

.controller('AuthController', ['$scope', 'Auth', function($scope, Auth){

  $scope.signin = function(){
    Auth.signin();

  }

}])
