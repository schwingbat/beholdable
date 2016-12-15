const Beholdable = require("../beholdable.js");

var tests = [];
var results = [];

function Test(desc, func) {
	return function() {
		return {
			description: desc,
			result: func(),
		};
	};
}

function run(t) {
	var total = t.length;
	var successes = 0;
	var failures = 0;

	t.forEach((tst) => {
		var res = tst();
		if (res.result) {
			successes++;
			console.log("\x1b[32m", `\u2713 ${ res.description }`, "\x1b[0m");
		} else {
			failures++;
			console.log("\x1b[31m", `\u2717 ${ res.description }`, "\x1b[0m");
		}
	});

	console.log(`\nOut of ${total} tests, ${successes} passed and ${failures} failed.\n`);
}

tests.push(new Test("Instantiates with no data", function() {
	const thing = new Beholdable();
	return thing instanceof Beholdable;
}));

tests.push(new Test("Instantiates with data", function() {
	const withData = new Beholdable({ greeting: "Hello world!" });
	return withData instanceof Beholdable && withData.data.greeting === "Hello world!";
}));

tests.push(new Test("Getting and setting values", function() {
	const thing = new Beholdable();
	thing.set("value1", 12);
	return thing.get("value1") === 12;
}));

tests.push(new Test("Add a beholder", function() {
	const b = new Beholdable();
	b.behold("val", function() {
		return "hello";
	});
	return "val" in b.beholders
		&& b.beholders["val"].length === 1
		&& b.beholders["val"][0]() === "hello";
}));

tests.push(new Test("Beholder callback fires when its value changes", function() {
	const b = new Beholdable();
	let works = false;
	b.behold("uh", function() {
		works = true;
	});
	b.set("uh", "um");
	return works;
}));

tests.push(new Test("Beholder callback doesn't fire if its new value is the same.", function() {
	const b = new Beholdable();
	let changed = false;
	b.set("uh", "um");
	b.behold("uh", function() {
		changed = true;
	});
	b.set("uh", "um");
	return changed === false;
}));

run(tests, results);
