// ファンド名称 condition1
var fund = 'ファンド名称like';    // 1

// 運用会社 condition7
var b_company = new Array(
    '運用会社=朝日ﾗｲﾌ',         //1 
    '運用会社=ｱﾗｲｱﾝｽ',          //2
    '運用会社=ｲﾝﾍﾞｽｺ',          //3
    '運用会社=DIAM',            //4
    '運用会社=ｺﾞｰﾙﾄﾞﾏﾝ',        //5
    '運用会社=国際',            //6
    '運用会社=ｼｭﾛｰﾀﾞｰ',         //7
    '運用会社=新光',            //8
    '運用会社=新生',            //9
    '運用会社=ｽﾃｰﾄ',            //10
    '運用会社=ｽﾊﾟｰｸｽ',          //11
    '運用会社=住信AM',          //12
    '運用会社=ｿｼｴﾃ',            //13
    '運用会社=NKSJ',         //14
    '運用会社=大和',            //15
    '運用会社=大和住銀',        //16
    '運用会社=ﾄﾞｲﾁｪ',           //17
    '運用会社=東京海上',        //18
    '運用会社=ﾆｯｾｲ',            //19
    '運用会社=日興',            //20
    '運用会社=岡三',            //21
    '運用会社=野村',            //22 
    '運用会社=BNP',             //23
    '運用会社=ｲｰｽﾄｽﾌﾟﾘﾝｸﾞ',             //24
    '運用会社=ﾋﾟｸﾃ',            //25
    '運用会社=FCAM',            //26
    '運用会社=ITCIP',           //27
    '運用会社=ﾌｨﾃﾞﾘﾃｨ',         //28
    '運用会社=ﾌｫﾙﾃｨｽ',          //29
    '運用会社=ブラックロック',  //30
    '運用会社=ﾌﾟﾙﾃﾞﾝ',          //31
    '運用会社=ﾍﾞｱﾘﾝｸﾞ',         //32
    '運用会社=MHAM',            //33
    '運用会社=三井住友',        //34
    '運用会社=三菱UFJAM',       //35
    '運用会社=ﾓﾙｶﾞﾝS',          //36
    '運用会社=安田',            //37
    '運用会社=日本ｱｼﾞｱ',         //38 changed 20130712
    '運用会社=ﾗｯｾﾙ',            //39
    '運用会社=楽天',            //40
    '運用会社=AIG',             //41
    '運用会社=HSBC',            //42
    '運用会社=JPモルガン',      //43
    '運用会社=T＆D',            //44
    '運用会社=ｱｸｻ',             //45
    '運用会社=ﾌﾟﾗｻﾞ',           //46
    '運用会社=BNYメロン',       //47
    '運用会社=MDAM',            //48
    '運用会社=マニュライフ',    //49
    '運用会社=MFS',             //50
    '運用会社=フランクリン',    //51
    '運用会社=アバディーン',    //52
    '運用会社=トヨタ',          //53
    '運用会社=中央三井',        //54
    '運用会社=ｱﾑﾝﾃﾞｨ',      //55          //new 20101104
    '運用会社=ばんせい',        //56          //new 20101104
    '運用会社=ﾊﾟｲﾝﾌﾞﾘｯｼﾞ',  //57          //new 20101104
    '運用会社=明治安田',        //58          //new 20101104
    '運用会社=NN',        //59          //new 20101104 mod 20150407
    '運用会社=LM',          //60          //new 20101104
    '運用会社=UBS',         //61          //new 20101104
    '運用会社=CAM',       //62          //new 20101104
    '運用会社=SBI',       //63          //new 20111006
    '運用会社=SMT',       //64          //new 20120401
    '運用会社=ｱｽﾄﾏｯｸｽ',       //65          //new 20130401
    '運用会社=ﾎﾟｰﾄﾌｫﾘｱ',       //66          //new 20130501
    '運用会社=ｺﾓﾝｽﾞ',       //67          //new 20130501
    '運用会社=ｶﾚﾗ',       //68          //new 20130517
    '運用会社=ﾋﾟﾑｺ',       //69          //add 20150119
    '運用会社=あおぞら'       //70          //add 20150327
    );

// 協会分類 condition10
var b_kyokai = new Array(
'協会分類=追加型/国内/株式',
'協会分類=追加型/国内/債券',
'協会分類=追加型/国内/不動産投信',
'協会分類=追加型/国内/資産複合',
'協会分類=追加型/国内/その他資産',
'協会分類=追加型/海外/株式',
'協会分類=追加型/海外/債券',
'協会分類=追加型/海外/不動産投信',
'協会分類=追加型/海外/資産複合',
'協会分類=追加型/海外/その他資産',
'協会分類=追加型/内外/株式',
'協会分類=追加型/内外/債券',
'協会分類=追加型/内外/不動産投信',
'協会分類=追加型/内外/資産複合',
'協会分類=追加型/内外/その他資産',
'協会分類=単位型/国内/株式',
'協会分類=単位型/国内/債券',
'協会分類=単位型/国内/その他資産',
'協会分類=単位型/海外/株式',
'協会分類=単位型/海外/債券',
'協会分類=単位型/海外/資産複合',
'協会分類=単位型/海外/その他資産',
'協会分類=単位型/内外/株式',
'協会分類=単位型/内外/債券',
'協会分類=単位型/内外/資産複合',
'協会分類=単位型/内外/その他資産'
);

// レーティング（トータルリターン） condition26
/*
var b_rate1 = new Array(
'LLｽｺｱ ﾄｰﾀﾙﾘﾀｰﾝ 3年=1', // 1
'LLｽｺｱ ﾄｰﾀﾙﾘﾀｰﾝ 3年=2', // 2
'LLｽｺｱ ﾄｰﾀﾙﾘﾀｰﾝ 3年=3', // 3
'LLｽｺｱ ﾄｰﾀﾙﾘﾀｰﾝ 3年=4', // 4
'LLｽｺｱ ﾄｰﾀﾙﾘﾀｰﾝ 3年=5'  // 5
);
*/
var b_rate1 = new Array(
        'l1=1', // 1
        'l1=2', // 2
        'l1=3', // 3
        'l1=4', // 4
        'l1=5'  // 5
    );
// レーティング（リスク調整後リターン） condition27
/*
var b_rate2 = new Array(
'LLｽｺｱ ﾘｽｸ調整 ﾘﾀｰﾝ 3年=1', // 1
'LLｽｺｱ ﾘｽｸ調整 ﾘﾀｰﾝ 3年=2', // 2
'LLｽｺｱ ﾘｽｸ調整 ﾘﾀｰﾝ 3年=3', // 3
'LLｽｺｱ ﾘｽｸ調整 ﾘﾀｰﾝ 3年=4', // 4
'LLｽｺｱ ﾘｽｸ調整 ﾘﾀｰﾝ 3年=5'  // 5
);
*/
var b_rate2 = new Array(
        'l2=1', // 1
        'l2=2', // 2
        'l2=3', // 3
        'l2=4', // 4
        'l2=5'  // 5
    );
// レーティング（元本安定性）   condition28
/*
var b_rate3 = new Array(
'LLｽｺｱ 元本安定性 3年=1',   // 1
'LLｽｺｱ 元本安定性 3年=2',   // 2
'LLｽｺｱ 元本安定性 3年=3',   // 3
'LLｽｺｱ 元本安定性 3年=4',   // 4
'LLｽｺｱ 元本安定性 3年=5'    // 5
);
*/
var b_rate3 = new Array(
        'l3=1',   // 1
        'l3=2',   // 2
        'l3=3',   // 3
        'l3=4',   // 4
        'l3=5'    // 5
    );
// レーティング（経費率）   condition29
/*
var b_rate4 = new Array(
'LLｽｺｱ 経費率 3年=1',   // 1
'LLｽｺｱ 経費率 3年=2',   // 2
'LLｽｺｱ 経費率 3年=3',   // 3
'LLｽｺｱ 経費率 3年=4',   // 4
'LLｽｺｱ 経費率 3年=5'    // 5
);    
*/
var b_rate4 = new Array(
        'l4=1',   // 1
        'l4=2',   // 2
        'l4=3',   // 3
        'l4=4',   // 4
        'l4=5'    // 5
    );



