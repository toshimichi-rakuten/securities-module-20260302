  (function($){
    $(function(){
        $('a[href^=#inline-wrap]').click(function(){
            return false;
        })
    });
    /*画像の場合*/
    $('.s1-mfp-image-link').magnificPopup({type: 'image'});

    /*動画の場合*/
    $('.s1-mfp-movie-link').magnificPopup({
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 150,
      preloader: false,
      fixedContentPos: false
    });

    /*タグによるエリアの場合*/
    $('.s1-mfp-popup-modal').magnificPopup({
      type: 'inline',
      preloader: false
    });

    $('.s1-mfp-popup-iframe').magnificPopup({
      disableOn: 500,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 200,
      preloader: false,
      fixedContentPos: false
    });

    //閉じるリンクの設定
    $(document).on('click', '.s1-mfp-popup-modal-dismiss', function (e) {
      e.preventDefault();
      $.magnificPopup.close();
    });


  })(jqBase);