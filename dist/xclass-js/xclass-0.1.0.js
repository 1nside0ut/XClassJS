/**
 * XClassJS
 * 
 * Extended 'Simple JavaScript Inheritance' (originally from John Resig)
 * 
 * It upgrades the original code from John Resig, providing the capability to 
 * correctly determine the type of an instance within the inheritance tree, by 
 * means of 'an onymous' constructor (in other words, 'init' being a named function
 * within a class implementation). 
 * 
 * It also improves inheritance, providing the extending classes full access to 
 * super class members by means of a new inner field _super (a reference to the 
 * parent prototype, instead of a function wrapping an overriden method), something 
 * that was not possible in the original code, which only limited to provide _super 
 * as a function to the overriden method, but not the full parent class scope.
 * 
 * @version 0.1.0
 * 
 * @author manuelbarzi
 */
var Class;
(function() {

	var initializing = false,
		fnTest = /xyz/.test(function() {
			xyz;
		}) ? /\b_super\b/ : /.*/;

	// The base Class implementation (does nothing)
	Class = function Class() {};

	// Create a new Class that inherits from this class
	Class.extend = function(body) {
		var _super = this.prototype;

		// Instantiate a base class (but only create the instance,
		// don't run the init constructor)
		initializing = true;
		var prototype = new this();
		initializing = false;

		// Wrap all _super methods in a new __super object so it can be used
		// to provide 'direct super-class members invocation', avoiding the need
		// to use 'call' or 'apply' from an child-class instance. 
		var __super = {};
		(function() {
			for (var name in _super) {
				(function(name, member) {
					if (typeof member === 'function')
						__super[name] = function() {
							// _this is a reference to the current object, set only in members
							// requiring _super (see below in next closure, where these members
							// are wrapped to accomplish that goal) 
							return member.apply(__super._this, arguments);
						};
				})(name, _super[name]);
			}
		})();

		// Copy the properties over onto the new prototype
		(function() {
			for (var name in body) {
				// Check if we're overwriting an existing function
				prototype[name] = typeof body[name] == 'function' &&
					typeof _super[name] == 'function' &&
					fnTest.test(body[name]) ? (function(member) {
						return function() {
							var tmp = this._super;

							// Temporary set _super reference to the super-class prototype and assign 
							// _this to current instance
							this._super = __super;
							__super._this = this;

							// The method only need to be bound temporarily, so we
							// remove it when we're done executing
							var ret = member.apply(this, arguments);

							this._super = tmp;

							return ret;
						};
					})(body[name]) : body[name];
			}
		})();

		// The dummy class constructor

		var Class;

		// All construction is actually done in the init method

		function construct() {
			if (!initializing && this.init)
				this.init.apply(this, arguments);
		}

		// Force eval to correctly inherit the name of the constructor (named
		// function assigned to init), otherwise is not possible to set it (the
		// name of a function is read-only and it can only be defined at the
		// time it is declared; See https://
		// developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name
		eval('Class = function ' +
			(body.init && body.init.name ? body.init.name : 'Class') +
			'() { construct.apply(this, arguments); };');

		// Populate our constructed prototype object
		Class.prototype = prototype;

		// Enforce the constructor to be what we expect
		Class.prototype.constructor = Class;

		// And make this class extendable
		Class.extend = arguments.callee;

		return Class;
	};

})();

// export

if (typeof module === 'object' && module.exports)
	module.exports = Class;
