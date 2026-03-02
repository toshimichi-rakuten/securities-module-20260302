/***
* 
* $.set_height
*
* Demo:
* <h3>すべての高さをそろえる</h3>
* $('ul.index-triple > li').set_height();
* <p>高さをすべての li に対してそろえる</p>
* <ul class="index-triple">
* <li>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト</li>
* <li>テキストテキストテキストテキスト</li>
* <li>テキストテキストテキストテキスト</li>
* <li>テキストテキストテキストテキスト</li>
* <li>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト</li>
* <li>テキストテキストテキストテキスト</li>
* </ul>
* <h3>グループで高さをそろえる</h3>
* <p>$('ul.index-double > li').set_height({ items_per_row:2, group_by_parent: 'ul' });</p>
* <p>高さを2 li ごとにそろえる</p>
* <ul class="index-double">
* <li>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト</li>
* <li>テキストテキストテキストテキスト</li>
* <li>テキストテキストテキストテキスト</li>
* <li>テキストテキストテキストテキスト</li>
* <li>テキストテキストテキストテキスト</li>
* </ul>
* <ul class="index-double">
* <li>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト</li>
* <li>テキストテキストテキストテキスト</li>
* <li>テキストテキストテキストテキスト</li>
* <li>テキストテキストテキストテキスト</li>
* <li>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト</li>
* </ul>
* 
* Presentation:
* 渡された要素の高さをそろえる。
*
* Use:
* set_height( @options )
* 
* Attributes:
* -@options: オプションのハッシュ
*  -items_per_row: 渡された要素を設定した数ごと高さをそろえる
*  -delay: 文字サイズの変更のチェックインターバル（ms）、デフォールトで 1000 (1秒)
*  -group_by_parent: 要素を設定すると、その要素内で高さを合わせる
* 
* Examples:
* :$('ul.index-double>li').set_height({ items_per_row:2 });
* =[index-double]のクラスが付いてる ul の 「>li」 の高さをそろえます。
*
* Note:
* オプションの delay を短くするほど、リソースを高く使います。
* 
***/

(function($){

$.fn.set_height = function( options ){

   var settings = {
      items_per_row: false,
      one_height: false,
      delay: 1000,
      group_by_parent: false
   };
   if(options){ jQuery.extend(settings, options); };
   
   if( $("#js_etalon").length ){ var etalon = $('#js_etalon').get(0); }
   else { var etalon = $('body').append('<span id="js_etalon_wrapper" style="height:0px;overflow:hidden;display:block;"><span id="js_etalon">m</span></span>').find('#js_etalon').get(0); };
   
   var _add = function(array, item){
     for(var i=0; i<array.length; i++){ if(array[i]==item){ return; }; };
     array.push(item);
   };
   
   var nodes = this;
   var groups = [];
   var hidden_groups = [];
   var images_to_load = [];
   var _set_height = function(){
     for(var i=0; i<groups.length; i++){
       var max_height = 0;
       var vert_padding = groups[i][0].currentStyle ?
         parseInt(groups[i][0].currentStyle["paddingTop"]) + parseInt(groups[i][0].currentStyle["paddingBottom"]) :
         parseInt(document.defaultView.getComputedStyle(groups[i][0],null).getPropertyValue("padding-top")) + parseInt(document.defaultView.getComputedStyle(groups[i][0],null).getPropertyValue("padding-bottom"));
       for(var j=0; j<groups[i].length; j++){
         groups[i][j].style.height = "auto";
         max_height = Math.max(groups[i][j].offsetHeight-vert_padding, max_height);
       };
       for(var j=0; j<groups[i].length; j++){ groups[i][j].style.height = max_height+"px"; };
     };
   };
   var _init = function(){
     var cur_group = 0; var count = 0; var cur_parent = null; var prev_parent = null;
     groups[cur_group] = [];
     var group_inc = false;
     for(var i=0; i<nodes.length; i++){
       if(settings.group_by_parent){
         cur_parent = $(nodes[i]).parents(settings.group_by_parent)[0];
         if( i>0 && cur_parent != prev_parent && !group_inc ){ groups[++cur_group] = []; count=0; };
         prev_parent = cur_parent;
       };
       if(settings.items_per_row){
         nodes[i].className += " nb"+parseInt(count%settings.items_per_row+1);
         if( !(count%settings.items_per_row)&&count>0 ){ groups[++cur_group] = []; count=0; group_inc = true; };
       };
       groups[cur_group][count++] = nodes[i];
       group_inc = false;
     };
     for(var i=0; i<groups.length; i++){
       if(!groups[i][0].offsetHeight){
         var cur_node = groups[i][0];
         while(cur_node.style.display!="none"){ cur_node = cur_node.parentNode; };
         hidden_groups.push(cur_node);
       };
       for(var j=0; j<groups[i].length; j++){
         var imgs = groups[i][j].getElementsByTagName('img');
         for(var k=0; k<imgs.length; k++){ _add(images_to_load, imgs[k].src); };
       };
     };
   };
   
   if(nodes.length){
      _init();
      var base_size = etalon.offsetHeight;
      var interval = setInterval(function(){
         var current_size = etalon.offsetHeight;
         if( current_size != base_size ){ base_size = current_size; _set_height(); };
         for(var i=0; i<hidden_groups.length; i++){
           if( hidden_groups[i].style.display!="none" ){
             _set_height();
             hidden_groups = [];
             for(var j=0; j<groups.length; j++){
               if(!groups[j][0].offsetHeight){
                 var cur_node = groups[j][0];
                 while(cur_node.style.display!="none"){ cur_node = cur_node.parentNode; };
                 hidden_groups.push(cur_node);
               };
             };
           };
         };
      }, settings.delay);
      _set_height();
      if(images_to_load.length){
        var dummy_images = [];
        var loaded_images = 0;
        for(var i=0; i<images_to_load.length; i++){
          dummy_images[i] = document.createElement('img');
          dummy_images[i].onload = function(){
            loaded_images++;
            if(loaded_images==images_to_load.length){ _set_height(); };
          };
          dummy_images[i].src = images_to_load[i];
        };
      };
   };
   
   if( navigator.userAgent.match("MSIE 5.5") && nodes.length ){ setTimeout(function(){ main(nodes), 0 }); };
   
   return this;

};

})(jQuery);

