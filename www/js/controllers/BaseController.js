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