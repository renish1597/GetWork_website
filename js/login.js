var myapp = angular.module("myapp", []);
myapp.controller ("loginCtrl",['$scope', '$http', '$rootScope', '$location', function ($scope,$http,$rootScope, $location)
	{
		$scope.login = function()
		{
			$http.get('http://localhost:3000/posts')
			.then(function (response){
				$scope.login = response.data
				console.log("Data",$scope.login);
				$rootScope.loaderIndicator = false;

				if($scope.login.find( user => user.Username == $scope.user.userName) && $scope.login.find( user => user.Password == $scope.user.Password)){
					$rootScope.isLogin = true;
					$rootScope.username = $scope.user.Username;
					console.log($rootScope.username);
					$location.path("/")
					console.log("INSIDE")
				}
			});
		}
}]);
