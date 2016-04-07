angular.module("app")

.service('userService', function () {
	this.usuarioActual = function () {
		var result = {};

		result = Meteor.user();
		result.profile.firstName = result && result.profile ? result.profile.firstName : '';
		result.profile.email = result.emails[0].address;

		return result.profile;

	};
})