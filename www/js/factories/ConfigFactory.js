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