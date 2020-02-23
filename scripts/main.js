/* eslint no-undef: "off" */
/* eslint no-console: "warn" */
"use strict";

var game_duration = undefined;
var win_probability = undefined;

// Returns a number in [min, max).
function random_int(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;	// note that the seed is chosen by the browser
}

function choose(from) {
	// bit silly to compute this every time but length is small enough that it's perfectly fine
	let total_weight = from.reduce(function(sum, entry) {
		return sum + entry.weight;}, 0);
	
	let current_weight = 0;
	for (;;) {
		let i = random_int(0, from.length);
		//console.assert(from[i].weight > 0);
		current_weight += from[i].weight;
		if (current_weight >= total_weight) {
			return from[i];
		}
	}
}

function phase_secs(context) {
	return 60*game_duration.mins[context.phase];
}

function update_progress(context) {
	if (context.value < 100) {
		context.value += 1;
		$(".progress-bar").css("width", context.value + "%");
		setTimeout(update_progress, context.interval, context);
	} else {
		$(".progress-bar").css("width", "0%");
		context.is_action = !context.is_action;
		if (context.is_action) {
			$(".progress-bar").attr("class", "progress-bar bg-warning");
		} else {
			$(".progress-bar").attr("class", "progress-bar bg-info");
		}
		if (context.phase == 0) {
			context.phase = 1;
			//console.log("now on phase " + context.phase);
			context.start = new Date().getTime();
		}
		begin(context);
	}
}

function begin(context) {
	let elapsed = (new Date().getTime() - context.start)/1000;
	let duration = phase_secs(context);
	let can_proceed = ((context.phase == 1 || context.phase == 2) && context.is_action) || // i.e. we were resting
					((context.phase != 1 && context.phase != 2));
	//let suffix = context.is_action ? " was resting" : "";
	//console.log("   elapsed=" + elapsed + " duration=" + duration + " can_proceed=" + can_proceed + suffix);
	if (elapsed >= duration && can_proceed) {
		context.phase += 1;
		//console.log("now on phase " + context.phase);
		context.start = new Date().getTime();
	}
	
	if (context.phase < phases.length-2) {
		// game phases
		let entry = undefined;
		if (context.phase == 1 && !context.is_action) {
			// use a fast rest for the very first one
			entry = rest[1];
		} else {
			entry = context.is_action ? choose(tasks) : choose(rest);
		}
		let label = document.querySelector("#label");
		label.textContent = entry.title;
	
		let sublabel = document.querySelector("#sublabel");
		sublabel.textContent = context.is_action ? phases[context.phase].sublabel : "";
	
		duration = entry.secs*1000*phases[context.phase].speed;
		context.interval = duration/100;
		context.value = 0;
		setTimeout(update_progress, context.interval, context);
	
	} else if (context.phase == phases.length-1) {
		// player finished winning
		let slabel = document.querySelector("#sublabel");
		slabel.textContent = phases[context.phase].sublabel;

	} else {
		let lbl = document.querySelector("#label");
		lbl.textContent = "";
	
		let x = Math.random();
		//console.log("x " + x);
		//console.log("win_probability " + win_probability);
		if (x <= win_probability) {
			// player won		
			let sublbl = document.querySelector("#sublabel");
			sublbl.textContent = phases[context.phase].sublabel;

			$(".progress-bar").attr("class", "progress-bar bg-success");

			let secs = 5 + Math.random()*(phase_secs(context) - 5); 
			console.log("win_secs " + secs);
			duration = secs*1000*phases[context.phase].speed;
			context.interval = duration/100;
			context.value = 0;

			context.phase += 1;
			//console.log("now on phase " + context.phase);
			setTimeout(update_progress, context.interval, context);
			
		} else {
			// player lost
			let sublbl = document.querySelector("#sublabel");
			sublbl.textContent = settings.lost;
		}
	}
}

function start_game() {
	let section = document.querySelector("#game");
	section.hidden = false;

	section = document.querySelector("#intro");
	section.hidden = true;
	
	let picker = document.getElementById("duration");
	game_duration = durations[picker.selectedIndex];

	picker = document.getElementById("probability");
	win_probability = probability[picker.selectedIndex].percent/100;

	$(".progress-bar").attr("class", "progress-bar bg-warning");

	let label = document.querySelector("#label");
	let sublabel = document.querySelector("#sublabel");
	label.textContent = phases[0].label;
	sublabel.textContent = phases[0].sublabel;

	let context = {
		phase: 0, 						// used to index into durations
		start: new Date().getTime(),	// time the current progress bar began
		is_action: true, 				// true if this is a task (as opposed to rest)
		interval: undefined,			// milliseconds to show progress bar
		value: 0};						// current progress bar value (0 to 100)
	context.interval = phase_secs(context)*1000/100;
	//console.log("now on phase " + context.phase);
	setTimeout(update_progress, context.interval, context);
}

window.addEventListener("DOMContentLoaded", function(){
	// selectors: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors
	window.parent.document.title = settings.window_title;
	let wtitle = document.querySelector("title");
	wtitle.textContent = settings.window_title;
	
	let title = document.querySelector("#title");
	title.textContent = settings.title;
	
	let instructions = document.querySelector("#instructions");
	instructions.textContent = settings.instructions;
	
	let picker = document.getElementById("duration");
	for (let i = 0; i < picker.length; i++) {
		let option = picker.options[i];
		option.textContent = durations[i].title;	
	}
	
	picker = document.getElementById("probability");
	for (let i = 0; i < picker.length; i++) {
		let option = picker.options[i];
		option.textContent = probability[i].title;	
	}
	
	let section = document.querySelector("#game");
	section.hidden = true;

	let button = document.querySelector("#start");
	button.addEventListener("click", start_game);
});
