'use strict';

// The Package is past automatically as first parameter
module.exports = function(Pack1, app, auth, database) {

  app.get('/pack1/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/pack1/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/pack1/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/pack1/example/render', function(req, res, next) {
    Pack1.render('index', {
      package: 'pack1'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
