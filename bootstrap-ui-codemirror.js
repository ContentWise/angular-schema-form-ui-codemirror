angular.module("schemaForm").run(["$templateCache", function($templateCache) {$templateCache.put("directives/decorators/bootstrap/codemirror/codemirror.html","<div class=\"form-group {{form.htmlClass}}\" ng-class=\"{\'has-error\': form.disableErrorState !== true && hasError(), \'has-success\': form.disableSuccessState !== true && hasSuccess()}\">\n    <div ng-init=\"form.model=model\">\n        <label for=\"{{form.key.slice(-1)[0]}}\" class=\"control-label {{form.labelHtmlClass}}\" ng-class=\"{\'sr-only\': !showTitle()}\" ng-show=\"showTitle()\">{{form.title}}</label>\n        <div ng-if=\"form.codemirrorButtons\" class=\"cm-buttons\">\n            <span class=\"btn-group\" ng-repeat=\"buttonGroup in form.codemirrorButtons\">\n                <button ng-repeat=\"button in buttonGroup\" ng-click=\"evalInScope(button.onClick)\" type=\"button\" class=\"btn btn-sm btn-default\"\n                    id=\"btnBold\" title=\"{{ button.title }}\">\n                    <span ng-if=\"button.icon\" class=\"glyphicon\" ng-class=\"\'glyphicon-\' + button.icon\"></span>\n                    <span ng-if=\"button.label\" ng-bind-html=\"button.label\"></span>\n                </button>\n            </span>\n        </div>\n        <div codemirror-buttons ui-codemirror ui-codemirror-opts=\"getCodemirrorOptions()\" ng-style=\"form.style\" class=\"{{form.fieldHtmlClass}}\" id=\"{{form.key.slice(-1)[0]}}\" sf-field-model=\"\" ng-model-options=\"form.ngModelOptions\" sf-changed=\"form\" schema-validate=\"form\"></div>\n        <span class=\"help-block\" sf-message=\"form.description\"></span>\n    </div>\n</div>");}]);
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
