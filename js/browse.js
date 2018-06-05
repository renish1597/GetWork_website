var app = angular.module("myapp", []);
app.controller('browseTaskCtrl',['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
	browseAllTask();
	$scope.user = "Admin";
		function browseAllTask() {
				$rootScope.loaderIndicator = true;
			$rootScope.isLogin = false;
			$http.get('http://localhost:3000/task')
				.then(function (response){
						$scope.taskList = response.data
						console.log("TEST",$scope.taskList);
						$rootScope.loaderIndicator = false;
				});
		};
}]);
