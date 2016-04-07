angular.module("app")

.controller("accountCtrl", function ($scope, $reactive, $state, $window) {
    $reactive(this).attach($scope);

    /* =========================================================================
     * VARIABLES
     * =======================================================================*/
    this.showLogin = 1;
    this.showRegister = 0;
    this.showForgot = 0;
    this.dataL = {};
    this.dataR = {};
    this.dataR.color = "#f44336";
    /* =========================================================================
     * FUNCTION LOGIN
     * =======================================================================*/
    this.login = function () {
        if (_.isEmpty(this.dataL)) return;

        Meteor.loginWithPassword(this.dataL.email, this.dataL.password, function (error) {
            if (error) {
                var notify = humane.create({
                    baseCls: 'humane-flatty',
                    timeout: 5000
                })
                notify.log('Usuario no encontrado')
            } else {
                $state.go('/perfil');
            }
        });
    };

    /* =========================================================================
     * FUNCTION CREAR NUEVO USUARIO
     * =======================================================================*/
    this.crear = function () {
        if (_.isEmpty(this.dataR)) return;

        var _correo = this.dataR.email;

        Accounts.createUser({
            email: this.dataR.email,
            password: this.dataR.password,
            profile: {
                firstName: this.dataR.firstName,
                lastName: this.dataR.lastName,
                color: this.dataR.color
            }
        }, function (er) {
            if (er) {
                var notify = humane.create({
                    baseCls: 'humane-flatty',
                    timeout: 5000
                })
                notify.log('correo electrónico ya existe.');
            } else {
                Meteor.call('registrar', _correo);
                $state.go('/perfil');
            }

        });
    };
})