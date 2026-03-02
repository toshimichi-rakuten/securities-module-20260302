
// --------------------------------------------------------------
// リンク振り分け処理
// --------------------------------------------------------------

// コンテンツからdata-sp-href属性を取得 → ループ処理
$('body').find('[data-sp-href]').each(function(){
  $(this).attr('href', $(this).attr('data-sp-href'));
});

$('#pcsp-quick a').each(function(){
  $(this).addClass('link');
});

// pdfアイコン表示用クラスを付与
$(function(){
  $('a[href$=pdf]').addClass('icon-pdf');
});

// Q&Aアコーディオンモジュール初期表示
$('.q1-faq.s1-accordion dd').css('display','none');