function runscreener(id) {

    if (id == "")
        id = "searchCondition";
    else {        
        document.getElementById('pg').value = "1";
    }        

    var selected = "";        
    var condition_2 = "";
    var sendForm = document.getElementById(id);


    if (sendForm['form-text-01'].value == "ファンド名/委託会社")
        sendForm['form-text-01'].value = ""

    if (sendForm['form-text-01'].value == "キーワード・ファンド名から探す")
        sendForm['form-text-01'].value = ""

    if (sendForm['form-text-01'].value != ""){
        var temp = sendForm['form-text-01'].value
       if (temp.indexOf("##")!=0) {
          selected =  temp;
       }
    }

    if (sendForm['form-text-01'].value != 0) {
        var str = sendForm['form-text-01'].value;
        str = str.replace("(", "（");
        str = str.replace(")", "）");
        
        str = str.replace("\"", "”");
        str = str.replace("/", "／");
        str = str.replace("-", "－");
        str = str.replace("<", "＜");
        str = str.replace(">", "＞");
        str = str.replace("]", "　");
        str = str.replace("[", "　");

        
        sendForm['form-text-01'].value = str;        
        sendForm['condition31'].value = fund + "*" + sendForm['form-text-01'].value + "*";
    }
    else {
        sendForm['condition1'].value =  null;
        sendForm['condition31'].value =  null;
    }

    //委託会社
    if (sendForm['form-select-01'].value != 0) {
        var num = sendForm['form-select-01'].value;
        sendForm['condition51'].value = b_company[num - 1];
    }
    else {
        sendForm['condition51'].value =  null;
    }

    //協会分類
    if (sendForm['form-select-03'].value != 0) {
        var num = sendForm['form-select-03'].value;
        sendForm['condition52'].value = b_kyokai[num - 1];
    }
    else {
        sendForm['condition52'].value = null;
    }
    
    

    if (sendForm['fdcflag1_form1'].checked) {
        condition_2 = "-";
        selected = addCondition(selected, "s1_1");
    }
    if (sendForm['fdcflag1_form2'].checked) {
        condition_2 = addCondition(condition_2, "0")
        selected = addCondition(selected, "s1_2");
    }
    if (sendForm['fdcflag1_form3'].checked) {
        condition_2 = addCondition(condition_2, "1")
        selected = addCondition(selected, "s1_3");
    }
    if (sendForm['fdcflag1_form4'].checked) {
        condition_2 = addCondition(condition_2, "2")
        selected = addCondition(selected, "s1_4");
    }
    if (sendForm['fdcflag1_form5'].checked) {
        condition_2 = addCondition(condition_2, "3")
        selected = addCondition(selected, "s1_5");
    }

    if (condition_2 != "")
        sendForm['condition32'].value = "fdcflag1^ampsymbol;" + condition_2;


    /*
    var condition_3 = "";
    if (sendForm['fdcflag1_form6'].checked) {
        condition_3 = addCondition(condition_3, "8")
        selected = addCondition(selected, "s2_1");
    }
    if (sendForm['fdcflag1_form7'].checked) {
        condition_3 = addCondition(condition_3, "7")
        selected = addCondition(selected, "s2_2");
    }
    if (sendForm['fdcflag1_form8'].checked) {
        condition_3 = addCondition(condition_3, "6")
        selected = addCondition(selected, "s2_3");
    }
    if (sendForm['fdcflag1_form9'].checked) {
        condition_3 = addCondition(condition_3, "5")
        selected = addCondition(selected, "s2_4");
    }
    if (sendForm['fdcflag1_form10'].checked) {
        condition_3 = addCondition(condition_3, "4")
        selected = addCondition(selected, "s2_5");
    }

    if (condition_3 != "")
        sendForm['condition33'].value = "fdcflag1^ampsymbol;" + condition_3;        
    */   

    //changed it with the lipper score
    // レーティング（トータルリターン）    
    ary = new Array();
    if (h_check1_1) {
        ary.push(b_rate1[0]);
    }
    if (h_check1_2) {
        ary.push(b_rate1[1]);
    }
    if (h_check1_3) {
        ary.push(b_rate1[2]);
    }
    if (h_check1_4) {
        ary.push(b_rate1[3]);
    }
    if (h_check1_5) {
        ary.push(b_rate1[4]);
    }
    buff = ary.toString();
    if (buff) {
        document.getElementById('condition26').value = buff;        
    } else {
        document.getElementById('condition26').value = 'null';        
    }
    // レーティング（リスク調整後リターン）
    ary = new Array();
    if (h_check2_1) {
        ary.push(b_rate2[0]);
    }
    if (h_check2_2) {
        ary.push(b_rate2[1]);
    }
    if (h_check2_3) {
        ary.push(b_rate2[2]);
    }
    if (h_check2_4) {
        ary.push(b_rate2[3]);
    }
    if (h_check2_5) {
        ary.push(b_rate2[4]);
    }
    buff = ary.toString();
    if (buff) {
        document.getElementById('condition27').value = buff;
    } else {
        document.getElementById('condition27').value = 'null';
    }
    // レーティング（元本安定性）
    ary = new Array();
    if (h_check3_1) {
        ary.push(b_rate3[0]);
    }
    if (h_check3_2) {
        ary.push(b_rate3[1]);
    }
    if (h_check3_3) {
        ary.push(b_rate3[2]);
    }
    if (h_check3_4) {
        ary.push(b_rate3[3]);
    }
    if (h_check3_5) {
        ary.push(b_rate3[4]);
    }
    buff = ary.toString();
    if (buff) {
        document.getElementById('condition28').value = buff;
    } else {
        document.getElementById('condition28').value = 'null';
    }
    // レーティング（経費率）
    ary = new Array();
    if (h_check4_1) {
        ary.push(b_rate4[0]);
    }
    if (h_check4_2) {
        ary.push(b_rate4[1]);
    }
    if (h_check4_3) {
        ary.push(b_rate4[2]);
    }
    if (h_check4_4) {
        ary.push(b_rate4[3]);
    }
    if (h_check4_5) {
        ary.push(b_rate4[4]);
    }
    buff = ary.toString();
    if (buff) {
        document.getElementById('condition29').value = buff;
    } else {
        document.getElementById('condition29').value = 'null';
    }


    var condition_4 = "";
    if (sendForm['fdcflag1_form11'].checked) {
        condition_4 = addCondition(condition_4, "9")
        selected = addCondition(selected, "s3_1");
    }
    if (sendForm['fdcflag1_form12'].checked) {
        condition_4 = addCondition(condition_4, "10")
        selected = addCondition(selected, "s3_2");
    }

    if (condition_4 != "")
        sendForm['condition34'].value = "fdcflag1^ampsymbol;" + condition_4;


    var condition_5 = "";
    if (sendForm['fdcflag1_form13'].checked) {
        condition_5 = addCondition(condition_5, "11")
        selected = addCondition(selected, "s4_1");
    }    
    if (condition_5 != "")
        sendForm['condition35'].value = "fdcflag1^ampsymbol;" + condition_5;


   
    var hasCondition_6 = "";
    if (sendForm['fdcflag1_form14'].checked) {
        hasCondition_6 = "true";
    }
    if (sendForm['fdcflag1_form15'].checked) {
        hasCondition_6 = "true";
    }
    if (sendForm['fdcflag1_form16'].checked) {
        hasCondition_6 = "true";
    }
    if (sendForm['fdcflag1_form17'].checked) {
        hasCondition_6 = "true";
    }
    if (sendForm['fdcflag1_form18'].checked) {
        hasCondition_6 = "true";
    }
    if (sendForm['fdcflag1_form19'].checked) {
        hasCondition_6 = "true";
    }
    if (sendForm['fdcflag1_form21'].checked) {
        hasCondition_6 = "true";
    }

    suffix7 = "";
    if (hasCondition_6 != "")
        suffix7 = "_";

    
    var hasCondition7 = ""
    if (sendForm['specialflag_form1'].checked) {
        hasCondition7 = "true"
    }
    if (sendForm['specialflag_form2'].checked) {
        hasCondition7 = "true"
    }
    if (sendForm['specialflag_form3'].checked) {
        hasCondition7 = "true"
    }
    if (sendForm['specialflag_form4'].checked) {
        hasCondition7 = "true"
    }
    if (sendForm['specialflag_form5'].checked) {
        hasCondition7 = "true"
    }
    if (sendForm['specialflag_form6'].checked) {
        hasCondition7 = "true"
    }
    if (sendForm['specialflag_form7'].checked) {
        hasCondition7 = "true"
    }
    if (sendForm['specialflag_form8'].checked) {
        hasCondition7 = "true"
    }
    if (sendForm['specialflag_form9'].checked) {
        hasCondition7 = "true"
    }
    if (sendForm['specialflag_form10'].checked) {
        hasCondition7 = "true"
    }
    if (sendForm['specialflag_form11'].checked) {
        hasCondition7 = "true"
    }
    if (sendForm['specialflag_form12'].checked) {
        hasCondition7 = "true"
    }  
    
    
    var suffix17 = "";
    if (hasCondition7 != "" || hasCondition_6 != "")
        suffix17 = "_";


    var condition_17 = "";
    var condition_6 = "";
    var condition_7 = ""; 
    if (sendForm['fdcflag1_form14'].checked) {
        condition_6 = addCondition(condition_6, "12")
        selected = addCondition(selected, "s5_1");
    }
    //----------------kokonai
    if (sendForm['specialflag_form1'].checked) {
        condition_7 = addCondition(condition_7, "-" + suffix7)
        selected = addCondition(selected, "s5_8");
    }
    if (sendForm['specialflag_form2'].checked) {
        condition_7 = addCondition(condition_7, "0" + suffix7)
        selected = addCondition(selected, "s5_9");
    }
    if (sendForm['specialflag_form3'].checked) {
        condition_7 = addCondition(condition_7, "1" + suffix7)
        selected = addCondition(selected, "s5_10");
    }
    if (sendForm['specialflag_form4'].checked) {
        condition_7 = addCondition(condition_7, "2" + suffix7)
        selected = addCondition(selected, "s5_11");
    }

    
    if (sendForm['fdcflag1_form15'].checked) {
        condition_6 = addCondition(condition_6, "13")
        selected = addCondition(selected, "s5_2");
    }
    //----------------kaigai
    if (sendForm['specialflag_form5'].checked) {
        condition_7 = addCondition(condition_7, "3" + suffix7)
        selected = addCondition(selected, "s5_19");
    }
    if (sendForm['specialflag_form6'].checked) {
        condition_7 = addCondition(condition_7, "4" + suffix7)
        selected = addCondition(selected, "s5_20");
    }
    if (sendForm['specialflag_form7'].checked) {
        condition_7 = addCondition(condition_7, "5" + suffix7)
        selected = addCondition(selected, "s5_21");
    }
    if (sendForm['specialflag_form8'].checked) {
        condition_7 = addCondition(condition_7, "6" + suffix7)
        selected = addCondition(selected, "s5_22");
    }
    
    
    
    if (sendForm['fdcflag1_form16'].checked) {
        condition_6 = addCondition(condition_6, "14")
        selected = addCondition(selected, "s5_3");
    }
    //----------------kokonai2
    if (sendForm['specialflag_form9'].checked) {
        condition_7 = addCondition(condition_7, "7" + suffix7)
        selected = addCondition(selected, "s5_12");
    }
    if (sendForm['specialflag_form10'].checked) {
        condition_7 = addCondition(condition_7, "8" + suffix7)
        selected = addCondition(selected, "s5_13");
    }
    
    
    
    if (sendForm['fdcflag1_form17'].checked) {
        condition_6 = addCondition(condition_6, "15")
        selected = addCondition(selected, "s5_4");
    }
    //----------------kaigai2
    if (sendForm['lipperflag1_form7'].checked) {
        value = "5" + suffix17;
        condition_17 = addCondition(condition_17, value)
        selected = addCondition(selected, "s5_14");
    }
    if (sendForm['specialflag_form11'].checked) {
        condition_7 = addCondition(condition_7, "9" + suffix7)
        selected = addCondition(selected, "s5_23");
    }
    if (sendForm['specialflag_form12'].checked) {
        condition_7 = addCondition(condition_7, "10" + suffix7)
        selected = addCondition(selected, "s5_24");
    }  
    
    
    if (sendForm['fdcflag1_form18'].checked) {
        condition_6 = addCondition(condition_6, "16")
        selected = addCondition(selected, "s5_5");
    }
    if (sendForm['fdcflag1_form19'].checked) {
        condition_6 = addCondition(condition_6, "17")
        selected = addCondition(selected, "s5_6");
    }
    if (sendForm['lipperflag1_form8'].checked) {
        condition_17 = addCondition(condition_17, "6" + suffix17)
        selected = addCondition(selected, "s5_15");
    }
    
    if (sendForm['fdcflag1_form21'].checked) {
        condition_6 = addCondition(condition_6, "19")
        selected = addCondition(selected, "s5_7");
    }
    
    
    if (condition_6 != "")
        sendForm['condition36'].value = "fdcflag1^ampsymbol;" + condition_6;  
    if (condition_7 != "")
        sendForm['condition37'].value = "fdcflag4^ampsymbol;" + condition_7;
    if (condition_17 != "")
        sendForm['condition38'].value = "lipperflag1^ampsymbol;" + condition_17;
    
    
    var condition_8 = "";    
    if (sendForm['lipperflag1_form12'].checked) {
        condition_8 = addCondition(condition_8, "10")
        selected = addCondition(selected, "s6_1");
    }
    if (sendForm['lipperflag1_form13'].checked) {
        condition_8 = addCondition(condition_8, "11")
        selected = addCondition(selected, "s6_2");
    }
    if (sendForm['lipperflag1_form14'].checked) {
        condition_8 = addCondition(condition_8, "12")
        selected = addCondition(selected, "s6_3");
    }
    if (sendForm['lipperflag1_form15'].checked) {
        condition_8 = addCondition(condition_8, "15")   //13
        selected = addCondition(selected, "s6_4");
    }
    if (sendForm['lipperflag1_form16'].checked) {
        condition_8 = addCondition(condition_8, "22")   //14
        selected = addCondition(selected, "s6_5");
    }
    if (sendForm['lipperflag1_form17'].checked) {
        condition_8 = addCondition(condition_8, "13")   //15
        selected = addCondition(selected, "s6_6");
    }
    if (sendForm['lipperflag1_form18'].checked) {
        condition_8 = addCondition(condition_8, "14")   //16
        selected = addCondition(selected, "s6_7");
    }
    if (sendForm['lipperflag1_form19'].checked) {
        condition_8 = addCondition(condition_8, "16")   //17
        selected = addCondition(selected, "s6_8");
    }
    if (sendForm['lipperflag1_form20'].checked) {
        condition_8 = addCondition(condition_8, "17")   //18
        selected = addCondition(selected, "s6_9");
    }
    if (sendForm['lipperflag1_form21'].checked) {
        condition_8 = addCondition(condition_8, "18")   //19
        selected = addCondition(selected, "s6_10");
    }
    if (sendForm['lipperflag1_form22'].checked) {
        condition_8 = addCondition(condition_8, "19")   //20
        selected = addCondition(selected, "s6_11");
    }
    if (sendForm['lipperflag1_form23'].checked) {
        condition_8 = addCondition(condition_8, "20")   //21
        selected = addCondition(selected, "s6_12");
    }
    if (sendForm['lipperflag1_form24'].checked) {
        condition_8 = addCondition(condition_8, "21")   //22
        selected = addCondition(selected, "s6_13");
    }
    if (sendForm['lipperflag1_form25'].checked) {
        condition_8 = addCondition(condition_8, "23")
        selected = addCondition(selected, "s6_14");
    }
    if (sendForm['lipperflag1_form26'].checked) {
        condition_8 = addCondition(condition_8, "24")
        selected = addCondition(selected, "s6_15");
    }
    if (sendForm['lipperflag1_form27'].checked) {
        condition_8 = addCondition(condition_8, "25")
        selected = addCondition(selected, "s6_16");
    }
    if (sendForm['lipperflag1_form28'].checked) {
        condition_8 = addCondition(condition_8, "26")
        selected = addCondition(selected, "s6_17");
    }
    if (sendForm['lipperflag1_form29'].checked) {
        condition_8 = addCondition(condition_8, "27")
        selected = addCondition(selected, "s6_18");
    }
    if (sendForm['lipperflag1_form30'].checked) {
        condition_8 = addCondition(condition_8, "28")
        selected = addCondition(selected, "s6_19");
    }        
    if (condition_8 != "")
        sendForm['condition46'].value = "lipperflag1^ampsymbol;" + condition_8;

    
    //supposed to be 20 - total return
    var condition_9 = "";    
    for(var i = 0; i < 9; i++)
    {
        if (totreturn[i] == true) {
            condition_9 = addCondition(condition_9, 20+i)
        }
    }
    if (condition_9 != "") {
        sendForm['condition39'].value = "fdcflag1^ampsymbol;" + condition_9;
        selected = addCondition(selected, "s7_1");
    }    
    var condition_18 = "";
    var suffix18 = "";
    if (condition_9 != "")
        suffix18 = "_";    
    for (var i = 9; i < 20; i++) 
    {        
        if (totreturn[i] == true) 
        {
            if ((9 - i) == 0) 
            {            
                condition_18 = addCondition(condition_18, "-" + suffix18)
            }
            else 
            {
                value = i - 10;
                condition_18 = addCondition(condition_18, value + suffix18)
            }
        }
    }
    if (condition_18 != "") 
    {
        sendForm['condition47'].value = "fdcflag2^ampsymbol;" + condition_18;
        if (condition_9 == "")
           selected = addCondition(selected, "s7_1");
    }
    

    //sharp
    var condition_10 = "";    
    for (var i = 0; i < 19; i++) 
    {
        if (sharpratio[i] == true) 
        {
            condition_10 = addCondition(condition_10, 10+i)
        }
    }
    if (condition_10 != "") 
    {
        sendForm['condition48'].value = "fdcflag2^ampsymbol;" + condition_10;
        selected = addCondition(selected, "s8_1");
    }
    var condition_10b = "";
    var suffix10b = "";
    if (condition_10 != "")
        suffix10b = "_";    
    for (var i = 19; i < 20; i++) 
    {
        if (sharpratio[i] == true) 
        {
            if ((19 - i) == 0) 
            {
                condition_10b = addCondition(condition_10b, "-" + suffix10b)
            }
            else 
            {
                value = i - 20; 
                condition_10b = addCondition(condition_10b, value + suffix10b)
            }
        }
    }
   if (condition_10b != "") {
        sendForm['condition49'].value = "fdcflag3^ampsymbol;" + condition_10b;
        if (condition_10 == "")
           selected = addCondition(selected, "s8_1");
    }    

    
    var condition_11 = "";
    if (sendForm['lipperflag2_form01'].checked) {
        condition_11 = addCondition(condition_11, "-")
        selected = addCondition(selected, "s9_1");
    }
    if (sendForm['lipperflag2_form02'].checked) {
        condition_11 = addCondition(condition_11, "0")
        selected = addCondition(selected, "s9_2");
    }
    if (sendForm['lipperflag2_form03'].checked) {
        condition_11 = addCondition(condition_11, "2") //1
        selected = addCondition(selected, "s9_3");
    }
    if (sendForm['lipperflag2_form04'].checked) {
        condition_11 = addCondition(condition_11, "4") //2
        selected = addCondition(selected, "s9_4");
    }
    if (sendForm['lipperflag2_form05'].checked) {
        condition_11 = addCondition(condition_11, "5") //3
        selected = addCondition(selected, "s9_5");
    }
    if (sendForm['lipperflag2_form06'].checked) {
        condition_11 = addCondition(condition_11, "6") //4
        selected = addCondition(selected, "s9_6");
    }
    if (sendForm['lipperflag2_form07'].checked) {
        condition_11 = addCondition(condition_11, "7") //5
        selected = addCondition(selected, "s9_7");
    }
    if (sendForm['lipperflag2_form08'].checked) {
        condition_11 = addCondition(condition_11, "1") //6
        selected = addCondition(selected, "s9_8");
    }
    if (sendForm['lipperflag2_form09'].checked) {
        condition_11 = addCondition(condition_11, "3") //7
        selected = addCondition(selected, "s9_9");
    }
    if (sendForm['lipperflag2_form10'].checked) {
        condition_11 = addCondition(condition_11, "8")
        selected = addCondition(selected, "s9_10");
    }
    if (sendForm['lipperflag2_form11'].checked) {
        condition_11 = addCondition(condition_11, "9")
        selected = addCondition(selected, "s9_11");
    }
    if (sendForm['lipperflag2_form12'].checked) {
        condition_11 = addCondition(condition_11, "10")
        selected = addCondition(selected, "s9_12");
    }
    if (sendForm['lipperflag2_form13'].checked) {
        condition_11 = addCondition(condition_11, "11")
        selected = addCondition(selected, "s9_13");
    }
    if (sendForm['lipperflag2_form14'].checked) {
        condition_11 = addCondition(condition_11, "12")
        selected = addCondition(selected, "s9_14");
    }
    
    if (condition_11 != "")
        sendForm['condition40'].value = "lipperflag2^ampsymbol;" + condition_11;

    
    
    var condition_12 = "";
    if (sendForm['fdcflag2_form28'].checked) {
        condition_12 = addCondition(condition_12, "0")
        selected = addCondition(selected, "s10_1");
    }
    if (sendForm['fdcflag2_form29'].checked) {
        condition_12 = addCondition(condition_12, "1")
        selected = addCondition(selected, "s10_2");
    }
    if (condition_12 != "")
        sendForm['condition41'].value = "fdcflag3^ampsymbol;" + condition_12;
        

    var condition_13 = "";
    if (sendForm['lipperflag2_form15'].checked) {
        condition_13 = addCondition(condition_13, "13")
        selected = addCondition(selected, "s12_1");
    }
    if (sendForm['lipperflag2_form16'].checked) {
        condition_13 = addCondition(condition_13, "14")
        selected = addCondition(selected, "s12_2");
    }
    if (sendForm['lipperflag2_form17'].checked) {
        condition_13 = addCondition(condition_13, "15")
        selected = addCondition(selected, "s12_3");
    }
    if (sendForm['lipperflag2_form18'].checked) {
        condition_13 = addCondition(condition_13, "16")
        selected = addCondition(selected, "s12_4");
    }
    if (sendForm['lipperflag2_form19'].checked) {
        condition_13 = addCondition(condition_13, "17")
        selected = addCondition(selected, "s12_5");
    }
    if (sendForm['lipperflag2_form20'].checked) {
        condition_13 = addCondition(condition_13, "18")
        selected = addCondition(selected, "s12_6");
    }
    if (sendForm['lipperflag2_form21'].checked) {
        condition_13 = addCondition(condition_13, "19")
        selected = addCondition(selected, "s12_7");
    }
    if (sendForm['lipperflag2_form22'].checked) {
        condition_13 = addCondition(condition_13, "20")
        selected = addCondition(selected, "s12_8");
    }
    if (condition_13 != "")
        sendForm['condition42'].value = "lipperflag2^ampsymbol;" + condition_13;


    //----------------------commodity
    var condition_43 = "";
    if (condition_13 != "")
        suffix43 = "_";
    else
        suffix43 = "";
    
    if (sendForm['lipperflag1_form9'].checked) {
        condition_43 = addCondition(condition_43, "7" + suffix43)
        selected = addCondition(selected, "s5_16");
    }
    if (sendForm['lipperflag1_form10'].checked) {
        condition_43 = addCondition(condition_43, "8" + suffix43)
        selected = addCondition(selected, "s5_17");
    }
    if (sendForm['lipperflag1_form11'].checked) {
        condition_43 = addCondition(condition_43, "9" + suffix43)
        selected = addCondition(selected, "s5_18");
    }
    if (condition_43 != "")
        sendForm['condition43'].value = "lipperflag1^ampsymbol;" + condition_43;


    var condition_14 = "";
    //var condition_14a = "";
    if (sendForm['fdcflag2_form30'].checked) {
        condition_14 = addCondition(condition_14, "2")
        selected = addCondition(selected, "s11_1");
    }
    if (sendForm['fdcflag3_form1'].checked) {
        /*
        var suffix14 = "";
        if(condition_14 != "")
            suffix14 = "_"
        condition_14a = addCondition(condition_14a, "-" + suffix14)
        */
        condition_14 = addCondition(condition_14,"3")
        selected = addCondition(selected, "s11_2");
    }
    if (condition_14 != "")
        sendForm['condition53'].value = "fdcflag3^ampsymbol;" + condition_14;
    //if (condition_14a != "") {
        //sendForm['condition14'].value = "fdcflag3^ampsymbol;" + condition_14a;
    //}


    var condition_15 = "";    
    if (sendForm['fdcflag3_form2'].checked) {
        condition_15 = addCondition(condition_15, "4")
        selected = addCondition(selected, "s13_1");
    }
    if (sendForm['fdcflag3_form3'].checked) {
        condition_15 = addCondition(condition_15, "5")
        selected = addCondition(selected, "s13_2");
    }
    if (sendForm['fdcflag3_form4'].checked) {
        condition_15 = addCondition(condition_15, "6")
        selected = addCondition(selected, "s13_3");
    }
    if (sendForm['fdcflag3_form5'].checked) {
        condition_15 = addCondition(condition_15, "7")
        selected = addCondition(selected, "s13_4");
    }
    if (condition_15 != "")
        sendForm['condition50'].value = "fdcflag3^ampsymbol;" + condition_15;


    var condition_16 = "";
    if (sendForm['fdcflag3_form6'].checked) {
        condition_16 = addCondition(condition_16, "8")
        selected = addCondition(selected, "s14_1");
    }
    if (sendForm['fdcflag3_form7'].checked) {
        condition_16 = addCondition(condition_16, "9")
        selected = addCondition(selected, "s14_2");
    }
    if (sendForm['fdcflag3_form8'].checked) {
        condition_16 = addCondition(condition_16, "10")
        selected = addCondition(selected, "s14_3");
    }
    if (sendForm['fdcflag3_form9'].checked) {
        condition_16 = addCondition(condition_16, "11")
        selected = addCondition(selected, "s14_4");
    }
    if (sendForm['fdcflag3_form10'].checked) {
        condition_16 = addCondition(condition_16, "12")
        selected = addCondition(selected, "s14_5");
    }
    if (condition_16 != "")
        sendForm['condition45'].value = "fdcflag3^ampsymbol;" + condition_16;
    var condition_74 = "";
    if (sendForm['fdcflag3_form11'].checked) {
        condition_74 = addCondition(condition_74, "13")
        selected = addCondition(selected, "s15_1");
    }
    if (condition_74 != "") {        
        sendForm['condition54'].value = "fdcflag3^ampsymbol;" + condition_74;
    }
    
    sendForm['selectedCondition'].value = selected;
    sendForm.action = "result.html";
    sendForm.submit();
}

