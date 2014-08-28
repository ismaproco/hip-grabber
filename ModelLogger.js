'use strict';
var events = require('events');
var mongoose = require('mongoose');
var ModelBase = require('./modelBase');
var moment = require('moment');

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

	this.log = function(type, text) {

		ModelLogger.init( mongoose,
			"logInstagram", 
			ModelLogger.documentDefinition,
			function(response){
				if(response.status === "ok")
				{
					ModelLogger.save({
						date: moment().format(),
						type:type,
						text:text
					},function(){
						mongoose.disconnect();
					});
				}
			});
	};
}

Actions.prototype.__proto__ = events.EventEmitter.prototype;

module.exports = new Actions() ;
