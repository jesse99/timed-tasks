/* eslint no-undef: "off" */
/* eslint no-console: "warn" */
"use strict";

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

function on_keydown(event) {
	let input = document.querySelector("#password-field");
	let err = document.querySelector("#password-error");

	if (event.keyCode != 13) {
		err.innerHTML = "";
	} else {
		hash_str(input.value).then((hash) => {
			if (hash == "1f9d3ef8a19203b1fbd88138f9ddec3a82484e4ae2191b90fadd24b84236f73e") {
				/* TODO: can we stash a custom value in window to communicate state? */
				localStorage.setItem("timed_task", "main");
				window.location.href = "./main.html";
			} else if (hash == "314e5ab0fcd04c334e6ac8c21153c5390f0ba2aa0903986fd5d74f3585942221") {
				localStorage.setItem("timed_task", input.password);
				window.location.href = "./main.html";
			} else if (hash == "b812289b22ecbbdab45151fa99963ca03f5dc67d6a382bbb161126dfdff1b05f") {
				localStorage.setItem("timed_task", input.password);
				window.location.href = "./main.html";
			} else {
				err.innerHTML = "incorrect";
				console.log("password: " + input.value);
				console.log("hash: " + hash);
			}
			window.location.search = input.value;
		});
	}
}

window.addEventListener("DOMContentLoaded", function(){
	let password = document.querySelector("#password-field");
	password.addEventListener("keyup", on_keydown);
});
