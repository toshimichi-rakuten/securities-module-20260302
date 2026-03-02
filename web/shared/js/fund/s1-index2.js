function compareTopfive(codes) {
    window.location = "/web/fund/comparison/index.html?codes=" + codes;
}

function SearchBunrui(inval)
{
    window.location = "find/search/result.html?condition55=rsbn=" + encodeURI(inval);
}

function CompareRecent(inval) {
    var compareForm = document.getElementById('compareCondition');
    var codes = "<%=replace(request.cookies('ttid')('recent'),',','_')%>";

    if(inval+1 <= 1)
    {
        window.alert("２件以内を比較できません。");
        return;
    }

    window.location = "/web/fund/comparison/index.html?codes=" + codes;
}

function ShowRankingList()
{
    var link = "/web/fund/find/ranking/modal.html";

    var myWindow = window.open(link, "modal", "width=650, height=800,scrollbars=yes");
}

(function($){
    $(function(){
      var str = "";
      $.ajax({
        async : false,
        url : "/web/fund/json/infolist_fund-service.json",
        type : "get",
        dataType : "json",
        cache : false,
        success : function(data){
          for(var i=0; i<data.num; i++) {
            var r = data.docs[i];
            if(r.Channel.indexOf("v") > -1){
              str = str + "<dt class=\"information__date\">" + r.Date + "</dt>";
              str = str + "<dd class=\"information__desc\"><a href=\"" + r.vUrl + "\" data-ratid=\"v_fund_top_pickup" + r.slid + "\" data-ratevent=\"click\" data-ratparam=\"all\"onclick=\"s.lidTrack(\'v_" + r.slid + "\')\;\">" + r.Title + "</a></dd>";
            }
          }
          $("#information-list--fund-service").append(str);
        }
      });

      var str = "";
      $.ajax({
        async : false,
        url : "/web/fund/json/pickup_fund.json",
        type : "get",
        dataType : "json",
        cache : false,
        success : function(data){
          for(var i=0; i<data.num; i++) {
            var r = data.docs[i];
            if(r.Channel.indexOf("v") > -1){
              str = str + "<dt class=\"pickup__label pickup__label--" + r.label[0] + "\">" + r.label[1] + "</dt>";
              str = str + "<dd class=\"pickup__desc\"><a href=\"" + r.vUrl + "\" data-ratid=\"v_fund_top_pickup" + r.slid + "\" data-ratevent=\"click\" data-ratparam=\"all\"data-ratevent=\"click\" data-ronclick=\"s.lidTrack(\'v_fund_top_pickup" + r.slid + "\')\;\">" + r.Title + "</a></dd>";
            }
          }
          $(".pickup__main-info-box").eq(0).append(str);
        }
      });
    });
  })(jQuery);