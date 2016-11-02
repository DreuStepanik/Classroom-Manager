(function(){
    'use strict';

    angular
        .module('app')
        .factory('StudentFactory', StudentFactory);

    StudentFactory.$inject = ['$http', '$q', 'apiUrl']; //inject 'apiUrl' from the .value within the app.module.js

    function StudentFactory($http, $q, apiUrl) {
        // According to the John Papa Style Guide, declare all 'logic' for the controller, in the beginning. 
        // These 'logic' values will then be called in the functions.
        var service = {
            add: add, 
            getAll: getAll,
            getById: getById,
            update: update,
            remove: remove
        };

        return service;


        //// CRUD FUNCTIONS


        // ADD
        // Function for the ( var service ={ add: add } )
        function add(student) {
            //use the $q.defer method to create/return a 'promise'
            var defer = $q.defer();
            // 'apiUrl' is equivalent to the API key generated.
            // '/students' represents the name of the Projects Database in CSharp application.
            // student is what is being passed through within the 'add()' function.
            $http.post(apiUrl + '/students', student)
            .then(
                // If response is true; resolve.
                function(response){
                    defer.resolve(response.data);
                },
                // if response is false; reject.
                function(error) {
                    defer.reject(error);
                }
            );
            // return either (true)'resolve' or (false)'reject'.
            return defer.promise;
        }    

        // GET ALL
        // Function for the ( var service ={ getAll: getAll } )
        function getAll() {
            //use the $q.defer method to create/return a 'promise'
            var defer = $q.defer();
            // 'apiUrl' is equivalent to the API key generated.
            // '/students' represents the name of the Projects Database in CSharp application.
            $http.get(apiUrl + '/students')
            .then(
                // If response is true; resolve.
                function(response) {
                    defer.resolve(response.data);
                },
                // if response is false; reject.
                function(error) {
                    defer.reject(error);
                }
            );
            // return either (true)'resolve' or (false)'reject'.
            return defer.promise;
        }

        // GET BY ID
        // Function for the ( var service ={ getById: getById } )
        function getById(id) {
            //use the $q.defer method to create/return a 'promise'
            var defer = $q.defer();
            // 'apiUrl' is equivalent to the API key generated.
            // '/students' represents the name of the Projects Database in CSharp application.
            // id is what is being passed through within the 'getById()' function.
            $http.get(apiUrl + '/students/' + id)
            .then(
                // If response is true; resolve.
                function(response) {
                    defer.resolve(response.data);
                },
                // if response is false; reject.
                function(error) {
                    defer.reject(error);
                }
            );
            // return either (true)'resolve' or (false)'reject'.
            return defer.promise;
        }

        // UPDATE
        // Function for the ( var service ={ update: update } )
        function update(student) {
            //use the $q.defer method to create/return a 'promise'
            var defer = $q.defer();
            // 'apiUrl' is equivalent to the API key generated.
            // '/students' represents the name of the Projects Database in CSharp application.
            // student.studentId === attach the studentId to the student, to select which student is being updated.
            // student is what is being passed through within the 'update()' function.
            $http.put(apiUrl + '/students/' + student.studentId, student)
            .then (
                // If response is true; resolve.
                function() {
                    defer.resolve();
                },
                // if response is false; reject.
                function() {
                    defer.reject(error); 
                }
            );
            // return either (true)'resolve' or (false)'reject'.
            return defer.promise;
        }

        // REMOVE
        // Function for the ( var service ={ remove: remove } )
        function remove(student) {
            //use the $q.defer method to create/return a 'promise'
            var defer = $q.defer();
            // 'apiUrl' is equivalent to the API key generated.
            // '/students' represents the name of the Projects Database in CSharp application.
            // student.studentId === attach the studentId to the student, to select which student is being removed.
            $http.delete(apiUrl + '/students/' + student.studentId)
            .then(
                // If response is true; resolve.
                function(response) {
                    defer.resolve(response.data);
                },
                // if response is false; reject.
                function(error) {
                    defer.reject(error);
                }
            );
            // return either (true)'resolve' or (false)'reject'.
            return defer.promise;
        }

    }
})();