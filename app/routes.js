module.exports = function(app, passport) {

    app.get('/', function(req, res){
        res.render('index');
    });

    app.get('/home', isLoggedIn, function(req, res){
        res.render('webapp');
    });

    app.get('/partial/auth/:name', isLoggedIn, function (req, res) {
        var name = req.params.name;
        res.render('partials/auth/' + name);
    });

    app.get('/partial/:name', function (req, res) {
        var name = req.params.name;
        res.render('partials/' + name);
    });

    app.post('/api/login', passport.authenticate('local-login', {
        successRedirect : '/home', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // process the signup form
    app.post('/api/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/#/register', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


    app.get('/api/logout', isLoggedIn, function(req, res){
        req.logout();
        res.redirect('/');
    });

    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/');
    }

}
