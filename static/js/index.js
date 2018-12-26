$(document).ready(function(){
	var stt = 0;
	startImg = parseInt($("img.image1").attr("stt"));
	endImg = parseInt($("img.image3").attr("stt"));
	$(".slide-container > img").each(function(){
		if ($(this).is(":visible")){
			stt = parseInt($(this).attr("stt"));
		}
	});

	$("#next").click(function(){
		if(next == endImg){
			stt = startImg - 1;
		}
		next = ++stt;
		$("img.slide-image").hide();
		$("img.slide-image").eq(next).show();
		$("li.dot").removeClass("active");
		$("li.dot").eq(next).addClass("active");

	})

	$("#prev").click(function(){
		if(stt == 0){
			stt = endImg + 1;
		}
		prev = --stt;
		$("img.slide-image").hide();
		$("img.slide-image").eq(prev).show();
		$("li.dot").removeClass("active");
		$("li.dot").eq(prev).addClass("active");
	})
	setInterval(function(){
		$("#next").click();},2000
	);

	var app = angular.module('myApp', ['ui.bootstrap']);
	app.controller('customersCtrl', function($scope, $uibModal){
		$scope.superCar = {
			superCar1: [
				{link: '../static/images/car/car1.jpg', name: 'car1', price: '1000', size: '3.660 x 1.600 x 1.520 mm', seat: '4', color: 'white',
				imgDetail1: '../static/images/car/car1-inside1.jpg', imgDetail2: '../static/images/car/car1-inside2.jpg',
				imgDetail3: '../static/images/car/car1-inside3.jpg'},
				{link: '../static/images/car/car2.jpg', name: 'car2', price: '2000', size: '3.660 x 1.600 x 1.520 mm', seat: '7', color: 'red',
				imgDetail1: '../static/images/car/car1-inside1.jpg', imgDetail2: '../static/images/car/car1-inside2.jpg',
				imgDetail3: '../static/images/car/car1-inside3.jpg'},
				
				],
			superCar2: [
				{link: '../static/images/car/car3.jpg', name: 'car3', price: '400', size: '3.660 x 1.600 x 1.520 mm', seat: '4', color: 'red',
				imgDetail1: '../static/images/car/car1-inside1.jpg', imgDetail2: '../static/images/car/car1-inside2.jpg',
				imgDetail3: '../static/images/car/car1-inside3.jpg'},
				{link: '../static/images/car/car4.jpg', name: 'car4', price: '500', size: '3.660 x 1.600 x 1.520 mm', seat: '7', color: 'yellow',
				imgDetail1: '../static/images/car/car1-inside1.jpg', imgDetail2: '../static/images/car/car1-inside2.jpg',
				imgDetail3: '../static/images/car/car1-inside3.jpg'}
				],
			superCar3: [
				{link: '../static/images/car/car5.jpg', name: 'car5', price: '700', size: '3.660 x 1.600 x 1.520 mm', seat: '7', color: 'black',
				imgDetail1: '../static/images/car/car1-inside1.jpg', imgDetail2: '../static/images/car/car1-inside2.jpg',
				imgDetail3: '../static/images/car/car1-inside3.jpg'},
				{link: '../static/images/car/car6.jpg', name: 'car6', price: '800', size: '3.660 x 1.600 x 1.520 mm', seat: '4', color: 'black',
				imgDetail1: '../static/images/car/car1-inside1.jpg', imgDetail2: '../static/images/car/car1-inside2.jpg',
				imgDetail3: '../static/images/car/car1-inside3.jpg'}
			]
		};
		$scope.weddingCar = {
			weddingCar1: [
				{link: '../static/images/car/weddingCar/car1.jpg', name: 'Roll Royce', price: '1000', size: '3.660 x 1.600 x 1.520 mm', seat: '9'},
				{link: '../static/images/car/weddingCar/car2.jpg', name: 'BMV', price: '2000', size: '3.660 x 1.600 x 1.520 mm', seat: '2'},
				
				],
			weddingCar2: [
				{link: '../static/images/car/weddingCar/car3.jpg', name: 'Lexus', price: '400', size: '3.660 x 1.600 x 1.520 mm', seat: '5'},
				{link: '../static/images/car/weddingCar/car4.jpg', name: 'Mazda', price: '500', size: '3.660 x 1.600 x 1.520 mm', seat: '2'}
				],
			weddingCar3: [
				{link: '../static/images/car/weddingCar/car5.jpg', name: 'VinFast', price: '700', size: '3.660 x 1.600 x 1.520 mm', seat: '11'},
				{link: '../static/images/car/weddingCar/car6.jpg', name: 'KIA', price: '800', size: '3.660 x 1.600 x 1.520 mm', seat: '2'}
			]
		};

		$scope.open = function(i){
			$scope.showPopupModal = true;
			$scope.selectedItem = i;
		}
	})
	
	app.directive('popupModal', function() {
	  	return {
	  		restrict: 'EA',
	  		scope: {
  				showPopupModal:'=',
  				itemCar:'='
	  		},
	    	// template: 
	    	// '<div style="width: 100%; height:100%; position: fixed; top:0; left:0; background: rgba(166,166,166,0.5); z-index: 10000;"> <span ng-bind="name">'+
	    	// '</span> <span ng-click="hidePopup()"> dau X</span>  {{itemCar}} <span ng-click="thayDoi()"> THAY DOI</span> </div>',
	    	templateUrl: '../templates/popup.html',
	    	link: function(scope, element, attrs) {
		      	scope.hidePopup = function(){
	      			scope.showPopupModal = false;
		      	}
		     	scope.thayDoi = function(){
		      		scope.itemCar.name = 22222222222;
		      		scope.itemCar.price = 10000000000;
		      	}
		      	$(document).on("keydown", function(e){
	      			if($(element).is(":visible") && e.keyCode === 27){
	      				scope.showPopupModal = false;
	      				scope.$apply();
	      			}
		      	})
		      	$(".background-popup").on("click", function(e){
		      		e.preventDefault();
						scope.showPopupModal = false;
	      				scope.$apply();
		      		
		      	})
		    }
	 	}
	});
});