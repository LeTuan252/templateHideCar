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
				{link: '../static/images/car/car1.jpg', name: 'car1', price: '1000'},
				{link: '../static/images/car/car2.jpg', name: 'car2', price: '2000'},
				
				],
			superCar2: [
				{link: '../static/images/car/car3.jpg', name: 'car3', price: '400'},
				{link: '../static/images/car/car4.jpg', name: 'car4', price: '500'}
				],
			superCar3: [
				{link: '../static/images/car/car5.jpg', name: 'car5', price: '700'},
				{link: '../static/images/car/car6.jpg', name: 'car6', price: '800'}
			]
		};
		$scope.weddingCar = {
			weddingCar1: [
				{link: '../static/images/car/weddingCar/car1.jpg', name: 'Roll Royce', price: '1000'},
				{link: '../static/images/car/weddingCar/car2.jpg', name: 'BMV', price: '2000'},
				
				],
			weddingCar2: [
				{link: '../static/images/car/weddingCar/car3.jpg', name: 'Lexus', price: '400'},
				{link: '../static/images/car/weddingCar/car4.jpg', name: 'Mazda', price: '500'}
				],
			weddingCar3: [
				{link: '../static/images/car/weddingCar/car5.jpg', name: 'VinFast', price: '700'},
				{link: '../static/images/car/weddingCar/car6.jpg', name: 'KIA', price: '800'}
			]
		};

		$scope.open = function(){
			var modalInstance = $uibModal.open({
				templateUrl: '../templates/popup.html',
				controller: 'carDetail',
				windowClass: 'show'
			});
		}
	})

	app.controller('carDetail', function($scope, $uibModal){
		
	})
});