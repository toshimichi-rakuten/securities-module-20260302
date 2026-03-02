// JavaScript Document

/*--setup--*/
window.onload=function() {
tab.setup = {
tabs: document.getElementById('seminar_tab').getElementsByTagName('li'),
pages: [
document.getElementById('seminar'),
document.getElementById('opinion'),
document.getElementById('ir')
]
}
tab.init();
}
/*--setup end--*/
 
var tab = {
init: function(){
var tabs = this.setup.tabs;
var pages = this.setup.pages;
 
for(i=0; i<pages.length; i++) {
if(i !== 0) pages[i].style.display = 'none';
tabs[i].onclick = function(){ tab.showpage(this); return false; };
}
},
 
showpage: function(obj){
var tabs = this.setup.tabs;
var pages = this.setup.pages;
var num;
 
for(num=0; num<tabs.length; num++) {
if(tabs[num] === obj) break;
}
 
for(var i=0; i<pages.length; i++) {
if(i == num) {
pages[num].style.display = 'block';
tabs[num].className = 'selected';
}
else{
pages[i].style.display = 'none';
tabs[i].className = null;
}
}
}
}