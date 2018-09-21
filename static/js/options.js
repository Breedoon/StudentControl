var pick = "p";
var quantity = 1;
var ranch = 0;
var ketchup = 0;
var mayo = 0;
var mustard = 0;
var total = 0;
var mealPrice = 3.85;
var mealName = "Cheeseburger";
var mealDesc = "A cheeseburger made of fresh ingredients.";
var name = "";

function start(){
	var selected = document.querySelector("#navBar");
	selected.style.height = "220px";
	selected.style.top = "1109px";
	updatePrice();
	document.getElementById("dishPrice").innerHTML = "$" + mealPrice;
	document.getElementById("dishName").innerHTML = mealName;
	document.getElementById("dishDesc").innerHTML = mealDesc;
}

function updatePrice(){
	total = (mealPrice*quantity)+(ranch*.5)+(ketchup*.5)+(mayo*.5)+(mustard*.5);
	total = Number.parseFloat(total).toFixed(2);
	var selected = document.getElementById("money").innerHTML = "$" + total;
}

function homePage(){
	window.location.replace("file:///E:/Webpage/options.html");
}

function menuPage(){

}

function orderPage(){
	window.location.replace("file:///E:/Webpage/order.html");
}

function otherPage(){

}

function apply(){
	alert("Settings Updated");
}

function pickUp(){
	var selected = document.querySelector("#pickUpButton");
	selected.style.color = "black";
	var selected = document.querySelector("#deliveryButton");
	selected.style.color = "#F0F0F0";
	pick = "p";
	var selected = document.querySelector("#warning");
	selected.innerHTML = "Type in Name";
}

function delivery(){
	var selected = document.querySelector("#deliveryButton");
	selected.style.color = "black";
	var selected = document.querySelector("#pickUpButton");
	selected.style.color = "#F0F0F0";
	pick = "d";
	var selected = document.querySelector("#warning");
	selected.innerHTML = "Type in Room Number";
}

function purchase(){
	name = document.getElementById("textBox").value;
	alert(pick + " " + name);
}


function addQuantity(){
	if(quantity < 5){
	var y = quantity + 1;
	var z = y.toString();
	document.getElementById("quantityNumber").innerHTML = z;
	quantity = y;
	}
	updatePrice();
}

function subtractQuantity(){
	if(quantity > 1){
	var y = quantity - 1;
	var z = y.toString();
	document.getElementById("quantityNumber").innerHTML = z;
	quantity = y;
	}
	updatePrice();
}

function subtractRanch(){
	if(ranch > 0){
	var y = ranch - 1;
	var z = y.toString();
	document.getElementById("ranchAmount").innerHTML = z;
	ranch = y;
	}
	updatePrice();
}

function addRanch(){
	if(ranch < 9){
	var y = ranch + 1;
	var z = y.toString();
	document.getElementById("ranchAmount").innerHTML = z;
	ranch = y;
	}
	updatePrice();
}

function subtractKetchup(){
	if(ketchup > 0){
	var y = ketchup - 1;
	var z = y.toString();
	document.getElementById("ketchupAmount").innerHTML = z;
	ketchup = y;
	}
	updatePrice();
}

function addKetchup(){
	if(ketchup < 9){
	var y = ketchup + 1;
	var z = y.toString();
	document.getElementById("ketchupAmount").innerHTML = z;
	ketchup = y;
	}
	updatePrice();
}

function subtractMayo(){
	if(mayo > 0){
	var y = mayo - 1;
	var z = y.toString();
	document.getElementById("mayoAmount").innerHTML = z;
	mayo = y;
	}
	updatePrice();
}

function addMayo(){
	if(mayo < 9){
	var y = mayo + 1;
	var z = y.toString();
	document.getElementById("mayoAmount").innerHTML = z;
	mayo = y;
	}
	updatePrice();
}

function subtractMustard(){
	if(mustard > 0){
	var y = mustard - 1;
	var z = y.toString();
	document.getElementById("mustardAmount").innerHTML = z;
	mustard = y;
	}
	updatePrice();
}

function addMustard(){
	if(mustard < 9){
	var y = mustard + 1;
	var z = y.toString();
	document.getElementById("mustardAmount").innerHTML = z;
	mustard = y;
	}
	updatePrice();
}

function orderPage() {
	window.location.replace("file:///E:/cafeApp/2019%20Conrad%20App/Order/order.html");
}


