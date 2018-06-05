var myapp = angular.module("myapp", []);
myapp.controller ("signupCtrl",['$scope', '$http', function ($scope,$http)
	{
		$scope.createAccount=function()
		{
			console.log('test');
		var dataObj = {
			Email : $scope.user.email,
			Username : $scope.user.userName,
			Password : $scope.user.pass
		};
		$http.post('http://localhost:3000/posts',dataObj)
			.then(function(response) {
			return response.data
			console.log(data);
			$scope.message = "Success!!";
		});
	};
}]);

