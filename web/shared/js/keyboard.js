/* ソフトウェアキーボード(jQuery, jQueryUI利用版)
・使用方法
1.画像パス(baseImagePath)を設定
2.「keyboard.vm」を任意の場所で読み込む
3.呼び出し例を参考にメソッドを追加

呼び出し例：
 jqBase("#keyboard_opener").on("click", function() {
 	tabType = "3"
 	targetIdField = new Array("_oldPasswd", "_newPasswd1", "_newPasswd2");
 	// キーボードを表示するidを指定（指定要素の右側に表示）
	openDialogDefault("#id");
 });

 $targetIdField:操作対象の入力エリアのID。
 				背景色の制御を行うため、ソフトウェアキーボードの対象となる属性を羅列してください。
 				先頭要素はソフトウェアキーボードの入力対象のIDを指定。
 $tabType:1⇒ログインID, 2⇒パスワード, 3⇒ログインID&パスワード, 4⇒タブ無
*/


baseImagePath = "/web/shared/images/keyboard/"

logintabImage = new Array(baseImagePath + "keyboard_tab_idon.gif", baseImagePath + "keyboard_tab_idoff.gif");
passwdtabImage = new Array(baseImagePath + "keyboard_tab_passon.gif",baseImagePath + "keyboard_tab_passoff.gif");

loginIdKeyType = new Array("halfNumber","halfUpper");
passwdKeyType = new Array("halfNumber", "halfUpper", "halfLower", "code");
otherKeyType = new Array("halfNumber");

function getKeyboardHeight(typeStr){
	var uakey = window.navigator.userAgent.toLowerCase();
	var verkey = window.navigator.appVersion.toLowerCase();

	var heightkey = 473;
	if(tabType==1){
		heightkey = 245;
		if (uakey.indexOf("msie") != -1){
			if (verkey.indexOf("msie 7.") != -1){
				heightkey = 250;
			}
		}
	} else if(tabType==2){
		heightkey = 473;
		if (uakey.indexOf("msie") != -1){
			if (verkey.indexOf("msie 7.") != -1){
				heightkey = 480;
			}
		}
	} else if(tabType==3){
		if(typeStr == 1){
			heightkey = 245;
		} else {
			heightkey = 475;
		}
		
		if (uakey.indexOf("msie") != -1){
			if (verkey.indexOf("msie 7.") != -1){
				if(typeStr == 1){
					heightkey = 255;
				} else {
					heightkey = 485;
				}
			}
		}
	} else {
		//tabType==4
		heightkey = 105;
		if (uakey.indexOf("msie") != -1){
			if (verkey.indexOf("msie 7.") != -1){
				heightkey = 110;
			}
		}
	}
	return heightkey;
}

function openDialogDefault(targetName){

	if(jqBase('#form-login-pass').offset().left > 800){
		openDialogCustom(targetName, "left top", "right top", "80 -150");
	}else{
		openDialogCustom(targetName, "left top", "right top", "30 -150");
	}
}

function openDialogCustom(targetName, myStr, atStr, offsetStr){
	jqBase("#keyboard2").show();
	baseCreate();
	jqBase("#keyboard_body").dialog("open");
	jqBase("#keyboard_body").parents(".ui-dialog").find(".ui-dialog-titlebar-close").focus();
	jqBase("#keyboard_body").css("height", getKeyboardHeight(1) + "px");
	jqBase(".keyboard-tab").css("width","360px");
 	jqBase("#keyboard_body").dialog( "option", "position", { my: myStr, at: atStr, of: targetName, offset: offsetStr, collision: "flip"});
}

