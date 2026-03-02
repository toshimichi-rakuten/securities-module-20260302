/*========================
現在地ナビゲーション
・設定ファイル
  /web/shared/js/s1-r-navi_config.js
========================*/
(function($) {
	$(document).ready(function() {
		for(var data in r_navi ){
//			console.log(data);
			if(location.pathname.indexOf(data)==0){
	  		navi_data = r_navi[data];
			}
    }
    if($('.s1-local-nav').length) {
			navCreate(navi_data);
    }
  });

  var navCreate = function(navi_data) {
    //console.log(navi_data);
    var jsonPath = navi_data;
    //var jsonPath = "/style-guide/localnavi.json";
    $.ajax({
      type: 'GET',
      url: jsonPath,
      dataType: 'json',
      async: false,
      success: function(data) {
        // 出力先
        var lnav = $('.s1-local-nav');
        //lnav.empty();
        // 大見出し生成
        lnav.append('<div class="s1-local-nav__hdg"><a href="' + data.header_url + '">' + data.header_name + '</a></div>');
        // 本体定義
        var lnav_body = $('<div class="s1-local-nav__body"></div>');
        var lnav_cat = $('<ul class="s1-local-nav-cat"></ul>');

        // ルート相対パス取得
        var current_url = location.pathname;
	 // console.log("current_url:", current_url);
        if(current_url.slice(-1) == '/') {
          current_url += 'index.html';
        }
        // [debug] URL一次変更
        //current_url = '/style-guide/'
        //current_url = '/web/fund/saving/learn/index.html'
        //current_url = '/web/fund/saving/simulation/index.html'
        //current_url = '/web/fund/saving/way.html'
        //current_url = '/web/fund/learn/about/merit.html'
        //current_url = '/web/fund/index.html'
        // カレント項目未発見フラグ初期化
        var undiscovered = true;
        // JSONパース(カテゴリオブジェクト配列のループ処理)
        $.each(data.categories, function(index, cat){
			//console.log("check-01");
          // アクティブフラグ初期化
          var active = false;
          // ※除外処理を実装するならここに入れる
          if(undiscovered && cat.category_pattern) {
			//console.log("check-02");
            // パターン指定が存在すれば前方一致で判断
            $.each(cat.category_pattern, function(index, value){

			//console.log("check-03", current_url, value);
              // 前方一致パターン配列のループ処理
              if(current_url.indexOf(value) === 0) {
			//console.log("check-04");
                // 一致したら残りはアクティブフラグを立てて残りはキャンセルして抜ける
                active = true;
                undiscovered = false;
                return false;
              }
            });
          } else {
			//console.log("check-05");
            // パターン指定が存在しなければ完全一致で判断
            if(current_url == cat.category_url) {
			//console.log("check-06");
              active = true;
              undiscovered = false;
            }
          }
			//console.log("check-07");
          // 中身のhtmlを生成
          if(active) {
            // アクティブ
            if(cat.items) {
			//console.log("check-08");
              // 区分がない場合
              // Lv2項目を生成して直接挿入
              // Lv1項目にLv2項目を挿入
              lnav_cat.append('<li class="s1-local-nav-cat__item is-current"><a href="' + cat.category_url + '"><i class="s-glyph">&#xf113;</i>' + cat.category + '</a><ul class="s1-local-nav-subcat">' + itemCreate(cat.items, current_url) + '</ul></li>');
            } else if(cat.accordion) {
			//console.log("●check-09");
              // 区分がある場合
              // Lv1項目を生成
              var lnav_items = $('<li class="s1-local-nav-cat__item is-current"><a href="' + cat.category_url + '"><i class="s-glyph">&#xf113;</i>' + cat.category + '</a></li>');
              // Lv2項目のガワを生成
              var lnav_acc = $('<ul class="s1-local-nav-tag"></ul>');
              // Lv2項目の中身を生成
              $.each(cat.accordion, function(index, acc){
			//console.log("■check-10");
                // Lv2見出し
                lnav_acc.append('<div class="s1-local-nav-subcat__hdg">' + acc.heading + '</div>');
                // Lv2項目
                lnav_acc.append('<ul class="s1-local-nav-tag">' + itemCreate2(acc.items, current_url) + '</ul>');
              });
			//console.log("check-11");
              // Lv1項目にLv2項目を挿入
              lnav_items.append(lnav_acc);
              // 合体
              lnav_cat.append(lnav_items);
            } else {
			//console.log("check-12");
              // アクティブかつ下層なし (アクティブのLv1項目を挿入)
              lnav_cat.append('<li class="s1-local-nav-cat__item s1-local-nav-cat__item--single is-current"><a href="' + cat.category_url + '"><i class="s-glyph">&#xf113;</i>' + cat.category + '</a></li>');
            }
          } else {
			//console.log("check-13");
            // 非アクティブ (非アクティブのLv1項目を挿入)
            lnav_cat.append('<li class="s1-local-nav-cat__item"><a href="' + cat.category_url + '"><i class="s-glyph">&#xf113;</i>' + cat.category + '</a></li>');
          }
        });
        $lnav_body = lnav_body.append(lnav_cat);
        // 中身を挿入
        lnav.append($lnav_body);
        return;
      }
    });
  }
  // 項目オブジェクト配列から項目htmlを生成する関数
  var itemCreate = function(items, current_url) {
    var html = '';
    var undiscovered = true;
    $.each(items, function(index, item){
      var active = false;
      // ※除外処理を実装するならここに入れる
      if(undiscovered && item.item_pattern) {
        // パターン指定が存在すれば前方一致で判断(配列)
        $.each(item.item_pattern, function(index, value){

	  // console.log(index, value);
          if(current_url.indexOf(value) === 0) {
            // 一致したら残りはキャンセルして抜ける
            active = true;
            undiscovered = false;
            return false;
          }
        });
      } else {

        // パターン指定が存在しなければ完全一致で判断
        if(current_url.indexOf(item.item_url) != -1) {
          active = true;
          undiscovered = false;
        }
      }
      if(active) {
        html += '<li class="s1-local-nav-subcat__item is-current"><a href="' + item.item_url + '"><i class="s-glyph">&#xf11e;</i>' + item.item_name + '</a></li>';
      } else {
        html += '<li class="s1-local-nav-subcat__item"><a href="' + item.item_url + '"><i class="s-glyph">&#xf11e;</i>' + item.item_name + '</a></li>';
      }
    });
    return html;
  }

  // 項目オブジェクト配列から項目htmlを生成する関数
  var itemCreate2 = function(items, current_url) {
    var html = '';
    var undiscovered = true;
    $.each(items, function(index, item){
      var active = false;
      // ※除外処理を実装するならここに入れる
      if(undiscovered && item.item_pattern) {
        // パターン指定が存在すれば前方一致で判断(配列)
        $.each(item.item_pattern, function(index, value){

	  // console.log(index, value);
          if(current_url.indexOf(value) === 0) {
            // 一致したら残りはキャンセルして抜ける
            active = true;
            undiscovered = false;
            return false;
          }
        });
      } else {

        // パターン指定が存在しなければ完全一致で判断
        if(current_url.indexOf(item.item_url) != -1) {
          active = true;
          undiscovered = false;
        }
      }
      if(active) {
        html += '<li class="s1-local-nav-tag__item is-current"><a href="' + item.item_url + '"><i class="s-glyph">&#xf11e;</i>' + item.item_name + '</a></li>';
      } else {
        html += '<li class="s1-local-nav-tag__item"><a href="' + item.item_url + '"><i class="s-glyph">&#xf11e;</i>' + item.item_name + '</a></li>';
      }
    });
    return html;
  }

})(window.jqBase || jQuery);
