'use strict';
var events = require('events');
var mongoose = require('mongoose');
var ModelBase = require('./modelBase');

var ModelLogger = new ModelBase();

ModelLogger.documentDefinition = new mongoose.Schema({
    "date":String,
    "type":String,
    "text":String
});


function Actions() {

	events.EventEmitter.call(this);

	this.init = function(){
		events.EventEmitter.call(this);
		var $me = this;
		ModelLogger.init( mongoose,
			"PopularInstagram", 
			ModelLogger.documentDefinition,
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
		ModelLogger.save(doc);
	};

	this.close = function() {
		mongoose.disconnect();
	};

	this.buildDataBaseObject = function(object)
	{

	    return {
		    "date":new Date(),
		    "type":String,
		    "text":String
	    }
	}
}

Actions.prototype.__proto__ = events.EventEmitter.prototype;

module.exports = new Actions() ;
