document.getElementById("menu1").addEventListener("click", openMenu1);
document.getElementById("menu2").addEventListener("click", openMenu2);
function openMenu1() {
	document.getElementById("dropdown1").classList.toggle("active");
}
function openMenu2() {
	document.getElementById("dropdown2").classList.toggle("active");
}