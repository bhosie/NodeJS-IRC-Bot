/**
 * Poke
 *
 * @author		TJ Hunter
 * @website		
 * @copyright	TJ Hunter
 */
var sys = require('util');

Plugin = exports.Plugin = function(irc) {
	this.name = 'poke';
	this.title = 'poke';
	this.version = '0.1';
	this.author = 'TJ Hunter';

	this.irc = irc;

	this.irc.addTrigger(this, 'poke', this.trigPoke);

};

Plugin.prototype.trigPoke = function(msg) {
	var c = msg.arguments[0]; // channel
	var u = this.irc.user(msg.prefix); // user
	var m = msg.arguments[1]; // message
   var chan = this.irc.channels[c]; // channel object
   var params = m.split(' ');

	params.shift();

	var nicks = [];
	for (var i=0; i < chan.users.length; i++ ) {
		if (this.irc.nick != chan.users[i]) {
			nicks.push(chan.users[i]);
		}
	}
	chan.send('Hey ' + nicks.join(', ') + '!');
};
