var loginIdKeyType = new Array("halfNumber", "halfUpper");

var passwdKeyType = new Array("halfNumber", "halfUpper", "halfLower", "code");

var otherKeyType = new Array("halfNumber");

var keyType = loginIdKeyType;

var baseImagePath = "/web/shared/img/";

var logintabImage = new Array(baseImagePath + "keyboard_tab_idon.gif",
		baseImagePath + "keyboard_tab_idoff.gif");

var passwdtabImage = new Array(baseImagePath + "keyboard_tab_passon.gif",
		baseImagePath + "keyboard_tab_passoff.gif");

var keyboard_opener = document.getElementById("keyboard_opener");

 keyboard_opener.onclick = function(e) { 
 openSoftkey(e);
 };
 
 //document.getElementById("keyboard_opener").addEventListener("click", openSoftkey());



// setMove();

new Draggable("keyboard_body");

//var tagjs = document.createElement("script");
//var s = document.getElementsByTagName("script")[0];
//tagjs.async = true;
//tagjs.src = "\tag.js";
//s.parentNode.insertBefore(tagjs, s);


function closeClk() {
	document.getElementById('keyboard_body').style.display = 'none';
         bgWhite();
        return false;
}

function clearClk() {

	if (keyType == loginIdKeyType) {
		document.getElementById("form-login-id").value = '';
	} else {
		document.getElementById("form-login-pass").value = '';
	}
}

function deleteClk() {

	var target;
	if (keyType == loginIdKeyType) {
		val = document.getElementById("form-login-id").value;
		target = document.getElementById("form-login-id");
	} else {
		val = document.getElementById("form-login-pass").value;
		target = document.getElementById("form-login-pass");
	}

	target.value = val.slice(0, -1);
}

function openSoftkey(event) {
	
	var link = document.createElement('link');
	var linkb = document.createElement('link');


	link.setAttribute("rel","stylesheet");
	link.setAttribute("type","text/css");
	link.setAttribute("media","screen");
	link.setAttribute("href","/web/shared/css/keyboard-new.css");




	linkb.setAttribute("rel","stylesheet");
	linkb.setAttribute("type","text/css");
	linkb.setAttribute("media","screen");
	linkb.setAttribute("href","/web/shared/css/jquery-ui-1.10.3.custom.min.css");
	
	var head  = document.head;
	
	head.appendChild(link);
	head.appendChild(linkb);

	//var event = e || window.event;
	var event = event || window.event;
    var x = event.clientX || pageX;
    var y = event.clientY || pageY;
    
    var z = event.screenX;
    var a = event.screenY;
    
    var scrolltop = window.pageYOffset || document.documentElement.scrollTop;
    var windowheight =  window.parent.screen.height;

    //if (y >= windowheight / 2 ) {
         y = y / 4;
     //}

    document.getElementById('keyboard_body').style.left = x / 2 + "px";
    document.getElementById('keyboard_body').style.top = y + scrolltop + "px";
	document.getElementById('keyboard_body').style.display = 'block';
	// document.getElementById('popupBackground').style.display='block';
	keyType = loginIdKeyType;
	targetField = "form-login-id";
	document.getElementById('random_check').checked = false;
	document.getElementById('hide_check').checked = false;
	setKeyboad();
	setListener();
	
	document.getElementById('loginIdTab').setAttribute("src",logintabImage[0]);
	document.getElementById('passwdTab').setAttribute("src",passwdtabImage[1]);
    var target = document.getElementById('form-login-id');
    target.style.backgroundColor = "rgb(255, 247, 210)";
			
	new Draggable("keyboard_body");
}

function chfocus(num) {
	if (num == 0) {
		if (keyType != loginIdKeyType) {
			document.getElementById('loginIdTab').setAttribute("src",logintabImage[0]);
			document.getElementById('passwdTab').setAttribute("src",passwdtabImage[1]);
			keyType = loginIdKeyType;
			targetField = "form-login-id";
			setKeyboad();
			bgWhite();
			var target = document.getElementById('form-login-id');
            target.style.backgroundColor = "rgb(255, 247, 210)";
		}

	} else {
		if (keyType != passwdKeyType) {
			document.getElementById('loginIdTab').setAttribute("src",
					logintabImage[1]);
			document.getElementById('passwdTab').setAttribute("src",
					passwdtabImage[0]);
			keyType = passwdKeyType;
			targetField = "form-login-pass";
			setKeyboad();
			 bgWhite();
			// $("#"+targetField).css("background-color","rgb(255, 247, 210)");
		        var target = document.getElementById('form-login-pass');
                target.style.backgroundColor = "rgb(255, 247, 210)";
		}
	}
}

