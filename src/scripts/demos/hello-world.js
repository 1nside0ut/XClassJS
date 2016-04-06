(function() {

	console.log('// hello world');

	/**
	 * HelloWorld class.
	 */
	var HelloWorld = Class.extend({

		init : function HelloWorld(salutation) {
			this._salutation = salutation || 'Hello World!';
		},

		salute : function() {
			console.log(this._salutation);
		}

	});

	// use HelloWorld class

	var hello = new HelloWorld();

	hello.salute(); // outputs 'Hello World!'

	// pass a new salutation

	hello = new HelloWorld('Hola Mundo!');

	hello.salute(); // outputs 'Hola Mundo!'

})();