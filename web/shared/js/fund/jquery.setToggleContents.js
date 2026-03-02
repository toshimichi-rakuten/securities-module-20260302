/***
* 
* $.setToggleContents
*
* Demo:
* <div id="section">
* <div class="toggle">
* <p>コンテンツ</p>
* </div>
* </div>
* 
* Presentation:
* 特定のコンテンツの表示/非表示を制御する。
*
* Use:
* setToggleContents( @options )
* 
* Attributes:
* -@options: オプションのハッシュ
*  -target: 表示/非表示される要素のセレクタ、デフォルトで対象要素の:first-child
*  -btn_open: コンテンツを表示させるスイッチ部分のマークアップ（a要素を必ず含んでください）
*  -btn_close: コンテンツを非表示にするスイッチ部分のマークアップ（a要素を必ず含んでください）
*  -speed: 表示/非表示切り替えのアニメーション速度（ms）、デフォルトで 400（0.4秒）
*  -init: 対象要素のclass属性値に存在するとページロード完了時、表示された状態になります
* 
* Examples:
* :$('#section').setToggleContents({
* :    target : '.toggle',
* :    btn_open : '<p class="more"><a href="#">もっと見る</a></p>',
* :    btn_close : '<p class="close"><a href="#">閉じる</a></p>',
* :    speed : 0,
* :    init : 'open'
* :});
* = #section 内の .toggle を .more>a で開き、.close>a で閉じる。その時のアニメーションは 0 秒（アニメーションしない）。
* = この場合、.open と .close はスクリプトとは関知し合いません。純粋にスタイリング用のclassとして使用できます。
*
* Note:
* target と btn_open/close はすべて兄弟要素になります
* 
***/

// 実行コード
$(document).ready(function() {
    $('.toggle-contents').setToggleContents({
        target : '.contents-more',
        btn_open : '<p class="align-C margin-reset-01"><a href="#"><img src="/web/shared/images/button/btn-form-search-more-01.gif" alt="さらに詳しく条件を追加して検索する" /></a></p>',
        btn_close : '<p class="align-C margin-reset-01"><a href="#"><img src="/web/shared/images/button/btn-form-search-more-01.gif" alt="さらに詳しく条件を追加して検索する" /></a></p>',
        speed :600,
        init : 'open'
    });
});

// プラグイン
(function($) {
    var name_space = 'setToggleContents';
    $.fn[name_space] = function(options) {
        if ($(this)[0]) {
            var settings = {
                target : ':first-child',
                btn_open : '<p><a href="#">もっと見る</a></p>',
                btn_close : '<p><a href="#">閉じる</a></p>',
                speed : 400,
                init : 'open'
            };
            if (options) {
                jQuery.extend(settings, options);
            }
            $(this).each(function() {
                var contents = $(settings.target, this);
                contents.before(settings.btn_open +'\r\n');
                contents.before(settings.btn_close +'\r\n');
                var btn_open = contents.prev().prev(),
                    btn_close = contents.prev();
                if ($(this).hasClass(settings.init)) {
                    btn_open.hide();
                } else {
                    contents.hide();
                    btn_close.hide();
                }
                btn_open.find('a').bind('click', function() {
                    contents.slideDown(settings.speed);
                    //btn_open.css({ opacity : 0.25 });
                    setTimeout(function() {
                        btn_open.hide();
                        btn_close.css({ opacity : 1 });
                        btn_close.show();
                    }, settings.speed);
                    return false;
                });
                btn_close.find('a').bind('click', function() {
                    contents.slideUp(settings.speed);
                    //btn_close.css({ opacity : 0.25 });
                    setTimeout(function() {
                        btn_close.hide();
                        btn_open.css({ opacity : 1 });
                        btn_open.show();
                    }, settings.speed);
                    return false;
                });
            });
        }
    };
})(jQuery);