function addCondition(inval, condition) {
    if (inval != "") 
        return inval + "," + condition
    else
        return condition;
}

function table(id) {
    var sendForm = document.getElementById('searchCondition');
    
    if (id == 2) 
        sendForm['focus'].value = "table2";
    else if (id == 3)
        sendForm['focus'].value = "table3";
    else if (id == 4)
        sendForm['focus'].value = "table4";
    else if (id == 5)
        sendForm['focus'].value = "table5";
    else if (id == 6)
        sendForm['focus'].value = "table6";
    else if (id == 7) {    
        sendForm['focus'].value = "table7";
    }
    else
        sendForm['focus'].value = "table1";

    runscreener("");
    //sendForm.action = "result.html";
    //sendForm.submit();
}

var totreturn = new Array();
//6m -
totreturn[0] = false;
totreturn[1] = false;
totreturn[2] = false;
totreturn[3] = false;
//1y
totreturn[4] = false;
totreturn[5] = false;
totreturn[6] = false;
totreturn[7] = false;
//2y
totreturn[8] = false;
totreturn[9] = false;
totreturn[10] = false;
totreturn[11] = false;
//3y
totreturn[12] = false;
totreturn[13] = false;
totreturn[14] = false;
totreturn[15] = false;
//5y
totreturn[16] = false;
totreturn[17] = false;
totreturn[18] = false;
totreturn[19] = false;


