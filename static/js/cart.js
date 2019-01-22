var app = angular.module('cart', []);
	app.controller('cartController', function($scope, $http){
		$scope.from = new Date();
		var oneDay = 24*60*60*1000;
		$scope.calculateTotalDay = function(){
			var minDay = new Date();
			minDayDD = $scope.from.getDate();
			minDayMM = $scope.from.getMonth() + 1;
			minDayYYYY = $scope.from.getFullYear();
			if(minDayDD < 10){
				minDayDD = '0' + minDayDD;
			}
			if(minDayMM < 10){
				minDayMM = '0' + minDayMM;
			}
			minDay = minDayYYYY + '-' + minDayMM + '-' + minDayDD;
			angular.element('#to').attr('min', minDay);
			$scope.quantity = Math.round(($scope.to - $scope.from)/oneDay + 2);
			if($scope.quantity < 1){
				$scope.quantity = 1;
			}
		}

		$scope.phoneNumber = /^\+?\d{10}$/;
		$scope.cartLine = [];
		$http.get("https://5c2c260dad36d90014f3425d.mockapi.io/abcxyz/order").then(function(response){
			$scope.cartLine = response.data;
		})

		$scope.gettotal = function(quantity, i){
			var qk = quantity*i.price;
			i.amountLine = qk;
		}
		$scope.total = function(){
			var total = 0;
			for (var i =0; i < $scope.cartLine.length; i++){
				total += $scope.cartLine[i].amountLine;
			}
			$scope.amount = total;
			return total;
		}
		
		$scope.deleleLine = function(i){
			$scope.cartLine.splice($scope.cartLine.indexOf(i), 1);
			$http.delete("https://5c2c260dad36d90014f3425d.mockapi.io/abcxyz/order/" + i.id);
		}
		$scope.order = function(){
			if($scope.infoCustomer.$valid){
				var data = {"customerName" : $scope.name, "customerPhone" : $scope.phone,
			 			"customerAddress" : $scope.address, "days" : $scope.quantity,
			 			"total" : $scope.amount, "cart" : $scope.cartLine
			 		};
				$http.post("https://5c35a25fae60ba0014da4305.mockapi.io/order", data).then(function(){
					alert("Thank you for your order ! We will contact you soon");
				});
			} else {
				alert('Please input all of required fields !');	
			}
			
		}

		var today = new Date();
		dd = today.getDate();
		mm = today.getMonth() + 1;
		yyyy = today.getFullYear();
		if(dd < 10){
			dd = '0' + dd;
		}
		if(mm < 10){
			mm = '0' + mm;
		}
		today = yyyy + '-' + mm + '-' + dd;
		angular.element('#from').attr('min', today);
				
	});
