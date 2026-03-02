jQuery.extend({
  csv: function(delim, quote, linedelim) {
  delim = typeof delim == "string" ? new RegExp( "[" + (delim || ","   ) + "]" ) : typeof delim == "undefined" ? ","    : delim;
  quote = typeof quote == "string" ? new RegExp("^[" + (quote || '"'   ) + "]" ) : typeof quote == "undefined" ? '"'    : quote;
  lined = typeof lined == "string" ? new RegExp( "[" + (lined || "\n") + "]+") : typeof lined == "undefined" ? "\r\n" : lined;
  function splitline (v) {
  var arr  = v.split(delim), out = [], q;
  for (var i=0, l=arr.length; i<l; i++) {
  if (q = arr[i].match(quote)) {
  for (j=i; j<l; j++) {
  if (arr[j].charAt(arr[j].length-1) == q[0]) { break; }
  }
  var s = arr.slice(i,j+1).join(delim);
  out.push(s.substr(1,s.length-2));
  i = j;
  } else {
  out.push(arr[i]);
  }
  }
  return out;
  }
  return function(text) {
  var lines = text.split(lined);
  for (var i=0, l=lines.length; i<l; i++) {
  lines[i] = splitline(lines[i]);
  }
  return lines;
  };
  }
  });
  function getRatedata() {
  var dtbl = new Array( 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29 );
  var adtbl;
  //if("_csv" in window) {
  //} else {
  $.get('/web/fx/RateData/SwapData.dat', function (data) {
  var csv = $.csv("\t")(data);
  for(var i in dtbl) {
  var j =  dtbl[i];
  var key = "#FXSWB" + j;
  $(key).html(String(csv[j][1]));
  var key = "#FXSWA" + j;
  $(key).html(String(csv[j][2]));
  }
  $("#FXUPDATETIME").html(csv[0][0] + "更新");
  });
  $.get('/web/fx/csv/Spread_Data.csv', function (data) {
    adjtbl = $.csv(",")(data);
  });
  //}
  $.get('/web/fx/RateData/RateData.dat', function (data) {
  var csv = $.csv("\t")(data);
  var ctbl = [
  { "sc":    0, "cv":  0, "pe":  0.0 },
  { "sc":    0, "cv":  0, "pe":  0.0 },
  { "sc":  100, "cv":  0, "pe": 25.0 },
  { "sc":  100, "cv":  0, "pe": 25.0 },
  { "sc":  100, "cv":  0, "pe": 25.0 },
  { "sc":  100, "cv":  0, "pe": 25.0 },
  { "sc":10000, "cv":  2, "pe": 25.0 },
  { "sc":10000, "cv":  2, "pe": 25.0 },
  { "sc":10000, "cv":  2, "pe": 25.0 },
  { "sc":  100, "cv":  0, "pe": 25.0 },
  { "sc":  100, "cv":  0, "pe": 25.0 },
  { "sc":  100, "cv":  0, "pe": 25.0 },
  { "sc":  100, "cv":  0, "pe": 25.0 },
  { "sc":  100, "cv":  0, "pe": 25.0 },
  { "sc":  100, "cv":  0, "pe": 20.0 }, //TRY 25->20
  { "sc":  100, "cv":  0, "pe": 25.0 },
  { "sc":10000, "cv":  2, "pe": 25.0 },
  { "sc":10000, "cv": 12, "pe": 25.0 },
  { "sc":10000, "cv": 13, "pe": 25.0 },
  { "sc":10000, "cv": 13, "pe": 25.0 },
  { "sc":10000, "cv":  4, "pe": 25.0 },
  { "sc":10000, "cv": 13, "pe": 25.0 },
  { "sc":10000, "cv": 13, "pe": 25.0 },
  { "sc":10000, "cv": 13, "pe": 25.0 },
  { "sc":10000, "cv": 10, "pe": 25.0 },
  { "sc":  100, "cv":  0, "pe": 25.0 },
  { "sc":  100, "cv":  0, "pe": 25.0 },
  { "sc":  100, "cv":  0, "pe": 25.0 },
  { "sc":10000, "cv":  5, "pe": 25.0 },
  { "sc":10000, "cv":  5, "pe": 25.0 }
  ];
  for(var i in dtbl) {
  var j =  dtbl[i];
  var key = "#FXBID" + j;
  $(key).html(csv[j][12]);
  $(key).removeClass("up-02");
  $(key).removeClass("down-02");
  if("_csv" in window) {
  if(_csv[j][12] < csv[j][12]) {
  $(key).addClass("up-02");
  } else if(_csv[j][12] > csv[j][12]) {
  $(key).addClass("down-02");
  }
  }
  var key = "#FXASK" + j;
  $(key).html(csv[j][13]);
  $(key).removeClass("up-02");
  $(key).removeClass("down-02");
  if("_csv" in window) {
  if(_csv[j][13] < csv[j][13]) {
  $(key).addClass("up-02");
  } else if(_csv[j][13] > csv[j][13]) {
  $(key).addClass("down-02");
  }
  }
  var key = "#FXSPD" + j;
  $(key).html(spreadFormat(csv[j][12], csv[j][13], ctbl[j].sc));
  var key = "#FXSPD" + j + "_1";
  $(key).html(spdadjcalc(csv[j][12], csv[j][13], ctbl[j].sc, adjtbl[j][0]));
  var key = "#FXSPD" + j + "_2";
  $(key).html(spdadjcalc(csv[j][12], csv[j][13], ctbl[j].sc, adjtbl[j][1]));
  var key = "#FXCHG" + j;
  $(key).html(csv[j][16]);
  if(parseFloat(csv[j][16]) > 0.0) {
  $(key).addClass("up-02");
  } else {
  $(key).addClass("down-02");
  }
  var key = "#FXDEP" + j;
  if(ctbl[j].cv == 0) {
  var dep = (parseFloat(csv[j][12]) +  parseFloat(csv[j][13])) / 2.0 * 1000.0 / ctbl[j].pe;
  } else {
  var n = ctbl[j].cv;
  var dep = (parseFloat(csv[j][12]) +  parseFloat(csv[j][13])) / 2.0 * 1000.0 / ctbl[j].pe * (parseFloat(csv[n][12]) +  parseFloat(csv[n][13])) / 2.0;
  }
  //$(key).html(addComma(parseInt(dep)));
  $(key).html(addComma(Math.ceil(dep)));
  }
  _csv = csv;
  });
  }
  function rateFormat(str, sc) {
  var num = new String(str).split(".");
  if(sc == 100) {
  return "<span class=\"integer\">" + num[0] + ".</span><span class=\"decimal\">" + num[1].substring(0,2) + "<span>" + num[1].charAt(2) + "</span></span>";
  } else {
  return "<span class=\"integer\">" + num[0] + "." + num[1].substring(0,2) + "</span><span class=\"decimal\">" + num[1].substring(2,4) + "<span>" + num[1].charAt(4) + "</span></span>";
  }
  }
  function spreadFormat(bid, ask, sc) {
  var num = new String((parseFloat(ask)-parseFloat(bid))*sc+0.01);
  var cn = 3;
  if(parseInt(num) > 9) cn = 4;
  return num.substring(0, cn);
  }
  function spdadjcalc(bid, ask, sc, adj) {
  if(adj.indexOf("ー") != -1) { return adj; }
  var num = new String((parseFloat(ask)-parseFloat(bid))*sc + 0.01 + parseFloat(adj));
  var cn = 3;
  if(parseInt(num) > 9) cn = 4;
  return num.substring(0, cn);
  }
  function addComma(str) {
  var num = new String(str).replace(/,/g, "");
  while(num != (num = num.replace(/^(-?\d+)(\d{3})/, "$1,$2")));
  return num;
  }

getRatedata();
$(function() {
setInterval(function() { getRatedata(); },3000);
});
$("#show-all-pair").click(function() {
$(".trhide").show();
$("#show-all-pair").hide();
});