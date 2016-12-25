/**
 * DB
 * 
 * @namespace db
 * @author Georgi Popov
 * @version 1.0.0
 * @license http://www.gnu.org/licenses/gpl-3.0.en.html GPLv3
 * @requires com/magadanski/core/core.js
 * @requires com/magadanski/core/utils.js
 * @requires com/magadanski/core/EventDispatcher.js
 * @requires com/magadanski/core/Exception.js
 */

define('com.magadanski.db.DB', function () {
	var that;
	var utils = inc('com.magadanski.utils', true);
	
	// private properties
	
	// private methods
	
	var DB = function (options, autoOpen) {
		that = this;
		
		// priviledged properties
		that.options = utils.extendOptions(that.defaultInitOptions, options);
		
		// priviledged methods
		that.open = function (e) {
			that.dispatchEvent('created');
		}
		
		// constructor
		if (typeof(that.options.name) === 'undefined') {
			throw(new com.magadanski.exceptions.Exception('The "name" option is required for com.magadanski.db.DB'));
		}
		
		if (typeof(that.options.onCreated) === 'function') {
			that.addEventListener('created', that.options.onCreated);
		}
		
		if (typeof(autoOpen) === 'undefined' || autoOpen !== false) {
			that.open();
		}
	}
	
	DB.inherits(com.magadanski.core.EventDispatcher);
	com.magadanski.db.DB = DB;
	
	// public properties
	DB.prototype.defaultInitOptions = {
		version: '1.0',
		description: '',
		size: '2M',
		onCreated: function (e) {}
	};
	
	// public methods
	DB.prototype.calcSize = function (textSize) {
		var byteSize = parseInt(textSize);
		
		try {
			switch (textSize.match(/(\D)B?/)[1].toLowerCase()) {
				case 't':
					byteSize *= 1024;
				case 'g':
					byteSize *= 1024;
				case 'm':
					byteSize *= 1024;
				case 'k':
					byteSize *= 1024;
			}
		} catch (ex) {
			// use original byteSize value
		}
		
		return byteSize;
	}
});
