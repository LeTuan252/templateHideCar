$(document).ready(function(){
	var app = angular.module('search', []);
	app.controller('searchCtrl',['$scope', '$http', 'orderByFilter', function($scope, $http, orderBy){
		//$scope.searchCar = [];
		var allCar;
		$http.get("http://localhost:8080/get-list-product").then(function(result){
			for (i = 0; i < result.data.length; i++){
				$http.get("https://5c2c260dad36d90014f3425d.mockapi.io/abcxyz/car/" + result.data[i].id)
				.then(function(resultDetail){
					for (j = 0; j < result.data.length; j++){
						if(result.data[j].id == resultDetail.data.id){
							Object.assign(result.data[j], resultDetail.data);
						}
					}
					
				})
			}
			$scope.searchCar = result.data ;
			allCar = result.data;

		});
		$scope.search = [];
		$http.get("https://5c2c260dad36d90014f3425d.mockapi.io/abcxyz/search").then(function(response){
			var x = response.data;
			var i = x.length;
			$scope.search.name = x[i-1].name;
			$scope.search.seat = x[i-1].seat;
			$scope.search.color = x[i-1].color;
			$scope.priceFrom = x[i-1].priceFrom;
			$scope.priceTo = x[i-1].priceTo;
			
			$http.delete("https://5c2c260dad36d90014f3425d.mockapi.io/abcxyz/search/1")
		});
		$scope.searchPrice = function(){
			
			if($scope.priceFrom != null && $scope.priceTo != null){
				var selectedPrice = $.grep(allCar, function(car){
					return car.price >= $scope.priceFrom && car.price <= $scope.priceTo;
				})
				$scope.searchCar = selectedPrice
			};
			if($scope.priceFrom == null && $scope.priceTo == null){
				$scope.searchCar = allCar;
			};
			if($scope.priceTo != null && $scope.priceFrom == null){
				var selectedPrice = $.grep(allCar, function(car){
					return car.price <= $scope.priceTo
				})
				$scope.searchCar = selectedPrice
			}
			if($scope.priceFrom != null && $scope.priceTo == null){
				var selectedPrice = $.grep(allCar, function(car){
					return car.price >= $scope.priceFrom
				})
				$scope.searchCar = selectedPrice
			}
		}

		$scope.open = function(i){
			$scope.showPopupModal = true;
			$scope.selectedItem = i;
			// $http.get("https://5c2c260dad36d90014f3425d.mockapi.io/abcxyz/car/" + i.id).then(function(response){
	  //     		$scope.selectedItem = Object.assign(i, response.data);
	  //     	})
		};

	//	$scope.search.label = '';
		$scope.chooseLabel = [
			{value: '', label: 'All'},
			{value: 'honda', label: 'Honda'},
			{value: 'ford', label: 'Ford'},
			{value: 'bmw', label: 'BMW'},
			{value: 'kia', label: 'KIA'},
		]
	//	$scope.search.seat = '';
		$scope.chooseSeat = [
			{value: '', label: 'All'},
			{value: '4', label: '4 seats'},
			{value: '12', label: '12 seats'},
			{value: '24', label: '24 seats'},
		]
	//	$scope.search.color = '';
		$scope.chooseColor = [
			{value: '', label: 'All'},
			{value: 'black', label: 'Black'},
			{value: 'gray', label: 'Gray'},
			{value: 'red', label: 'Red'},
			{value: 'blue', label: 'Blue'},
		]

	}]);
	app.directive('popupModal', function($http) {
	  	return {
	  		restrict: 'EA',
	  		scope: {
  				showPopupModal:'=',
  				itemCar:'='
	  		},
	    	templateUrl: '../templates/popup.html',
	    	link: function(scope, element, attrs, http) {
		      	scope.hidePopup = function(){
	      			scope.showPopupModal = false;
		      	}
		      	$(document).on("keydown", function(e){
	      			if($(element).is(":visible") && e.keyCode === 27){
	      				scope.showPopupModal = false;
	      				$(".allComment").hide();
	      				scope.$apply();
	      			}
		      	})
		      	$(".background-popup").on("click", function(e){
		      		e.preventDefault();
					scope.showPopupModal = false;
					$(".allComment").hide();
      				scope.$apply();
		      		
		      	})
		      	scope.book = function(){
		      		var data = {"name" : scope.itemCar.name, "link" : scope.itemCar.imgDetail1, "price" : scope.itemCar.price,
		      		 "amountLine" : scope.itemCar.price}
		      		$http.post("https://5c2c260dad36d90014f3425d.mockapi.io/abcxyz/order", data).then(function(){
		      			alert("This car is added to your cart !");
		      		})
		      	}
		      	scope.openComment = function(){
		      		$http.get("https://5c35a25fae60ba0014da4305.mockapi.io/car/"  + scope.itemCar.id + "/comment/")
		      		.then(function(comment){
			      		scope.comment =[];
			      		for(i = 0; i < comment.data.length; i++){
			      			cmt = comment.data[i];
			      			scope.comment.push(cmt);
			      		}
			      	})
	      		}
		    }
	 	}
	});	
})