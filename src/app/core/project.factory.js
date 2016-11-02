(function(){
    'use strict';

    angular
        .module('app')
        .factory('ProjectFactory', ProjectFactory);

    ProjectFactory.$inject = ['$http', '$q', 'apiUrl']; //inject 'apiUrl' from the .value within the app.module.js

    function ProjectFactory($http, $q, apiUrl) {
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
        function add(project) {
            //use the $q.defer method to create/return a 'promise'
            var defer = $q.defer();
            // 'apiUrl' is equivalent to the API key generated.
            // '/projects' represents the name of the Projects Database in CSharp application.
            // project is what is being passed through within the 'add()' function.
            $http.post(apiUrl + '/projects', project)
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
            // '/projects' represents the name of the Projects Database in CSharp application.
            $http.get(apiUrl + '/projects')
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
            // '/projects' represents the name of the Projects Database in CSharp application.
            // id is what is being passed through within the 'getById()' function.
            $http.get(apiUrl + '/projects/' + id)
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
        function update(project) {
            //use the $q.defer method to create/return a 'promise'
            var defer = $q.defer();
            // 'apiUrl' is equivalent to the API key generated.
            // '/projects' represents the name of the Projects Database in CSharp application.
            // project.projectId === attach the projectId to the project, to select which project is being updated.
            // project is what is being passed through within the 'update()' function.
            $http.put(apiUrl + '/projects/' + project.projectId, project)
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
        function remove(project) {
            //use the $q.defer method to create/return a 'promise'
            var defer = $q.defer();
            // 'apiUrl' is equivalent to the API key generated.
            // '/projects' represents the name of the Projects Database in CSharp application.
            // project.projectId === attach the projectId to the project, to select which project is being removed.
            $http.delete(apiUrl + '/projects/' + project.projectId)
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