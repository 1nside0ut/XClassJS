/**
 * XClassJS
 * 
 * An eXtension on simple Class inheritance in JavaScript, from John Resig.
 * 
 * It upgrades the original code, providing the capability to correctly
 * determine the type of an instance within the inheritance tree, by means of
 * 'an onymous' constructor (in other words, 'init' being a named function
 * within a class implementation).
 * 
 * @version 0.0.1
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
    Class.extend = function(prop) {
        var _super = this.prototype;

        // Instantiate a base class (but only create the instance,
        // don't run the init constructor)
        initializing = true;
        var prototype = new this();
        initializing = false;

        // Copy the properties over onto the new prototype
        for (var name in prop) {
            // Check if we're overwriting an existing function
            prototype[name] = typeof prop[name] == 'function' &&
                typeof _super[name] == 'function' &&
                fnTest.test(prop[name]) ? (function(name, fn) {
                    return function() {
                        var tmp = this._super;

                        // Add a new ._super() method that is the same method
                        // but on the super-class
                        this._super = _super[name];

                        // The method only need to be bound temporarily, so we
                        // remove it when we're done executing
                        var ret = fn.apply(this, arguments);
                        this._super = tmp;

                        return ret;
                    };
                })(name, prop[name]) : prop[name];
        }

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
            (prop.init && prop.init.name ? prop.init.name : 'Class') +
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
