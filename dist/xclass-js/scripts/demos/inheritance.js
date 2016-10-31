(function() {
	var A = Class.extend({
		init: function(id) {
			console.log('A: init ' + id);
		},

		hello: function(who) {
			console.log('A: hello ' + who);
		},

		hola: function(who) {
			console.log('A: hola ' + who);
		}

	});

	var from = 'from a';
	console.log(from);
	var a = new A(from);
	a.hello(from);

	var B = A.extend({
		init: function(id) {
			this._super.init(id);
			console.log('B: init ' + id);
		},

		hello: function(who) {
			this._super.init(who);
			console.log('B: hello ' + who);
		},

		hola: function(who) {
			console.log('B: hola ' + who);
		},

		ciao: function(who) {
			console.log('B: ciao ' + who);
		}
	});

	from = 'from b';
	console.log(from);
	b = new B(from);
	b.hello(from);

	var C = B.extend({
		init: function(id) {
			this._super.init(id);
			console.log('C: init ' + id);
		},

		hello: function(who) {
			this._super.hello(who);
			console.log('C: hello ' + who);
			this._super.hola(who);
			this.hola(who);
		},

		hola: function(who) {
			console.log('C: hola ' + who);
		}
	});

	from = 'from c';
	console.log(from);
	c = new C(from);
	c.hello(from);
})();
