
$(function(){

  const ogUrl = $("meta[property ='og:url']").attr('content')
  
  let currentPathName;
      currentPathName = ogUrl.replace('https://www.rakuten-sec.co.jp', '')

  $('.s1-local-nav-cat__item a').each(function(i) {

    if($(this).attr('href') == currentPathName){
      $(this).addClass('current-txt');
    }

  });
});
