angular.module('myApp.routers', [ 'ngAnimate', 'ui.router' ]).config(
		function($stateProvider, $urlRouterProvider) {

			$stateProvider
			
			.state('labelle', {
				url : '/labelle',
				templateUrl : 'labelle-router.html',
				controller : 'LabelleController'
			})
			
			.state('labelle.overview', {
				url : '/overview',
				templateUrl : 'overview.html'
			})
			
			.state('labelle.menu', {
				url : '/menu',
				templateUrl : 'menu.html'
			})
			
			.state('labelle.review', {
				url : '/review',
				templateUrl : 'review.html'
			})
			
			.state('labelle.photos', {
				url : '/photos',
				templateUrl : 'photos.html'
			})
			
			.state('labelle.order', {
				url : '/order',
				templateUrl : 'form-order.html'				
			})

			.state('labelle.success', {
				url : '/success',
				templateUrl : 'form-success.html'				
			})
			
			.state('labelle.maintenance', {
				url : '/maintenance',
				templateUrl : 'maintenance.html'				
			});
			
			$urlRouterProvider.otherwise('/labelle/overview');
		});

		angular.module('myApp').config([ '$httpProvider', function($httpProvider) {
			$httpProvider.interceptors.push(function($q, $location) {
				return {
					'requestError' : function(rejection) {
						// handle same as below
					},
		
					'responseError' : function(rejection) {
						//TODO - need to catch only if 404
						if(rejection.status == -1 || rejection.status == 404){
							$location.path('/labelle/maintenance');                
			            }
						// !!Important Must use promise api's q.reject()
						// to properly implement this interceptor
						// or the response will go the success handler of the caller
						
						return $q.reject(rejection);
					}
				};
			});
		} ]);