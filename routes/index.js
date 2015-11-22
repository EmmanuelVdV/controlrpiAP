var express = require('express');
var router = express.Router();

var exec = require('child_process').exec;

/* GET home page. */
router.get('/', function(req, res, next) {
  exec("sudo service hostapd status", function (error, stdout, stderr) {
  	if (error) { // si erreur => page d'erreur
  		res.render('error', { err : error.message });
	}


	// si le message est "failed", le service est arrêté
	if (stdout.trim().toLowerCase().indexOf('failed') > -1) { // stdout.trim().toLowerCase().includes('failed')
		statut=0;
		res.render('startservice');
	}

	// sinon le service est up
	exec("sudo hostapd_cli all_sta | grep \"^[0-9][0-9]:\""), function(error, stdout, stderr) {
		if (error) {
			res.render('error', {err : error.message });
		}

		console.log("le message est : "+stdout.trim());
		var statut=1;
		var connectedMAC=stdout.trim();
		res.render('stopservice', {listConnected : connectedMAC });
	};
  });
});


module.exports = router;