function totalreturn(years, value) {
    if (years == "6m") {
        if (value == "0") {
            if (totreturn[0] == true)
                document.getElementById("total_6_0").className = "";
            else
                document.getElementById("total_6_0").className = "selected";
            totreturn[0] = !totreturn[0];
        }
        else if (value == "1") {
            if (totreturn[1] == true)
                document.getElementById("total_6_1").className = "";
            else
                document.getElementById("total_6_1").className = "selected";
            totreturn[1] = !totreturn[1];
        }
        else if (value == "2") {
            if (totreturn[2] == true)
                document.getElementById("total_6_2").className = "";
            else
                document.getElementById("total_6_2").className = "selected";
            totreturn[2] = !totreturn[2];
        }
        else if (value == "3") {
            if (totreturn[3] == true)
                document.getElementById("total_6_3").className = "";
            else
                document.getElementById("total_6_3").className = "selected";
            totreturn[3] = !totreturn[3];
        }
    }
    else if (years == "1y") {
        if (value == "0") {
            if (totreturn[4] == true)
                document.getElementById("total_1_0").className = "";
            else
                document.getElementById("total_1_0").className = "selected";
            totreturn[4] = !totreturn[4];
        }
        else if (value == "1") {
            if (totreturn[5] == true)
                document.getElementById("total_1_1").className = "";
            else
                document.getElementById("total_1_1").className = "selected";
            totreturn[5] = !totreturn[5];
        }
        else if (value == "2") {
            if (totreturn[6] == true)
                document.getElementById("total_1_2").className = "";
            else
                document.getElementById("total_1_2").className = "selected";
            totreturn[6] = !totreturn[6];
        }
        else if (value == "3") {
            if (totreturn[7] == true)
                document.getElementById("total_1_3").className = "";
            else
                document.getElementById("total_1_3").className = "selected";
            totreturn[7] = !totreturn[7];
        }        
    }
    else if (years == "2y") {
        if (value == "0") {
            if (totreturn[8] == true)
                document.getElementById("total_2_0").className = "";
            else
                document.getElementById("total_2_0").className = "selected";
            totreturn[8] = !totreturn[8];
        }
        else if (value == "1") {
            if (totreturn[9] == true)
                document.getElementById("total_2_1").className = "";
            else
                document.getElementById("total_2_1").className = "selected";
            totreturn[9] = !totreturn[9];
        }
        else if (value == "2") {
            if (totreturn[10] == true)
                document.getElementById("total_2_2").className = "";
            else
                document.getElementById("total_2_2").className = "selected";
            totreturn[10] = !totreturn[10];
        }
        else if (value == "3") {
            if (totreturn[11] == true)
                document.getElementById("total_2_3").className = "";
            else
                document.getElementById("total_2_3").className = "selected";
            totreturn[11] = !totreturn[11];
        }
    }
    else if (years == "3y") {
        if (value == "0") {
            if (totreturn[12] == true)
                document.getElementById("total_3_0").className = "";
            else
                document.getElementById("total_3_0").className = "selected";
            totreturn[12] = !totreturn[12];
        }
        else if (value == "1") {
            if (totreturn[13] == true)
                document.getElementById("total_3_1").className = "";
            else
                document.getElementById("total_3_1").className = "selected";
            totreturn[13] = !totreturn[13];
        }
        else if (value == "2") {
            if (totreturn[14] == true)
                document.getElementById("total_3_2").className = "";
            else
                document.getElementById("total_3_2").className = "selected";
            totreturn[14] = !totreturn[14];
        }
        else if (value == "3") {
            if (totreturn[15] == true)
                document.getElementById("total_3_3").className = "";
            else
                document.getElementById("total_3_3").className = "selected";
            totreturn[15] = !totreturn[15];
        }
    }
    else if (years == "5y") {
        if (value == "0") {
            if (totreturn[16] == true)
                document.getElementById("total_5_0").className = "";
            else
                document.getElementById("total_5_0").className = "selected";
            totreturn[16] = !totreturn[16];
        }
        else if (value == "1") {
            if (totreturn[17] == true)
                document.getElementById("total_5_1").className = "";
            else
                document.getElementById("total_5_1").className = "selected";
            totreturn[17] = !totreturn[17];
        }
        else if (value == "2") {
            if (totreturn[18] == true)
                document.getElementById("total_5_2").className = "";
            else
                document.getElementById("total_5_2").className = "selected";
            totreturn[18] = !totreturn[18];
        }
        else if (value == "3") {
            if (totreturn[19] == true)
                document.getElementById("total_5_3").className = "";
            else
                document.getElementById("total_5_3").className = "selected";
            totreturn[19] = !totreturn[19];
        }
    }
}


