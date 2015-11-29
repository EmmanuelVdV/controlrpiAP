var express = require('express');
var router = express.Router();

var exec = require('child_process').exec;

/* GET home page. */
router.get('/', function(req, res, next) {
 	exec("sudo service hostapd status", function (error, stdout, stderr) {
	  	/* if (error) { // si erreur => page d'erreur
	  		res.render('error', { err : error.message });
	  		return;
		} retiré car erreur quand le service ne tourne pas */


		// si le message est "failed", le service est arrêté
		if (stdout.trim().toLowerCase().indexOf('failed') > -1) { // stdout.trim().toLowerCase().includes('failed')
			statut=0;
			res.render('startservice');
			return;
		}

		// sinon le service est up
		exec("sudo hostapd_cli all_sta", function(error1, stdout1, stderr1) {
		// DEBUG exec("ls", function(error1, stdout1, stderr1) {
			if (error1) {
				res.render('error', {err : error1.message });
				return;
			}

			console.log("le message est : "+stdout1.trim());
			// pour l'instant cette regexp ne fonctionne pas
			var reg = new RegExp('[0-9a-fA-F][0-9a-fA-F]:[0-9a-fA-F][0-9a-fA-F]:[0-9a-fA-F][0-9a-fA-F]:[0-9a-fA-F][0-9a-fA-F]:[0-9a-fA-F][0-9a-fA-F]:[0-9a-fA-F][0-9a-fA-F]');
			var connectedMAC=stdout1.match(reg);
			if (!connectedMAC) {connectedMAC = 'No connected device';} else {connectedMAC = connectedMAC.toString();}
			res.render('stopservice', {listConnected : connectedMAC });
	});
  });
});


module.exports = router;
