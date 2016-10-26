var restUrl = "http://localhost:8080/macService/snsService/"
/*var restUrl = "https://webservices.vtms.taxi.vic.gov.au/tscGateway/tscMptp/"*/
	
//var dcRestUrl = "http://localhost:8080/tscGateway/dcmedicalform/"

var mod = angular.module('myApp.services', [ 'ngResource', 'ui.select',
		'ngSanitize', /*'mgcrea.ngStrap',*/ 'ui.bootstrap', 'ngRoute' ]);
/** GET * */
/*mod.factory('RetreiveDcDetail', function($resource) {
	return $resource(restUrl + 'retreiveDcDetail/:dcNumber', {
		dcNumber : "@dcNumber"
	}, {
		'query' : {
			isArray : false
		}
	})
});

mod.factory('GetDiagnoses', function($resource) {
	return $resource(restUrl + 'diagnoses', {}, {
		'query' : {
			isArray : true
		}
	})
});*/

/*mod.factory('GetTitles', function($resource) {
	return $resource(restUrl + 'titles', {}, {
		'query' : {
			isArray : true
		}
	})
});*/

mod.factory('GetFoodTypes', function($resource) {
	return $resource(restUrl + 'foodTypes', {}, {
		'query' : {
			isArray : true
		}
	})
});

/** POST * */
mod.factory('MacOrderService', function($resource) {
	return $resource(restUrl + "create", {}, {
		get : {
			method : "GET",
			params : {
				productId : "-1",
				isArray : false
			}
		},
		save : {
			method : "POST", withCredentials: true
		}
	});
});

//mod.factory('GetToken', function($resource) {
//	return $resource(restUrl + 'token', {}, {
//		'query' : { withCredentials: true }
//	})
//});