var sharpratio = new Array();
//6m -
sharpratio[0] = false;
sharpratio[1] = false;
sharpratio[2] = false;
sharpratio[3] = false;
//1y
sharpratio[4] = false;
sharpratio[5] = false;
sharpratio[6] = false;
sharpratio[7] = false;
//2y
sharpratio[8] = false;
sharpratio[9] = false;
sharpratio[10] = false;
sharpratio[11] = false;
//3y
sharpratio[12] = false;
sharpratio[13] = false;
sharpratio[14] = false;
sharpratio[15] = false;
//5y
sharpratio[16] = false;
sharpratio[17] = false;
sharpratio[18] = false;
sharpratio[19] = false;


function ratio(years, value) {
    if (years == "6m") {
        if (value == "0") {
            if (sharpratio[0] == true)
                document.getElementById("sharp_6_0").className = ""; 
            else
                document.getElementById("sharp_6_0").className = "selected"; 
            sharpratio[0] = !sharpratio[0];
        }
        else if (value == "1") {
            if (sharpratio[1] == true)
                document.getElementById("sharp_6_1").className = "";
            else
                document.getElementById("sharp_6_1").className = "selected";
            sharpratio[1] = !sharpratio[1];
        }
        else if (value == "2") {
            if (sharpratio[2] == true)
                document.getElementById("sharp_6_2").className = "";
            else
                document.getElementById("sharp_6_2").className = "selected";
            sharpratio[2] = !sharpratio[2];
        }
        else if (value == "3") {
            if (sharpratio[3] == true)
                document.getElementById("sharp_6_3").className = "";
            else
                document.getElementById("sharp_6_3").className = "selected";
            sharpratio[3] = !sharpratio[3];
        }
    }
    else if (years == "1y") {
        if (value == "0") {
            if (sharpratio[4] == true)
                document.getElementById("sharp_1_0").className = "";
            else
                document.getElementById("sharp_1_0").className = "selected";
            sharpratio[4] = !sharpratio[4];
        }
        else if (value == "1") {
            if (sharpratio[5] == true)
                document.getElementById("sharp_1_1").className = "";
            else
                document.getElementById("sharp_1_1").className = "selected";
            sharpratio[5] = !sharpratio[5];
        }
        else if (value == "2") {
            if (sharpratio[6] == true)
                document.getElementById("sharp_1_2").className = "";
            else
                document.getElementById("sharp_1_2").className = "selected";
            sharpratio[6] = !sharpratio[6];
        }
        else if (value == "3") {
            if (sharpratio[7] == true)
                document.getElementById("sharp_1_3").className = "";
            else
                document.getElementById("sharp_1_3").className = "selected";
            sharpratio[7] = !sharpratio[7];
        }
    }
    else if (years == "2y") {
        if (value == "0") {
            if (sharpratio[8] == true)
                document.getElementById("sharp_2_0").className = "";
            else
                document.getElementById("sharp_2_0").className = "selected";
            sharpratio[8] = !sharpratio[8];
        }
        else if (value == "1") {
            if (sharpratio[9] == true)
                document.getElementById("sharp_2_1").className = "";
            else
                document.getElementById("sharp_2_1").className = "selected";
            sharpratio[9] = !sharpratio[9];
        }
        else if (value == "2") {
            if (sharpratio[10] == true)
                document.getElementById("sharp_2_2").className = "";
            else
                document.getElementById("sharp_2_2").className = "selected";
            sharpratio[10] = !sharpratio[10];
        }
        else if (value == "3") {
            if (sharpratio[11] == true)
                document.getElementById("sharp_2_3").className = "";
            else
                document.getElementById("sharp_2_3").className = "selected";
            sharpratio[11] = !sharpratio[11];
        }
    }
    else if (years == "3y") {
        if (value == "0") {
            if (sharpratio[12] == true)
                document.getElementById("sharp_3_0").className = "";
            else
                document.getElementById("sharp_3_0").className = "selected";
            sharpratio[12] = !sharpratio[12];
        }
        else if (value == "1") {
            if (sharpratio[13] == true)
                document.getElementById("sharp_3_1").className = "";
            else
                document.getElementById("sharp_3_1").className = "selected";
            sharpratio[13] = !sharpratio[13];
        }
        else if (value == "2") {
            if (sharpratio[14] == true)
                document.getElementById("sharp_3_2").className = "";
            else
                document.getElementById("sharp_3_2").className = "selected";
            sharpratio[14] = !sharpratio[14];
        }
        else if (value == "3") {
            if (sharpratio[15] == true)
                document.getElementById("sharp_3_3").className = "";
            else
                document.getElementById("sharp_3_3").className = "selected";
            sharpratio[15] = !sharpratio[15];
        }
    }
    else if (years == "5y") {
        if (value == "0") {
            if (sharpratio[16] == true)
                document.getElementById("sharp_5_0").className = "";
            else
                document.getElementById("sharp_5_0").className = "selected";
            sharpratio[16] = !sharpratio[16];
        }
        else if (value == "1") {
            if (sharpratio[17] == true)
                document.getElementById("sharp_5_1").className = "";
            else
                document.getElementById("sharp_5_1").className = "selected";
            sharpratio[17] = !sharpratio[17];
        }
        else if (value == "2") {
            if (sharpratio[18] == true)
                document.getElementById("sharp_5_2").className = "";
            else
                document.getElementById("sharp_5_2").className = "selected";
            sharpratio[18] = !sharpratio[18];
        }
        else if (value == "3") {
            if (sharpratio[19] == true)
                document.getElementById("sharp_5_3").className = "";
            else
                document.getElementById("sharp_5_3").className = "selected";
            sharpratio[19] = !sharpratio[19];
        }
    }
}

