// A modular observable state container.

(function() {
	"use strict";

	var isEqual = function(one, two) {
		// I swear I'll be deep comparing objects later.
		return one === two;
	}

	function Beholdable(initialData) {
		this.data = {};
		this.beholders = {};

		if (initialData) {
			Object.assign(this.data, initialData);
		}
	}

	Beholdable.prototype.set = function(key, val) {
		var oldVal = this.data[key];
		this.data[key] = val;

		// Call each callback in the chain on change, passing the new value and the old value.
		if (this.beholders[key] && !isEqual(oldVal, val)) {
			for (var i = 0; i < this.beholders[key].length; i++) {
				this.beholders[key][i](val, oldVal);
			}
		}
	}

	Beholdable.prototype.get = function(key) {
		if (!key) {
			return this.data;
		}
		return this.data[key];
	}

	Beholdable.prototype.behold = function(key, callback) {
		if (typeof callback !== 'function') {
			throw new Error("Observe requires a key (string) and a callback (function) to run when that key value changes. The passed callback is not a function.");
		}
		if (!this.beholders[key]) {
			this.beholders[key] = [];
		}
		this.beholders[key].push(callback);
	}

	if (typeof module !== 'undefined' && 'exports' in module) {
		module.exports = Beholdable;
	} else {
		if (typeof window !== undefined) {
			window.Beholdable = Beholdable;
		}
	}
})();
