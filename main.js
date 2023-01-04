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
  var num4 = document.getElementById("num4").value;
  var num5 = document.getElementById("num5").value;
  var num6 = document.getElementById("num6").value;
  var naturalGasFeed = 32.6 * num1 * 1.1 / 1.055;
  var electricty = 38.6 * num2 
  var water = 8 * num3
  var catalyst = document.getElementById("num10").value;
  var plantfixedcosts= num4 * num5 / 100 / (900/1000)
  var transport = num6
  
  document.getElementById("num7").value = Math.round(naturalGasFeed*10)/10;
  document.getElementById("num8").value = Math.round(electricty*10)/10;
  document.getElementById("num9").value = Math.round(water*10)/10;
  document.getElementById("num11").value = Math.round(plantfixedcosts*10)/10;
  document.getElementById("num12").value = Math.round(transport*10)/10;
  document.getElementById("sum").value = Math.round((naturalGasFeed + electricty + water + catalyst + plantfixedcosts + transport)*10)/10;
}
