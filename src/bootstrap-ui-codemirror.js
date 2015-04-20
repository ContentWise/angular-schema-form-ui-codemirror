angular.module('schemaForm')
  .config(['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider', function(schemaFormProvider,  schemaFormDecoratorsProvider, sfPathProvider) {

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
    schemaFormDecoratorsProvider.addMapping('bootstrapDecorator',
      'codemirror',
      'directives/decorators/bootstrap/codemirror/codemirror.html');
    schemaFormDecoratorsProvider.createDirective('codemirror',
      'directives/decorators/bootstrap/codemirror/codemirror.html');
  }]);
