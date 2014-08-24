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


function Actions() {

	events.EventEmitter.call(this);

	this.init = function(){
		events.EventEmitter.call(this);
		var $me = this;
		ModelInstagram.init( mongoose,
			"PopularInstagram", 
			ModelInstagram.documentDefinition,
			function(response){
				if(response.status === "ok")
				{
					$me.emit('init');
				}
				else
				{
					$me.emit('error');
				}
			});
	};

	this.save = function(doc) {
		ModelInstagram.save(doc);
	};

	this.close = function() {
		mongoose.disconnect();
	};

	this.buildDataBaseObject = function(object)
	{

		if ( object.caption == null)
		{
			object.caption = {text:""} ;
		}
        
	    return {
	        "id":object.id,
	        "user_full_name":object.user.full_name , 
	        "user_id": object.user.id ,
	        "user_profile_picture": object.user.profile_picture ,
	        "user_name": object.user.username,
	        "image_low_resolution": object.images.low_resolution.url,
	        "image_standard_resolution" : object.images.standard_resolution.url,
	        "image_thumbnail" : object.images.thumbnail.url,
	        "likes":object.likes.count,
	        "date":object.created_time,
	        "text":object.caption.text,
	        "link":object.link
	    }
	}
}

Actions.prototype.__proto__ = events.EventEmitter.prototype;

module.exports = new Actions() ;
