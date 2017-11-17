angular.module("schemaForm").run(["$templateCache", function($templateCache) {$templateCache.put("directives/decorators/bootstrap/codemirror/codemirror.html","<div class=\"form-group {{form.htmlClass}}\" ng-class=\"{\'has-error\': hasError()}\">\n    <div ng-init=\"form.model=model\">\n        <label for=\"{{form.key.slice(-1).pop()}}\" class=\"control-label {{form.labelHtmlClass}}\" ng-show=\"showTitle()\">{{form.title}}</label>\n        <div ng-if=\"form.codemirrorButtons\" class=\"cm-buttons\">\n            <span class=\"btn-group\" ng-repeat=\"buttonGroup in form.codemirrorButtons\">\n                <button ng-repeat=\"button in buttonGroup\" ng-click=\"evalInScope(button.onClick)\" type=\"button\" class=\"btn btn-sm btn-default\"\n                    id=\"btnBold\" title=\"{{ button.title }}\">\n                    <span ng-if=\"button.icon\" class=\"glyphicon\" ng-class=\"\'glyphicon-\' + button.icon\"></span>\n                    <span ng-if=\"button.label\" ng-bind-html=\"button.label\"></span>\n                </button>\n            </span>\n        </div>\n        <div codemirror-buttons ui-codemirror ui-codemirror-opts=\"getCodemirrorOptions()\" ng-style=\"form.style\" class=\"{{form.fieldHtmlClass}}\"\n            ng-model=\"$$value$$\" sf-changed=\"form\" schema-validate=\"form\"></div>\n        <span class=\"help-block\">{{(hasError() && errorMessage(schemaError())) || form.description}}</span>\n    </div>\n</div>");}]);
angular.module('schemaForm')
  .config(['schemaFormProvider', 'schemaFormDecoratorsProvider', function(schemaFormProvider, schemaFormDecoratorsProvider) {
    // Add to the bootstrap directive
    schemaFormDecoratorsProvider.addMapping('bootstrapDecorator',
      'codemirror',
      'directives/decorators/bootstrap/codemirror/codemirror.html');
    schemaFormDecoratorsProvider.createDirective('codemirror',
      'directives/decorators/bootstrap/codemirror/codemirror.html');
  }])

  .directive('codemirrorButtons', function() {
    return {
      controller: ['$scope', function($scope) {
        $scope.getCodemirrorOptions = function() {
          var opts = angular.copy($scope.form.codemirrorOptions);
          opts.onLoad = function(cm) {
            $scope.cm = cm;
          };
          return opts;
        };
      }]
    };
  });
