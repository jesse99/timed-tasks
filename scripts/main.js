let speedup = 10;		// development knob

// Returns a number in [min, max).
function random_int(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;	// note that the seed is chosen by the browser
}

function lookup(key) {
	let value = strings[key];
	if (value) {
		return value;
	}
	console.log("Couldn't find a string for '" + key + "'");
	return key;
}

function choose(from) {
	// bit silly to compute this every time but length is small enough that it's perfectly fine
	let total_weight = from.reduce(function(sum, entry) {
		return sum + entry.weight}, 0);
	
	var current_weight = 0;
	while (true) {
		let i = random_int(0, from.length);
		console.assert(from[i].weight > 0);
		current_weight += from[i].weight;
		if (current_weight >= total_weight) {
			return from[i];
		}
	}
}

function run_tasks() {
	let entry = choose(tasks);
	var task = document.querySelector("#task");
	task.textContent = entry.title;

	setTimeout(run_tasks, entry.secs*1000/speedup);
}

window.addEventListener("DOMContentLoaded", function(){
	// selectors: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors
	var title = document.querySelector("title");
	title.textContent = lookup("window-title");

	setTimeout(run_tasks, 1);
	// XXX
	// use a progress bar while waiting
	// alternate between tasks and rest
	// add speedup to the data file
});
