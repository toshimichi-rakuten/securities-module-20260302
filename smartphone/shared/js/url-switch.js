

if (IsSmartPhone()){
  $(function(){

    $('body').find('[data-sp-href]').each(function(){

      // 属性を入替え
      $(this).attr('href', $(this).attr('data-sp-href'));

    });

  });
}

// UA判定処理
function IsSmartPhone(){

  var media   = ['iPhone','Windows Phone','Android'];
  var pattern = new RegExp(media.join('|'), 'i');

  return pattern.test(navigator.userAgent);

}