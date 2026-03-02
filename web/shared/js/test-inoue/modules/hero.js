window.onload = function(){
	(function($){
		//オブジェクト格納
		var $li = $("ul.s1-hero__list li");
		var $container = $(".s1-hero__container");
		//タブのインデックス
		var idx=0;
		//初期状態
		$(".s1-hero__container").eq(0).fadeIn();
		//イベントハンドラ
		$("ul.s1-hero__list li").click(function () {
			//タブのインデックスを取得
			idx = $li.index(this);
			//全てのli要素からis-selectedクラスを削除
			$li.each(function () {
				$(this).removeClass("is-selected");
			});
			//is-selectedクラスを付与
			$(this).addClass("is-selected");
			//.s1-hero__containerにis-hiddenクラスを付与
			$container.each(function (i) {
				$(this).addClass("is-hidden");
				$(this).removeClass("is-visible");
				if(i!==idx){
					$(this).hide();
				}else{
					$(this).fadeIn("slow");
				}
			});
			//is-hiddenクラスを削除
			$(".s1-hero__container").eq(idx).removeClass("is-hidden");
			//is-visibleクラスを付与
			$(".s1-hero__container").eq(idx).addClass("is-visible");
		});
		//自動でスクロール
		//setInterval(auto_slide, 3000);

		function auto_slide(){
			if(idx==5) idx=0;
			$tab_li = $("ul.s1-hero__list li");
			//idxの数字に連動してスライダーが切り替わる
			//全てのli要素からis-selectedクラスを削除
			$li.each(function () {
				$(this).removeClass("is-selected");
			});
			//is-selectedクラスを付与
			$tab_li.eq(idx).addClass("is-selected");
			//.s1-hero__containerにis-hiddenクラスを付与
			$container.each(function (i) {
				$(this).addClass("is-hidden");
				$(this).removeClass("is-visible");
				if(i!==idx){
					$(this).hide();
				}else{
					$(this).fadeIn("slow");
				}
			});
			idx++;
		}
	})(jqBase)
}