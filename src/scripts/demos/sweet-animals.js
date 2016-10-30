(function() {

	console.log('// sweet animals');

	/**
	 * Animal class.
	 */
	var Animal = Class.extend({

		init: function Animal(name) {
			this._name = name;
		},

		name: function() {
			return this._name;
		},

		toString: function() {
			return 'i\'m a ' + this.name();
		}

	});

	/**
	 * Lion class.
	 */
	var Lion = Animal.extend({

		init: function Lion() {
			this._super.init('lion');
		},

		roar: function() {
			console.log('Grrrrrrr!!!');
		}

	});

	/**
	 * Dog class.
	 */
	var Dog = Animal.extend({

		init: function Dog() {
			this._super.init('dog');
		},

		bark: function() {
			console.log('Wof wof!!');
		}

	});

	// instantiate a Lion and a Dog

	var lion = new Lion();

	console.log(lion.toString());

	lion.roar();

	console.log('is lion instance of Lion? ' + (lion instanceof Lion));

	console.log('is lion instance of Dog? ' + (lion instanceof Dog));

	console.log('is lion instance of Animal? ' + (lion instanceof Animal));

	console.log('is lion of type Lion? ' + (typeOf(lion) === 'Lion'));

	console.log('is Lion constructor name Lion? ' + (Lion.name === 'Lion'));

	var dog = new Dog();

	console.log(dog.toString());

	dog.bark();

	console.log('is dog instance of Dog? ' + (dog instanceof Dog));

	console.log('is dog instance of Lion? ' + (dog instanceof Lion));

	console.log('is dog instance of Animal? ' + (dog instanceof Animal));

	console.log('is dog of type Dog? ' + (typeOf(dog) === 'Dog'));

	console.log('is Dog constructor name Dog? ' + (Dog.name === 'Dog'));

	// instantiate an animal (no specific type)

	var animal = new Animal('rare animal');

	console.log(animal.toString());

	console.log('is animal instance of Dog? ' + (animal instanceof Dog));

	console.log('is animal instance of Lion? ' + (animal instanceof Lion));

	console.log('is animal instance of Animal? ' + (animal instanceof Animal));

	console.log('is animal of type Animal? ' + (typeOf(animal) === 'Animal'));

	console.log('is Animal constructor name Animal? ' +
		(Animal.name === 'Animal'));

	// exact type discovering function

	function typeOf(obj) {
		return obj.constructor.name || Object.name;
	}

})();
