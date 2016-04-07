angular.module("app")

.controller('profileCtrl', function ($scope, $reactive, $state, userService) {
	
	angular.element('html, body ').removeClass('body-content');
	angular.element('#message').attr("readonly", "readonly");

	$reactive(this).attach($scope);

	let user = userService.usuarioActual();
	this.firstName = user.firstName;
    this.color = user.color;
    this.lastName = user.lastName;
})