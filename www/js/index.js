/* global Firebase */
/* global angular */
var app = angular.module('app', ['ngMaterial', 'firebase']);

app.controller('BaseController', function ($scope, $firebaseArray, $firebaseRef, $mdToast, $toast) {
	$scope.todos = $firebaseArray($firebaseRef);
	$scope.taskName = "";
	$scope.priority = 5;
	$scope.create = function () {
		if (!$scope.taskName.match(/\S/)) {
			$mdToast.show($toast('please enter task name'));
			return false;
		}

		var now = Date.now();

		$scope.todos.$add({
			checked: false,
			date_added: now,
			updated_date: now,
			text: $scope.taskName,
			priority: $scope.priority
		}).then(function () {
			$scope.taskName = "";
			$scope.priority = 5;
			$mdToast.show($toast('task was created successfully'));
		});
	};

	$scope.toggle = function (todo) {
		$mdToast.show($toast(todo.text + ' was updated'));
		todo.updated_date = Date.now();
		$scope.todos.$save(todo);
	};
	
	$scope.total = function (checked) {
		var result = 0;
		angular.forEach($scope.todos, function (todo) {
			if(todo.checked === checked) {
				result += 1;
			}
		});
		return result;
	};
});

app.factory('$firebaseRef', function () {
	return new Firebase("https://sourcehint-com.firebaseio.com/");
});

app.factory('$toast', function ($mdToast) {
	return function (text) {
		return $mdToast
			.simple()
			.content(text)
			.position('bottom center')
			.hideDelay(2000);
	};
});