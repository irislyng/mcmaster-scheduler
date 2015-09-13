(function() {
    'use strict';

    angular
        .module('app')
        .directive('termTable', function() {
            return {
                transclude: true,
                restrict: 'E',
                scope: {
                    courses: "=",
                    id: "=name"
                },
                controller: 'Table',
                controllerAs: 'tbl',
                bindToController: true,
                templateUrl: '/src/table.directive.html'
            }
        });
})();