    // ファンド名称 condition1

    var fund = 'ファンド名称like';    // 1



    function search() {

        var sendForm = document.getElementById('searchCondition');

        sendForm['result'].value = 'ファンド名称,url,ﾘｽｸ(年率)1年,ﾘﾀｰﾝ(年率)1年,アセットタイプ2';

        sendForm['sort'].value = 'week_all_all=up';

        sendForm['count'].value = '9999';

        sendForm['recsPerPage'].value = '20';

        searchNow(sendForm, "search/result.html");

    }





    function search2() {



        var sendForm=document.getElementById('newSearch');



        sendForm["condition36"].value = null;

        sendForm["condition40"].value = null;

        sendForm["condition35"].value = null;

        sendForm["condition32"].value = null;

        sendForm["selectedCondition"].value = null;





        if (sendForm['form-text-01'].value) {

            var str = sendForm['form-text-01'].value;

            str = str.replace(/\(/g, "（");

            str = str.replace(/\)/g, "）");



            str = str.replace(/\"/g,'&quot;');

            str = str.replace(/\//g,'／');



            str = str.replace(/－/g, "-");

            str = str.replace(/―/g, "-");



            str = str.replace(/</g, "＜");

            str = str.replace(/>/g, "＞");



            sendForm['form-text-01'].value = str;

            sendForm['condition31'].value = fund + "*" + str + "*";

        }

        else

            sendForm['condition31'].value = null;



        sendForm.action = "find/search/result.html";

        sendForm.method = "get";

        sendForm.submit();

        return false;

    }



    function getReport() {

        var sendForm = document.getElementById('searchCondition');

        sendForm['condition1'].value = "";

        sendForm['result'].value = 'ファンド名称,url,ﾘｽｸ(年率)1年,ﾘﾀｰﾝ(年率)1年,アセットタイプ2';

        //sendForm['sort'].value = '純資産(億円）=down';

        sendForm['sort'].value = 'week_all_all=up';

        sendForm['count'].value = '9999';

        sendForm['recsPerPage'].value = '20';

        sendForm['tab'].value = "report";

        sendForm.method = "get";

        sendForm.action = "search/result.html";

        sendForm.submit();

    }



    function ShowSearch() {

        window.location = "search/result.html";

    }



    function ShortcutMenu(inval)

    {

        var sendForm = document.getElementById('searchCondition');



        sendForm['sort'].value = 'week_all_all=up';

        sendForm['condition1'].value = "";

        sendForm['condition2'].value = "";

        sendForm['condition3'].value = "";

        sendForm['condition27'].value = "";

        sendForm['condition31'].value = "";

        sendForm['condition32'].value = "";

        sendForm['condition35'].value = "";

        sendForm['condition36'].value = "";

        sendForm['condition37'].value = "";

        sendForm['condition38'].value = "";

        sendForm['condition39'].value = "";

        sendForm["condition41"].value = "";

        sendForm['condition47'].value = "";



        sendForm['fdcflag2_form28'].value = "";

        sendForm['fdcflag2_form29'].value = "";



        sendForm['fdcflag1_form13'].value = "";

        sendForm['fdcflag1_form1'].value = "";

        sendForm['fdcflag1_form19'].value = "";

        sendForm['lipperflag1_form28'].value = "";

        sendForm['lipperflag1_form9'].value = "";

        sendForm['selectedCondition'].value = "";

        sendForm['form-text-01'].value = "";

        sendForm['sortcolumn'].value = "";



        if(inval == 1){

            sendForm['condition1'].value = "sp_contents=1";

            sendForm['recsPerPage'].value = '20';

        }else if(inval == 2) {

            sendForm['condition1'].value = "ﾘｽｸ(年率)1年>=0";

            sendForm['condition2'].value = "ﾘｽｸ(年率)1年<12.0";

            sendForm['recsPerPage'].value = '20';

        }else if(inval == 3) {

            // 毎月分配

            sendForm['condition31'].value = "ファンド名称like*";

            sendForm['condition32'].value = "fdcflag1^ampsymbol;-";

            //sendForm['condition2'].value = "分配方法=毎月分配";

            //sendForm['form-text-01'].value = "#オススメ毎月分配";

            sendForm['fdcflag1_form1'].value = "on";

            sendForm['selectedCondition'].value = "s1_1";

            //sendForm['recsPerPage'].value = '10';

        }else if(inval == 5) {

            sendForm['condition1'].value = "ﾘｽｸ(年率)1年>=12.0";

            sendForm['condition2'].value = "ﾘｽｸ(年率)1年<22.0";

            sendForm['recsPerPage'].value = '20';

        }else if(inval == 6) {

            // ノーロード

            sendForm['condition31'].value = "ファンド名称like*";

            sendForm['condition35'].value = "fdcflag1^ampsymbol;11";

            //sendForm['condition2'].value = "最大手数料=0";

            //sendForm['form-text-01'].value = "#オススメノーロード";

            sendForm['fdcflag1_form13'].value = "on";

            sendForm['selectedCondition'].value = "s4_1";

            //sendForm['recsPerPage'].value = '10';

        }else if(inval == 7) {

            sendForm['sort'].value = 'pv=down';

            sendForm['recsPerPage'].value = '20';

        }else if(inval == 8){

            sendForm['condition1'].value = "ﾘｽｸ(年率)1年>=22.0";

            sendForm['recsPerPage'].value = '20';

        }else if(inval == 9){

            sendForm["condition41"].value = "fdcflag3^ampsymbol;0";

            sendForm['fdcflag2_form28'].value = "on";

            sendForm['selectedCondition'].value = "s10_1";

            sendForm['recsPerPage'].value = '20';

        }else if(inval == 10){

            sendForm['sort'].value = "compare_view=down"

            sendForm['recsPerPage'].value = '20';

        }else if(inval == 11){

            sendForm['condition1'].value = "投資地域(ファンド)=日本";

            sendForm['recsPerPage'].value = '20';

        }else if(inval == 12){

            sendForm['condition1'].value = "投資地域(ファンド)=ｱｼﾞｱ･ｵｾｱﾆｱ,投資地域(ファンド)=ｴﾏｰｼﾞﾝｸﾞ,投資地域(ファンド)=ｸﾞﾛｰﾊﾞﾙ,投資地域(ファンド)=欧州,投資地域(ファンド)=北米";

            sendForm['recsPerPage'].value = '20';

        }else if(inval == 13){

            // 海外リート

            sendForm['condition31'].value = "ファンド名称like*";

            sendForm['condition36'].value = "fdcflag1^ampsymbol;17";

            //sendForm['condition2'].value = "アセットタイプ2=海外不動産";

            //sendForm['form-text-01'].value = "#オススメ海外リート";

            sendForm['fdcflag1_form19'].value = "on";

            sendForm['selectedCondition'].value = "s5_6";

            //sendForm['recsPerPage'].value = '10';

        }else if(inval == 14){

            // トータルリターン

            //sendForm['condition1'].value = "ﾘﾀｰﾝ(年率)1年>=20";

            //sendForm['condition39'].value = "fdcflag1^ampsymbol;27";

            //sendForm['selectedCondition'].value = "s7_1";

            sendForm['recsPerPage'].value = '20';

            sendForm['sort'].value = "ﾘﾀｰﾝ(年率)1年=down"

            //sendForm['focus'].value = 'table3';

            sendForm['sortcolumn'].value = "col5";

        }else if(inval == 15){

            // ブル

            sendForm['condition1'].value = "ファンド名称like*ブル*";

            sendForm['form-text-01'].value = "ブル";

            sendForm['recsPerPage'].value = '20';

        }else if(inval == 16){

            // ベア

            sendForm['condition1'].value = "ファンド名称like*ベア*";

            sendForm['form-text-01'].value = "ベア";

            sendForm['recsPerPage'].value = '20';

        }else if(inval == 17){

            // 豪ドル

            sendForm['condition1'].value = "ファンド名称like*豪ドル*";

            sendForm['form-text-01'].value = "豪ドル";

            sendForm['recsPerPage'].value = '20';

        }else if(inval == 18){

            // ブルベア

            sendForm['condition37'].value = "lipperflag1^ampsymbol;26";

            sendForm['lipperflag1_form28'].value = "on";

            sendForm['selectedCondition'].value = "s6_17";

            sendForm['recsPerPage'].value = '20';

        }else if(inval == 19){

            // 金先物

            sendForm["condition47"].value = "lipperflag1^ampsymbol;7";

            sendForm['lipperflag1_form9'].value = "on";

            sendForm['selectedCondition'].value = "s5_16";

            sendForm['recsPerPage'].value = '20';

        }else if(inval == 20){

            // 100円投資

            sendForm["condition41"].value = "fdcflag3^ampsymbol;1";

            sendForm['fdcflag2_form29'].value = "on";

            sendForm['selectedCondition'].value = "s10_2";

            sendForm['recsPerPage'].value = '20';

        }else if(inval == 21){

            // オススメ特集

            sendForm['condition1'].value = "ファンド名称like*#ベストファンド30*";

            sendForm['form-text-01'].value = "#ベストファンド30";

            sendForm['selectedCondition'].value = "#ベストファンド30";

            sendForm['recsPerPage'].value = '40';

        }else if(inval == 22){

            // 吉井ピックアップ

            sendForm['condition1'].value = "ファンド名称like*#吉井ピックアップ*";

            sendForm['form-text-01'].value = "#吉井ピックアップ";

            sendForm['selectedCondition'].value = "#吉井ピックアップ";

            sendForm['recsPerPage'].value = '20';

        }else if (inval == 23) {

            // ファンドスコアー

            //sendForm['condition1'].value = "ファンド名称like*#吉井ピックアップ*";

            //sendForm['form-text-01'].value = "#吉井ピックアップ";

            //sendForm['selectedCondition'].value = "#吉井ピックアップ";

            sendForm['focus'].value = 'table7';

            sendForm['condition27'].value = "l2=5";

            sendForm['recsPerPage'].value = '20';

        }else if(inval == 24){

            // DC

            sendForm['condition1'].value = "ファンド名称like*DCセレクション*";

            sendForm['form-text-01'].value = "DCセレクション";

            sendForm['recsPerPage'].value = '20';

        }else if(inval == 25){

            //検索条件=「スマートコスト」

            sendForm['condition1'].value = "ファンド名称like*スマートコスト*";

            sendForm['form-text-01'].value = "スマートコスト";

            sendForm['recsPerPage'].value = '20';

        }else if(inval == 26){

            window.location = "https://www.rakuten-sec.co.jp/web/fund/info/new_inventory/sec_raising.html";

        }

        else{

            window.alert('unknown shortcut');

        }



        sendForm['result'].value = 'ファンド名称,url,ﾘｽｸ(年率)1年,ﾘﾀｰﾝ(年率)1年,アセットタイプ2';

        sendForm['count'].value = '9999';



        sendForm.method = "get";

        sendForm.action = "find/search/result.html";

        sendForm.submit();

    }



    function OpenLink(linkCode){

        if(linkCode == "1"){

            window.location = "https://www.rakuten-sec.co.jp/web/fund/info/new_inventory/sec_raising.html";

        }

    }





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



        if(inval+1 <= 1){

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

                  str = str + "<dd class=\"information__desc\"><a href=\"" + r.vUrl + "\" data-ratid=\"v_" + r.slid + "\" data-ratevent=\"click\" data-ratparam=\"all\">" + r.Title + "</a></dd>";

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

                if(r.Channel.indexOf("t") > -1 && r.Channel.indexOf("v") > -1){

                  str = str + "<dt class=\"pickup__label pickup__label--" + r.label[0] + "\">" + r.label[1] + "</dt>";

                  str = str + "<dd class=\"pickup__desc\"><a href=\"" + r.vUrl + "\" data-ratid=\"v_fund_top_pickup" + r.slid + "\" data-ratevent=\"click\" data-ratparam=\"all\">" + r.Title + "</a></dd>";

                }

              }

              $(".pickup__main-info-box").eq(0).append(str);

            }

          });

  

          //トウシル化

          $.ajax({

            url : "https://media.rakuten-sec.net/list/feed/choice_fund.js",

            type : "get",

            dataType : "jsonp",

            scriptCharset : "UTF-8",

            cache : false,

            timeout: 10000,

            complete :  function(data){

            }

          });

          //トウシル化

  

        });

  

  

      })(jQuery);

  

  

  function makeSID(prefix, date, link)

  {

   var sid = "";

  

   var dt = date.split("/");

   var at = link.split("/");

  

   sid = prefix + dt[0] + dt[1] + dt[2] + "_" + at[5];

  

   return sid;

  }

  

  function choice03v2(json)

  {

     var str = "";

     var scr = "";

     jQuery.each(json.List, function(i, data) {

       str = str + "<div class=\"grid__cell-1-3--thin\">";

       str = str + "<div class=\"side-fixed\">";

       str = str + "<div class=\"side-fixed__side--120\"><a data-ratid=\"" + makeSID("v_fund_top_report_img_", data.Date, data.Link) + "\" data-ratevent=\"click\" data-ratparam=\"all\" target=\"_blank\" href=\"" + data.Link + "\"><img decoding=\"async\" src=\"" + data.Image + "\" width=\"90\"></a></div>";

       str = str + "<div class=\"side-fixed__main--120\">";

       str = str + "<p class=\"analysts__title\"><a data-ratid=\"" + makeSID("v_fund_top_report_txt_", data.Date, data.Link) + "\" data-ratevent=\"click\" data-ratparam=\"all\" target=\"_blank\" href=\"" + data.Link + "\">" + data.Title + "</a></p>";

       str = str + "<p class=\"analysts__desc\">" + data.Serialize + "<br>" + data.Author + "<br>(" + data.Date + "更新)</p>";

       str = str + "</div>";

       str = str + "</div>";

       str = str + "</div>";

  

  

       scr = scr + "<li class=\"normal-header__main-info-item\"><a href=\"" + data.Link + "\" data-ratid=\"" + makeSID("v_fund_top_report_txt_", data.Date, data.Link) + "\" data-ratevent=\"click\" data-ratparam=\"all\" target=\"_blank\">" + data.Title + "</a></li>";

     });

  

     jQuery("#update-report").append(str);

     jQuery(".normal-header__main-info-items").empty();

     jQuery(".normal-header__main-info-items").append(scr).startAuto();

     jQuery('.slider-hr__items').bxSlider.reloadSlider();

  

  }