/***
* 
* $.set_style_switch
*
* Demo:
* <ul>
* <li><a href="#white" rel="style">white</a></li>
* <li><a href="#black" rel="style">black</a></li>
* <li><a href="#green" rel="style">green</a></li>
* </ul>
* 
* Presentation:
* スタイルシートを替えるスクリプトです。
* 
* Use:
* set_style_switch()
*
* Html:
* p.<head>の例
* 
* <link rel="stylesheet" href="/shared/css/template.css" type="text/css" media="screen,print" />
* <link rel="stylesheet" href="/shared/css/white.css" type="text/css" media="screen" title="white" />
* <link rel="alternate stylesheet" href="/shared/css/black.css" type="text/css" media="screen" title="black" />
* <link rel="alternate stylesheet" href="/shared/css/green.css" type="text/css" media="screen" title="green" />
* 
* p.<body>の例
* 
* <li><a href="#white" rel="style">white</a></li>
* <li><a href="#black" rel="style">black</a></li>
* <li><a href="#green" rel="style">green</a></li>
* 
* Examples:
* :$('a[@rel=style]').set_style_switch();
* =rel が style になってるリンク、にクリックすると href と同じタイトルのスタイルシートを有効にする
* 
***/

(function($){
	
$.fn.set_style_switch = function(){

   var nodes = this;

   $('link[@title]').each(function(){ this.disabled = true; });
   _change_style = function( title ){
      $('link[@title]').each(function(){ this.disabled = (this.title != title); });
      nodes.each(function(){
        var link_title = ( /#([^¥?]*)/.exec(this.href)[1] );
        if( link_title == title && $("img",this).length ){
          var img = $("img",this)[0];
          img.src = img.src.replace( /-o(\.[a-z]+)$/, "-h"+"$1");
          $(img).unbind();
        } else if( $("img",this).length ){
          var img = $("img",this)[0];
          img.src = img.src.replace( /-h(\.[a-z]+)$/, "-o"+"$1");
          $(img).unbind();
        };
      });
   };
   if( $.cookie('style') ){ _change_style( $.cookie('style') ) }
   /*else{
     var has_img = $( "img", nodes[Math.floor(nodes.length/2)] );
     if( !nodes.length%2 && !has_img.length ){ return }
     var img = has_img[0];
     img.src = img.src.replace( /_o(\.[a-z]+)$/, "_h"+"$1");
     $(img).unbind();
   };*/

   return this.click(function(){
      var style_title = ( /#([^¥?]*)/.exec(this.href)[1] );
      _change_style( style_title );
      $.cookie('style', style_title, { path: '/' });
      this.blur();
      return false;
   });


};

})(jQuery);

$(document).ready(function(){
    function getImgParallelStyler(side) {
        // side は既定値しか認めない
        if ("left" != side && "right" != side) {
            throw Error("invalid side type: '"+side+"'");
        }
        // 実行関数
        return function() {
            var obj = $(this);
            var imgBlock = $("div.image:first-child", obj);
            var imgWidth = $("p.image img", imgBlock).width(); // 画像幅
            imgBlock.css("width", imgWidth+"px"); // 画像幅を強制
            // 別カラムの margin を調整
            $("div.column", obj).css("margin-"+side,
                                     imgBlock[0].offsetWidth+"px");
        };
    }
    // 実行
    $(".image-parallel.image-L").each(getImgParallelStyler("left"));
    $(".image-parallel.image-R").each(getImgParallelStyler("right"));
    // set_height 実行
    $('div.column-col2 > div.segment').set_height({ items_per_row:2 });
    $('div.column-col3 > div.segment').set_height({ items_per_row:3 });
    $('div.column-col4 > div.segment').set_height({ items_per_row:4 });	
		
	$('body.lyt-start div.startup-beginner-container > ul.startup-beginner > li ').set_height({ items_per_row:3 });
    $('body.lyt-start ul.index-list-beginner > li ').set_height({ items_per_row:3 });
		
    //文字サイズ変更
    var fontSizeSwich = '<dl><dt><img src="/web/shared/images/str-search/font.gif" alt="文字サイズ" width="54" height="11"></dt><dd><ul><li><a href="#font-s" rel="style"><img src="/web/shared/images/str-search/font-s-o.gif" alt="小" width="19" height="19"></a></li><li><a href="#font-m" rel="style"><img src="/web/shared/images/str-search/font-m-h.gif" alt="中" width="19" height="19"></a></li><li><a  href="#font-l" rel="style"><img src="/web/shared/images/str-search/font-b-o.gif" alt="大" width="19" height="19"></a></li></ul></dd></dl>';
    $("div#font-control").prepend( fontSizeSwich );
   	$('a[@rel=style]').set_style_switch();

	});