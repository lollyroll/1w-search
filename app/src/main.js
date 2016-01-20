require.config({
  baseUrl: './src',
  paths: {
    jquery: 'vendor/jquery/dist/jquery',
    underscore: 'vendor/underscore-amd/underscore',
    backbone: 'vendor/backbone-amd/backbone',
    text: 'vendor/requirejs-text/text'
  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    }
  }
});

require([
'jquery',
'routers/base_router',
'underscore',
'backbone'
], function (jquery, base_router, underscore, backbone) {
  
});