function baseCreate(){
	targetField = targetIdField[0];
	jqBase("#keyboard_body").dialog({
		appendTo:"#keyboard_parent",
		autoOpen: false,
		width: 360,
		modal: false,
		resizable: false,
		buttons: [
			{
				text: "1文字削除",
				click: function() {
					val = jqBase("#" + targetField).val();
					if(val.length > 0) {
						jqBase("#" + targetField).val(val.slice(0, -1));
					}
				}
			},
			{
				id:"clear",
				text: "クリア",
				click: function() {
					jqBase("#" + targetField).val("");
				}
			}
		],
		open: function(event, ui){
			setKeyboad();
	    },
		close: function(event, ui){
			bgWhite();
	    }
	});
	
	jqBase("#keyboard_body").parents(".ui-dialog").removeClass("ui-corner-all").css({
		padding: "0",
		border: "2px solid #6671B3"
	});
	jqBase("#keyboard_body").parents(".ui-dialog").find(".ui-icon-closethick").css({
		marginLeft: "2px",
		marginTop: "2px"
	});
	jqBase("#keyboard_body").siblings(".ui-dialog-titlebar")
		.removeClass("ui-corner-all").css({
			fontSize: "16px",
			borderWidth: "0",
			paddingTop: "0.4em",
			paddingBottom: "0.4em",
			background: "url("+ baseImagePath +"sprite_key.png) no-repeat top left",
			backgroundPosition: "15px 10px"
		}).find(".ui-button").css({"border-radius": "2px","margin-top": "0","margin-right": "10px","top": "7px"});
	jqBase("#keyboard_body").siblings(".ui-dialog-buttonpane").css({
		"cssText": [
			"font-size: 15px !important;",
			"margin-top: 0;",
			"padding-right: 0;"
		].join("")
	})
	.find(".ui-button").css({
		background: "url("+ baseImagePath +"sprite_key.png) no-repeat top left",
		backgroundPosition: "0 -286px",
		width: "100px",
		fontSize: "14px",
		fontWeight: "bold",
		border: "0",
		paddingBottom: "2px",
		marginTop: "0",
		marginBottom: "0",
		marginRight: "12px"
	})
	.find(".ui-button-text").css({
		padding: "0.3em 0"
	});
	jqBase('button.notext').button({
	    icons: {
	      primary: 'ui-icon-close'
	    },
	    text: false
	});
	jqBase(".ui-dialog-titlebar").mousedown(function() {
		jqBase(this).css("cursor","grabbing");
		jqBase(this).css("cursor","-webkit-grabbing");
	});
	jqBase(".ui-dialog-titlebar").mouseup(function() {
		jqBase(this).css("cursor","grab");
		jqBase(this).css("cursor","-webkit-grab");
	});

	init();
	setKeyboad();
	bgWhite();
	jqBase("#keyboard_body").css("height", getKeyboardHeight(1) + "px");
	jqBase("#"+targetField).css("background-color","rgb(255, 247, 210)");
}

