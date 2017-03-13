(function() {
	var A = Class.extend({
		init: function(id) {
			this.id = id;
			console.log(id + ': init (from A)');
		},

		hello: function(who) {
			console.log(this.id + ': hello ' + who + '! (from A)');
		},

		hola: function(who) {
			console.log(this.id + ': hola ' + who + '! (from A)');
		},

		hallo: function(who) {
			console.log(this.id + ': hallo ' + who + '! (from A)');
		}
	});

	var a = new A('A');
	a.hello('world');

	var B = A.extend({
		init: function(id) {
			this._super.init(id);
			console.log(id + ': init (from B)');
		},

		hello: function(who) {
			console.log(this.id + ': hello ' + who + '! (from B)');
		},

		hola: function(who) {
			console.log(this.id + ': hola ' + who + '! (from B)');
		},

		ciao: function(who) {
			console.log(this.id + ': ciao ' + who + '! (from B)');
		}
	});

	var b = new B('B');
	b.hello('world');

	var C = B.extend({
		init: function(id) {
			this._super.init(id);
			console.log(id + ': init (from C)');
		},

		hello: function(who) {
			this._super.hello(who);
			console.log(this.id + ': hello ' + who + '! (from C)');
			this._super.hola(who);
			this.hola(who);
			this.hallo(who);
			this._super.hallo(who);
			this.ciao(who);
		},

		hola: function(who) {
			console.log(this.id + ': hola ' + who + '! (from C)');
		}
	});

	var c = new C('C');
	c.hello('world');
})();
