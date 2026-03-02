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
      var $font_buttons = $('.font-size__buttons');
      if($font_buttons.length) {
        var base_font = $font_buttons.children().index($font_buttons.children('[class$=active]')[0]);
      }
      var interval = setInterval(function(){
         var current_size = etalon.offsetHeight;
         if( current_size != base_size ){ base_size = current_size; _set_height(); };
         if($font_buttons.length) {
           var current_font = $font_buttons.children().index($font_buttons.children('[class$=active]')[0]);
           if( current_font != base_font ){ base_font = current_font; _set_height(); };
         }
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


$(document).ready(function(){

  //-----------------------------------------------------------------------

  var fontSizeSwich = '<dl><dt><img src="/web/shared/images/str-search/font.gif" alt="文字サイズ" width="54" height="11" /></dt><dd><ul class="font-style-switch"><li class="font-s"><span class="font-switch-txt">小</span></li><li class="font-m"><span class="font-switch-txt">中</span></li><li class="font-l"><span class="font-switch-txt">大</span></li></ul></dd></dl>';
  
  // Added font size switching element
  $('#font-control').prepend( fontSizeSwich );

  // -------------------------------------------------------------

  var styleSwitchList = $('.font-style-switch').find('li')
      cookiefont      = $.cookie("fontsize");

  // Set default to 'medium'
  if(!$.cookie('fontsize')) $.cookie('fontsize', 'medium');

  // event handler
  $('.font-style-switch li').on('click',function(){

    styleSwitchList.removeClass('is-selected');

    var className = $(this).attr('class').slice(0,6);
    
    //Rewrite to the value
    $.cookie('fontsize', className);

    $(this).addClass('is-selected');

    chengeFont(className);

  });//end of handler




  styleSwitchList.removeClass('is-selected');

  // cookieのフォントを設定する
  chengeFont(cookiefont);

  $('.font-style-switch li').each(function(){

    var className2 = $(this).attr('class').slice(0,6);

    if(className2 == cookiefont){

      $(this).addClass('is-selected');

    }

  });




  function chengeFont(className){
   if(className == 'font-s') {
      $('body').css('font-size', '87%');
    } else if(className == 'font-l') {
      $('body').css('font-size', '115%');
    } else {
      $('body').css('font-size', '100%');
    } 
  }
  // -------------------------------------------------------------



  function getImgParallelStyler(side) {
      if ("left" != side && "right" != side) {
          throw Error("invalid side type: '"+side+"'");
      }
      return function() {
          var obj = $(this);
          var imgBlock = $("div.image:first-child", obj);
          var imgWidth = $("p.image img", imgBlock).width();
          imgBlock.css("width", imgWidth+"px");
          if(imgBlock[0]) {
              $("div.column", obj).css("margin-"+side, imgBlock[0].offsetWidth+"px");
          }
      };
  }
  $(".image-parallel.image-L").each(getImgParallelStyler("left"));
  $(".image-parallel.image-R").each(getImgParallelStyler("right"));

  $('div.column-col2 > div.segment').set_height({ items_per_row:2 });
  $('div.column-col3 > div.segment').set_height({ items_per_row:3 });
  $('div.column-col4 > div.segment').set_height({ items_per_row:4 });	

  $('ul.list-col2 > li').set_height({ items_per_row:2, group_by_parent: 'ul' });
  $('ul.list-col3 > li').set_height({ items_per_row:3, group_by_parent: 'ul' });
  if($('.content-area').length) {
      $('div.box-step-index-01 > ol > li').set_height({ items_per_row:5 });
  } else {
      $('div.box-step-index-01 > ol > li').set_height({ items_per_row:4 });
  }
  $('div.lyt-inquiry-01 > div.box-inquiry-01 > div.box-inner-01').set_height({ items_per_row:2 });

  $('div.list-index-01 > ul > li').set_height({ items_per_row:2 });	
  $('div.list-index-01-odd > ul > li').set_height({ items_per_row:2 });	
  $('div.list-index-02 > ul > li > div.box-inner-01 > dl').set_height({ items_per_row:2 });	
  $('div.list-index-02-odd > ul > li > div.box-inner-01 > dl').set_height({ items_per_row:5 });	
  $('div.list-index-03 > ul > li > ').set_height({ items_per_row:2 });
 	$('div.list-index-03-odd > ul > li > ').set_height({ items_per_row:3 });
  $('ul.list-link-05 > li ').set_height();
  $('div.box-banner-03 > ul > li ').set_height({ items_per_row:2 });
  $('div.box-banner-04 > ul > li ').set_height({ items_per_row:2 });

  $('body.lyt-start div.startup-beginner-container > ul.startup-beginner > li ').set_height({ items_per_row:3 });
  $('body.lyt-start ul.index-list-beginner > li ').set_height({ items_per_row:3 });
  $('div.logout-col2-box > div.column-col2 > div.segment > div.box-02 > div.box-inner-01').set_height({ items_per_row:2 });

});