/* eslint no-undef: "off" */
/* eslint no-console: "warn" */
"use strict";

var mode = undefined;
var game_duration = undefined;
var win_probability = undefined;
var won_text = undefined;
var won_pic = undefined;
var pic_index = 0;

// Make this larger to speed the game up. 10 makes it very fast.
var step_by = 1;

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

function shuffle(array) {
	for (let i = 0; i < array.length - 2; i++) {
		let j = random_int(i, array.length);
	
		let tmp = array[i];
		array[i] = array[j];
		array[j] = tmp;
	}
}

function hash_str(str) {
	const utf8 = new TextEncoder().encode(str);
	return crypto.subtle.digest("SHA-256", utf8).then((hashBuffer) => {
		const hashArray = Array.from(new Uint8Array(hashBuffer));
		const hashHex = hashArray
			.map((bytes) => bytes.toString(16).padStart(2, "0"))
			.join("");
		return hashHex;
	});
}

function phase_secs(context) {
	return 60*game_duration.mins[context.phase];
}

function update_progress(context) {
	if (context.value < 100 - step_by) {
		context.value += step_by;
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
		var started_phase1 = false;
		if (context.phase == 0) {
			context.phase = 1;
			//console.log("now on phase " + context.phase);
			context.start = new Date().getTime();
			started_phase1 = true;
		}
		begin(context, started_phase1);
	}
}

function random_pic() {
	pic_index = (pic_index + 1) % pictures.length;
	let path = pictures[pic_index];
	$("#picture").attr("src", path);
}

function begin(context, started_phase1) {
	let elapsed = ((new Date().getTime() - context.start)/1000) * step_by;
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
		if (started_phase1) {
			// use a fast rest for the very first one
			entry = rest[1];
		} else {
			entry = context.is_action ? choose(tasks) : choose(rest);
		}
		let label = document.querySelector("#label");
		label.textContent = entry.title;
	
		let sublabel = document.querySelector("#sublabel");
		sublabel.textContent = context.is_action ? phases[context.phase].sublabel : "";
		random_pic();
	
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
			$(".progress-bar").attr("class", "progress-bar bg-success");

			let secs = 5 + Math.random()*(phase_secs(context) - 5);
			//console.log("win_secs " + secs);
			duration = secs*1000*phases[context.phase].speed;
			context.interval = duration/100;
			context.value = 0;

			let sublbl = document.querySelector("#sublabel");
			if (won_pic) {
				$("#picture").attr("src", won_pic);
				sublbl.textContent = won_text;
			} else {
				sublbl.textContent = phases[context.phase].sublabel;
			}

			context.phase += 1;
			//console.log("now on phase " + context.phase);
			setTimeout(update_progress, context.interval, context);
			
		} else {
			// player lost
			let sublbl = document.querySelector("#sublabel");
			let i = random_int(0, lost_text.length);
			sublbl.textContent = lost_text[i];
		
			$("#picture").attr("src", "pics-finished/lost.jpg");
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
	//console.log("win_probability = " + win_probability);

	$(".progress-bar").attr("class", "progress-bar bg-warning");

	let label = document.querySelector("#label");
	let sublabel = document.querySelector("#sublabel");
	label.textContent = phases[0].label;
	sublabel.textContent = phases[0].sublabel;
	random_pic();

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

function init_game() {
	// selectors: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors
	shuffle(pictures);
	window.parent.document.title = settings.window_title;
	let wtitle = document.querySelector("title");
	wtitle.textContent = settings.window_title;
	
	let title = document.querySelector("#title");
	title.textContent = settings.title;
	
	let instructions = document.querySelector("#instructions");
	instructions.innerHTML = settings.instructions;
	
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
	picker.selectedIndex = 1;
	
	let section = document.querySelector("#game");
	section.hidden = true;

	let button = document.querySelector("#start");
	button.addEventListener("click", start_game);
}

function enable_game() {
	var view = document.querySelector("#password-view");
	view.style.display = "none";
	
	view = document.querySelector("#game-view");
	view.style.removeProperty("padding-top");
	view.style.removeProperty("padding-bottom");
	view.style.display = "block";
	
	if (mode == "custom") {
		settings = custom_settings;
		tasks = custom_tasks;
		pictures = custom_pictures;
		lost_text = custom_lost_text;
		tasks = custom_tasks;
		rest = custom_rest;
		won_text = custom_won_text;
		won_pic = "pics-finished/blood.png";
	}
	
	init_game();
}

function on_keydown(event) {
	let input = document.querySelector("#password-field");
	let err = document.querySelector("#password-error");

	if (event.keyCode != 13) {
		err.innerHTML = "";
	} else {
		hash_str(input.value).then((hash) => {
			if (hash == "356c59da3868f53f59b1b185272c16a9a69bef25a5392572628c015894225158") {
				mode = "standard";
				enable_game();
			} else if (hash == "314e5ab0fcd04c334e6ac8c21153c5390f0ba2aa0903986fd5d74f3585942221") {
				mode = "custom";
				enable_game();
			} else if (hash == "209fbfd8490fdaf950a0f011a03667c5aa5d13cacdc9c6cfbd0231d39a47084e") {
				mode = "standard";
				step_by = 8;
				enable_game();
			} else if (hash == "dadde2fa734666f679662957d3f4daefb725196901cec0c31c388920de3c57f6") {
				mode = "custom";
				step_by = 8;
				enable_game();
			} else {
				err.innerHTML = "incorrect";
				console.log("password: " + input.value);
				console.log("hash: " + hash);
			}
		});
	}
}

window.addEventListener("DOMContentLoaded", function(){
	let password = document.querySelector("#password-field");
	password.addEventListener("keyup", on_keydown);
});
