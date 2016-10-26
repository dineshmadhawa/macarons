angular.module('myApp.controllers',[ 'ngAnimate', 'myApp.services' ])
		/*
		 * .config(['$httpProvider', function($httpProvider) {
		 * $httpProvider.defaults.withCredentials = true; }])
		 */
//		.run(function($http, GetToken) {
//			GetToken.query({}, function(response) {
//				$http.defaults.headers.common.Authorization = response.value;
//			})
//		})
		/*
		 * .run(['$http', '$cookies', function($http, $cookies) {
		 * $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken; }])
		 */
		.controller(
				'LabelleController',
				[
					'$scope',
					'$http',
					'$state',
					'$window',
					'$filter',
					'$uibModal',
					'$log',
					'GetFoodTypes',
					'MacOrderService',
				function($scope, $http, $state, $window, $filter,
						$uibModal, $log, GetFoodTypes ,
						MacOrderService) {

					$scope.macronOrder = {};

					$scope.images = [ {
								src : 'macwhite1.jpg',
								title : 'Pic 1'
							}, {
								src : 'macwhite2.jpg.jpg',
								title : 'Pic 2'
							}, {
								src : 'img3.jpg',
								title : 'Pic 3'
							}, {
								src : 'img4.png',
								title : 'Pic 4'
							}, {
								src : 'img5.png',
								title : 'Pic 5'
							} ]; 
					
//					$scope.myInterval = 3000;
//					  $scope.slides = [
//					    {
//					      image: 'http://lorempixel.com/400/200/'
//					    },
//					    {
//					      image: 'http://lorempixel.com/400/200/food'
//					    },
//					    {
//					      image: 'http://lorempixel.com/400/200/sports'
//					    },
//					    {
//					      image: 'http://lorempixel.com/400/200/people'
//					    }
//					  ];
					
//					$scope.foodTypes = [ {
//					   "id" : "MAC" , "name" : "Macarons",
//					    "flavors": [{"code" : "STR" , "name" : "Strawberry"}, {"code" : "LMN" , "name": "Lemon"}, {"code" : "CHO" , "name" : "Chocolate"}]
//					},  {
//						   "id" : "CUP" , "name" : "Cup Cakes",
//						    "flavors": [{"code" : "ALD" , "name" : "Almond"}, {"code" : "SLC" , "name": "Salted Caramel"}, {"code" : "OBL" , "name" : "Orange Blossom"}]
//						}];
					
					//form fields validation
					
					$scope.foodlist = {};
					GetFoodTypes.query({}, function(response) {
						$scope.foodlist.foodTypes = response;
					});
					
					$scope.resetflavorsDropDown = function() {
						if ($scope.macronOrder.typeMacaron)
							$scope.macronOrder.typeMacaron.code = "";
					}
					
					$scope.macronOrder.orderItems = [];
					$scope.macronOrder.totalCost = "";
						
					$scope.macronPrice = "1.25";
					$scope.cupCakePrice = "1.50";
					
					$scope.priceValue = "";
					$scope.totalCost = "";
					
					$scope.ftype = "";
					$scope.fitemName = "";
					
					$scope.addItem = function() {
						
					if($scope.macronOrder.foodType.id != ""){
							$scope.ftype = $scope.getFoodCategoryName($scope.macronOrder.foodType.id);
							if($scope.macronOrder.typeMacaron.id != ""){
								$scope.fitemName = $scope.getFoodItemName($scope.macronOrder.foodType.id, $scope.macronOrder.typeMacaron.id);
							}
							
							if($scope.ftype == 'Macarons'){
								$scope.priceValue = $scope.macronPrice;
							}else{
								$scope.priceValue = $scope.cupCakePrice;
							}
						}
						
						$scope.totalCost = $scope.macronOrder.typeMacaron.qty * $scope.priceValue;
						$scope.priceValue = "";
						
						var macron = {
							name : $scope.ftype + "-"+$scope.fitemName,
							qty : $scope.macronOrder.typeMacaron.qty,
							price : $scope.totalCost,
						};
					
					$scope.macronOrder.orderItems.push(macron);
					$scope.totalCost = "";
					$scope.ftype = "";
					$scope.fitemName = "";
					}; 
					
					
					// get food category name by ID
					$scope.getFoodCategoryName = function(food_cat_id) {
						var foodCategoryItem = $filter('getById')(
								$scope.foodlist.foodTypes, food_cat_id);
						console.log(foodCategoryItem);
						/*
						 * $scope.selected =
						 * JSON.stringify(categoryItem.name);
						 */
						return foodCategoryItem.name;
					}

					// get food item name by ID
					$scope.getFoodItemName = function(food_cat_id,
							food_item_id) {
						var result = [];
						/*
						 * alert('hi -' + 'categoryId-' + categoryId +" " +
						 * 'diagnosis_id ' + diagnosis_id)
						 */
						angular.forEach($scope.foodlist.foodTypes,
								function(foodCategory, index) {
									if (foodCategory.id == food_cat_id) {
										result = foodCategory.foodItems;
										// console.log("Items found : "
										// +
										// category.items);
									}
								});
						var len = result.length;
						if (len > 0) {
							var foodItem = $filter('getById')(
									result, food_item_id);
							console.log(foodItem);
							return foodItem.name;
						} else {
							return "";
						}

					}

					
					$scope.removeMacron = function(index){
						$scope.macronOrder.orderItems.splice(index, 1);
					  };
					  
					  
					  $scope.total = function() {
					        var total = 0;
					        angular.forEach($scope.macronOrder.orderItems, function(item) {
					            total += item.price;
					        })
					        $scope.macronOrder.totalCost = total;
					        return total;
					    }
					
					  
					  $scope.orderConfirm = function() {
						  
						  if ($scope.macronOrder.customer && $scope.macronOrder.customer.telephone) {
								if ($scope.numbersonly($scope.macronOrder.customer.telephone)) {
									$scope.phoneNumberError = false;
								} else {
									$scope.phoneNumberError = true;
									return false;
								}
							}
						  
						  if ($scope.macronOrder) {
								if ($scope.checkDateIsValid($scope.macronOrder.deliveryDate)) {
									$scope.errordeliveryDate = false;
								} else {
									$scope.errordeliveryDate = true;
									return false;
								}
							}
						  
//						  alert("confirm");
						  $state.go('labelle.order');
					  }

					var originalApplication = angular.copy($scope.macronOrder);
					$scope.resetForm = function() {
						if ($window.confirm('Are you sure you want to clear the form?')) {
							$scope.macronOrder = angular.copy(originalApplication);
							$scope.macrequestform.$setPristine();
							$scope.macrequestform.$setUntouched();
						}
					}
					
					$scope.confirmResetAction = function(size) {
						var modalInstance = $uibModal
								.open({
									animation : $scope.animationsEnabled,
									templateUrl : 'validationModalContent.html',
									controller : 'ModalInstanceCtrl',
									size : size,
									resolve : {
										items : function() {
											return $scope.items;
										}
									}
								});

						modalInstance.result.then(
								function(selectedItem) {
									// TODO - Reset the form
									$state.go('labelle.menu', {},
											{
												reload : true
											});
									/*
									 * var originalApplication =
									 * angular.copy($scope.application);
									 * $scope.application =
									 * angular.copy(originalApplication);
									 * $scope.appform.$setPristine();
									 * $scope.appform.$setUntouched();
									 */
								}, function() {
									$log.info('Modal dismissed at: '
											+ new Date());
								});
					};

//					$scope.token = {};
//					GetToken
//							.query(
//									{},
//									function(response) {
//										$http.defaults.headers.post['X-XSRF-TOKEN'] = response.value;
//									});
					
					 $scope.stepsModel = [];

					    $scope.imageUpload = function(event){
					         var files = event.target.files; //FileList object
					         
					         for (var i = 0; i < files.length; i++) {
					             var file = files[i];
					                 var reader = new FileReader();
					                 reader.onload = $scope.imageIsLoaded; 
					                 reader.readAsDataURL(file);
					               /*  alert('File Name - : ' + file.name);*/
					         }
					    }

					    $scope.imageIsLoaded = function(e){
					        $scope.$apply(function() {
					            $scope.stepsModel.push(e.target.result);
					        });
					    }
					    
						$scope.file = null;
						  $scope.clear = function() {
						    $scope.file = null;
						  };
						  
					$scope.create = function() {
						$state.go('labelle.menu', {}, {
							reload : true
						});
					};
					
					$scope.error = '';
					$scope.refNumber = '';
					$scope.phoneNumberError = false;
					
					$scope.errordeliveryDate = false;
					
					$scope.$watch('macronOrder.customer.telephone', function(
							newValue, oldValue) {
						$scope.phoneNumberError = false;
						// console.log('dob changed', oldValue,
						// newValue);
					}, true);
					
					$scope.$watch('macronOrder.deliveryDate',
							function(newValue, oldValue) {
								$scope.errordeliveryDate = false;
								// console.log('dob changed', oldValue,
								// newValue);
							}, true);
					
					$scope.checkDateIsValid = function(value) {
						// regular expression to match required date
						// format
						re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;

						if (value != '' && !value.match(re)) {
							/* alert("Invalid date format: "+ value); */
							/* applicantDOB.focus(); */
							return false;
							/* $scope.dateFormatted = false; */
						} else if(value != '' && value.split("/")[2] < ((new Date()).getFullYear() - 100) || value.split("/")[2] > (new Date()).getFullYear()){
							return false;
						} else{
							/* alert("DOB have been validated!"); */
							/* $scope.dateFormatted = true; */
							return moment(value, "DD/MM/YYYY")
									.isValid();
						}
					}
					
					$scope.numbersonly = function(value) {
						var reg = /^\d+$/;
						if (value != '' && !value.match(reg)) {
							return false;
						} else {
							return true;
						}
					}
					
					$scope.macOrder = {};	
					$scope.addToInvoice = function(macronOrder) {
						alert('click Add order !!');
						$scope.macOrder = angular.copy(macronOrder);
						if($scope.macOrder){
							 console.log("type selected : " + $scope.macOrder.macList.typeMacaron);
		                	 console.log("qty selected : " + $scope.macOrder.macList.qty);
						}
					};
					
					$scope.submitMacForm = function() {
						
						$scope.submitted = true;
						console.log("--> Submitting form :-" + angular.toJson($scope.macronOrder));
						console.log("-->DC TEST!");
											
						if ($scope.macrequestform.$invalid)
							return false;
						
						MacOrderService.save($scope.macronOrder,
												function(data) {
													$state.go('labelle.success');
													if (data && data.name == 'refNumber') {
														$scope.refNumber = data.value;
													}
													console.log('redirecting - from callback to the success page !');
												},
												function(err) {
													if (err) {
														$scope.error = 'Failed to create new application.';
														$state.go('labelle.success');
													}
												});
					};

				}])
		.controller('ModalInstanceCtrl', function($scope, $uibModalInstance) {
			$scope.ok = function() {
				$uibModalInstance.close();
			};

			$scope.cancel = function() {
				$uibModalInstance.dismiss('cancel');
			};
		})
		.directive(
				'datepicker',
				function() {
					return {
						require : 'ngModel',
						link : function(scope, el, attr, ngModel) {
							$(el).datepicker(
											{
												dateFormat : 'dd/mm/yy',
												onSelect : function(dateText) {
													var v = $(this).val(), d = new Date(v);
													if (v.length > 0) {
														$('p#out').text(d.valueOf()+ ' divided by 1000 is '+ (d.valueOf() / 1000));
													} else {
														$('p#out').text('No date selected');
													}
													scope.$apply(function() {
																ngModel.$setViewValue(dateText);
																$(".datepicker").hide();
															});
												},
												changeMonth : true,
												changeYear : true,
												maxDate : "-16Y",
												minDate : "-120Y",
												yearRange : "-120:-16"
//												defaultDate : new Date()
											});
						}	
					};
				}).directive('inputMaxLengthNumber', function() {
					return {
						require : 'ngModel',
						restrict : 'A',
						link : function(scope, element, attrs, ngModelCtrl) {
							function fromUser(text) {
								var maxlength = Number(attrs.maxlength);
								if (String(text).length > maxlength) {
									ngModelCtrl.$setViewValue(ngModelCtrl.$modelValue);
									ngModelCtrl.$render();
									return ngModelCtrl.$modelValue;
								}
								return text;
							}
							ngModelCtrl.$parsers.push(fromUser);
						}
					};
				}).directive('slider', function ($timeout) {
					  return {
						    restrict: 'AE',
							replace: true,
							scope:{
								images: '='
							},
						    link: function (scope, elem, attrs) {
							
								scope.currentIndex=0;

								scope.next=function(){
									scope.currentIndex<scope.images.length-1?scope.currentIndex++:scope.currentIndex=0;
									console.log(scope.currentIndex);
								};
								
								scope.prev=function(){
									scope.currentIndex>0?scope.currentIndex--:scope.currentIndex=scope.images.length-1;
								};
								
								scope.$watch('currentIndex',function(){
									scope.images.forEach(function(image){
										image.visible=false;
									});
									scope.images[scope.currentIndex].visible=true;
								});
								
//								 Start: For Automatic slideshow
								
								var timer;
								
								var sliderFunc=function(){
									timer=$timeout(function(){
										scope.next();
										timer=$timeout(sliderFunc,5000);},5000);
								};
								
								sliderFunc();
								
								scope.$on('$destroy',function(){
									$timeout.cancel(timer);
								});
								
//								 End : For Automatic slideshow
								
						    },
							templateUrl:'templateurl.html'
						  }
						}).directive('myDir', function () {
						    return {
						        restrict: 'A',
						        scope: true,
						        link: function (scope, element, attrs) {

						            function functionToBeCalled () {
						                console.log("It worked!");
						                if(scope.macronOrder){
						                	 console.log("type selected : " + scope.macronOrder.macList.typeMacaron);
						                	 console.log("qty selected : " + scope.macronOrder.macList.qty);
						                }
						            }
						            
						            element.on('click', functionToBeCalled);
						        }
						    };
						}).filter('diagnosisFilter', [ function() {
			return function(categories, categoryId) {
				var result = [];

				angular.forEach(categories, function(category, index) {
					if (category.id == categoryId) {
						result = category.items;
						// console.log("Items found : " +
						// category.items);
					}
				});
				// console.log(result);
				return result;
			};
		} ]).filter('foodsFilter', [ function() {
			return function(foodTypes, foodTypeId) {
				var result = [];

				angular.forEach(foodTypes, function(foodType, index) {
					if (foodType.id == foodTypeId) {
						result = foodType.foodItems;
					}
				});
				// console.log(result);
				return result;
			};
		} ]).filter('getById', function() {
			return function(input, id) {
				var i = 0, len = input.length;
				for (; i < len; i++) {
					if (+input[i].id == +id) {
						return input[i];
					}
				}
				return null;
			}
		}).filter('true_false', function() {
			return function(text, length, end) {
				if (text) {
					alert('text true = ' + text)
					return 'Yes';
				}
				alert('text false = ' + text)
				return 'No';
			}
		});
