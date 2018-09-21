var pick = "p";
var quantity = 1;
var sideOne = 0;
var sideTwo = 0;
var sideThree = 0;
var sideFour = 0;
var total = 0;
var mealPrice = 3.85;
var mealName = "Cheeseburger";
var mealDesc = "A cheeseburger made of fresh ingredients.";
var name = "";



//-------------Runs at load of webpage-------------

function start(){
	var selected = document.querySelector("#navBar");
	selected.style.height = "220px";
	selected.style.top = "1109px";
	updatePrice();
	document.getElementById("dishPrice").innerHTML = "$" + mealPrice;
	document.getElementById("dishName").innerHTML = mealName;
	document.getElementById("dishDesc").innerHTML = mealDesc;
}


//-------------Updates Price-------------

function updatePrice(){
	total = (mealPrice*quantity)+(sideOne*.5)+(sideTwo*.5)+(sideThree*.5)+(sideFour*.5);
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
	selected.innerHTML = "Type in Room Number with Name";
}


function purchase(){
	name = document.getElementById("textBox").value;
	alert("Your order has been sent.");
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


//--------------Side One----------------

function addSideOne(){
	if(sideOne < 9){
	var y = sideOne + 1;
	var z = y.toString();
	document.getElementById("sideOneAmount").innerHTML = z;
	sideOne = y;
	}
	updatePrice();
}

function subtractSideOne(){
	if(sideOne > 0){
	var y = sideOne - 1;
	var z = y.toString();
	document.getElementById("sideOneAmount").innerHTML = z;
	sideOne = y;
	}
	updatePrice();
}



//--------------Side Two----------------

function addSideTwo(){
	if(sideTwo < 9){
	var y = sideTwo + 1;
	var z = y.toString();
	document.getElementById("sideTwoAmount").innerHTML = z;
	sideTwo = y;
	}
	updatePrice();
}

function subtractSideTwo(){
	if(sideTwo > 0){
	var y = sideTwo - 1;
	var z = y.toString();
	document.getElementById("sideTwoAmount").innerHTML = z;
	sideTwo = y;
	}
	updatePrice();
}

//--------------Side Three----------------

function addSideThree(){
	if(sideThree < 9){
	var y = sideThree + 1;
	var z = y.toString();
	document.getElementById("sideThreeAmount").innerHTML = z;
	sideThree = y;
	}
	updatePrice();
}

function subtractSideThree(){
	if(sideThree > 0){
	var y = sideThree - 1;
	var z = y.toString();
	document.getElementById("sideThreeAmount").innerHTML = z;
	sideThree = y;
	}
	updatePrice();
}