function init(){
	//チェックを外す
	jqBase("#random_check").attr("checked", false);
	jqBase("#hide_check").attr("checked", false);
	//閉じるボタンを追加
	jqBase("#closeButton").remove();
	jqBase("#clear").after("<a id='closeButton' href='#' onclick='return false;' style='padding-right: 20px; padding-left: 50px;'>閉じる</a>");
	jqBase("#closeButton").click(function() {
		jqBase("#keyboard_body").dialog("close");
	});
	//タブ画像追加
	jqBase("#tabImage").empty();
	if(tabType==1){
		jqBase("#tabImage").append("<div style='float:left;margin-left:7px;'><img id='loginIdTab' src='"+ logintabImage[0] +"' ></div>");
		keyType = loginIdKeyType;
	}else if(tabType==2){
		jqBase("#tabImage").append("<div style='float:left;margin-left:7px;'><img id='passwdTab' src='"+ passwdtabImage[0] +"' ></div>");
		keyType = passwdKeyType;
	}else if(tabType==3){
		jqBase("#tabImage").append("<div style='float:left;margin-left:7px;'><img id='loginIdTab' src='"+ logintabImage[0] +"' ></div>");
		jqBase("#tabImage").append("<div style='float:left;margin-left:7px;'><img id='passwdTab' src='"+ passwdtabImage[1] +"' ></div>");
		keyType = loginIdKeyType;
		jqBase("#keyboard_body").css("height","280px");
		
		jqBase("#loginIdTab").click(function() {
			if(keyType != loginIdKeyType){
				jqBase("#keyboard_body").css("height", getKeyboardHeight(1) + "px");
				jqBase("#loginIdTab").attr("src",logintabImage[0]);
				jqBase("#passwdTab").attr("src",passwdtabImage[1]);
				keyType = loginIdKeyType;
				targetField = targetIdField[0];
				setKeyboad();
				bgWhite();
				jqBase("#"+targetField).css("background-color","rgb(255, 247, 210)");
			}
		});
		jqBase("#passwdTab").click(function() {
			if(keyType != passwdKeyType){
				jqBase("#keyboard_body").css("height", getKeyboardHeight(2) + "px");
				jqBase("#loginIdTab").attr("src",logintabImage[1]);
				jqBase("#passwdTab").attr("src",passwdtabImage[0]);
				keyType = passwdKeyType;
				targetField = targetIdField[1];
				setKeyboad();
				bgWhite();
				jqBase("#"+targetField).css("background-color","rgb(255, 247, 210)");
			}
		});
	}else if(tabType==4){
		keyType = otherKeyType;
	}
	//使用方法の場所を変更
	setHowUse();
}
function bgWhite(){
	var i = 0;
	for(i; i<targetIdField.length; i++){
		jqBase("#"+targetIdField[i]).css("background-color","rgb(255, 255, 255)");
	}
}
function setKeyboad(){
	jqBase("#halfNumber").empty();
	jqBase("#halfUpper").empty();
	jqBase("#halfLower").empty();
	jqBase("#code").empty();
	
	var numberArray = new Array("0","1","2","3","4","5","6","7","8","9");
	var alphabetBigArray = new Array("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z");
	var alphabetSmallArray = new Array("a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z");
	var markArray = new Array("+","-","_",".","/","@","*","#","%","!","&quot;","$","&amp;","(",")","=","~","^","?","&gt;","&lt;","\,",";","&#39;","{","}","[","]");
	var random_flag = jqBase("#random_check").prop('checked');
	
	if(random_flag){
		//ランダム表示
		var randomKeyType = getRandomArray(keyType);
		setBaseKeyType(randomKeyType);
		var randomNumArray = getRandomArray(numberArray);
		appendArray(randomNumArray,"halfNumber");
		var randomAlphabetBigArray = getRandomArray(alphabetBigArray);
		appendArray(randomAlphabetBigArray,"halfUpper");
		var randomAlphabetSmallArray = getRandomArray(alphabetSmallArray);
		appendArray(randomAlphabetSmallArray,"halfLower");
		var randomMarkArray = getRandomArray(markArray);
		appendArray(randomMarkArray,"code");
	}else{
		//通常表示
		setBaseKeyType(keyType);
		appendArray(numberArray,"halfNumber");
		appendArray(alphabetBigArray,"halfUpper");
		appendArray(alphabetSmallArray,"halfLower");
		appendArray(markArray,"code");
	}
	setListener();
}
function setBaseKeyType(array){
	jqBase("#keyboard2").empty();
	var i = 0;
	var max = array.length;
	for(i=0; i<max; i++){
		jqBase("#keyboard2").append("<div class='key-group'><div id='"+array[i]+"' class='nowrap' style='margin-bottom: 0px;'></div></div>");
	}
}
function appendArray(array,id){
	for(var i=0; i<array.length; i++){
		var value = array[i];
		if((i % 10) == 0){
			jqBase("#"+id).append("</div><div class='nowrap' style='margin-bottom: 0px;'>");
		}
		if(value == "&quot;"){
			jqBase("#"+id).append("<input type='button' class='keyboard_button' value="+ value +" dispVal="+ value +" onclick='inputValueCharCode(\"34\")'>");
		}else{
			jqBase("#"+id).append("<input type='button' class='keyboard_button' value="+ value +" dispVal="+ value +" onclick='inputValue(\""+value+"\")'>");
		}
		if(i == (array.length)){
			jqBase("#"+id).append("</div>");
		}
	}
}
function getRandomArray(array){
	var copyArray = array.concat();
	var i,x,y = 0;
	var max = copyArray.length;
	for(i=0; i<max; i++){
		x = Math.floor(Math.random()*max);
		y = copyArray[i];
		copyArray[i] = copyArray[x];
		copyArray[x] = y;
	}
	return copyArray;
}
function inputValue(value){
	val = jqBase("#" + targetField).val();
	if(val.length < jqBase("#" + targetField).attr("maxlength")) {
		jqBase("#" + targetField).val(val + value);
	}
}
function inputValueCharCode(code){
	val = jqBase("#" + targetField).val();
	if(val.length < jqBase("#" + targetField).attr("maxlength")) {
		jqBase("#" + targetField).val(val + String.fromCharCode(code));
	}
}
function setHowUse(){
	if(tabType==4){
		jqBase(".keyboard-tab").css("height","7px");
		jqBase(".keyboard-tab").css("background-position","0 -548px");
		jqBase("#howuse").css("margin-top","-25px");
	}else{
		jqBase(".keyboard-tab").css("height","33px");
		jqBase(".keyboard-tab").css("background-position","0 -522px");
		jqBase("#howuse").css("margin-top","");
	}
}
function setListener(){
	jqBase(".keyboard_button").mouseover(function() {
		var hideFlag = jqBase("#hide_check").prop('checked');
		if (isSmartOS()) {
			// スマフォ系はボタン非表示処理を実施しない
			hideFlag = false;
		}
		if(hideFlag){
			// マウスオーバー時にボタン全てを非表示
			jqBase(".keyboard_button").attr("value","");
		}
	});
	jqBase(".keyboard_button").mouseout(function() {
		var hideFlag = jqBase("#hide_check").prop('checked');
		if(hideFlag){
			// マウスアウト時にボタン全てを表示
			jqBase(".keyboard_button").each(function (){
				jqBase(this).attr("value", jqBase(this).attr("dispVal"));
			});
		}
	});
}
function isSmartOS(){
	  var agent = navigator.userAgent.toLowerCase();
	  if(agent.search(/iphone/) != -1){
		  return true;
	  }else if(agent.search(/ipod/) != -1){
		  return true;
	  }else if(agent.search(/ipad/) != -1){
		  return true;
	  }else if(agent.search(/android/) != -1){
		  return true;
	  }else{
		  return false;
	  }
	  return false;
}
function isSHL24(){
	var agent = navigator.userAgent.toLowerCase();
	if(agent.search(/shl24/) != -1){
		return true;
	}
	return false;
}
function chfocus(num){
  if(jqBase(".ui-dialog").css('display') == 'none') return;

  if(num == 0) {
			if(keyType != loginIdKeyType){
				jqBase("#keyboard_body").css("height", getKeyboardHeight(1) + "px");
				jqBase("#loginIdTab").attr("src",logintabImage[0]);
				jqBase("#passwdTab").attr("src",passwdtabImage[1]);
				keyType = loginIdKeyType;
				targetField = targetIdField[0];
				setKeyboad();
				bgWhite();
				jqBase("#"+targetField).css("background-color","rgb(255, 247, 210)");
			}
  } else {
			if(keyType != passwdKeyType){
				jqBase("#keyboard_body").css("height", getKeyboardHeight(2) + "px");
				jqBase("#loginIdTab").attr("src",logintabImage[1]);
				jqBase("#passwdTab").attr("src",passwdtabImage[0]);
				keyType = passwdKeyType;
				targetField = targetIdField[1];
				setKeyboad();
				bgWhite();
				jqBase("#"+targetField).css("background-color","rgb(255, 247, 210)");
			}
  }
}