$(function(){
  $(".s3-rc-h-section-nav").clone().prependTo(".s3-rc-h-floating-bar .s3-rc-h-inner");
  $(window).on('load scroll', function(){
    if( $(this).scrollTop() > 850 ){
      $(".s3-rc-h-standard").addClass("s3-rc-h-floating");
    } else{
      $(".s3-rc-h-standard").removeClass("s3-rc-h-floating");
    }
  });
});