function page(num) {
    document.getElementById('pg').value = num;    
    runscreener('');
}

function sortTab1(index, field, table) {

    if (index == 1) {
        document.getElementById('sortcolumn').value = "col1";
        postQ('', 'up', field,table)
    }
    else if (index == 2) {
        document.getElementById('sortcolumn').value = "col1";
        postQ('', 'down', field, table)
    }
    else if (index == 3) {
        document.getElementById('sortcolumn').value = "col2";
        postQ('', 'up', field, table)
    }
    else if (index == 4) {
        document.getElementById('sortcolumn').value = "col2";
        postQ('', 'down', field, table)
    }
    else if (index == 5) {
        document.getElementById('sortcolumn').value = "col3";
        postQ('', 'up', field, table)
    }
    else if (index == 6) {
        document.getElementById('sortcolumn').value = "col3";
        postQ('', 'down', field, table)
    }
    else if (index == 7) {
        document.getElementById('sortcolumn').value = "col4";
        postQ('', 'up', field, table)
    }
    else if (index == 8) {
        document.getElementById('sortcolumn').value = "col4";
        postQ('', 'down', field, table)
    }
    else if (index == 9) {
        document.getElementById('sortcolumn').value = "col5";
        postQ('', 'up', field, table)
    }
    else if (index == 10) {
        document.getElementById('sortcolumn').value = "col5";
        postQ('', 'down', field, table)
    }
    else if (index == 11) {
        document.getElementById('sortcolumn').value = "col7";
        postQ('', 'up', field, table)
    }
    else if (index == 12) {
        document.getElementById('sortcolumn').value = "col7";
        postQ('', 'down', field, table)
    }
    else if (index == 13) {
        document.getElementById('sortcolumn').value = "col8";
        postQ('', 'up', field, table)
    }
    else if (index == 14) {
        document.getElementById('sortcolumn').value = "col8";
        postQ('', 'down', field, table)
    }
    else if (index == 13) {
        document.getElementById('sortcolumn').value = "col9";
        postQ('', 'up', field, table)
    }
    else if (index == 14) {
        document.getElementById('sortcolumn').value = "col9";
        postQ('', 'down', field, table)
    }
    else if (index == 15) {
        document.getElementById('sortcolumn').value = "col10";
        postQ('', 'up', field, table)
    }
    else if (index == 16) {
        document.getElementById('sortcolumn').value = "col10";
        postQ('', 'down', field, table)
    }
    else if (index == 17) {
        document.getElementById('sortcolumn').value = "col5";
        postQ('', 'up', field, table)
    }
    else if (index == 18) {
        document.getElementById('sortcolumn').value = "col5";
        postQ('', 'down', field, table)
    }
    else if (index == 19) {
        document.getElementById('sortcolumn').value = "col12";
        postQ('', 'up', field, table)
    }
    else if (index == 20) {
        document.getElementById('sortcolumn').value = "col12";
        postQ('', 'down', field, table)
    }
    else if (index == 21) {
        document.getElementById('sortcolumn').value = "col13";
        postQ('', 'up', field, table)
    }
    else if (index == 22) {
        document.getElementById('sortcolumn').value = "col13";
        postQ('', 'down', field, table)
    }
    else if (index == 23) {
        document.getElementById('sortcolumn').value = "col14";
        postQ('', 'up', field, table)
    }
    else if (index == 24) {
        document.getElementById('sortcolumn').value = "col14";
        postQ('', 'down', field, table)
    }
    else if (index == 25) {
        document.getElementById('sortcolumn').value = "col15";
        postQ('', 'up', field, table)
    }
    else if (index == 26) {
        document.getElementById('sortcolumn').value = "col15";
        postQ('', 'down', field, table)
    }
    else if (index == 27) {
        document.getElementById('sortcolumn').value = "col16";
        postQ('', 'up', field, table)
    }
    else if (index == 28) {
        document.getElementById('sortcolumn').value = "col16";
        postQ('', 'down', field, table)
    }
    else if (index == 29) {
        document.getElementById('sortcolumn').value = "col17";
        postQ('', 'up', field, table)
    }
    else if (index == 30) {
        document.getElementById('sortcolumn').value = "col17";
        postQ('', 'down', field, table)
    }
    else if (index == 31) {
        document.getElementById('sortcolumn').value = "col18";
        postQ('', 'up', field, table)
    }
    else if (index == 32) {
        document.getElementById('sortcolumn').value = "col18";
        postQ('', 'down', field, table)
    }
    else if (index == 33) {
        document.getElementById('sortcolumn').value = "col19";
        postQ('', 'up', field, table)
    }
    else if (index == 34) {
        document.getElementById('sortcolumn').value = "col19";
        postQ('', 'down', field, table)
    }
    else if (index == 35) {
        document.getElementById('sortcolumn').value = "col20";
        postQ('', 'up', field, table)
    }
    else if (index == 36) {
        document.getElementById('sortcolumn').value = "col20";
        postQ('', 'down', field, table)
    }
    else if (index == 37) {
        document.getElementById('sortcolumn').value = "col21";
        postQ('', 'up', field, table)
    }
    else if (index == 38) {
        document.getElementById('sortcolumn').value = "col21";
        postQ('', 'down', field, table)
    }
    else if (index == 39) {
        document.getElementById('sortcolumn').value = "col22";
        postQ('', 'up', field, table)
    }
    else if (index == 40) {
        document.getElementById('sortcolumn').value = "col22";
        postQ('', 'down', field, table)
    }
    else if (index == 41) {
        document.getElementById('sortcolumn').value = "col24";
        postQ('', 'up', field, table)
    }
    else if (index == 42) {
        document.getElementById('sortcolumn').value = "col24";
        postQ('', 'down', field, table)
    }
    else if (index == 41) {
        document.getElementById('sortcolumn').value = "col24";
        postQ('', 'up', field, table)
    }
    else if (index == 42) {
        document.getElementById('sortcolumn').value = "col24";
        postQ('', 'down', field, table)
    }
    else if (index == 43) {
        document.getElementById('sortcolumn').value = "col25";
        postQ('', 'up', field, table)
    }
    else if (index == 44) {
        document.getElementById('sortcolumn').value = "col25";
        postQ('', 'down', field, table)
    }
    else if (index == 45) {
        document.getElementById('sortcolumn').value = "col26";
        postQ('', 'up', field, table)
    }
    else if (index == 46) {
        document.getElementById('sortcolumn').value = "col26";
        postQ('', 'down', field, table)
    }
    else if (index == 47) {
        document.getElementById('sortcolumn').value = "col27";
        postQ('', 'up', field, table)
    }
    else if (index == 48) {
        document.getElementById('sortcolumn').value = "col27";
        postQ('', 'down', field, table)
    }
    else if (index == 49) {
        document.getElementById('sortcolumn').value = "col28";
        postQ('', 'up', field, table)
    }
    else if (index == 50) {
        document.getElementById('sortcolumn').value = "col28";
        postQ('', 'down', field, table)
    }
    else if (index == 51) {
        document.getElementById('sortcolumn').value = "col29";
        postQ('', 'up', field, table)
    }
    else if (index == 52) {
        document.getElementById('sortcolumn').value = "col29";
        postQ('', 'down', field, table)
    }
    else if (index == 53) {
        document.getElementById('sortcolumn').value = "col30";
        postQ('', 'up', field, table)
    }
    else if (index == 54) {
        document.getElementById('sortcolumn').value = "col30";
        postQ('', 'down', field, table)
    }
    else if (index == 55) {
        document.getElementById('sortcolumn').value = "col6";
        postQ('', 'up', field, table)
    }
    else if (index == 56) {
        document.getElementById('sortcolumn').value = "col6";
        postQ('', 'down', field, table)
    }
    else if (index == 57) {
        document.getElementById('sortcolumn').value = "col31";
        postQ('', 'up', field, table)
    }
    else if (index == 58) {
        document.getElementById('sortcolumn').value = "col31";
        postQ('', 'down', field, table)
    }
    else if (index == 59) {
        document.getElementById('sortcolumn').value = "col32";
        postQ('', 'up', field, table)
    }
    else if (index == 60) {
        document.getElementById('sortcolumn').value = "col32";
        postQ('', 'down', field, table)
    }
    else if (index == 61) {
        document.getElementById('sortcolumn').value = "col33";
        postQ('', 'up', field, table)
    }
    else if (index == 62) {
        document.getElementById('sortcolumn').value = "col33";
        postQ('', 'down', field, table)
    }
    else if (index == 63) {
        document.getElementById('sortcolumn').value = "col34";
        postQ('', 'up', field, table)
    }
    else if (index == 64) {
        document.getElementById('sortcolumn').value = "col34";
        postQ('', 'down', field, table)
    }
    else if (index == 65) {
        document.getElementById('sortcolumn').value = "col35";
        postQ('', 'up', field, table)
    }
    else if (index == 66) {
        document.getElementById('sortcolumn').value = "col35";
        postQ('', 'down', field, table)
    }
}

