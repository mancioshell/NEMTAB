
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

exports.webapp = function(req, res){
    res.render('webapp');
};

exports.partial = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};