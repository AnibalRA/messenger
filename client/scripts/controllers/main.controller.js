angular.module("app")

.controller("mainCtrl", function ($scope, $reactive, $state) {
    angular.element('html').addClass('body-content');
    angular.element('html').addClass('page-scroll');


    // Detact Mobile Browser
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        angular.element('html').addClass('ismobile');
    }

    $scope.lvMenuStat = false;
});