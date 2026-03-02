
function index(json){
  // 日経225
  $(".n225rt").html( addComma(json.list[0][2]) );
  $(".n225dt").html("(" + json.list[0][3] + ")" );
  $(".n225cp").html( json.list[0][4] );
  if( json.list[0][4] > 0) {
    $(".n225cp").addClass("up-02");
  } else if( json.list[0][4] < 0) {
    $(".n225cp").addClass("down-02");
  }

  // TOPIX
  $(".toprt").html( addComma(json.list[1][2]) );
//  $(".topdt").html("(" + json.list[1][3] + ")" );
  $(".topcp").html( json.list[1][4] );
  if( json.list[1][4] > 0) {
    $(".topcp").addClass("up-02");
  } else if( json.list[1][4] < 0) {
    $(".topcp").addClass("down-02");
  }

  // DOW
  $(".dowrt").html( addComma(json.list[7][2]) );
  $(".dowdt").html("(" + json.list[7][3] + ")" );
  $(".dowcp").html( json.list[7][4] );
  if( json.list[7][4] > 0) {
    $(".dowcp").addClass("up-02");
  } else if( json.list[7][4] < 0) {
    $(".dowcp").addClass("down-02");
  }
}
  
function forex(json){
  // USD
  $(".usdrt").html( addComma(json.list[0][2]) );
  $(".usddt").html("(" + json.list[0][4] + ")" );
  $(".usdcp").html( json.list[0][5] );
  if( json.list[0][5] > 0) {
    $(".usdcp").addClass("up-02");
  } else if( json.list[0][5] < 0) {
    $(".usdcp").addClass("down-02");
  }
}
  
function addComma(str) {
  var num = new String(str).replace(/,/g, "");
  while(num != (num = num.replace(/^(-?\d+)(\d{3})/, "$1,$2")));
  return num;
}

function getCookieMarket( name ){
  var result = null;

  var cookieName = name + '=';
  var allcookies = document.cookie;

  var position = allcookies.indexOf( cookieName );
  if( position != -1 ) {
    var startIndex = position + cookieName.length;
    var endIndex = allcookies.indexOf( ';', startIndex );
    if( endIndex == -1 ) {
      endIndex = allcookies.length;
    }
    result = decodeURIComponent( allcookies.substring( startIndex, endIndex ) );
  }
  return result;
}
  
window.addEventListener( 'load', function(){
  
  var ms = getCookieMarket("mode-select");
  if(ms == null) {
    $("#reuters").show();
    $("#reuters2").hide();
  } else {
    if(ms == 2) {
      $("#reuters").hide();
      $("#reuters2").show();
    } else {
      $("#reuters").show();
      $("#reuters2").hide();
    }
  }
  var reqID = new Array( "101", "103");
  
  for(var i in reqID) {
    var _url = "https://www.trkd-asia.com/rakutensecj/pagecontent?pid=" + reqID[i];
  
    $.ajax({
      url : _url,
      type : "get",
      dataType : "jsonp",
      scriptCharset : "UTF-8",
      cache : false,
      timeout: 5000,
      complete :  function(){
      }
    });
  }
  
}, false);
