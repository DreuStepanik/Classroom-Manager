(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProjectGridController', ProjectGridController);

    ProjectGridController.$inject = ['ProjectFactory', '$stateParams'];

    /* @ngInject */
    function ProjectGridController(ProjectFactory, $stateParams) {
        // According to the John Papa Style Guide, declare all 'logic' for the controller, in the beginning. 
        // These 'logic' values will then be called in the functions.
        var vm = this;
        vm.title = 'ProjectGridController';
        vm.projects = [];
        vm.getAllProjects = getAllProjects;
        vm.removeProject = removeProject;
        // call the getAllProjects function first, to be displayed right when the page loads.
        getAllProjects();

        ////////////////

        function getAllProjects() {
            // "communicate" with the factory (ProjectFactory) to use the specified function (.getAll()) to get all projects.
            ProjectFactory.getAll().then(
                function(project) {
                    // (vm.projects [] === project within the projects database)
                    vm.projects = project;
                }
            );
        }
        // Function for the ( var service ={ vm.removeProject: removeProject } )
        function removeProject(project) {
            // Create a confirmation alert box to prevent the user from accidentally deleting an item. 
            if (confirm("Are you sure you want to remove this project item?")) {
                // "communicate" with the factory (ProjectFactory) to use the specified function (.remove()) to remove a project.
                // Pass 'project' within the (parameter), so that 'project' is effected.   
                ProjectFactory.remove(project).then(
                    function() {
                        var index = vm.projects.indexOf(project);
                            // Use (.splice()) to automatically update the HTML page. 
                            vm.projects.splice(index, 1);
                    }
                );
            }
        }   
    }
})();