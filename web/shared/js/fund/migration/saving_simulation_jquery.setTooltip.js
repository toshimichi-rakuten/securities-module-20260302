/***
* 
* $.setTooltip
*
* Demo:
* <p><span class="tooltip foo">hoge</span></p>
*  ～
* <div id="foo" class="tooltip">
* <p>ツールチップの内容</p>
* <p><a href="#" class="clear"></a></p>
* </div>
* 
* Presentation:
* 特定のコンテンツの表示/非表示を制御する。
*
* Use:
* setTooltip( @options )
* 
* Attributes:
* -@options: オプションのハッシュ
*  -tooltip: 表示/非表示対象となる要素群のセレクタ
*  -str: 挿入される要素の内容
*  -speed: 表示/非表示切り替えのアニメーション速度（ms）、デフォルトで 200（0.2秒）
*  -delay: アニメーションを実行するまでの待機時間（ms）、デフォルトで 200（0.2秒）
*  -clear: ツールチップを閉じる要素のセレクタ
* 
* Examples:
* :$('span.tooltip').setTooltip({
* :    tooltip : 'tooltip',
* :    str : 'Help',
* :    speed : 1000,
* :    delay : 0,
* :    clear : '.clear'
* :});
* = span.tooltip内の末尾に
* = ・内容：「Help」
* = ・href属性値：「#」＋ span.tooltipの「tooltip」以外のclass属性値
* = というa要素が挿入されます。
* = そのa要素の遷移先の要素が
* = ・クリックなどの操作をしてから 0ms 遅れて
* = ・1000ms（1秒）かけてアニメーション
* = という条件で表示/非表示になります。（ツールチップ）
* = ツールチップ内の「clear」というclass属性値を持った要素を操作するとツールチップが非表示になります。
*
* Note:
* span.tooltipのclass属性値には必ず表示させたいツールチップ要素のid属性値を併記してください。
* 表示/非表示とアニメーションのみを動的に制御しているだけなので、見栄えはスタイルシートで調整してください。
* 
***/

// 実行コード
$(document).ready(function() {
    $('span.tooltip').setTooltip({
        tooltip : 'tooltip',
        str : '<img src="/web/shared/img/fund/migration/saving/simulation/btn-help-01.gif" alt="意味" />',
        speed : 70,
        delay : 70,
        clear : 'a[href="#close"]'
    });
});

// プラグイン
(function($){
    var name_space = 'setTooltip';
    $.fn[name_space] = function(options) {
        var settings = $.extend({
            tooltip : 'tooltip',
            another : 'self',
            str : '?',
            speed : 200,
            delay : 200,
            clear : 'a[href="#close"]'
        }, options);
        var tooltip = $('.' + settings.tooltip).not('span').css({
            position : 'absolute',
            opacity : 1
        }).hide(); // 表示/非表示対象となる要素群
        var tip_visible = false, // flag: tooltipがvisible/hidden
            self_str = '';
        $(this).each(function() {
            if ($(this).hasClass(settings.another)) {
                self_str = $(this).text();
                $(this).text('').append('<a href="#'+ $(this).attr('class').replace(settings.tooltip, '').replace(settings.another, '').replace(/ /g, '') +'">'+ self_str +'</a>');
            another_flag = true;
            } else {
                $(this).append('<a href="#'+ $(this).attr('class').replace(settings.tooltip, '').replace(' ', '') +'">'+ settings.str +'</a>');
            }
        });
        return this.find('a').each(function(i) {
            var $_ = $(this);
            this.index = i;
            var target = tooltip.filter(this.hash),
                tm = [],
                delay = settings.delay,
                speed = settings.speed;
            // イベント
            $_.click(function() {
                tooltip.hide();
                $_show(this, target);
                addPosition(this);
                return false;
            });
            $(document).click(function(event) {
                doc_click(event);
            });
            if (navigator.userAgent.indexOf('iPhone') != -1) {
                document.addEventListener('touchstart', doc_click, false);
            }
            function doc_click(event){
                if ($(event.target).parents('div').attr('class') == settings.tooltip || $(event.target).attr('class') == settings.tooltip) {
                    event.stopPropagation();
                }
                else{
                    $_hide(this, target);
                }
            }
            $(settings.clear, target).click(function() {
                $_hide(this, target);
                return false;
            });
            // 起動する要素の座標からtarget要素のポジション調整
            function addPosition(elem) {
                if (!tip_visible) {
                    return;
                }
                var pos = $(elem).offset();
                var pos_ = {
                    top : pos.top + 15,
                    left : pos.left + 15
                };
                var limits = {
                    top : $(document).scrollTop(),
                    bottom : $(document).scrollTop() + $(window).height(),
                    left : $(document).scrollLeft(),
                    right : $(document).scrollLeft() + $(window).width()
                };
                pos_.left = Math.min(pos_.left, limits.right - target.outerWidth());
                if ((pos_.top + target.outerHeight()) > limits.bottom && (pos.top - target.outerHeight()) > limits.top) {
                    pos_.top = pos.top - target.outerHeight() - 15;
                }
                target.css({
                    top : pos_.top,
                    left : pos_.left
                });
            }
            // ターゲット要素の表示/非表示
            var timer,
                flag;
            function $_show(elem, target) {
                clearTimeout(tm[this.index]);
                tip_visible = true;
                timer = setTimeout(function() {
                    target.fadeIn(speed, function() {
                        this.setAttribute('tabIndex', 0);
                        this.focus();
                    }).keydown(function(event) {
                        var code = event.keyCode;
                        if (code == 27) { // Esc key
                            $_hide(this, target);
                            this.removeAttribute('tabIndex');
                            elem.focus();
                        }
                    });
                }, delay);
                flag = elem;
            }
            function $_hide(elem, target) {
                clearTimeout(timer);
                tip_visible = false;
                tm[this.index] = setTimeout(function() {
                    target.fadeOut(speed);
                }, 100);
                if (flag) {
                    $(flag).focus();
                }
                flag = '';
            }
        });
    };
})(jQuery);
