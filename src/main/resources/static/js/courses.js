angular.module('courses', ['ngResource', 'ui.bootstrap']).
    factory('Courses', function ($resource) {
        return $resource('courses');
    }).
    factory('Course', function ($resource) {
        return $resource('courses/:id', {id: '@id'});
    }).
    factory("EditorStatus", function () {
        var editorEnabled = {};

        var enable = function (id, fieldName) {
            editorEnabled = { 'id': id, 'fieldName': fieldName };
        };

        var disable = function () {
            editorEnabled = {};
        };

        var isEnabled = function(id, fieldName) {
            return (editorEnabled['id'] == id && editorEnabled['fieldName'] == fieldName);
        };

        return {
            isEnabled: isEnabled,
            enable: enable,
            disable: disable
        }
    });

function CoursesController($scope, $modal, Courses, Course, Status) {
    function list() {
        $scope.courses = Courses.query();
    }

    function clone (obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    function saveCourse(course) {
        Courses.save(course,
            function () {
                Status.success("Course saved");
                list();
            },
            function (result) {
                Status.error("Error saving course: " + result.status);
            }
        );
    }

    $scope.addCourse = function () {
        var addModal = $modal.open({
            templateUrl: 'templates/courseForm.html',
            controller: CourseModalController,
            resolve: {
                course: function () {
                    return {};
                },
                action: function() {
                    return 'add';
                }
            }
        });

        addModal.result.then(function (course) {
            saveCourse(course);
        });
    };

    $scope.updateCourse = function (course) {
        var updateModal = $modal.open({
            templateUrl: 'templates/courseForm.html',
            controller: CourseModalController,
            resolve: {
                course: function() {
                    return clone(course);
                },
                action: function() {
                    return 'update';
                }
            }
        });

        updateModal.result.then(function (course) {
            saveCourse(course);
        });
    };

    $scope.deleteCourse = function (course) {
        Course.delete({id: course.id},
            function () {
                Status.success("Course deleted");
                list();
            },
            function (result) {
                Status.error("Error deleting course: " + result.status);
            }
        );
    };

    $scope.setCoursesView = function (viewName) {
        $scope.coursesView = "templates/" + viewName + ".html";
    };

    $scope.init = function() {
        list();
        $scope.setCoursesView("grid");
        $scope.sortField = "name";
        $scope.sortDescending = false;
    };
}

function CourseModalController($scope, $modalInstance, course, action) {
    $scope.courseAction = action;
    $scope.yearPattern = /^[1-2]\d{3}$/;
    $scope.course = course;

    $scope.ok = function () {
        $modalInstance.close($scope.course);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};

function CourseEditorController($scope, Courses, Status, EditorStatus) {
    $scope.enableEditor = function (course, fieldName) {
        $scope.newFieldValue = course[fieldName];
        EditorStatus.enable(course.id, fieldName);
    };

    $scope.disableEditor = function () {
        EditorStatus.disable();
    };

    $scope.isEditorEnabled = function (course, fieldName) {
        return EditorStatus.isEnabled(course.id, fieldName);
    };

    $scope.save = function (course, fieldName) {
        if ($scope.newFieldValue === "") {
            return false;
        }

        course[fieldName] = $scope.newFieldValue;

        Courses.save({}, course,
            function () {
                Status.success("Course saved");
                list();
            },
            function (result) {
                Status.error("Error saving course: " + result.status);
            }
        );

        $scope.disableEditor();
    };

    $scope.disableEditor();
}

angular.module('courses').
    directive('inPlaceEdit', function () {
        return {
            restrict: 'E',
            transclude: true,
            replace: true,

            scope: {
                ipeFieldName: '@fieldName',
                ipeInputType: '@inputType',
                ipeInputClass: '@inputClass',
                ipePattern: '@pattern',
                ipeModel: '=model'
            },

            template:
                '<div>' +
                    '<span ng-hide="isEditorEnabled(ipeModel, ipeFieldName)" ng-click="enableEditor(ipeModel, ipeFieldName)">' +
                        '<span ng-transclude></span>' +
                    '</span>' +
                    '<span ng-show="isEditorEnabled(ipeModel, ipeFieldName)">' +
                        '<div class="input-append">' +
                            '<input type="{{ipeInputType}}" name="{{ipeFieldName}}" class="{{ipeInputClass}}" ' +
                                'ng-required ng-pattern="{{ipePattern}}" ng-model="newFieldValue" ' +
                                'ui-keyup="{enter: \'save(ipeModel, ipeFieldName)\', esc: \'disableEditor()\'}"/>' +
                            '<div class="btn-group btn-group-xs" role="toolbar">' +
                                '<button ng-click="save(ipeModel, ipeFieldName)" type="button" class="btn"><span class="glyphicon glyphicon-ok"></span></button>' +
                                '<button ng-click="disableEditor()" type="button" class="btn"><span class="glyphicon glyphicon-remove"></span></button>' +
                            '</div>' +
                        '</div>' +
                    '</span>' +
                '</div>',

            controller: 'CourseEditorController'
        };
    });
