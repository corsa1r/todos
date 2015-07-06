module.exports = ['$mdToast', 'ConfigFactory', function ($mdToast, ConfigFactory) {
	return function (text) {
		return $mdToast
			.simple()
			.content(text)
			.position(ConfigFactory.toast.position)
			.hideDelay(ConfigFactory.toast.delay);
	};
}];