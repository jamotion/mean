'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Pack1 = new Module('pack1');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Pack1.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Pack1.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Pack1.menus.add({
    title: 'pack1 example page',
    link: 'pack1 example page',
    roles: ['authenticated'],
    menu: 'main'
  });

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Pack1.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Pack1.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Pack1.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Pack1;
});
