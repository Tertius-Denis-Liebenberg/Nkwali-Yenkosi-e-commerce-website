document.addEventListener("DOMContentLoaded", function(){getProducts()});

function submitNewsLetter(e, form) {
	e.preventDefault();
	var email = form.querySelector("input").value
	if(email !== ""){
		document.querySelector(".newsLetterOverlay").style.display="flex"
		form.reset()
	}
}

function closePopup() {
	document.querySelector(".newsLetterOverlay").style.display="none"
}