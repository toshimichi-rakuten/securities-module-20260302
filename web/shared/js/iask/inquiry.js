
    function getElementsByClass(className, tagName, parentElement){
        if (className == undefined) return;

        tagName        = tagName || '*';
        parentElement  = parentElement || document;

        var elements   = new Array;
        var collection = parentElement.getElementsByTagName(tagName);
        if (collection.length != 0) {

            if(navigator.appName == "Microsoft Internet Explorer"){
                var classStr = 'className';
            }else{
                var classStr = 'class';
            }

            for (var i = 0, count = collection.length; i < count; i++) {
                if (collection[i].getAttribute(classStr) == className) {
                    elements.push(collection[i]);
                }
            }
        }
        return elements;
    }

    function makeNextLevels(level, MaxLevel){
        var nowSelect = 'category' + level;
        nIndex = document.getElementById(nowSelect).selectedIndex;
        nSelect = document.getElementById(nowSelect).options[nIndex].value;
        if(nSelect == ''){
            return false;
        }

        document.inquiryForm.inquiry_category.value = nSelect;

        var NextLevel = eval(level)+1;
        if(NextLevel > MaxLevel) {
            return false;
        }

        nextSelect = 'category' + NextLevel;
        nextSelectDiv = 'category_div_' + NextLevel;
        document.getElementById(nextSelect).innerHTML = '';
        for(i=NextLevel;i<=MaxLevel;i++){
            var cate_div_id = 'category_div_'+ i;
            document.getElementById(cate_div_id).style.display = 'none';
        }

        nClass = 'parent_' + nSelect;
        nextOptions = new Array;
        nextOptions = getElementsByClass(nClass, 'INPUT');
        ChildCnt = nextOptions.length;
        if(ChildCnt > 0){

            var nOption = document.createElement('OPTION');
            document.getElementById(nextSelect).appendChild(nOption);

            for(i=0;i<ChildCnt;i++){
                nVal = '';
                nId  = '';
                nVal = nextOptions[i].value;
                nId  = nextOptions[i].id.replace(/[^0-9]/g,'');
                var nOption = document.createElement('OPTION');
                nOption.value = nId;
                nOption.innerHTML = nVal;
                document.getElementById(nextSelect).appendChild(nOption);
            }

            document.getElementById(nextSelectDiv).style.display = '';

        }
    }

    function CheckInquiryForm(){
        var chCategory  = document.inquiryForm.inquiry_category.value;
        var chTitle     = document.inquiryForm.inquiry_title.value;
        var chContent   = document.inquiryForm.inquiry_content.value;
        var chMail      = document.inquiryForm.inquiry_mailaddr.value;
        var chMailcheck = document.inquiryForm.inquiry_mailaddr_check.value;

        var errMsg = '';

        if(chCategory == ''){
            errMsg += '「カテゴリ」が選択されていません。\n';
        }
        if(chTitle == ''){
            errMsg += '「質問タイトル」が入力されていません。\n';
        }
        if(chContent == ''){
            errMsg += '「質問内容」が入力されていません。\n';
        }
        if(chMail == ''){
            errMsg += '「回答通知メールアドレス」が入力されていません。\n';
        }else if(chMailcheck == ''){
            errMsg += '「回答通知メールアドレス(確認用)」が入力されていません。\n';
        }else{

            if(chMail != chMailcheck){
                errMsg += '「回答通知メールアドレス」が一致していません。\n';
            }
        }

        if(errMsg){
            alert(errMsg);
            return false;
        }

        return true;

    }

    function inquiry_pageBack(){
        document.reWriteForm.back_flg.value = '1';
        document.reWriteForm.submit();
    }

    function inquiry_Back(){
        document.backForm.submit();
    }


    function addUrl(n){
        nid = (n + 1);
        var nObj = document.createElement('DIV');    // next obj
        var pE   = 'ask_url_area' + n;               // this area
        var bE   = 'ask_urladd_btn' + n;             // this btn
        var npE  = 'ask_url_area' + nid;             // next area
        var nbE  = 'ask_urladd_btn' + nid;           // next btn

        nObj.id = npE;

        nObj.innerHTML = '<span>URL</span>&nbsp;&nbsp;\n<input type="text" name="reference_url' + nid + '" class="in_url" value="" size="30">&nbsp;&nbsp;&nbsp;\n<span>説明</span>&nbsp;&nbsp;\n<input type="text" name="reference_url_label' + nid + '" value="" size="30">\n<input type="button" name="add_url' + nid + '" id="ask_urladd_btn' + nid + '" value="+追加" onclick="addUrl(' + nid + ');">';

        tdObj = document.getElementById('inUrlArea');
        tdObj.appendChild(nObj);

        pObj  = document.getElementById(pE);
        bObj  = document.getElementById(bE);
        pObj.removeChild(bObj);

    }


    function addFile(n){
        var hideUrl     = 'prev_url';
        var selfurl     = document.getElementById(hideUrl).value;
        var attach_file = 'attach_file_' + n;
        var attach_flg  = 'attach_sub_' + n;
        if(document.forms["inquiryForm"].elements[attach_file].value == ''){
            alert('添付ファイルが選択されていません。');
            return false;
        }
        document.forms["inquiryForm"].elements[attach_flg].value = n;
        document.inquiryForm.action = selfurl;
        document.inquiryForm.submit();
    }

    function addItem(code, n, len, size){
        nid = (n + 1);
        var nObj  = document.createElement('DIV');    // next obj
        var pE    = 'inquiry_add_' + code + '_' + n;  // this area
        var bE    = 'add_item' + code + '_' + n;      // this btn
        var npE   = 'inquiry_add_' + code + '_' + nid;// next area
        var nbE   = 'add_item' + code + '_' + nid;    // next btn
        var tdE   = 'inquiry_item' + code;            // td element
        var key   = code + '_' + nid;                 // key
        var max   = 'add_max_' + code;                // max
        var limit = '';
        var param = '';
        if(len != '0')
          param = ' maxlength="'+ len +'"';
        if(size != '0'){
          if(len != '0')
            param += 'size="'+ size +'"';
          else
            param += ' size="'+ size +'"';
        }
        if(document.getElementById(max)){
          limit = document.getElementById(max).value;
        }

        nObj.id = npE;
        nObj.innerHTML  = '<input type="text" name="inquiry_'+ key +'" value="" '+ param +'>';
        if(limit != '' && nid >= (limit*1)){
          // no add
        }else{
          nObj.innerHTML += '<input type="button" name="add_item'+ key +'" id="add_item'+ key +'" value="+追加" onclick="addItem('+ code +', '+ nid +', '+ len +', '+ size +')">\n';
        }

        tdObj = document.getElementById(tdE);
        tdObj.appendChild(nObj);

        pObj  = document.getElementById(pE);
        bObj  = document.getElementById(bE);
        pObj.removeChild(bObj);

    }

    function delTmpAttach(c, n){
      var parentName = 'inquiry_item' + c;
      var aLinkName  = 'attach_link_' + c + '_' + n;
      var fileName   = 'attach_file_' + c + '_' + n;
      var idName     = 'attach_id_' + c + '_' + n;
      paObj = document.getElementById(parentName);
      aObj  = document.getElementById(aLinkName);
      fObj  = document.getElementById(fileName);
      iObj  = document.getElementById(idName);
      paObj.removeChild(aObj);
      paObj.removeChild(fObj);
      paObj.removeChild(iObj);
    }

    function category_url_array_init(){
      category_url_arr = new Array;
      category_num_arr = new Array;
    }

    function set_category_url_array(cnt,num,url){
      category_url_arr[cnt] = url;
      category_num_arr[cnt] = num;
    }

    function cateJump(){
        item_code = document.getElementById('item_code').value;
        id = 'inquiry_'+item_code;
        index = document.getElementById(id).selectedIndex;
        category_id = document.getElementById(id).options[index].value;
        pathname = window.location.pathname;
//        now_url = pathname.slice(6);   /* /form/を切り取る */
        get_str = '?cate_id='+category_id;

        var idn = pathname.lastIndexOf("/");
        now_url = pathname.substring(idn+1);

        len = category_num_arr.length;
        for(cnt = 0; cnt < len; cnt++){
            if( category_num_arr[cnt] == category_id ){
                if(category_url_arr[cnt] == now_url){
                    // urlが変わっていないので何もしない
                    return;
                }else{
                    // urlが変わったので飛ばす
                    location.href = category_url_arr[cnt]+get_str;
                    return;
                }
            }
        }
    }

    function change_charge_bt(){
      inquiry_charge_id = document.inquiryForm.inquiry_charge_id.value;
       str = "window.open(\'/manage/setCharge_noout.html?id="+inquiry_charge_id+"\',\'\',\'width=600,height=500\')";
       eval(str);
    }