function setListener() {

	var keyboard_button = window.document
			.getElementsByClassName('keyboard_button');

	for (var n = keyboard_button.length - 1; n >= 0; n--) {
		keyboard_button[n].addEventListener("mouseover", mover, false);
		keyboard_button[n].addEventListener("mouseout", mout, false);
	}
}

function mover(e) {
	var hideFlag = document.getElementById('hide_check').checked;
	if (isSmartOS())
		hideFlag = false;
	if (hideFlag) {
		var keyboard_button = window.document
				.getElementsByClassName('keyboard_button');
		for (var n = keyboard_button.length - 1; n >= 0; n--)
			keyboard_button[n].setAttribute('value', ' ');
	}
}

function mout(e) {
	var hideFlag = document.getElementById('hide_check').checked;
	if (isSmartOS())
		hideFlag = false;
	if (hideFlag) {
		var keyboard_button = window.document
				.getElementsByClassName('keyboard_button');
		for (var n = keyboard_button.length - 1; n >= 0; n--)
			keyboard_button[n].setAttribute('value', keyboard_button[n]
					.getAttribute('dispVal'));
	}
}

function isSmartOS() {
	var agent = navigator.userAgent.toLowerCase();
	if (agent.search(/iphone/) != -1) {
		return true;
	} else if (agent.search(/ipod/) != -1) {
		return true;
	} else if (agent.search(/ipad/) != -1) {
		return true;
	} else if (agent.search(/android/) != -1) {
		return true;
	} else {
		return false;
	}
	return false;
}

function changeCheckPassworad(obj) {
	if (obj.checked) {
		document.getElementById('form-login-pass').type = 'text';
		document.getElementById('form-login-pass').autocomplete = 'off'
	} else {
		document.getElementById('form-login-pass').type = 'password';
		document.getElementById('form-login-pass').autocomplete = 'on'
	}
}

function setKeyboad() {

	var numberArray = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8",
			"9");

	var alphabetBigArray = new Array("A", "B", "C", "D", "E", "F", "G", "H",
			"I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U",
			"V", "W", "X", "Y", "Z");

	var alphabetSmallArray = new Array("a", "b", "c", "d", "e", "f", "g", "h",
			"i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u",
			"v", "w", "x", "y", "z");

	var markArray = new Array("+", "-", "_", ".", "/", "@", "*", "#", "%", "!",
			"&quot;", "$", "&amp;", "(", ")", "=", "~", "^", "?", "&gt;",
			"&lt;", "\,", ";", "&#39;", "{", "}", "[", "]");

	var random_flag = document.getElementById('random_check').checked;

	if (random_flag) {
		// �����_���\��
		var randomKeyType = getRandomArray(keyType);
		setBaseKeyType(randomKeyType);
		var randomNumArray = getRandomArray(numberArray);
		var randomAlphabetBigArray = getRandomArray(alphabetBigArray);
		var randomAlphabetSmallArray = getRandomArray(alphabetSmallArray);
		var randomMarkArray = getRandomArray(markArray);

		if (keyType != loginIdKeyType) {
			appendArray(randomNumArray, "halfNumber");
			appendArray(randomAlphabetBigArray, "halfUpper");
			appendArray(randomAlphabetSmallArray, "halfLower");
			appendArray(randomMarkArray, "code");
		} else {
			appendArray(randomNumArray, "halfNumber");
			appendArray(randomAlphabetBigArray, "halfUpper");
		}

	} else {
		// �ʏ�\��
		setBaseKeyType(keyType);

		if (keyType != loginIdKeyType) {
			appendArray(numberArray, "halfNumber");
			appendArray(alphabetBigArray, "halfUpper");
			appendArray(alphabetSmallArray, "halfLower");
			appendArray(markArray, "code");
		} else {
			appendArray(numberArray, "halfNumber");
			appendArray(alphabetBigArray, "halfUpper");
		}
	}

	setListener();
}

