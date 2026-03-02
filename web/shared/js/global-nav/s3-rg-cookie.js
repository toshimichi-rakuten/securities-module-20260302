var subsection_m = document.getElementById("subsection_m");
var subsection_v = document.getElementById("subsection_v");
var cookies = document.cookie;
if (cookies.indexOf('Rg_sec') != -1) {
  subsection_m.style.display = "block";
}else{
  subsection_v.style.display = "block";
}
