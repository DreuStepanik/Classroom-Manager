(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProjectAddProjectController', ProjectAddProjectController);

    ProjectAddProjectController.$inject = ['$stateParams', '$state'];

    /* @ngInject */
    function ProjectAddProjectController($stateParams, $state) {
        var vm = this;
        vm.title = 'ProjectAddProjectController';

        activate();

        ////////////////

        function activate() {
        }
    }
})();