document.getElementById("loginIdTab").onclick = function() {
	if (keyType != loginIdKeyType) {
		keyType = loginIdKeyType;
		targetField = "form-login-id";
		setKeyboad();
		setListener();
		document.getElementById('loginIdTab').setAttribute("src",
				logintabImage[0]);
		document.getElementById('passwdTab').setAttribute("src",
				passwdtabImage[1]);
	 bgWhite();
		                        var target = document.getElementById('form-login-id');
                        target.style.backgroundColor = "rgb(255, 247, 210)";
		
	}
}

document.getElementById("passwdTab").onclick = function() {
	if (keyType != passwdKeyType) {
		keyType = passwdKeyType;
		targetField = "form-login-pass";
		setKeyboad();
		setListener();
		document.getElementById('loginIdTab').setAttribute("src",
				logintabImage[1]);
		document.getElementById('passwdTab').setAttribute("src",
				passwdtabImage[0]);
	bgWhite();
                        var target = document.getElementById('form-login-pass');
                        target.style.backgroundColor = "rgb(255, 247, 210)";		


	}
}

function setBaseKeyType(array) {
	var element = document.getElementById('keyboard2')

	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}

	var i = 0;
	var max = array.length;

	for (i = 0; i < max; i++) {
		var div = "<div class='key-group'><div id='" + array[i]
				+ "' class='nowrap' style='margin-bottom: 0px;'></div></div> ";
		document.getElementById('keyboard2').insertAdjacentHTML('beforeend',
				div);
	}

}

function appendArray(array, id) {

	for (var i = 0; i < array.length; i++) {
		var value = array[i];
		if ((i % 10) == 0) {
			var div = "</div><div class='nowrap' style='margin-bottom: 0px;'>";
			document.getElementById(id).insertAdjacentHTML('beforeend', div);
		}

		if (value == "&quot;") {
			var div = "<input type='button' class='keyboard_button' value="
					+ value + " dispVal=" + value
					+ " onclick='inputValueCharCode(\"34\")'>";
			document.getElementById(id).insertAdjacentHTML('beforeend', div);
		} else {
			var div = "<input type='button' class='keyboard_button' value="
					+ value + " dispVal=" + value + " onclick='inputValue(\""
					+ value + "\")'>";
			document.getElementById(id).insertAdjacentHTML('beforeend', div);
		}

		if (i == (array.length)) {
			var div = "</div>";
			document.getElementById(id).insertAdjacentHTML('beforeend', div);
		}
	}
}

function getRandomArray(array) {

	var copyArray = array.concat();
	var i, x, y = 0;
	var max = copyArray.length;

	for (i = 0; i < max; i++) {
		x = Math.floor(Math.random() * max);
		y = copyArray[i];

		copyArray[i] = copyArray[x];
		copyArray[x] = y;
	}

	return copyArray;
}

function inputValue(value) {
	var target;
	if (document.getElementById('keyboard2').style.display == 'block') {
		val = document.getElementById("form-login-id").value;
		target = document.getElementById("form-login-id");
	} else {

		val = document.getElementById("form-login-pass").value;
		target = document.getElementById("form-login-pass");
	}
	if (val.length < target.maxLength) {
		target.value = val + value;
	}

}

function inputValue(value) {
	val = document.getElementById(targetField).value;
	if (val.length < document.getElementById(targetField).getAttribute(
			'maxlength')) {
		document.getElementById(targetField).value = val + value;
	}
}

function inputValueCharCode(code) {
	val = document.getElementById(targetField).value;

	if (val.length < document.getElementById(targetField).getAttribute(
			'maxlength')) {
		document.getElementById(targetField).value = val
				+ String.fromCharCode(code);
	}
}


function bgWhite(){

     var target1 = document.getElementById('form-login-pass');
     target1.style.backgroundColor = "rgb(255, 255, 255)";
     var target2 = document.getElementById('form-login-id');
     target2.style.backgroundColor = "rgb(255, 255, 255)";


}

