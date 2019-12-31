function lookup(key) {
	let value = strings[key];
	if (value) {
		return value;
	}
	console.log("Couldn't find a string for '" + key + "'");
	return key;
}

window.addEventListener("DOMContentLoaded", function(){
	// selectors: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors
	var title = document.querySelector("title");
	title.textContent = lookup("window-title");
});
