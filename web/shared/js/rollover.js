$(document).ready(function() {
  var rollImages = $("img");
  for(var i=0; i < rollImages.length; i++) {
    if(rollImages.eq(i).attr("src").match(".")) {
      $(".roll").eq(i).hover(function() {
        $(this).attr('src', $(this).attr("src").replace(/^(.+)(\.[a-z]+)$/, "$1_o$2"));
      }, function() {
        $(this).attr('src', $(this).attr("src").replace(/^(.+)_o(\.[a-z]+)$/, "$1$2"));
      });
    }
  }
});