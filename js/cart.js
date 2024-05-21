function closeCart() {
	document.getElementById("cart").style.display = "none";
}

function updateCartData(productID, productObj, quantity) {
	var cartData = getCartData();

	if(cartData[productID]){
		if(quantity){
			cartData[productID].quantity = parseInt(quantity)
		}else{
			cartData[productID].quantity += 1;
		}
	}else{
		cartData[productID] = {
			name:productObj.name,
			quantity:1,
			price:productObj.price,
		}
	}

	if(Storage){
		localStorage.setItem("cart",JSON.stringify(cartData))
	}
}

function getCartData() {
	var cartData = {};
	if(Storage){
		if(localStorage.getItem("cart")){
			cartData = JSON.parse(localStorage.getItem("cart"))
		}else{
			localStorage.setItem("cart",JSON.stringify(cartData))
		}
	}

	return cartData;
}

function productChangeHandler(input, index) {
	var cartData = getCartData();
	updateCartData(index, cartData[index], input.value == "" ? 0 : input.value);
	input.parentElement.querySelector("p").innerHTML = new Intl.NumberFormat("en-ZA", {
		currency: "ZAR",
		style: "currency",
	}).format(parseInt(input.value * cartData[index].price));
	calcSubtotal()
}

function deleteCartItem(index) {
	var cartData = getCartData();
	delete cartData[index];

	if(Storage){
		localStorage.setItem("cart",JSON.stringify(cartData))
	}

	listCartItems()
}

function listCartItems () {
	var cartData = getCartData()
	var cartDataIDS = Object.keys(cartData);
	var productItemContainer = document.getElementById("cartItems")

	productItemContainer.innerHTML = ""

	for(var i = 0; i < cartDataIDS.length; i++){
		var json = cartData[cartDataIDS[i]]
		var cardContainer = document.createElement("div");
		var label = document.createElement("h4");
		var input = document.createElement("input");
		var button = document.createElement("button");
		var price = document.createElement("p");
		var totalPrice = parseInt(json.quantity * json.price)

		label.innerHTML = json.name;
		input.value = json.quantity;
		input.type = "number"
		input.min = "1"
		input.setAttribute("oninput","productChangeHandler(this, "+cartDataIDS[i]+")") ;
		button.setAttribute("onclick","deleteCartItem("+cartDataIDS[i]+")") ;
		button.innerHTML = "<i class='fa fa-times'></i>";
		price.innerHTML = new Intl.NumberFormat("en-ZA", {
			currency: "ZAR",
			style: "currency",
		}).format(totalPrice);

		cardContainer.appendChild(label)
		cardContainer.appendChild(input)
		cardContainer.appendChild(button)
		cardContainer.appendChild(price)

		productItemContainer.appendChild(cardContainer)
	}

	calcSubtotal()
}

function calcSubtotal() {
	var cartData = getCartData()
	var cartDataIDS = Object.keys(cartData);
	var subTotal = 0

	for(var i = 0; i < cartDataIDS.length; i++){
		var json = cartData[cartDataIDS[i]]
		var totalPrice = parseInt(json.quantity * json.price)
		subTotal += totalPrice
	}

	document.getElementById("subtotal").querySelector("p span").innerHTML = new Intl.NumberFormat("en-ZA", {
		currency: "ZAR",
		style: "currency",
	}).format(subTotal);
}

function checkout() {
	var cartData = getCartData();
	if(Object.keys(cartData).length > 0){
		location.href = "/form.html";
	}
}