/**
 * Mom
 *
 * @author		bhosie
 * @website		
 * @copyright	bhosie
 */
var sys = require('util');

Plugin = exports.Plugin = function(irc) {
	this.name = 'mom';
	this.title = 'mom';
	this.version = '0.1';
	this.author = 'bhosie';

	this.irc = irc;

	this.irc.addTrigger(this, 'mom', this.trigMom);

};

Plugin.prototype.trigMom = function(msg) {
	var c = msg.arguments[0]; // channel
	var u = this.irc.user(msg.prefix); // user
	var m = msg.arguments[1]; // message
   var chan = this.irc.channels[c]; // channel object
   var params = m.split(' ');

	params.shift();

	var jokes = [
		"your mom is so fat the recursive function calculating her mass causes a stack overflow",
		"Your mom is so fat she's on both sides of the family.",
		"Your mom is like a doorknob.... everyone gets a turn!",
		"Your mom is like a race car driver, she burns 50 rubbers a day.",
		"Yo mom is so stupid she thought a quarterback was a refund.",
		"Yo mom is so fat, she was floating in the ocean and Spain claimed her for the new world!",
		"Yo mom is so fat she can't even fit in the chat room.",
		"Your mom is like a hardware store, 5 cents a screw",
		"Yo mom is so poor when I rang the doorbell she stuck her head out the window and yelled ding dong.",
		"Yo mom is so poor, she has to hang toilet paper out to dry.",
		"Your mom is so fat, when she turns around they throw her a welcome back party.",
		"Your mom is so fat, people jog around her for exercise.",
		"Yo mom is so fat, her nickname is 'DAMN'",
	];
	
	if(jokes.length > 0){
		for (var i=0; i < chan.users.length; i++ ) {
			var inRoom = false;
			if (chan.users[i].toLowerCase() == params[0]) {
				var random = Math.floor(Math.random()*(jokes.length - 1));
				chan.send(params[0] + ", "+ jokes[random]);
				inRoom = true;
				break;
			}
		}
		
		if(inRoom == false){ //user not in room
				chan.send(u + ", " + params[0] + " isn't here. That's a low blow...");
			}
	
	}	
	
};