function postQ(pg, sortDir, sortFld, focus) {
    
    var sendForm = document.getElementById('searchCondition');    
    temp = 'result.html'
    if (pg != '') {
        sendForm['pg'].value = pg
    }
    if (focus != '')
        sendForm['focus'].value = focus;    
    sendForm['sort'].value = sortFld + '=' + sortDir;
    /*
    sendForm.action = temp;
    sendForm.submit();
    */
    runscreener('');
}

function sort(pg, sortDir, sortFld, focus) {
    window.alert('test3');
    var sendForm = document.getElementById('searchCondition');
    temp = 'result.html'
    if (pg != '') {
        sendForm['pg'].value = pg
    }
    if (focus != '')
        sendForm['focus'].value = focus;
    sendForm['sort'].value = sortFld + '=' + sortDir;    
    /*
    sendForm.action = temp;
    sendForm.submit();
    */
    runscreener('');
}

function Compare(inval) {    
    var compareForm = document.getElementById('compareCondition');
    
    var items = "";
    var cnt = 0;
    for (i = 0; i <= inval; i++) {
        var name = 'table_1_' + i
        if (document.getElementById(name).checked == true) {
            if (items != "")
                items = items + "_";
            items = items + document.getElementById(name).name;
            cnt++;
        }
    }
    
    if (cnt < 2) {
        window.alert('２件以上を選択して下さい。');
        return;
    }
    else if (cnt > 5) {
        window.alert('６件以上選択できません。選択した銘柄を減らしてください。');
        return;
    }

    window.location = "../comparison/index.html?codes=" + items;
}

var v_checkCounter = 0;
function checkCounter(inval) {    
    if (v_checkCounter >= 5 && inval.checked) {
        alert("６件以上選択できません。選択した銘柄を減らしてください。");
        inval.checked = false;
        return;
    }

    if (inval.checked == true) {
        v_checkCounter++;
        //checkOtherTextBox(inval.value)
    }
    else {
        v_checkCounter--;
        //unCheckOtherTextBox(inval.value)
    }

    //check other checkbox as well
}

