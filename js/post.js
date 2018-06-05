var app = angular.module("myapp", ["ngRoute"]);

app.config(function ($routeProvider,$locationProvider){

	$locationProvider.hashPrefix('');
	$routeProvider
		.when("/info/:task.category", {
		templateUrl: "catering.html",
		controller: "postTaskController"
		});
});

app.controller('postTaskController', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope,$routeParams) {
		$scope.postTask = function()
		{
			console.log('test');
			var dataObj = {
			TaskTitle : $scope.task.Title,
			TaskType : $scope.task.Type,
			TaskDate : $scope.task.dateRequired,
			TaskCategory : $scope.task.category
		};
		$http.post('http://localhost:3000/task', dataObj).then(function(response) {
			return response.data
			console.log(data);
			$scope.postTaskForm = $routeParams.code;
	});

				$scope.postTaskForm.$setSubmitted(true);
				if ($scope.postTaskForm.$valid) {
				}
				else {
						$scope.errorMessageIndicator = true;
						$scope.message = "Please enter required fields";
				}
		}
		function resetData()
		{
				$scope.task = {};
				$scope.task.inspirationPhoto = [];
				if ($scope.postTaskForm) {
						$scope.postTaskForm.$submitted = false;
				}
		}
}]);
