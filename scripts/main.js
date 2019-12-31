function lookup(key) {
	// XXX look up the value using strings.json
	// XXX if not found then console log and return the key
	return key;
}

window.addEventListener("DOMContentLoaded", function(){
	// selectors: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors
	var title = document.querySelector("title");
	title.textContent = lookup("It works");
});
