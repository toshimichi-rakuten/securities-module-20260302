function showrep(code) {
    day = new Date();
    id = day.getTime();
    eval("page" + id + " = window.open('/web/fund/detail/index.html?ID=" + code + "', '_top', 'toolbar=0,scrollbars=1,location=0,status=1,menubar=0,resizable=1,width=660,height=720,left=30,top=30');");
}


function Ranking(inval) {
    if (inval == "type1")
        window.location = "/web/fund/find/ranking/ranking.html?type=1";
    else if (inval == "type2")
        window.location = "/web/fund/find/ranking/ranking.html?type=2";
    else if (inval == "type3")
        window.location = "/web/fund/find/ranking/ranking.html?type=3";
    else if (inval == "type4")
        window.location = "/web/fund/find/ranking/ranking.html?type=4";
    else if (inval == "type10")
        window.location = "/web/fund/find/ranking/ranking.html?type=10";
}

function Ranking2(inval,dateType) {

    if (dateType == "day" ) freqid = "1"
    if (dateType == "week" ) freqid = "2"
    if (dateType == "month" ) freqid = "3"

    if (inval == "type1")
        window.location = "/web/fund/find/ranking/ranking.html?type=500001&freqid=" + freqid;
    else if (inval == "type2")
        window.location = "/web/fund/find/ranking/ranking.html?type=500002&freqid=" + freqid;
    else if (inval == "type3")
        window.location = "/web/fund/find/ranking/ranking.html?type=500003&freqid=" + freqid;
    else if (inval == "type4")
        window.location = "/web/fund/find/ranking/ranking.html?type=500004&freqid=" + freqid;
}


function showDaily() {
    if (document.getElementById('daily').style.display == "block")
        return;

    //set as selected
    document.getElementById('w1').className = "";
    document.getElementById('m1').className = "";

    //change the displayed table
    hideTable(document.getElementById('weekly'));
    hideTable(document.getElementById('monthly'));

    document.getElementById('d1').className = "selected";
    var showForm = document.getElementById('daily');
    showForm.style.display = "block";
}
function showDaily2() {
    if (document.getElementById('daily2').style.display == "block")
        return;

    //set as selected
    document.getElementById('w2').className = "";
    document.getElementById('m2').className = "";

    //change the displayed table
    hideTable(document.getElementById('weekly2'));
    hideTable(document.getElementById('monthly2'));

    document.getElementById('d2').className = "selected";
    var showForm = document.getElementById('daily2');
    showForm.style.display = "block";
}
function showDaily3() {
    if (document.getElementById('daily3').style.display == "block")
        return;

    //set as selected
    document.getElementById('w3').className = "";
    document.getElementById('m3').className = "";

    //change the displayed table
    hideTable(document.getElementById('weekly3'));
    hideTable(document.getElementById('monthly3'));

    document.getElementById('d3').className = "selected";
    var showForm = document.getElementById('daily3');
    showForm.style.display = "block";
}
function showDaily4() {
    if (document.getElementById('daily4').style.display == "block")
        return;

    //set as selected
    document.getElementById('w4').className = "";
    document.getElementById('m4').className = "";

    //change the displayed table
    hideTable(document.getElementById('weekly4'));
    hideTable(document.getElementById('monthly4'));

    document.getElementById('d4').className = "selected";
    var showForm = document.getElementById('daily4');
    showForm.style.display = "block";
}

function showWeekly() {
    if (document.getElementById('weekly').style.display == "block")
        return;

    //set as selected
    document.getElementById('d1').className = "";
    document.getElementById('m1').className = "";    
    
    //change the displayed table
    hideTable(document.getElementById('daily'));
    hideTable(document.getElementById('monthly'));

    document.getElementById('w1').className = "selected";    
    var showForm = document.getElementById('weekly');        
    showForm.style.display = "block";
}
function showWeekly2() {
    if (document.getElementById('weekly2').style.display == "block")
        return;

    //set as selected
    document.getElementById('d2').className = "";
    document.getElementById('m2').className = "";

    //change the displayed table
    hideTable(document.getElementById('daily2'));
    hideTable(document.getElementById('monthly2'));

    document.getElementById('w2').className = "selected";
    var showForm = document.getElementById('weekly2');
    showForm.style.display = "block";
}
function showWeekly3() {
    if (document.getElementById('weekly3').style.display == "block")
        return;

    //set as selected
    document.getElementById('d3').className = "";
    document.getElementById('m3').className = "";

    //change the displayed table
    hideTable(document.getElementById('daily3'));
    hideTable(document.getElementById('monthly3'));

    document.getElementById('w3').className = "selected";
    var showForm = document.getElementById('weekly3');
    showForm.style.display = "block";
}
function showWeekly4() {
    if (document.getElementById('weekly4').style.display == "block")
        return;

    //set as selected
    document.getElementById('d4').className = "";
    document.getElementById('m4').className = "";

    //change the displayed table
    hideTable(document.getElementById('daily4'));
    hideTable(document.getElementById('monthly4'));

    document.getElementById('w4').className = "selected";
    var showForm = document.getElementById('weekly4');
    showForm.style.display = "block";
}

