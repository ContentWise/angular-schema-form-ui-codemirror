angular.module('schemaForm')
    .config(['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfBuilderProvider', function (schemaFormProvider, schemaFormDecoratorsProvider, sfBuilderProvider) {
        schemaFormDecoratorsProvider.createDirective('codemirror',
            'directives/decorators/bootstrap/codemirror/codemirror.html');
        schemaFormDecoratorsProvider.defineAddOn(
            'bootstrapDecorator',
            'codemirror',
            'directives/decorators/bootstrap/codemirror/codemirror.html',
            sfBuilderProvider.stdBuilders
        );
    }])

    .directive('codemirrorButtons', function () {
        return {
            controller: ['$scope', function ($scope) {
                $scope.getCodemirrorOptions = function () {
                    var opts = angular.copy($scope.form.codemirrorOptions);
                    opts.onLoad = function (cm) {
                        $scope.cm = cm;
                    };
                    return opts;
                };
            }]
        };
    });
