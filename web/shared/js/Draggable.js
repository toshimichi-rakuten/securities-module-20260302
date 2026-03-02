
var Draggable = function(element) {

  this.initialize(element);
}


Draggable.prototype.destroy = function() {
  this.detach(this.element, "mousedown", this.observers["mousedown"]);
  this.detach(this.html, "mouseup", this.observers["mouseup"]);
  this.detach(this.html, "mousemove", this.observers["mousemove"]);
}

Draggable.prototype.initialize = function(element) {
  this.isIE = navigator.appVersion.lastIndexOf("MSIE") > 0;
  this.isFF = navigator.userAgent.toLowerCase().indexOf("firefox") > 0;
  this.html = document.getElementsByTagName("html").item(0);
  if (typeof element == "string") {
    this.element = document.getElementById(element);
  } else {
    this.element = element;
  }
  this.style = this.element.style;
  this.thisBaseX;
  this.thisBaseY;
  this.pageBaseX;
  this.pageBaseY;
  this.scrollBaseY;
  this.isMoving = false;
  this.observers = {};
  var self = this;
  // Mousedown
  this.observers["mousedown"] = this.observe(this.element, "mousedown", function(event) {
if ('ui-dialog-title-keyboard_body' != event.target.id) {
  return;
}
    
if (self.isMoving) return;
    event = event || window.event;
    self.disableSelect(event);
    var position = self.getPosition();
    self.thisBaseX = position["x"];
    self.thisBaseY = position["y"];
    self.pageBaseX = event.pageX || event.clientX;
    self.pageBaseY = event.pageY || event.clientY;
    if (self.isIE) self.scrollBaseY = document.body.scrollTop;
    self.isMoving = true;
  });
  // Mousemove
  this.observers["mousemove"] = this.observe(this.html, "mousemove", function(event) {
    if (!self.isMoving) return;
    event = event || window.event;
    var x = (event.pageX || event.clientX) - self.pageBaseX + self.thisBaseX;
    var y = (event.pageY || event.clientY) - self.pageBaseY + self.thisBaseY;
    
    if (self.isIE) y += (Number(document.body.scrollTop) - self.scrollBaseY);
    
    var tutorial = document.getElementById(element);
    // lock the object to the edge  if the object is dragged to out of the rage of browser
	if (x < parseInt(getWidth()) - parseInt(tutorial.offsetWidth) 
		&& x > 0) {
	
		x = x;
	} else if (x >= parseInt(getWidth()) - parseInt( tutorial.offsetWidth)) {
		x = (parseInt(getWidth()) - parseInt(tutorial.offsetWidth));
	} else if ( x < 0) {
		x = 0;
	}
    
	if (y <= 0 ) y = 0;

	
    self.setPosition(x, y);
  });
  // Mouseup
  this.observers["mouseup"] = this.observe(this.html, "mouseup", function(event) {
    if (!self.isMoving) return;
    self.enableSelect();
    self.isMoving = false;
  });
}

Draggable.prototype.observe = function(element, name, observer) {
  if (element.addEventListener) {
    element.addEventListener(name, observer, false);
  } else if (element.attachEvent) {
    element.attachEvent("on" + name, observer);
  }
  return observer;
}

Draggable.prototype.detach = function(element, name, observer) {
  if (element.removeEventListener) {
    element.removeEventListener(name, observer, false);
  } else if (element.detachEvent) {
    try {
      element.detachEvent("on" + name, observer);
    } catch (e) {}
  }
}

Draggable.prototype.setPosition = function(x, y) {
  this.style.left = x + "px";
  this.style.top = y + "px";
}

Draggable.prototype.getPosition = function() {
  var x, y;

  if (this.style.top == "" || this.style.left == "") {
    if (this.element.currentStyle) {
      x = this.element.currentStyle["left"];
      y = this.element.currentStyle["top"];
    } else {
      var computedStyle = document.defaultView.getComputedStyle(this.element, null);
      x = computedStyle["left"];
      y = computedStyle["top"];
    }
  } else {
    x = this.style.left;
    y = this.style.top;
  }
  return {"x": parseInt(x.replace("px", "")) || 0, "y": parseInt(y.replace("px", "")) || 0};
}

Draggable.prototype.disableSelect = function(event) {
  if (this.isIE) {
    document.getElementsByTagName("body").item(0).onselectstart = function(e){ return false };
  } else {
    try { event.preventDefault(); } catch(e) {}
  }
}

Draggable.prototype.enableSelect = function() {
  if (this.isIE) document.getElementsByTagName("body").item(0).onselectstart = "";
}


function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

function getHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  );
}

