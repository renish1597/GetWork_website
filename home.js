	var app = angular.module("myapp", []);
	app.controller("myCtrl", function ($scope, $http, $rootScope){
		init();
		$rootScope.isLogin = false;
			$http.get('blogList.json')
				.then(function (response){
						$scope.blogList = response.data
					});

				function init()
		{
				$(document).ready(function () {
						$('.owl-carousel.home-banner').owlCarousel({
								items: 1,
								animateOut: 'fadeOut',
								loop: true,
								margin: 0,
								responsive: true,
								nav: false,
								autoplay: true,
								autoPlaySpeed: 3000,
								autoPlayTimeout: 3000,
								autoplayHoverPause: true
						});

						$('.owl-carousel').owlCarousel({
								loop: true,
								margin: 10,
								responsiveClass: true,
								responsive: {
										0: {
												items: 1,
												nav: true
										},
										600: {
												items: 2,
												nav: false
										},
										1000: {
												items: 3,
												nav: true,
												loop: false,
												margin: 20
										}
								}
						})
				})
		}
	});
