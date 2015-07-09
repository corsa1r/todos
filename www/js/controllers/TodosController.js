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
	'$mdDialog',
	'$q',
	function ($scope, $rootScope, $firebaseArray, $firebaseRef, $mdToast, $toast, ConfigFactory, $location, $mdDialog, $q) {

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

		$scope.toggle = function (todo, fromModal) {
			if (fromModal) {
				todo.checked = false;
			}

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

		$scope.showConfirm = function ($event, title, content, okBtnText) {
			// Appending dialog to document.body to cover sidenav in docs app
			var confirm = $mdDialog.confirm()
				.parent(angular.element(document.body))
				.title(title)
				.content(content)
			//.ariaLabel('Lucky day')
				.ok(okBtnText || 'OK')
				.cancel('CANCEL')
				.targetEvent($event);
			return $mdDialog.show(confirm);
		};

		$scope.logout = function ($event) {
			$scope.showConfirm($event, 'Are you sure you want to logout', 'you can login again later').then(function () {
				$rootScope.auth = null;
				$location.path('/');
				return false;
			});
		};

		$scope.expand = function ($event, todo) {
			$scope.showConfirm($event, 'Task with ' + todo.priority + ' priority', todo.text, 'Todo again').then(function () {
				$scope.toggle(todo, true);
			});
		}
	}];