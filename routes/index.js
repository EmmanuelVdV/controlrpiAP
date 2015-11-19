var express = require('express');
var router = express.Router();

var exec = require("child_process").exec;

/* GET home page. */
router.get('/', function(req, res, next) {
  exec("sudo service hostapd status && sudo hostapd_cli all_sta | grep \"^[0-9][0-9]:\"", function (error, stdout, stderr) {
    console.log("le message est:"+stdout.trim());
    var statut=1;
    var connectedMAC="";
    if (stdout.trim().toLowerCase() == "failed") {statut=0}
    res.render('index', { status : statut });
  });
});

module.exports = router;
