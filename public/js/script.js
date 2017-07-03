var app = angular.module('app', [])

.controller('SubmitCtrl', ['$scope', '$http', function($scope, $http) {
	
	$scope.title = "";
	$scope.todo = "";
	
	$scope.addPost = function() {
		$http({
			method: 'POST',
			url: '/addPost',
			data: {
				title: $scope.title,
				todos: $scope.todos
			}
		})
		.then(function(response) {
			console.log('success');
		}, function(err) {
			console.log('error');
		});
	}
	
}])

.controller('GetCtrl', ['$scope', '$http', function($scope, $http) {
	
	$scope.posts = [];
	
	$scope.refreshTodos = function() {
		$http({
			method: 'GET',
			url: '/getPosts'
		})
		.then(function(response) {
			$scope.posts = response.data;
		}, function(err) {
			console.log(err)
		});
	}
	
}]);