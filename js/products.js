var PRODUCTS = []

// Function retrives products from json file
function getProducts() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            displayProducts(xhttp.responseText);
        }
    };
    xhttp.open("GET", "assets/products.json", true);
    xhttp.send();
}

// Function displays products in HTML
function displayProducts(stringObj){
    var jsonArray = JSON.parse(stringObj);
    var productContainer = document.getElementById("productContainer");
    for(var i = 0; i < jsonArray.length; i++) {
        // Creating new Elements
        var productItem = document.createElement("div");
        var productImage = document.createElement("img");
        var productName = document.createElement("h3");
        var productSlogan = document.createElement("h4");
        var productPrice = document.createElement("p");
        var productButton = document.createElement("button");

        // Customizes currancy type and styling
        var price = new Intl.NumberFormat("en-ZA", {
            currency: "ZAR",
            style: "currency",
        }).format(parseInt(jsonArray[i].price));
        
        // See if there are any Discount prices
        var discountPrice = jsonArray[i]["discount-price"]
            ? new Intl.NumberFormat("en-ZA", {
                  currency: "ZAR",
                  style: "currency",
              }).format(parseInt(jsonArray[i]["discount-price"]))
            : 0;
        
        // json file content converting to javascript content
        productImage.src = jsonArray[i].image;
        productName.innerHTML = jsonArray[i].name;
        productSlogan.innerHTML = jsonArray[i].slogan;
        // Strikes original price if there is a discount
        productPrice.innerHTML = discountPrice === 0 ? price : "<strike>" + price + "</strike>" + discountPrice;
        productButton.setAttribute("data-id", i);
        productButton.addEventListener("click", function(){addProduct(this)});

        // Add variables to a single child
        productItem.appendChild(productImage);
        productItem.appendChild(productName);
        productItem.appendChild(productSlogan);
        productItem.appendChild(productPrice);
        productItem.appendChild(productButton);

        // Adds child to the child that will be displayed
        productContainer.appendChild(productItem);
    }

	PRODUCTS = jsonArray
}

// Adds products to cart
function addProduct(button){
    var productID =  button.getAttribute("data-id");
	updateCartData(productID,PRODUCTS[productID]);
	listCartItems()
	document.getElementById("cart").style.display = "block"
}