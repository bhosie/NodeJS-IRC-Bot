/**
 * Last Seen Plugin
 *
 * @author		Michael Owens (Translated to English by TJ Hunter)
 * @website		http://www.michaelowens.nl
 * @copyright	Michael Owens 2011
 */
var sys = require('util');

Plugin = exports.Plugin = function(irc) {

	this.name = 'seen';
	this.title = 'Last Seen';
	this.version = '0.1';
	this.author = 'Michael Owens';

	this.irc = irc;

	this.gezien = [];

	this.irc.addTrigger(this, 'seen', this.trigGezien);

};

Plugin.prototype.onMessage = function(msg) {
	this.updateUser(msg);
};

Plugin.prototype.onJoin = function(msg) {
	this.updateUser(msg);
};

Plugin.prototype.onPart = function(msg) {
	this.updateUser(msg);
};

Plugin.prototype.onQuit = function(msg) {
	this.updateUser(msg);
};

Plugin.prototype.onNick = function(msg) {
	this.updateUser(msg, true);
};

Plugin.prototype.updateUser = function(msg, argument) {

	var u = this.irc.user(msg.prefix);
    console.log(u, msg.prefix);
	this.gezien[u.toLowerCase()] = new Date();

	if (typeof argument != 'undefined') {
		var u = msg.arguments[0];

		this.gezien[u.toLowerCase()] = new Date();
	}
}

Plugin.prototype.trigGezien = function(msg) {
	var c = msg.arguments[0], // channel
		u = this.irc.user(msg.prefix), // user
		m = msg.arguments[1], // message
        chan = this.irc.channels[c], // channel object
        params = m.split(' ');

	params.shift();

	if (typeof params[0] == 'undefined') {
		chan.send('\002Usage:\002 .seen <nick>');
	} else {
		var seek = params[0].toLowerCase();

		if (typeof this.gezien[seek] == 'undefined') {
			chan.send('I haven\'t seen \002' + params[ 0] + '\002!');
		} else {
			var dat = this.gezien[seek],
			    lastDate = dat.getDay() + '-' + dat.getMonth() + '-' + dat.getFullYear(),
			    lastTime = dat.getHours() + ':' + dat.getMinutes() + ':' + dat.getSeconds();

			chan.send('I saw \002' + params[ 0] + '\002 on: \002' + lastDate + '\002 at \002' + lastTime + '\002');
		}
	}
};