function showMonthly() {
    if (document.getElementById('monthly').style.display == "block")
        return;

    //set as selected
    document.getElementById('d1').className = "";
    document.getElementById('w1').className = "";

    //change the displayed table
    hideTable(document.getElementById('daily'));
    hideTable(document.getElementById('weekly'));

    document.getElementById('m1').className = "selected";
    var showForm = document.getElementById('monthly');
    showForm.style.display = "block";
}
function showMonthly2() {
    if (document.getElementById('monthly2').style.display == "block")
        return;

    //set as selected
    document.getElementById('d2').className = "";
    document.getElementById('w2').className = "";

    //change the displayed table
    hideTable(document.getElementById('daily2'));
    hideTable(document.getElementById('weekly2'));

    document.getElementById('m2').className = "selected";
    var showForm = document.getElementById('monthly2');
    showForm.style.display = "block";
}
function showMonthly3() {
    if (document.getElementById('monthly3').style.display == "block")
        return;

    //set as selected
    document.getElementById('d3').className = "";
    document.getElementById('w3').className = "";

    //change the displayed table
    hideTable(document.getElementById('daily3'));
    hideTable(document.getElementById('weekly3'));

    document.getElementById('m3').className = "selected";
    var showForm = document.getElementById('monthly3');
    showForm.style.display = "block";
}
function showMonthly4() {
    if (document.getElementById('monthly4').style.display == "block")
        return;

    //set as selected
    document.getElementById('d4').className = "";
    document.getElementById('w4').className = "";

    //change the displayed table
    hideTable(document.getElementById('daily4'));
    hideTable(document.getElementById('weekly4'));

    document.getElementById('m4').className = "selected";
    var showForm = document.getElementById('monthly4');
    showForm.style.display = "block";
}


function NavigateTab1() {
    //check if already selected
    if (document.getElementById('ranking1').style.display == "block")
        return;

    //change the icon...
    document.getElementById('tab1-img').src = "/web/shared/images/nav-contents/nav-tab-01-ranking-all-h.gif";
    document.getElementById('tab2-img').src = "/web/shared/images/nav-contents/nav-tab-01-ranking-noload-o.gif";
    document.getElementById('tab3-img').src = "/web/shared/images/nav-contents/nav-tab-01-ranking-distribution-o.gif";

    //change the displayed table
    hideTable(document.getElementById('ranking2'));
    hideTable(document.getElementById('ranking3'));

    var showForm = document.getElementById('ranking1');
    //showForm.style.visibility = "visible";
    //showForm.style.position = "inherit";
    showForm.style.display = "block";   
}


function NavigateTab2() {
    //check if already selected
    if (document.getElementById('ranking2').style.display == "block")
        return;

    //change the icon...    
    document.getElementById('tab1-img').src = "/web/shared/images/nav-contents/nav-tab-01-ranking-all-o.gif";
    document.getElementById('tab2-img').src = "/web/shared/images/nav-contents/nav-tab-01-ranking-noload-h.gif";
    document.getElementById('tab3-img').src = "/web/shared/images/nav-contents/nav-tab-01-ranking-distribution-o.gif";
    
    //change the displayed table
    hideTable(document.getElementById('ranking1'));
    hideTable(document.getElementById('ranking3'));

    var showForm = document.getElementById('ranking2');
    //showForm.style.visibility = "visible";
    //showForm.style.position = "inherit";
    showForm.style.display = "block";
}


function NavigateTab3() {
    //check if already selected
    if (document.getElementById('ranking3').style.display == "block")
        return;

    //change the icon...
    document.getElementById('tab1-img').src = "/web/shared/images/nav-contents/nav-tab-01-ranking-all-o.gif";
    document.getElementById('tab2-img').src = "/web/shared/images/nav-contents/nav-tab-01-ranking-noload-o.gif";
    document.getElementById('tab3-img').src = "/web/shared/images/nav-contents/nav-tab-01-ranking-distribution-h.gif";

    //change the displayed table
    hideTable(document.getElementById('ranking1'));
    hideTable(document.getElementById('ranking2'));

    var showForm = document.getElementById('ranking3');
    //showForm.style.visibility = "visible";
    //showForm.style.position = "inherit";
    showForm.style.display = "block";
}


function hideTable(object1) {
    //object1.style.visibility = "hidden";
    //object1.style.position = "absolute";
    object1.style.display = "none";
}