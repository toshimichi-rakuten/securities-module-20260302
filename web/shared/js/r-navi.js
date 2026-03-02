/*========================
現在地ナビゲーション
・設定ファイル
  /web/shared/js/r-navi_config.js
========================*/
(function($) {
	$(document).ready(function() {
		for(var data in r_navi ){
			if(location.pathname.indexOf(data)==0){
	  		navi_data = r_navi[data];
			}
    }
    if($('.local-nav').length) {
			navCreate(navi_data);
    }
  });


  function getUrlVars() {
      var vars = {};
      var param = location.search.substring(1).split('&');
      for (var i = 0; i < param.length; i++) {
	  var keySearch = param[i].search(/=/);
	  var key = '';
	  if (keySearch != -1) key = param[i].slice(0, keySearch);
	  var val = param[i].slice(param[i].indexOf('=', 0) + 1);
	  if (key != '') vars[key] = decodeURI(val);
      }
      return vars;
  }

  var navCreate = function(navi_data) {
    // console.log(navi_data);
    var jsonPath = navi_data;
    // var jsonPath = "/web/fund/json/localnavi.json";
    $.ajax({
      type: 'GET',
      url: jsonPath,
      dataType: 'json',
      async: false,
      success: function(data) {
        // 出力先
        var lnav = $('.local-nav');
        //lnav.empty();
        // 大見出し生成
        lnav.append('<div class="local-nav__header"><a class="local-nav__link--active" href="' + data.header_url + '">' + data.header_name + '</a></div>');
        // 本体定義
        var lnav_body = $('<ul class="local-nav__body"></ul>');
        // ルート相対パス取得
        var current_url = location.pathname;
	// console.log(current_url, param);
        if(current_url.slice(-1) == '/') {
          current_url += 'index.html';
        }
        // [debug] URL一次変更
        //current_url = '/web/fund/saving/learn/index.html'
        //current_url = '/web/fund/saving/simulation/index.html'
        //current_url = '/web/fund/saving/way.html'
        //current_url = '/web/fund/learn/about/merit.html'
        //current_url = '/web/fund/index.html'
        // カレント項目未発見フラグ初期化
        var undiscovered = true;
        // JSONパース(カテゴリオブジェクト配列のループ処理)
        $.each(data.categories, function(index, cat){
          // アクティブフラグ初期化
          var active = false;
          // ※除外処理を実装するならここに入れる
          if(undiscovered && cat.category_pattern) {
            // パターン指定が存在すれば前方一致で判断
            $.each(cat.category_pattern, function(index, value){
              // 前方一致パターン配列のループ処理
              if(current_url.indexOf(value) === 0) {
                // 一致したら残りはアクティブフラグを立てて残りはキャンセルして抜ける
                active = true;
                undiscovered = false;
                return false;
              }
            });
          } else {
            // パターン指定が存在しなければ完全一致で判断
            if(current_url == cat.category_url) {
              active = true;
              undiscovered = false;
            }
          }
          // 中身のhtmlを生成
          if(active) {
            // アクティブ
            if(cat.items) {
              // 区分がない場合
              // Lv2項目を生成して直接挿入
              // Lv1項目にLv2項目を挿入
              lnav_body.append('<li class="local-nav__category--active"><a href="' + cat.category_url + '" class="local-nav__link--active"><i class="s-glyph">&#xf113;</i>' + cat.category + '</a><div class="local-nav__accordion"><ul class="local-nav__items">' + itemCreate(cat.items, current_url) + '</ul></div></li>');
            } else if(cat.accordion) {
              // 区分がある場合
              // Lv1項目を生成
              var lnav_items = $('<li class="local-nav__category--active"><a href="' + cat.category_url + '" class="local-nav__link--active"><i class="s-glyph">&#xf113;</i>' + cat.category + '</a></li>');
              // Lv2項目のガワを生成
              var lnav_acc = $('<dl class="local-nav__accordion"></dl>');
              // Lv2項目の中身を生成
              $.each(cat.accordion, function(index, acc){
                // Lv2見出し
                lnav_acc.append('<dt class="local-nav__accordion-heading">' + acc.heading + '</dt>');
                // Lv2項目
                lnav_acc.append('<dd><ul class="local-nav__items">' + itemCreate(acc.items, current_url) + '</ul></dd>');
              });
              // Lv1項目にLv2項目を挿入
              lnav_items.append(lnav_acc);
              // 合体
              lnav_body.append(lnav_items);
            } else {
              // アクティブかつ下層なし (アクティブのLv1項目を挿入)
              lnav_body.append('<li class="local-nav__category--active-single"><a href="' + cat.category_url + '" class="local-nav__link--active"><i class="s-glyph">&#xf113;</i>' + cat.category + '</a></li>');
            }
          } else {
            // 非アクティブ (非アクティブのLv1項目を挿入)
            lnav_body.append('<li class="local-nav__category"><a href="' + cat.category_url + '" class="local-nav__link"><i class="s-glyph">&#xf113;</i>' + cat.category + '</a></li>');
          }
        });
        // 中身を挿入
        lnav.append(lnav_body);
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
        html += '<li class="local-nav__item--active"><a href="' + item.item_url + '" class="local-nav__link"><i class="s-glyph local-nav__item-bullet">&#xf11e;</i>' + item.item_name + '</a></li>';
      } else {
        html += '<li class="local-nav__item"><a href="' + item.item_url + '" class="local-nav__link"><i class="s-glyph local-nav__item-bullet">&#xf11e;</i>' + item.item_name + '</a></li>';
      }
    });
    return html;
  }

})(jqBase);

