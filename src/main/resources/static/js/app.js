angular.module('SpringCourse', ['courses', 'errors', 'status', 'info', 'ngRoute', 'ui.directives']).
    config(function ($locationProvider, $routeProvider) {
        // $locationProvider.html5Mode(true);

        $routeProvider.when('/errors', {
            controller: 'ErrorsController',
            templateUrl: 'templates/errors.html'
        });
        $routeProvider.otherwise({
            controller: 'CoursesController',
            templateUrl: 'templates/courses.html'
        });
    }
);
