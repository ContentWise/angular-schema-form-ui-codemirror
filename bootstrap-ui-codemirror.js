angular.module("schemaForm").run(["$templateCache", function($templateCache) {$templateCache.put("directives/decorators/bootstrap/codemirror/codemirror.html","<div class=\"form-group\" ng-class=\"{\'has-error\': hasError()}\">\n  <label class=\"control-label\" ng-show=\"showTitle()\">{{form.title}}</label>\n  <div ui-codemirror=\"form.codemirrorOptions\" style=\"form.style\" ng-model=\"$$value$$\" schema-validate=\"form\"></div>\n  <span class=\"help-block\">{{ (hasError() && errorMessage(schemaError())) || form.description}}</span>\n</div>\n");}]);
angular.module('schemaForm').config(
['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider',
  function(schemaFormProvider,  schemaFormDecoratorsProvider, sfPathProvider) {

    var codemirror = function(name, schema, options) {
      if (schema.type === 'codemirror') {
        var f = schemaFormProvider.stdFormObj(name, schema, options);
        f.key  = options.path;
        f.type = 'codemirror';
        options.lookup[sfPathProvider.stringify(options.path)] = f;
        return f;
      }
    };

    schemaFormProvider.defaults.string.unshift(codemirror);

    // Add to the bootstrap directive
    schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'codemirror',
      'directives/decorators/bootstrap/codemirror/codemirror.html');
    schemaFormDecoratorsProvider.createDirective('codemirror',
      'directives/decorators/bootstrap/codemirror/codemirror.html');
  }]);
