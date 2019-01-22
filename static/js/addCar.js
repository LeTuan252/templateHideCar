var app = angular.module('addCar', []);
app.controller('addCarCtrl', function($scope,$http){
	$scope.chooseSeat = [
		{value: '4', label: '4 seats'},
		{value: '7', label: '7 seats'},
		{value: '16', label: '16 seats'},
	]
});
app.directive('imageUpload', function($compile, $http){
	return{
		restrict: 'EA',
		templateUrl: '../templates/uploadImage.html',
		link: function(scope, elem, attrs){
			elem.find('.dropzone').bind('click', function(e){
				$compile(elem.find('.uploadImage'))(scope).trigger('click');
			});

			var formData = new FormData();
			scope.previewData = [];

			function previewFile(file){
				var reader = new FileReader();
				var obj = new FormData().append('file', file);
				reader.onload = function(data){
					var src = data.target.result;
					var size = file.size/1024 +'kB';
					scope.$apply(function(){
						scope.previewData.push({'name': file.name, 'size': size, 'type': file.type, 'src': src, 'data': obj});
					})
				}
				reader.readAsDataURL(file);
			}

			function uploadImage(e, type){
				e.preventDefault();
				var files = "";
				if (type == "formControl"){
					files = e.target.files;
				} else if (type == 'drop'){
					files = e.originalEvent.dataTransfer.files;
				}

				for (var i = 0; i< files.length; i++){
					var file = files[i];
					if(file.type.indexOf('image') !== -1){
						previewFile(file);
					} else {
						alert(file.name + "is not supported");
					}
				};
			}

			elem.find('.uploadImage').bind('change', function(e){
				uploadImage(e, 'formControl');
			});
			elem.find('.dropzone').bind('dragover', function(e){
				e.preventDefault();
			})
			elem.find('.dropzone').bind('drop', function(e){
				uploadImage(e, 'drop');
			})

			scope.remove = function(data){
				var index = scope.previewData.indexOf(data);
				scope.previewData.splice(index, 1);
			}

			scope.submitNewCar = function(){
				if(scope.formNewCar.$valid){
					scope.newCar.image = scope.previewData;
					$http({
						method: 'POST',
						url: 'https://5c2c260dad36d90014f3425d.mockapi.io/abcxyz/newCar',
						data: scope.newCar
					}).then(function successCallBack(response){
						alert(scope.newCar.name + " is added successfully !")
						scope.newCar = {};
						scope.previewData = [];
				})	
				} else {
					alert("Please input all of required fields !");
				}	
			}
			
		}
	}
})