(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProjectDetailController', ProjectDetailController);

    ProjectDetailController.$inject = ['StudentFactory', 'ProjectFactory', 'AssignmentFactory', '$stateParams', '$state'];

    /* @ngInject */
    function ProjectDetailController(StudentFactory, ProjectFactory, AssignmentFactory, $stateParams, $state) {
        // According to the John Papa Style Guide, declare all 'logic' for the controller, in the beginning. 
        // These 'logic' values will then be called in the functions.
        var vm = this;
        vm.title = 'ProjectDetailController';
        vm.save = save;
        vm.getProjectById = getProjectById;

        // call the getProjectById(); function first, to be displayed right when the page loads.
        // This is because the page needs to load with a specified piece of information to be displayed.
        getProjectById();

        ////////////////

        // Function for the ( var service ={ vm.getProjectById: getProjectById } )
        function getProjectById() {
            if ($stateParams.projectId) {
                ProjectFactory.getById($stateParams.projectId).then(
                    function(projects) {
                        // With an exisiting Id, the vm.projects value will be equal to an existing project.
                        // Hence... 'Get By Id'
                        vm.projects = projects;
                    }
                );
            } else {
                // If the project was not already in the system, then vm.projects value will be equal to the user's input. 
                // After being created, a project Id will be assigned to the database to be called upon.
                vm.projects = {};
            }
        }
        // Function for the ( var service ={ vm.save: save } )
        function save() {
            // If the page loads, and the existing project is already paired with an Id, then continue wthe request with that specified project.
            if ($stateParams.projectId) {
                // Call the current project information, to be updated.
                ProjectFactory.update(vm.projects).then(
                    function() {
                        alert("Update was successful!")
                        $state.go('project.grid');
                    }
                );
          } else {
            // If the project was not already in the system, 'create' a new project value for the vm.projects item. 
            ProjectFactory.create(vm.projects).then(
                function() {
                    // Save + create was successful.
                    alert("Create was successful!")
                    $state.go('project.grid');
                }
            );
          }
        }
    }
})();