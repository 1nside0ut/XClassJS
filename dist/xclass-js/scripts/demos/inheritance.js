(function() {
	var A = Class.extend({
		init: function(id) {
			console.log('A ' + id);
		},

		hello: function(who) {
			console.log('A: hello ' + who);
		},

		hola: function(who) {
			console.log('A: hola ' + who);
		}

	});

	var a = new A(1);
	a.hello('1');

	var B = A.extend({
		init: function(id) {
			this._super.init(id);
			console.log('B ' + id);
		},

		hello: function(who) {
			this._super.hello(who);
			console.log('B: hello ' + who);
		},

		ciao: function(who) {
			console.log('B: hola ' + who);
		}
	});

	b = new B(2);
	b.hello('2');

	var C = B.extend({
		init: function(id) {
			this._super._super.init(id); // nice! it calls constructor from A, avoiding B.
			console.log('C ' + id);
		},

		hello: function(who) {
			this._super.hello(who);
			console.log('C: hello ' + who);
			this._super.hola(who); // nice! it calls member from A
			this.hola(who);
		},

		hola: function(who) {
			console.log('C: hola ' + who);
		}
	});

	c = new C(3);
	c.hello('3');
})();
