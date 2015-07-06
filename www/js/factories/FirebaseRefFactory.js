/* global Firebase */
module.exports = ['ConfigFactory', function (ConfigFactory) {
	return new Firebase(ConfigFactory.firebase.url);
}];