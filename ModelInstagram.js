'use strict';
var events = require('events');
var mongoose = require('mongoose');
var ModelBase = require('./modelBase');

var ModelInstagram = new ModelBase();

ModelInstagram.documentDefinition = new mongoose.Schema({
    "id":String,
    "user_full_name":String,
    "user_id":String,
    "user_profile_picture":String,
    "user_name":String,
    "image_low_resolution":String,
    "image_standard_resolution":String,
    "image_thumbnail":String,
    "likes":String,
    "date":String,
    "text":String,
    "link":String
});

var actions = {
	init: function(){
		ModelInstagram.init( mongoose,
		"PopularInstagram", 
		ModelInstagram.documentDefinition,
		function(status){
			this.emit('init');
			console.log("Database Status: " + status);
		});
	},
	save: function(doc) {
		ModelInstagram.save(doc);
	},
	close: function() {
		mongoose.disconnect();
	}
};

actions.prototype = events.EventEmitter.prototype;




module.exports = actions ;
