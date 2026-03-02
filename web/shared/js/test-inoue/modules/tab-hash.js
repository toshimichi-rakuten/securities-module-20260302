(function($){

  var tabMenu = function() {

    /**
     * 変数の指定
     * $tabs              : tabの親要素のjQueryオブジェクト
	 * $wrap              : tabによって切り替わる要素の大枠divのjQueryオブジェクト
     * $content           : tabによって切り替わる要素のjQueryオブジェクト
     * TAB_ACTIVE_CLASS   : tabが選択されたスタイルを変更するclass名
     * CONTENT_SHOW_CLASS : contentを表示させるためのclass名
     * id_arr             : $contentのIDを配列に格納
	 * $anchors           : ページ内アンカーリンク要素のjQueryオブジェクト
	 * TAB_ID_INI         : TABのIDの頭文字
     */
    var $tabs              = $('.s1-tab-hash');
	var $wrap              = $('.s1-tab-content-hash');
    var $content           = $('.s1-tab-content-hash__block');
    var TAB_ACTIVE_CLASS   = 'is-active';
    var CONTENT_SHOW_CLASS = 'is-active';
    var id_arr             = $content.map(function() { return '#' + $(this).attr('id');}).get();
	var $anchors           = $('.s1-tab-hash-anchor');
	var TAB_ID_INI         = '#tab-';


    /**
     * 複数タブ制御のための連番クラスを付与
     * .s1-tab-hash--1、s1-tab-content-hash--1
	 * cntはs1-tab-hashの個数。後ほどの関数でも使用。
     */	
	var cnt = 0;
	$tabs.each(function(){
        cnt++;
		var tabs_buf = 's1-tab-hash' + '--' + cnt;
		$tabs.eq(cnt-1).addClass(tabs_buf);
//		alert(tabs_buf);
    });	
	var cnt = 0;
	$wrap.each(function(){
        cnt++;
		var wrap_buf = 's1-tab-content-hash' + '--' + cnt;
		$wrap.eq(cnt-1).addClass(wrap_buf);
    });

    /**
     * 該当するhashデータがある場合、hashを返す
     * 該当とは id_arr[] に含まれるもの
     * @return {string} 該当する場合
     * @return {false} 該当しない（存在しない）場合
     */
    var getHash = function() {
      var hash = window.location.hash;
      var index = id_arr.indexOf(hash);

      if (index === -1) {
        return false;
      } else {
        return id_arr[index];
      }
    };


    /**
     * ページ読み込み時に実行、forでタブの個数の数だけループ処理
     * 1.  hashの有無で分岐
	 * 1-1.$tabs内にハッシュリンクが存在していたら、それを選択し、なければ最初のdivを表示
     * 2.  hashがなければ最初のdivを表示
     */
    var initialize = function() {
      var hash = getHash();
	  
	  for (var i=1; i<=cnt; i++) {
		  var tabs_buf = '.s1-tab-hash' + '--' + i;
		  var $tabs = $(tabs_buf);
		  var wrap_buf = '.s1-tab-content-hash' + '--' + i;
		  var $wrap = $(wrap_buf);
		  
		  if (hash) { //1
			  var TAB_ID = TAB_ID_INI + hash.replace('#','');
			  if ($tabs.find(TAB_ID).length){ // 1-1
				  $tabs.find(TAB_ID).addClass(TAB_ACTIVE_CLASS); 
				  $(hash).addClass(CONTENT_SHOW_CLASS);
				  }else{
					  $tabs.find('li:first-child').addClass(TAB_ACTIVE_CLASS);
					  $wrap.find('.s1-tab-content-hash__block:first-child').addClass(CONTENT_SHOW_CLASS);
					  //console.log($wrap);
				  }
			  }else {　//2
				  $tabs.find('li:first-child').addClass(TAB_ACTIVE_CLASS);
				  $('.s1-tab-content-hash__block:first-child').addClass(CONTENT_SHOW_CLASS);
				  }
		  }
    };


    /**
     * タブのクリックイベント
     * 1. クリックされたタブのID, 該当するcontent、それぞれの親要素を取得
     * 2. 既にクリック済みの状態であればスキップ
     * 3. 該当するタブ内にて、一旦タブ・contentの専用classを全削除
     * 4. 該当するタブ内にて、クリックしたタブのスタイルを変更、該当するcontentを表示（それぞれ専用のclassを付与）
     */
    var addEvent = function() {
      $tabs.find('li').on('click', function() {
		  
        var TAB_ID = $(this).attr("id"); // 1
        var $targetContent = $(TAB_ID.replace(TAB_ID_INI.replace('#',''),'#')); // 1
		var $parent_tabs = $(this).parent().parent(); // 1
		var $parent_content = $targetContent.parent(); // 1
		//console.log($parent_content);

        // 2
        if ($(this).hasClass(TAB_ACTIVE_CLASS)) {
          return false;
        }

        // 3
        $parent_tabs.find('li').removeClass(TAB_ACTIVE_CLASS);
        $parent_content.children().removeClass(CONTENT_SHOW_CLASS);

        // 4
        $(this).addClass(TAB_ACTIVE_CLASS);
        $targetContent.addClass(CONTENT_SHOW_CLASS);

        return false;
      });
    };

	
    /**
     * アンカーのクリックイベント
     * 1. クリックされたタブのhref, 該当するcontentを取得、それぞれの親要素を取得
     * 3. 該当するタブ内にて、一旦タブ・contentの専用classを全削除
     * 4. 該当するタブ内にて、クリックしたタブのスタイルを変更、該当するcontentを表示（それぞれ専用のclassを付与）
     */
    var addEventAnchor = function() {
      $anchors.find('a').on('click', function() {
        var href = $(this).attr('href'); // 1
        var $targetContent = $(href); // 1
		var TAB_ID = TAB_ID_INI + href.replace('#','') //1
		var $parent_tabs = $(TAB_ID).parent().parent();  //1
		var $parent_content = $targetContent.parent(); // 1

        // 3
		$parent_tabs.find('li').removeClass(TAB_ACTIVE_CLASS);
        $parent_content.children().removeClass(CONTENT_SHOW_CLASS);

        // 4
        $targetContent.addClass(CONTENT_SHOW_CLASS);
		$parent_tabs.find(TAB_ID).addClass(TAB_ACTIVE_CLASS);

        return false;
      });
    };

    return [initialize(), addEvent(), addEventAnchor()];
  };

  // 実行
  tabMenu();

})(jQuery || jqBase);