function allclear(){

    document.getElementById("form-text-01").value = "";

    document.getElementById("form-select-01").value = "";
    document.getElementById("form-select-01").selectedIndex = 0;


    document.getElementById("form-select-03").value = "";
    document.getElementById("form-select-03").selectedIndex = 0;

    document.getElementById("fdcflag1_form1").checked = false;
    document.getElementById("fdcflag1_form2").checked = false;
    document.getElementById("fdcflag1_form3").checked = false;
    document.getElementById("fdcflag1_form4").checked = false;
    document.getElementById("fdcflag1_form5").checked = false;
    /*
    document.getElementById("fdcflag1_form6").checked = false;
    document.getElementById("fdcflag1_form7").checked = false;
    document.getElementById("fdcflag1_form8").checked = false;
    document.getElementById("fdcflag1_form9").checked = false;
    document.getElementById("fdcflag1_form10").checked = false;
    */
    document.getElementById("fdcflag1_form11").checked = false;

    document.getElementById("fdcflag1_form13").checked = false;
    document.getElementById("fdcflag1_form14").checked = false;
    document.getElementById("fdcflag1_form15").checked = false;
    document.getElementById("fdcflag1_form16").checked = false;
    document.getElementById("fdcflag1_form17").checked = false;
    document.getElementById("fdcflag1_form18").checked = false;
    document.getElementById("fdcflag1_form19").checked = false;

    document.getElementById("fdcflag1_form21").checked = false;

    document.getElementById("specialflag_form1").checked = false;
    document.getElementById("specialflag_form2").checked = false;
    document.getElementById("specialflag_form3").checked = false;
    document.getElementById("specialflag_form4").checked = false;
    document.getElementById("specialflag_form5").checked = false;
    document.getElementById("specialflag_form6").checked = false;
    document.getElementById("specialflag_form7").checked = false;
    document.getElementById("specialflag_form8").checked = false;
    document.getElementById("specialflag_form9").checked = false;
    document.getElementById("specialflag_form10").checked = false;
    document.getElementById("specialflag_form11").checked = false;
    document.getElementById("specialflag_form12").checked = false;

    document.getElementById("lipperflag1_form7").checked = false;
    document.getElementById("lipperflag1_form8").checked = false;
    document.getElementById("lipperflag1_form9").checked = false;
    document.getElementById("lipperflag1_form10").checked = false;
    document.getElementById("lipperflag1_form11").checked = false;
    document.getElementById("lipperflag1_form12").checked = false;
    document.getElementById("lipperflag1_form13").checked = false;
    document.getElementById("lipperflag1_form14").checked = false;
    document.getElementById("lipperflag1_form15").checked = false;
    document.getElementById("lipperflag1_form16").checked = false;
    document.getElementById("lipperflag1_form17").checked = false;
    document.getElementById("lipperflag1_form18").checked = false;
    document.getElementById("lipperflag1_form19").checked = false;
    document.getElementById("lipperflag1_form20").checked = false;
    document.getElementById("lipperflag1_form21").checked = false;
    document.getElementById("lipperflag1_form22").checked = false;
    document.getElementById("lipperflag1_form23").checked = false;
    document.getElementById("lipperflag1_form24").checked = false;
    document.getElementById("lipperflag1_form25").checked = false;
    document.getElementById("lipperflag1_form26").checked = false;
    document.getElementById("lipperflag1_form27").checked = false;
    document.getElementById("lipperflag1_form28").checked = false;
    document.getElementById("lipperflag1_form29").checked = false;
    document.getElementById("lipperflag1_form30").checked = false;

    document.getElementById("lipperflag2_form01").checked = false;
    document.getElementById("lipperflag2_form02").checked = false;
    document.getElementById("lipperflag2_form03").checked = false;
    document.getElementById("lipperflag2_form04").checked = false;
    document.getElementById("lipperflag2_form05").checked = false;
    document.getElementById("lipperflag2_form06").checked = false;
    document.getElementById("lipperflag2_form07").checked = false;
    document.getElementById("lipperflag2_form08").checked = false;
    document.getElementById("lipperflag2_form09").checked = false;
    document.getElementById("lipperflag2_form10").checked = false;
    document.getElementById("lipperflag2_form11").checked = false;
    document.getElementById("lipperflag2_form12").checked = false;
    document.getElementById("lipperflag2_form13").checked = false;
    document.getElementById("lipperflag2_form14").checked = false;
    document.getElementById("lipperflag2_form15").checked = false;
    document.getElementById("lipperflag2_form16").checked = false;
    document.getElementById("lipperflag2_form17").checked = false;
    document.getElementById("lipperflag2_form18").checked = false;
    document.getElementById("lipperflag2_form19").checked = false;
    document.getElementById("lipperflag2_form20").checked = false;
    document.getElementById("lipperflag2_form21").checked = false;
    document.getElementById("lipperflag2_form22").checked = false;

    document.getElementById("fdcflag2_form28").checked = false;
    document.getElementById("fdcflag2_form29").checked = false;
    document.getElementById("fdcflag2_form30").checked = false;

    document.getElementById("fdcflag3_form1").checked = false;
    document.getElementById("fdcflag3_form2").checked = false;
    document.getElementById("fdcflag3_form3").checked = false;
    document.getElementById("fdcflag3_form4").checked = false;
    document.getElementById("fdcflag3_form5").checked = false;
    document.getElementById("fdcflag3_form6").checked = false;
    document.getElementById("fdcflag3_form7").checked = false;
    document.getElementById("fdcflag3_form8").checked = false;
    document.getElementById("fdcflag3_form9").checked = false;
    document.getElementById("fdcflag3_form10").checked = false;
    document.getElementById("fdcflag3_form11").checked = false;    

    document.getElementById("total_6_0").className = null;
    document.getElementById("total_6_1").className = null;
    document.getElementById("total_6_2").className = null;
    document.getElementById("total_6_3").className = null;

    document.getElementById("total_1_0").className = null;
    document.getElementById("total_1_1").className = null;
    document.getElementById("total_1_2").className = null;
    document.getElementById("total_1_3").className = null;

    document.getElementById("total_2_0").className = null;
    document.getElementById("total_2_1").className = null;
    document.getElementById("total_2_2").className = null;
    document.getElementById("total_2_3").className = null;

    document.getElementById("total_3_0").className = null;
    document.getElementById("total_3_1").className = null;
    document.getElementById("total_3_2").className = null;
    document.getElementById("total_3_3").className = null;

    document.getElementById("total_5_0").className = null;
    document.getElementById("total_5_1").className = null;
    document.getElementById("total_5_2").className = null;
    document.getElementById("total_5_3").className = null;

    document.getElementById("sharp_6_0").className = null;
    document.getElementById("sharp_6_1").className = null;
    document.getElementById("sharp_6_2").className = null;
    document.getElementById("sharp_6_3").className = null;

    document.getElementById("sharp_1_0").className = null;
    document.getElementById("sharp_1_1").className = null;
    document.getElementById("sharp_1_2").className = null;
    document.getElementById("sharp_1_3").className = null;

    document.getElementById("sharp_2_0").className = null;
    document.getElementById("sharp_2_1").className = null;
    document.getElementById("sharp_2_2").className = null;
    document.getElementById("sharp_2_3").className = null;

    document.getElementById("sharp_3_0").className = null;
    document.getElementById("sharp_3_1").className = null;
    document.getElementById("sharp_3_2").className = null;
    document.getElementById("sharp_3_3").className = null;

    document.getElementById("sharp_5_0").className = null;
    document.getElementById("sharp_5_1").className = null;
    document.getElementById("sharp_5_2").className = null;
    document.getElementById("sharp_5_3").className = null;
    
    document.getElementById('condition1').value = "";
    document.getElementById('condition2').value = "";
    document.getElementById('condition3').value = "";
    document.getElementById('condition4').value = "";
    document.getElementById('condition5').value = "";
    document.getElementById('condition6').value = "";
    document.getElementById('condition7').value = "";
    document.getElementById('condition8').value = "";
    document.getElementById('condition9').value = "";
    document.getElementById('condition10').value = "";
    document.getElementById('condition11').value = "";
    document.getElementById('condition12').value = "";
    document.getElementById('condition13').value = "";
    document.getElementById('condition14').value = "";
    document.getElementById('condition15').value = "";
    document.getElementById('condition16').value = "";
    document.getElementById('condition17').value = "";
    document.getElementById('condition18').value = "";
    document.getElementById('condition19').value = "";
    document.getElementById('condition20').value = "";
    document.getElementById('condition21').value = "";
    document.getElementById('condition22').value = "";
    document.getElementById('condition23').value = "";
    document.getElementById('condition24').value = "";
    document.getElementById('condition25').value = "";
    document.getElementById('condition26').value = "";
    document.getElementById('condition27').value = "";
    document.getElementById('condition28').value = "";
    document.getElementById('condition29').value = "";

    document.getElementById('condition31').value = "";
    document.getElementById('condition32').value = "";
    document.getElementById('condition33').value = "";
    document.getElementById('condition34').value = "";
    document.getElementById('condition35').value = "";
    document.getElementById('condition36').value = "";
    document.getElementById('condition37').value = "";
    document.getElementById('condition38').value = "";
    document.getElementById('condition39').value = "";
    document.getElementById('condition40').value = "";
    document.getElementById('condition41').value = "";
    document.getElementById('condition42').value = "";
    document.getElementById('condition43').value = "";
    document.getElementById('condition44').value = "";
    document.getElementById('condition45').value = "";
    document.getElementById('condition46').value = "";
    document.getElementById('condition47').value = "";
    document.getElementById('condition48').value = "";
    document.getElementById('condition49').value = "";
    document.getElementById('condition50').value = "";
    document.getElementById('condition51').value = "";
    document.getElementById('condition52').value = "";
    document.getElementById('condition53').value = "";
    document.getElementById('condition54').value = "";
    document.getElementById('condition55').value = "";
    document.getElementById('condition56').value = "";

    document.getElementById('t').value = "";


    h_check1_0 = false;
    h_check1_1 = false;
    h_check1_2 = false;
    h_check1_3 = false;
    h_check1_4 = false;
    h_check1_5 = false;
    h_check2_0 = false;
    h_check2_1 = false;
    h_check2_2 = false;
    h_check2_3 = false;
    h_check2_4 = false;
    h_check2_5 = false;
    h_check3_0 = false;
    h_check3_1 = false;
    h_check3_2 = false;
    h_check3_3 = false;
    h_check3_4 = false;
    h_check3_5 = false;
    h_check4_0 = false;
    h_check4_1 = false;
    h_check4_2 = false;
    h_check4_3 = false;
    h_check4_4 = false;
    h_check4_5 = false;

    document.getElementById('check1_1').src = '/web/shared/img/fund/migration/find/search/ll1_of.gif'   
    document.getElementById('check1_2').src = '/web/shared/img/fund/migration/find/search/ll2_of.gif'
    document.getElementById('check1_3').src = '/web/shared/img/fund/migration/find/search/ll3_of.gif'
    document.getElementById('check1_4').src = '/web/shared/img/fund/migration/find/search/ll4_of.gif'
    document.getElementById('check1_5').src = '/web/shared/img/fund/migration/find/search/ll5_of.gif'
    
    document.getElementById('check2_1').src = '/web/shared/img/fund/migration/find/search/ll1_of.gif'
    document.getElementById('check2_2').src = '/web/shared/img/fund/migration/find/search/ll2_of.gif'
    document.getElementById('check2_3').src = '/web/shared/img/fund/migration/find/search/ll3_of.gif'
    document.getElementById('check2_4').src = '/web/shared/img/fund/migration/find/search/ll4_of.gif'
    document.getElementById('check2_5').src = '/web/shared/img/fund/migration/find/search/ll5_of.gif'
    
    document.getElementById('check3_1').src = '/web/shared/img/fund/migration/find/search/ll1_of.gif'
    document.getElementById('check3_2').src = '/web/shared/img/fund/migration/find/search/ll2_of.gif'
    document.getElementById('check3_3').src = '/web/shared/img/fund/migration/find/search/ll3_of.gif'
    document.getElementById('check3_4').src = '/web/shared/img/fund/migration/find/search/ll4_of.gif'
    document.getElementById('check3_5').src = '/web/shared/img/fund/migration/find/search/ll5_of.gif'
    
    document.getElementById('check4_1').src = '/web/shared/img/fund/migration/find/search/ll1_of.gif'
    document.getElementById('check4_2').src = '/web/shared/img/fund/migration/find/search/ll2_of.gif'
    document.getElementById('check4_3').src = '/web/shared/img/fund/migration/find/search/ll3_of.gif'
    document.getElementById('check4_4').src = '/web/shared/img/fund/migration/find/search/ll4_of.gif'
    document.getElementById('check4_5').src = '/web/shared/img/fund/migration/find/search/ll5_of.gif'

    
    for (var i = 0; i < 20; i++) 
    {
        totreturn[i] = false;
        sharpratio[i] = false;
    } 
    runscreener('');


}
