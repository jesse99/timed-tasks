// Returns a number in [min, max).
function random_int(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;	// note that the seed is chosen by the browser
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

function update_progress(context) {
	var progress = document.querySelector("#progress");
	if (context.value < 100) {
		context.value += 1;
		progress.value = context.value;
		setTimeout(update_progress, context.interval, context);
	} else {
		progress.value = 0;
		context.is_action = !context.is_action;
		if (context.phase == 0) {
			context.phase = 1;
			context.start = new Date().getTime();
		}
		begin(context);
	}
}

function begin(context) {
	let elapsed = (new Date().getTime() - context.start)/1000;
	var duration = settings.duration ? settings.duration : phases[context.phase].secs;	// can't just use settings.speed because that makes the duration way too small
	if (elapsed >= duration) {
		context.phase += 1;
		context.start = new Date().getTime();
	}
	
	if (context.phase < phases.length-2) {
		let entry = context.is_action ? choose(tasks) : choose(rest);
		var label = document.querySelector("#label");
		label.textContent = entry.title;
	
		var sublabel = document.querySelector("#sublabel");
		sublabel.textContent = context.is_action ? phases[context.phase].sublabel : "";
	
		duration = entry.secs*1000*phases[context.phase].speed*settings.speed;
		context.interval = duration/100;
		context.value = 0;
		setTimeout(update_progress, context.interval, context);
	
	} else if (context.phase == phases.length-1) {
		var sublabel = document.querySelector("#sublabel");
		sublabel.textContent = phases[context.phase].sublabel;

	} else {
		var label = document.querySelector("#label");
		label.textContent = "";
	
		var x = Math.random();
		if (x <= settings.prob) {		
			var sublabel = document.querySelector("#sublabel");
			sublabel.textContent = phases[context.phase].sublabel;

			duration = phases[context.phase].secs*1000*phases[context.phase].speed*settings.speed;
			context.interval = duration/100;
			context.value = 0;

			context.phase += 1;
			setTimeout(update_progress, context.interval, context);
			
		} else {
			var sublabel = document.querySelector("#sublabel");
			sublabel.textContent = settings.lost;
		}
	}
}

window.addEventListener("DOMContentLoaded", function(){
	// selectors: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors
	var wtitle = document.querySelector("title");
	wtitle.textContent = settings.window_title;
	
	var title = document.querySelector("#title");
	title.textContent = settings.title;
	
	var label = document.querySelector("#label");
	var sublabel = document.querySelector("#sublabel");
	label.textContent = phases[0].label;
	sublabel.textContent = phases[0].sublabel;

	let duration = phases[0].secs*1000*settings.speed;
	let context = {phase: 0, start: new Date().getTime(), is_action: true, interval: duration/100, value: 0};
	setTimeout(update_progress, context.interval, context);
});
