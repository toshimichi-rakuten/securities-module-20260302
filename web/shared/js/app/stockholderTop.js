jQuery(document).ready(function() {
  data = "";

  $.ajax({
    async : false,
    url : "/web/market/search/hp_search/stockholderTop.json",
    type : "post",
    dataType : "json",
    cache : false,
    success : function(data){
      var str = "";
      var mTbl = [ "els", "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec" ];

      // #### thisMonth ####
      $('#thisMonth span').text(data.thisMonth);

      // #### thisMonthList1 ####
      str = "";
      for(var i = 0; i < data.thisMonthList1.length; i++) {
        r = data.thisMonthList1[i];
        
        str = str + "<div class=\"lyt-image image-L image-parallel segment\"><div class=\"image\"><p class=\"image\">";
        str = str + "<a href=\"" + r.Url + "\" onclick=\"s.lidTrack(\'" + r.lid + "\')\">";
        if(r.ImageOP == "H") {
          str = str + "<img src=\"/web/market/opinion/beginner/benefit/sh_img/" + r.Image + ".jpg\" alt=\"\" height=\"120\" />";
        } else {
          str = str + "<img src=\"/web/market/opinion/beginner/benefit/sh_img/" + r.Image + ".jpg\" alt=\"\" width=\"120\" />";
        }
        str = str + "</a></p></div><div class=\"column\">";
        str = str + "<span>" + r.Code + " (" + r.AllotmentDate + "）&lt;" + r.Margin + "&gt;</span><dl>";
        str = str + "<dt><a href=\"" + r.Url + "\" onclick=\"s.lidTrack(\'" + r.lid + "\')\">" + r.Name + "</a></dt>";
        str = str + "<dd class=\"content01\">" + r.Comment1 + "</dd>";
        str = str + "<dd class=\"content02\">" + r.Comment2 + "</dd>";
        str = str + "</dl></div></div>";
      }
      $('#thisMonthList1').html(str);

      // #### thisMonthList2 ####
      //str = "";
      //for(var i = 0; i < data.thisMonthList2.length; i++) {
      //  r = data.thisMonthList2[i];
      //  str = str + "<li><a href=\"" + r.Url +"\" onclick=\"s.lidTrack(\'" + r.lid + "\')\">[" + r.Code + "]" + r.Name + "（" + r.AllotmentDate + "）&lt;" + r.Margin + "&gt;</a><p>";
      //  str = str + r.Comment + "</p></li>";
      //}
      //$('#thisMonthList2').html(str);

      // #### detailThisMonth ####
      var  mon = parseInt(data.detailThisMonth.substring(data.detailThisMonth.indexOf("年")+1));
      str = "<a href=\"/web/market/search/hp_search/hps_" + mTbl[mon] + ".html\">" + data.detailThisMonth + "</a>";
      $('#detailThisMonth li').html(str);

      // #### lastDay ####
      $('.lastDay strong').text(data.lastDay);

      // #### nextMonth ####
      $('#nextMonth span').text(data.nextMonth);

      // #### nextMonthList ####
      str = "";
      for(var i = 0; i < data.nextMonthList.length; i++) {
        r = data.nextMonthList[i];
        str = str + "<li><a href=\"" + r.Url +"\" onclick=\"s.lidTrack(\'" + r.lid + "\')\">[" + r.Code + "]" + r.Name + "（" + r.AllotmentDate + "）</a><p>" + r.Comment + "</p></li>";
      }
      $('#nextMonthList').html(str);

      // #### detailNextMonth ####
      var  mon = parseInt(data.detailNextMonth.substring(data.detailNextMonth.indexOf("年")+1));
      str = "<a href=\"/web/market/search/hp_search/hps_" + mTbl[mon] + ".html\">" + data.detailNextMonth + "</a>";
      $('#detailNextMonth li').html(str);

    }
  });
})
