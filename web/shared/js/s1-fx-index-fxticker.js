jQuery(document).ready(function() {
  var cookie = $.cookie("point-auth");
  if(cookie == null) {
    $(".point-auth-01").show();
  } else {
    $("#point-disp").show();
  }
})

$(".sp-title").click(function() {
  $(".point-auth-01").hide();
  $(".point-auth-02").show();
})

$(".point-agree").click(function() {
  $(".point-auth-02").hide();
  $.cookie("point-auth","1",{ path:"/"});
  $("#point-disp").show();
})

jQuery.extend({
	csv : function(delim, quote, linedelim) {
		delim = typeof delim == "string" ? new RegExp("[" + (delim || ",")
				+ "]") : typeof delim == "undefined" ? "," : delim;
		quote = typeof quote == "string" ? new RegExp("^[" + (quote || '"')
				+ "]") : typeof quote == "undefined" ? '"' : quote;
		lined = typeof lined == "string" ? new RegExp("[" + (lined || "\n")
				+ "]+") : typeof lined == "undefined" ? "\n" : lined;
		function splitline(v) {
			var arr = v.split(delim), out = [], q;
			for (var i = 0, l = arr.length; i < l; i++) {
				if (q = arr[i].match(quote)) {
					for (j = i; j < l; j++) {
						if (arr[j].charAt(arr[j].length - 1) == q[0]) {
							break;
						}
					}
					var s = arr.slice(i, j + 1).join(delim);
					out.push(s.substr(1, s.length - 2));
					i = j;
				} else {
					out.push(arr[i]);
				}
			}
			return out;
		}
		return function(text) {
			var lines = text.split(lined);
			for (var i = 0, l = lines.length; i < l; i++) {
				lines[i] = splitline(lines[i]);
			}
			return lines;
		};
	}
});
//調整後pathの変更
function getRatedata() {
var dtbl = new Array(2, 3, 4, 5, 6, 7, 8, 9, 12, 13, 14, 10, 11, 15,
		16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27);
if ("_csv" in window) {
} else {
	$.get('/web/fx/RateData/SwapData.dat?'+ Date.now(), function(data) {
		var csv = $.csv("\t")(data);
		for ( var i in dtbl) {
			var j = dtbl[i];
			var key = "#FXSWB" + j;
			$(key).html(csv[j][1]);
			var key = "#FXSWA" + j;
			$(key).html(csv[j][2]);
		}
	});
}
$.get('/web/fx/RateData/RateData.dat?'+ Date.now(),
	function(data) {
		var csv = $.csv("\t")(data);
		var ctbl = [ {
			"sc" : 0,
			"cv" : 0
		}, {
			"sc" : 0,
			"cv" : 0
		}, {
			"sc" : 100,
			"cv" : 0
		}, {
			"sc" : 100,
			"cv" : 0
		}, {
			"sc" : 100,
			"cv" : 0
		}, {
			"sc" : 100,
			"cv" : 0
		}, {
			"sc" : 10000,
			"cv" : 2
		}, {
			"sc" : 10000,
			"cv" : 2
		}, {
			"sc" : 10000,
			"cv" : 2
		}, {
			"sc" : 100,
			"cv" : 0
		}, {
			"sc" : 100,
			"cv" : 0
		}, {
			"sc" : 100,
			"cv" : 0
		}, {
			"sc" : 100,
			"cv" : 0
		}, {
			"sc" : 100,
			"cv" : 0
		}, {
			"sc" : 100,
			"cv" : 0
		}, {
			"sc" : 100,
			"cv" : 0
		}, {
			"sc" : 10000,
			"cv" : 2
		}, {
			"sc" : 10000,
			"cv" : 12
		}, {
			"sc" : 10000,
			"cv" : 13
		}, {
			"sc" : 10000,
			"cv" : 13
		}, {
			"sc" : 10000,
			"cv" : 4
		}, {
			"sc" : 10000,
			"cv" : 13
		}, {
			"sc" : 10000,
			"cv" : 13
		}, {
			"sc" : 10000,
			"cv" : 13
		}, {
			"sc" : 10000,
			"cv" : 10
		}, {
			"sc" : 100,
			"cv" : 0
		}, {
			"sc" : 100,
			"cv" : 0
		}, {
			"sc" : 100,
			"cv" : 0
		} ];
		for ( var i in dtbl) {
			var j = dtbl[i];
			let bid = $(".FXBID" + j).html(rateFormat(csv[j][12], ctbl[j].sc)).removeClass("pcmm-rfx-main-index__price-up").removeClass("pcmm-rfx-main-index__price-down");
			if ("_csv" in window) {
				if (_csv[j][12] < csv[j][12]) {
					bid.addClass("pcmm-rfx-main-index__price-up");
				} else if (_csv[j][12] > csv[j][12]) {
					bid.addClass("pcmm-rfx-main-index__price-down");
				}
			}
			let ask = $(".FXASK" + j).html(rateFormat(csv[j][13], ctbl[j].sc)).removeClass("pcmm-rfx-main-index__price-up").removeClass("pcmm-rfx-main-index__price-down");
			if ("_csv" in window) {
				if (_csv[j][13] < csv[j][13]) {
					ask.addClass("pcmm-rfx-main-index__price-up");
				} else if (_csv[j][13] > csv[j][13]) {
					ask.addClass("pcmm-rfx-main-index__price-down");
				}
			}
			$(".FXSPD" + j).html(spreadFormat(csv[j][12], csv[j][13], ctbl[j].sc));
		}
		_csv = csv;
	});
}
function rateFormat(str, sc) {
	var num = new String(str).split(".");
	if (sc == 100) {
		return  "<span class=\"spm-m1-rfx-rate__price spm-typo--heading-lv1\">" +num[0]
				+ ".<span class=\"price-large spm-m1-rfx-rate__price-strong\">"
				+ num[1].substring(0, 2) + "</span>" + num[1].charAt(2)
				+ "</span>";
	} else {
		return "<span class=\"spm-m1-rfx-rate__price spm-typo--heading-lv1\">" + num[0]
				+ "."
				+ num[1].substring(0, 2)
				+ "<span class=\"price-large spm-m1-rfx-rate__price-strong\">"
				+ num[1].substring(2, 4) + "</span>" + num[1].charAt(4)
				+ "</span>";
	}
}
function spreadFormat(bid, ask, sc) {
	var num = new String((parseFloat(ask) - parseFloat(bid)) * sc + 0.01);
	var cn = 3;
	if (parseInt(num) > 9)
		cn = 4;
	return num.substring(0, cn);
}

function addComma(str) {
	var num = new String(str).replace(/,/g, "");
	while (num != (num = num.replace(/^(-?\d+)(\d{3})/, "$1,$2")))
		;
	return num;
}
	
getRatedata();
$(function() {
	setInterval(function() {
		getRatedata();
	}, 3000);
});
$("#show-all-pair").click(function() {
	$(".trhide").show();
	$("#show-all-pair").hide();
});