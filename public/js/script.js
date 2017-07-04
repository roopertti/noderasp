var app = angular.module('app', [])

.controller('TodoCtrl', ['$scope', '$http', function($scope, $http) {
	
	$scope.title = "";
	$scope.todo = "";
	
	$scope.addPost = function() {
		$http({
			method: 'POST',
			url: '/addPost',
			data: {
				title: $scope.title,
				todo: $scope.todo
			}
		})
		.then(function(response) {
			$scope.refreshTodos();
		}, function(err) {
			console.log(err);
		});
	}
	
	$scope.posts = [];
	
	$scope.postsDone = [];
	
	$scope.refreshTodos = function() {
		$http({
			method: 'GET',
			url: '/getPosts'
		})
		.then(function(response) {
			$scope.posts = response.data.undone;
			$scope.postsDone = response.data.done;
		}, function(err) {
			console.log(err)
		});
	}
	
	$scope.refreshTodos();
	
	$scope.markAsDone = function(post) {
		$http({
			method: 'PUT',
			url: '/markAsDone',
			data: {
				postId: post._id
			}
		})
		.then(function(response) {
			console.log('update success');
		}, function(err) {
			console.log(err);
		});
		
		$scope.refreshTodos();
	}
	
}]);