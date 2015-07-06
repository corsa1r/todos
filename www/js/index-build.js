(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
/* global Firebase */
module.exports = ['ConfigFactory', function (ConfigFactory) {
	return new Firebase(ConfigFactory.firebase.url);
}];
},{}],3:[function(require,module,exports){
module.exports = ['$mdToast', 'ConfigFactory', function ($mdToast, ConfigFactory) {
	return function (text) {
		return $mdToast
			.simple()
			.content(text)
			.position(ConfigFactory.toast.position)
			.hideDelay(ConfigFactory.toast.delay);
	};
}];
},{}],4:[function(require,module,exports){
/* global Firebase */
/* global angular */
var app = angular.module('app', ['ngMaterial', 'firebase']);

app.controller('BaseController', [
	'$scope',
	'$firebaseArray',
	'$firebaseRef',
	'$mdToast',
	'$toast',
	'ConfigFactory',
	function ($scope, $firebaseArray, $firebaseRef, $mdToast, $toast, ConfigFactory) {
		$scope.todos = $firebaseArray($firebaseRef.child(ConfigFactory.firebase.childs.todos));

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
	}]);

app.factory('ConfigFactory', require('./factories/ConfigFactory.js'));
app.factory('$firebaseRef', require('./factories/FirebaseRefFactory'));
app.factory('$toast', require('./factories/ToastsFactory'));
},{"./factories/ConfigFactory.js":1,"./factories/FirebaseRefFactory":2,"./factories/ToastsFactory":3}]},{},[4]);
