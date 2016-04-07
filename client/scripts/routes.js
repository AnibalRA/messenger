angular.module('app')

.run(function ($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        if (error === 'AUTH_REQUIRED') {
            $state.go('/account');
        }
    });
})


.config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    
    $stateProvider.state('/account', {
        url: '/account',
        controller: 'accountCtrl',
        controllerAs: 'account',
        templateUrl: 'client/templates/account/account.tpl.html'
    })

    .state('/perfil', {
        url: '/perfil',
        controller: 'profileCtrl',
        controllerAs: 'perfil',
        templateUrl: 'client/templates/profile.tpl.html',
        resolve: {
            currentUser: ($q) => {
                if (Meteor.userId() == null) {
                    return $q.reject('AUTH_REQUIRED');
                } else {
                    return $q.resolve();
                }
            }
        }
    })

    .state('/messenger', {
        url: '/messenger/:messengerId',
        controller: 'messengerCtrl',
        controllerAs: 'messenger',
        templateUrl: 'client/templates/messenger/messenger.tpl.html'
    })



    .state('/chats', {
        url: '/chats',
        controller: 'messengerCtrl',
        controllerAs: 'msn',
        templateUrl: 'client/templates/messenger/chats.tpl.html',
        resolve: {
            currentUser: ($q) => {
                if (Meteor.userId() == null) {
                    return $q.reject('AUTH_REQUIRED');
                } else {
                    return $q.resolve();
                }
            }
        }
    })

    .state('/chat', {
        url: '/chats/:chatId',
        controller: 'messengerDetailCtrl',
        controllerAs: 'msnDetail',
        templateUrl: 'client/templates/messenger/chat.tpl.html'
    })

    .state('/contacts', {
        url: '/contacts',
        controller: 'contactsCtrl',
        controllerAs: 'contacts',
        templateUrl: 'client/templates/messenger/contacts.tpl.html'
    });

    $urlRouterProvider.otherwise("/account");
});