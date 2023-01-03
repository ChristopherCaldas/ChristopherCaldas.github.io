document.getElementById("menu1").addEventListener("click", openMenu1);
document.getElementById("menu2").addEventListener("click", openMenu2);
function openMenu1() {
	document.getElementById("dropdown1").classList.toggle("active");
}
function openMenu2() {
	document.getElementById("dropdown2").classList.toggle("active");
}

function findSum() {
  var num1 = document.getElementById("num1").value;
  var num2 = document.getElementById("num2").value;
  var num3 = document.getElementById("num3").value;
  var sum = parseInt(num1) + parseInt(num2) + parseInt(num3);
  alert("The sum is: " + sum);
}