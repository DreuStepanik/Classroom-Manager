(function() {
    'use strict';

    angular
        .module('app')
        .controller('StudentDetailController', StudentDetailController);

    StudentDetailController.$inject = ['StudentFactory', 'ProjectFactory', 'AssignmentFactory', '$stateParams', '$state'];

    /* @ngInject */
    function StudentDetailController(StudentFactory, ProjectFactory, AssignmentFactory, $stateParams, $state) {
        // According to the John Papa Style Guide, declare all 'logic' for the controller, in the beginning. 
        // These 'logic' values will then be called in the functions.
        var vm = this;
        vm.title = 'StudentDetailController';
        vm.save = save;
        vm.getStudentById = getStudentById;

        // call the getStudentById(); function first, to be displayed right when the page loads.
        // This is because the page needs to load with a specified piece of information to be displayed.
        getStudentById();

        ////////////////
        // Function for the ( var service ={ vm.getStudentById: getStudentById } )
        function getStudentById() {
            // If the page loads, and the existing student is already paired with an Id, then continue the request with that specified student.
            if ($stateParams.studentId) {
                StudentFactory.getById($stateParams.studentId).then(
                    function(students) {
                        // With an exisiting Id, the vm.students value will be equal to an existing student.
                        // Hence... 'Get By Id'
                        vm.students = students;
                    }
                );
            } else {
                // If the student was not already in the system, then vm.students value will be equal to the user's input. 
                // After being created, a student Id will be assigned to the database to be called upon.
                vm.students = {};
            }
        }
        // Function for the ( var service ={ vm.save: save } )
        function save() {
            // If the page loads, and the existing student is already paired with an Id, then continue wthe request with that specified student.
            if ($stateParams.studentId) {
                // Call the current student information, to be updated.
                StudentFactory.update(vm.students).then(
                    function() {
                        alert("Update was successful!")
                        $state.go('student.grid');
                    }
                );
          } else {
            // If the student was not already in the system, 'create' a new student value for the vm.students item. 
            StudentFactory.create(vm.students).then(
                function() {
                    // Save + create was successful.
                    alert("Create was successful!")
                    $state.go('student.grid');
                }
            );
          }
        }
    }
})();