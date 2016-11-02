(function() {
    'use strict';

    angular
        .module('app')
        .controller('StudentAddStudentController', StudentAddStudentController);

    StudentAddStudentController.$inject = ['StudentFactory', 'ProjectFactory', 'AssignmentFactory','$stateParams', '$state'];

    /* @ngInject */
    function StudentAddStudentController(StudentFactory, ProjectFactory, AssignmentFactory,$stateParams, $state) {
        // According to the John Papa Style Guide, declare all 'logic' for the controller, in the beginning. 
        // These 'logic' values will then be called in the functions.
        var vm = this;
        vm.title = 'StudentAddStudentController';
        vm.save = save;
        vm.students = {};
        vm.assignProject = assignProject;
        // Declase vm.students as an open object ( {} ), in order to grasp on to the user's input.
        activate();
        ////////////////
        function activate() {
            if ($stateParams.studentId) {
                    StudentFactory.getById($stateParams.studentId).then(
                        function(students) {
                            vm.students = students;
                        }
                    );
        } else {
            vm.students = {};
        }
            ProjectFactory.getAll().then(
                function(projects) {
                    vm.projects = projects;
                }
            );
        }

        // Function for the ( var service ={ vm.save: save } )
        function save() {
            // "communicate" with the factory (StudentFactory) to use the specified function (.add()) to get all students.
            // Pass through (vm.students) to 'add' the user's input, into the database, to displayon the html page.
            StudentFactory.add(vm.students).then(
                function() {
                    // Confirmation for adding a student.
                    alert("Adding a new student was successful!")
                    $state.go('student.grid');
                }
            );
        }
        function assignProject() {
            AssignmentFactory.create({
                studentId: vm.students.studentId,
                projectId: vm.projectId
            }).then(
                function() {
                    $state.go('student.grid');
                }
            );
        }
    }
})();