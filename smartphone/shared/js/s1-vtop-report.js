
function choice01v2(data){
  
    var gz = getCookie("Rg_sec");

    var str = "";
    
    // for(i=0; i<data.List.length; i++) {
    for(i=0; i<3; i++) {
        str = str + "<li  class=\"toushiru__item\">";
        if(gz != null) {
          str = str + "<a href=\"" + data.List[i].Link + "\" onclick=\"s.lidTrack(\'" + makeSID("sp_vtop_m_report_", data.List[i].Date, data.List[i].Link) + "\')\;this.href=usergram.link(this.href)\;\" target=\"_blank\">";
        } else {
          str = str + "<a href=\"" + data.List[i].Link + "\" onclick=\"s.lidTrack(\'" + makeSID("sp_vtor_v_top_report_", data.List[i].Date, data.List[i].Link) + "\')\;this.href=usergram.link(this.href)\;\" target=\"_blank\">";
        }
        if(data.List[i].Author) {
          str = str + "<span class=\"name\">" + data.List[i].Author + "</span>";
        }
        str = str + "<span class=\"date\">" + data.List[i].Date;
        if(data.List[i].Newflg == 1) {
          str = str + "<span class=\"icon\">NEW</span></span>";
        }else if(data.List[i].Newflg == 0){
        str = str + "</span>";
        }
        str = str + "<span class=\"clearfix\">";
        str = str + "<img src=\"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==\" data-src=\"" + data.List[i].Image + "\" alt=\"\" width=\"120\" height=\"80\" class=\"lazyload\">";
        str = str + "<span class=\"txt\">" +  data.List[i].Title + "</span>";
        str = str + "</span>";
        str = str + "</a>";
        str = str + "</li>";
    }

    document.getElementById("REPLST").innerHTML = str;
  
}
  
function makeSID(prefix, date, link){
  var sid = "";

  var dt = date.split("/");
  var at = link.split("/");

  sid = prefix + dt[0] + dt[1] + dt[2] + "_" + at[5];

  return sid;
}

function getCookie( name ){
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

  $(document).ready(function(){
      $.ajax({
        url : "https://media.rakuten-sec.net/list/feed/choice01v2.js",
        type : "get",
        dataType : "jsonp",
        scriptCharset : "UTF-8",
        cache : false,
        timeout: 10000,
        complete :  function(data){
        }
      });
  });
  
}, false);
