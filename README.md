# BEHOLD!
## Beholdable.js v1.0.1

### What?

```javascript

const state = new Beholdable();

state.behold("loggedIn", function(val) {
	if (val) {
		alert("Hello!");
	} else {
		alert("Goodbye.");
	}
});

state.set("loggedIn", true); // triggers alert "Hello!"
state.set("loggedIn", false); // triggers alert "Goodbye."

// You can also get values from your Beholdable:
state.get("loggedIn"); // => false
```

That's it. Observable objects. When you change them, the callbacks are fired, but only if the new value is different than the old one.
