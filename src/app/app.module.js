(function() {
    'use strict';

    angular
        .module('app', ['ui.router', 'toastr'])
        // add .value ('apiUrl') to represent the full api key, without having to type the entire content within the factory. Rather, simply just call 'apiUrl' in the factories.
        .value('apiUrl', 'http://localhost:58309/api') 
        .config(appConfig);

        appConfig.$inject = ["$urlRouterProvider", "$stateProvider"]

        function appConfig($urlRouterProvider, $stateProvider) {
        	$urlRouterProvider.otherwise('dashboard');

        	$stateProvider
        		.state('dashboard', {
        			url: '/dashboard',
        			controller: 'DashboardController as dashboard',
        			templateUrl: 'app/dashboard/dashboard.html'
        			})
        		.state('student', {
        			url: '/student',
        			abstact: true,
        			template: '<div ui-view></div>'
        		})
        			.state('student.grid', {
        				url: '/grid',
        				controller: 'StudentGridController as studentGrid',
        				templateUrl: 'app/student/student.grid.html'
        			})
        			.state('student.detail', {
        				url: '/detail?studentId',
        				controller: 'StudentDetailController as studentDetail',
        				templateUrl: 'app/student/student.detail.html'
        			})
                    .state('student.addStudent', {
                        url: '/addStudent',
                        controller: 'StudentAddStudentController as studentAddStudent',
                        templateUrl: 'app/student/student.addStudent.html'
                    })
                .state('project', {
                    url: '/project',
                    abstact: true,
                    template: '<div ui-view></div>'
                })
                    .state('project.grid', {
                        url: '/grid',
                        controller: 'ProjectGridController as projectGrid',
                        templateUrl: 'app/project/project.grid.html'
                    })
                    .state('project.detail', {
                        url: '/detail?projectId',
                        controller: 'ProjectDetailController as projectDetail',
                        templateUrl: 'app/project/project.detail.html'
                    })
                    .state('project.addProject', {
                        url: '/addProject',
                        controller: 'ProjectAddProjectController as projectAddProject',
                        templateUrl: 'app/project/project.addProject.html'
                    });

        }
})();