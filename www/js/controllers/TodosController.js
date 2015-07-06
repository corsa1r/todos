/* global angular */
module.exports = [
	'$scope',
	'$rootScope',
	'$firebaseArray',
	'$firebaseRef',
	'$mdToast',
	'$toast',
	'ConfigFactory',
	'$location',
	function ($scope, $rootScope, $firebaseArray, $firebaseRef, $mdToast, $toast, ConfigFactory, $location) {

		if (!$rootScope.auth) {
			$location.path('/');
			return false;
		}

		$scope.todos = $firebaseArray($firebaseRef.child($rootScope.auth.uid));

		$scope.taskName = "";
		$scope.priority = ConfigFactory.todos.default_priority;

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
				if (todo.checked === checked) {
					result += 1;
				}
			});
			return result;
		};
	}];