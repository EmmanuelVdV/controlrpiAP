var express = require('express');
var router = express.Router();

var exec = require('child_process').exec;

/* GET service pages */
router.get('/startservice', function(req, res, next) {
	exec("sudo service hostapd start", function (error, stdout, stderr) {
		if (error) { // si erreur => pagge d'erreur
			res.render('error', {err : error.message });
			return;
		}

		res.redirect('/');
	});
});

router.get('/stopservice', function(req, res, next) {
	exec("sudo service hostapd stop", function (error, stdout, stderr) {
		if (error) { // si erreur => pagge d'erreur
			res.render('error', {err : error.message });
			return;
		}

		res.redirect('/');
	});
});

module.exports = router;
