/***
 * Vista対応
 *
 **/
(function(){
	var vista = document.getElementById('vistaUser');
	var ua = navigator.userAgent;

	/**
	 *  ブラウザ名を取得
	 *  
	 *  @return     ブラウザ名(ie6、ie7、ie8、ie9、ie10、ie11、chrome、safari、opera、firefox、unknown)
	 *
	 */
	var getBrowser = function(){
	    var ua = window.navigator.userAgent.toLowerCase();
	    var ver = window.navigator.appVersion.toLowerCase();
	    var name = 'unknown';

	    if (ua.indexOf("msie") != -1){
	        if (ver.indexOf("msie 6.") != -1){
	            name = 'ie6';
	        }else if (ver.indexOf("msie 7.") != -1){
	            name = 'ie7';
	        }else if (ver.indexOf("msie 8.") != -1){
	            name = 'ie8';
	        }else if (ver.indexOf("msie 9.") != -1){
	            name = 'ie9';
	        }else if (ver.indexOf("msie 10.") != -1){
	            name = 'ie10';
	        }else{
	            name = 'ie';
	        }
	    }else if(ua.indexOf('trident/7') != -1){
	        name = 'ie11';
	    }else if (ua.indexOf('chrome') != -1){
	        name = 'chrome';
	    }else if (ua.indexOf('safari') != -1){
	        name = 'safari';
	    }else if (ua.indexOf('opera') != -1){
	        name = 'opera';
	    }else if (ua.indexOf('firefox') != -1){
	        name = 'firefox';
	    }
	    return name;
	};

	if(ua.match(/Win(dows )?NT 6\.0/) && getBrowser() == 'ie9'){
		vista.style.display = "block";
	}


})();
