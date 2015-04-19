#[NEMTAB] NodeJS ExpressJS MongoDB Toastr AngularJS Bootstrap Seed

     I improved this project, adding Toastr (https://github.com/CodeSeven/toastr) for
     Popup Notifications, and creating a small set of REST APIs to perform login,
     logout, signup (using passport js as middleware) and some CRUD operations
     with Express JS and MongoDB.

     I remove Jade Templating, because i don't like it, so i implemented some
     little html partilals, using Angular JS template engine.

     Also added bower configuration file to handle JS browser dependencies.

     Added RequireJS.
     Added unit test base configuration with Jasmine and Karma.

     Renamed app.js in server.js.

     To start application :
        npm install // to install node modules dependencies
        bower install // to install bower dependencies
        node server.js

     To minify application:
        node_modules/requirejs/bin/r.js -o tools/app.build.js



Forked from [btford/angular-express-seed](https://github.com/btford/angular-express-seed) and spiced with [Twitter Bootstrap](https://github.com/twitter/bootstrap). jQuery added for convenience.

Start an awesome app with AngularJS + Bootstrap on the front, Express + Node on the back. This project is an
application skeleton for a typical [AngularJS](http://angularjs.org/) web app for those who want
to use Node to serve their app.

The seed contains angular libraries, test libraries and a bunch of scripts all preconfigured for
instant web development gratification. Just clone the repo (or download the zip/tarball) and
you're ready to develop your application.

The seed app shows how to wire together Angular client-side components with Express on the server.
It also illustrates writing angular partials/views with the Jade templating library.

_Note: Although Jade supports interpolation, you should be doing that mostly on the client. Mixing
server and browser templating will convolute your app. Instead, use Jade as a syntactic sugar for
HTML, and let AngularJS take care of interpolation on the browser side._

## How to use angular-express-seed

Clone the angular-express-seed repository, run `npm install` to grab the dependencies and start hacking!

### Running the app

Runs like a typical express app:

    node server.js

### Running tests

Coming soon!

### Receiving updates from upstream

Just fetch the changes and merge them into your project with git.


## Directory Layout
    
    server.js              --> app config
    package.json        --> for npm
    config/             --> contains mongoDB and passport configuration
        database.js
        passport.js
    models/             --> contains mongoDB simple user Schema
        users.js
        person.js
        thing.js
        models.js
    public/             --> all of the files to be used in on the client side
      css/              --> css files
        app.css         --> default stylesheet
      js/               --> javascript files
        app.js          --> declare top-level app module
        controllers.js  --> application controllers
        directives.js   --> custom angular directives
        filters.js      --> custom angular filters
        services.js     --> custom angular services
        bower_components/            --> angular and 3rd party JavaScript libraries
          angular/
          angular-local-storage/
          angular-route/
          bootstrap/
          cryptojslib/
          jquery/
          noty/
    app/
      api.js            --> api definitions
      routes.js          --> route for serving HTML pages, JSON and partials
    views/
      index.html        --> main page for app
      partials/         --> angular view partials (partial jade templates)
        header.html
        nav.html
        register.html
        login.html
      auth/
        home.html
        person.html
        thing.html



## Example App

A simple [blog](https://github.com/btford/angular-express-blog) based on this seed.


## Contact

For more information on AngularJS please check out http://angularjs.org/
For more on Express and Jade, http://expressjs.com/ and http://jade-lang.com/ are
your friends.
