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