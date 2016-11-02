(function() {
    'use strict';

    angular
        .module('app')
        .controller('StudentGridController', StudentGridController);

    StudentGridController.$inject = ['StudentFactory','$stateParams'];

    /* @ngInject */
    function StudentGridController(StudentFactory, $stateParams) {
        // According to the John Papa Style Guide, declare all 'logic' for the controller, in the beginning. 
        // These 'logic' values will then be called in the functions.
        var vm = this;
        vm.title = 'StudentGridController';
        vm.students = [];
        vm.getAllStudents = getAllStudents;
        vm.removeStudent = removeStudent;

        // call the getAllStudents function first, to be displayed right when the page loads.
        getAllStudents();
        ////////////////
        // Function for the ( var service ={ vm.getAllStudents: getAllStudents } )
        function getAllStudents() {
            // "communicate" with the factory (StudentFactory) to use the specified function (.getAll()) to get all students.
            StudentFactory.getAll()
            .then(
                function(student) {
                    // (vm.students [] === student within the students database)
                    vm.students = student;
                }
            );
        }
        // Function for the ( var service ={ vm.removeStudent: removeStudent } )
        function removeStudent(student) {
        // Create a confirmation alert box to prevent the user from accidentally deleting an item. 
        if (confirm("Are you sure you want to remove this student item?")) {
         // "communicate" with the factory (StudentFactory) to use the specified function (.remove()) to remove a student.
         // Pass 'student' within the (parameter), so that 'student' is effected.   
         StudentFactory.remove(student).then(
           function() {
             var index = vm.students.indexOf(student);
             // Use (.splice()) to automatically update the HTML page. 
             vm.students.splice(index, 1);
           }
         );
       }
     }
    }
})();