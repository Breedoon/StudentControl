function test() {
	alert("working");
}

function ab() {
	document.getElementById("day").innerHTML = "A/B Day Schedule";
	document.getElementById("abButton").style.color = "white";
	document.getElementById("abButton").style.backgroundColor = "#454545";
	document.getElementById("cButton").style.color = "black";
	document.getElementById("cButton").style.backgroundColor = "white";
	document.getElementById("pButton").style.color = "black";
	document.getElementById("pButton").style.backgroundColor = "white";

	document.getElementById("timeTitleAB").style.color = "black";
	document.getElementById("timeTitleC").style.color = "white";
	document.getElementById("periodTitleAB").style.color = "black";
	document.getElementById("periodTitleC").style.color = "white";
	document.getElementById("abDay").style.top = "400px";
	document.getElementById("cDay").style.top = "1350px";
}

function c() {
	document.getElementById("day").innerHTML = "C Day Schedule";
	document.getElementById("abButton").style.color = "black";
	document.getElementById("abButton").style.backgroundColor = "white";
	document.getElementById("cButton").style.color = "white";
	document.getElementById("cButton").style.backgroundColor = "#454545";
	document.getElementById("pButton").style.color = "black";
	document.getElementById("pButton").style.backgroundColor = "white";

	document.getElementById("timeTitleC").style.color = "black";
	document.getElementById("timeTitleAB").style.color = "white";
	document.getElementById("periodTitleC").style.color = "black";
	document.getElementById("periodTitleAB").style.color = "white";
	document.getElementById("cDay").style.top = "350px";
	document.getElementById("abDay").style.top = "1400px";
}

function p() {
	document.getElementById("day").innerHTML = "Prep-Rally Schedule";
	document.getElementById("abButton").style.color = "black";
	document.getElementById("abButton").style.backgroundColor = "white";
	document.getElementById("cButton").style.color = "black";
	document.getElementById("cButton").style.backgroundColor = "white";
	document.getElementById("pButton").style.color = "white";
	document.getElementById("pButton").style.backgroundColor = "#454545";
}
