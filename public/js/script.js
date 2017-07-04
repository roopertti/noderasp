var app = angular.module('app', [])

.controller('TodoCtrl', ['$scope', '$http', function($scope, $http) {
	
	$scope.title = "";
	$scope.todo = "";
	$scope.todosDone = 0;
	$scope.todosLeft = 0;
	
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
			$scope.title = "";
			$scope.todo = "";
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
			console.log(response);
		}, function(err) {
			console.log(err);
		});
		
		$scope.refreshTodos();
	}
	
	$scope.clearTodos = function() {
		$http({
			method: 'DELETE',
			url: '/deleteAllTodos'
		})
		.then(function(response) {
			console.log(response);
		}, function(err) {
			console.log(err);
		});
		
		$scope.refreshTodos();
	}
	
	$scope.$watch('posts', function() {
		$scope.todosLeft = $scope.posts.length;
	});
	
	$scope.$watch('postsDone', function() {
		$scope.todosDone = $scope.postsDone.length;
	});
	
}]);