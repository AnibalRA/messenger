angular.module("app")

// =========================================================================
// WAVES (For .btn classes)
// =========================================================================

.directive('btn', function () {
    return {
        restrict: 'C',
        link: function (scope, element) {
            if (element.hasClass('btn-icon') || element.hasClass('btn-float')) {
                Waves.attach(element, ['waves-circle']);
            } else if (element.hasClass('btn-light')) {
                Waves.attach(element, ['waves-light']);
            } else {
                Waves.attach(element);
            }

            Waves.init();
        }
    }
})

// =========================================================================
// INPUT FEILDS MODIFICATION (click)
// =========================================================================
.directive('fgLine', function () {
    return {
        restrict: 'C',
        link: function (scope, element) {
            element.on("click", function () {
                angular.element(element).addClass('fg-toggled');
            })
        }
    }
})

// =========================================================================
// INPUT FEILDS MODIFICATION (blur)
// PLACEHOLDER FOR IE 9 (on .form-control class)
// =========================================================================
.directive('formControl', function () {
    return {
        restrict: "C",
        link: function (scope, element) {
            element.on("blur", function () {
                angular.element('.fg-line').removeClass('fg-toggled');
            });
            if (angular.element('html').hasClass('ie9')) {
                $('input, textarea').placeholder({
                    customClass: 'ie9-placeholder'
                });
            }
        }
    }
})


.directive('dropdownToggle', function () {
    return {
        restrict: "C",
        link: function (scope, element) {
            $('.dropdown-toggle').dropdown()
        }
    }
})