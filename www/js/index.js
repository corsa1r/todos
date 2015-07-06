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