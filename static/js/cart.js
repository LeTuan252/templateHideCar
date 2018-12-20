
var app = angular.module('cart', []);
	app.controller('cartController', function($scope){
		$scope.quantity = 1;
		$scope.cartLine = {
			line: [
				{link: '../static/images/car/car1.jpg', name: 'car1', price: '1000', kq: 0},
				{link: '../static/images/car/car2.jpg', name: 'car2', price: '2000', kq: 0},
				]
		};


		$scope.gettotal = function(quantity, i){
			var qk = quantity*i.price;
			i.kq = qk;
		}
		$scope.total = function(){
			var kq = 0;
			for (var i =0; i < $scope.cartLine.line.length; i++){
				kq = kq + $scope.cartLine.line[i].kq;
			}
			return kq;
		}

	});
