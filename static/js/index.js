$(document).ready(function(){
	$('#bannerCarousel').carousel({
	      interval: 4000,
	      wrap: true,
	      keyboard: true
	 });
	var app = angular.module('myApp', []);
	app.controller('customersCtrl', function($scope, $http, $window ){

		$http.get("http://localhost:8080/get-list-product").then(function(response){
			$scope.superCar = response.data;
		});
		
		$scope.open = function(i){
			$scope.showPopupModal = true;
			$http.post("http://localhost:8080/get-one/" + i.id).then(function(response){
	      		$scope.selectedItem = Object.assign(i, response.data);
	      	});
		}

		$scope.carName = '';
		$scope.search = function(){
			var data = {'name': $scope.carName, 'seat' : $scope.seat, 'color' : $scope.color, 'priceFrom' : $scope.priceFrom,
			'priceTo' : $scope.priceTo}
			$http.post("https://5c2c260dad36d90014f3425d.mockapi.io/abcxyz/search", data).then(function(){
				$window.open('../templates/search.html');	
			})
			
		}

		$scope.searchPrice = function(){
			var data = {'priceFrom': $scope.priceFrom, 'priceTo': $scope.priceTo}
			$http.post("http://localhost:8080/get-by-price", data)
		}
		$scope.chooseLabel = [
			{value: '', label: 'All'},
			{value: 'honda', label: 'Honda'},
			{value: 'ford', label: 'Ford'},
			{value: 'bmw', label: 'BMW'},
			{value: 'kia', label: 'KIA'},
		]
		$scope.seat = '';
		$scope.chooseSeat = [
			{value: '', label: 'All'},
			{value: '4', label: '4 seats'},
			{value: '12', label: '12 seats'},
			{value: '24', label: '24 seats'},
		]
		$scope.color = '';
		$scope.chooseColor = [
			{value: '', label: 'All'},
			{value: 'black', label: 'Black'},
			{value: 'gray', label: 'Gray'},
			{value: 'red', label: 'Red'},
			{value: 'blue', label: 'Blue'},
		]
	})
	
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
});