(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = [
	'$scope',
	'$rootScope',
	'$firebaseAuth',
	'$firebaseRef',
	'$mdToast',
	'$toast',
	'$location',
	function ($scope, $rootScope, $firebaseAuth, $firebaseRef, $mdToast, $toast, $location) {
		$scope.authentication = $firebaseAuth($firebaseRef);
		
		$scope.user = {};
		$scope.user.email = '';
		$scope.user.password = '';

		$scope.login = function () {
			$scope.authentication.$authWithPassword({
				email: $scope.user.email,
				password: $scope.user.password
			}).then(function (authData) {
				$rootScope.auth = authData;
				$location.path('/todos');
			}).catch(function (error) {
				$mdToast.show($toast(error.message));
			});
		};
	}
];
},{}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
; (function () {
	var config = {};
	config.firebase = {};
	config.firebase.url = 'https://sourcehint-com.firebaseio.com/';
	config.firebase.childs = {};
	config.firebase.childs.todos = 'todos';

	config.toast = {};
	config.toast.position = 'bottom center';
	config.toast.delay = 2000;//2 sec
	
	config.todos = {};
	config.todos.default_priority = 5;

	module.exports = [function () {
		return config;
	}];
})();
},{}],4:[function(require,module,exports){
/* global Firebase */
module.exports = ['ConfigFactory', function (ConfigFactory) {
	return new Firebase(ConfigFactory.firebase.url);
}];
},{}],5:[function(require,module,exports){
module.exports = ['$mdToast', 'ConfigFactory', function ($mdToast, ConfigFactory) {
	return function (text) {
		return $mdToast
			.simple()
			.content(text)
			.position(ConfigFactory.toast.position)
			.hideDelay(ConfigFactory.toast.delay);
	};
}];
},{}],6:[function(require,module,exports){
/* global Firebase */
/* global angular */
var app = angular.module('app', ['ngMaterial', 'firebase', 'ngRoute']);

/**
 * Routing
 */
 app.config(require('./routes/routes'));

/**
 * Controllers
 */
app.controller('BaseController', require('./controllers/BaseController.js'));
app.controller('TodosController', require('./controllers/TodosController.js'));

/**
 * Factories
 */
app.factory('ConfigFactory', require('./factories/ConfigFactory.js'));
app.factory('$firebaseRef', require('./factories/FirebaseRefFactory'));
app.factory('$toast', require('./factories/ToastsFactory'));
},{"./controllers/BaseController.js":1,"./controllers/TodosController.js":2,"./factories/ConfigFactory.js":3,"./factories/FirebaseRefFactory":4,"./factories/ToastsFactory":5,"./routes/routes":7}],7:[function(require,module,exports){
module.exports = ['$routeProvider', function ($routeProvider) {

	$routeProvider.when('/', {
		templateUrl: './templates/login.html',
		controller: 'BaseController'
	});
	
	$routeProvider.when('/todos', {
		templateUrl: './templates/todos.html',
		controller: 'TodosController'
	});

}];
},{}]},{},[6]);
