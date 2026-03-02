function showrep(code) {
    day = new Date();
    id = day.getTime();
    eval("page" + id + " = window.open('/web/fund/detail/index.html?ID=" + code + "', '_top', 'toolbar=0,scrollbars=1,location=0,status=1,menubar=0,resizable=1,width=660,height=720,left=30,top=30');");
}

function showRanking(inval) {
    if (inval == "type1")
        window.location = "ranking.html?type=1";
    else if (inval == "type2")
        window.location = "ranking.html?type=2";
    else if (inval == "type3")
        window.location = "ranking.html?type=3";
    else if (inval == "type4")
        window.location = "ranking.html?type=4";
    else if (inval == "type5")
        window.location = "ranking.html?type=5";
    else if (inval == "type6")
        window.location = "ranking.html?type=6";
    else if (inval == "type7")
        window.location = "ranking.html?type=7";
    else if (inval == "type8")
        window.location = "ranking.html?type=8";
    else if (inval == "type9")
        window.location = "ranking.html?type=9";
    else if (inval == "type10")
        window.location = "ranking.html?type=10";
    else if (inval == "type11")
        window.location = "ranking.html?type=11";
    else if (inval == "type18")
        window.location = "ranking.html?type=18";
    else if (inval == "type19")
        window.location = "ranking.html?type=19";
    else if (inval == "type20")
        window.location = "ranking.html?type=20";
    else if (inval == "type21")
        window.location = "ranking.html?type=21";
    else if (inval == "type22")
        window.location = "ranking.html?type=22";
    else if (inval == "type23")
        window.location = "ranking.html?type=23";
    else if (inval == "type24")
        window.location = "ranking.html?type=24";
    else if (inval == "type25")
        window.location = "ranking.html?type=25";
    else if (inval == "type26")
        window.location = "ranking.html?type=26";
    else if (inval == "type27")
        window.location = "ranking.html?type=27";
    else if (inval == "type28")
        window.location = "ranking.html?type=28";
    else if (inval == "type29")
        window.location = "ranking.html?type=29";
    else if (inval == "type30")
        window.location = "ranking.html?type=30";
    
}

function showRanking2(inval,rangeType) {
    if (inval == "type1")
        window.location = "ranking.html?type=1&rank=" + rangeType;
    else if (inval == "type2")
        window.location = "ranking.html?type=2&rank=" + rangeType;
    else if (inval == "type3")
        window.location = "ranking.html?type=3&rank=" + rangeType;
    else if (inval == "type4")
        window.location = "ranking.html?type=4&rank=" + rangeType;
    else if (inval == "type12")
        window.location = "ranking.html?type=12&rank=" + rangeType;
    else if (inval == "type13")
        window.location = "ranking.html?type=13&rank=" + rangeType;
    else if (inval == "type14")
        window.location = "ranking.html?type=14&rank=" + rangeType;
    else if (inval == "type15")
        window.location = "ranking.html?type=15&rank=" + rangeType;
    else if (inval == "type16")
        window.location = "ranking.html?type=16&rank=" + rangeType;
    else if (inval == "type17")
        window.location = "ranking.html?type=17&rank=" + rangeType;
    else if (inval == "type5")
        window.location = "ranking.html?type=5";
    else if (inval == "type6")
        window.location = "ranking.html?type=6";
    else if (inval == "type7")
        window.location = "ranking.html?type=7";
    else if (inval == "type8")
        window.location = "ranking.html?type=8";
    else if (inval == "type9")
        window.location = "ranking.html?type=9";
    else if (inval == "type27")
        window.location = "ranking.html?type=27&rank=" + rangeType;
    else if (inval == "type28")
        window.location = "ranking.html?type=28&rank=" + rangeType;
    else if (inval == "type29")
        window.location = "ranking.html?type=29&rank=" + rangeType;
    else if (inval == "type30")
        window.location = "ranking.html?type=30&rank=" + rangeType;
}
function showRanking3(inval, rangeType, rType) {
    if (inval == "type1")
        window.location = "ranking.html?type=1&rank=" + rangeType + "&rtype=" + rType;
    else if (inval == "type2")
        window.location = "ranking.html?type=2&rank=" + rangeType + "&rtype=" + rType;
    else if (inval == "type3")
        window.location = "ranking.html?type=3&rank=" + rangeType + "&rtype=" + rType;
    else if (inval == "type4")
        window.location = "ranking.html?type=4&rank=" + rangeType + "&rtype=" + rType;
    else if (inval == "type12")
        window.location = "ranking.html?type=12&rank=" + rangeType + "&rtype=" + rType;
    else if (inval == "type13")
        window.location = "ranking.html?type=13&rank=" + rangeType + "&rtype=" + rType;
    else if (inval == "type14")
        window.location = "ranking.html?type=14&rank=" + rangeType + "&rtype=" + rType;
    else if (inval == "type15")
        window.location = "ranking.html?type=15&rank=" + rangeType + "&rtype=" + rType;
    else if (inval == "type16")
        window.location = "ranking.html?type=16&rank=" + rangeType + "&rtype=" + rType;
    else if (inval == "type17")
        window.location = "ranking.html?type=17&rank=" + rangeType + "&rtype=" + rType;
    else if (inval == "type5")
        window.location = "ranking.html?type=5" + "&rtype=" + rType;
    else if (inval == "type6")
        window.location = "ranking.html?type=6" + "&rtype=" + rType;
    else if (inval == "type7")
        window.location = "ranking.html?type=7" + "&rtype=" + rType;
    else if (inval == "type8")
        window.location = "ranking.html?type=8" + "&rtype=" + rType;
    else if (inval == "type11")
        window.location = "ranking.html?type=11" + "&rtype=" + rType;
    else if (inval == "type23")
        window.location = "ranking.html?type=23" + "&rtype=" + rType;    
    else if (inval == "type9")
        window.location = "ranking.html?type=9&rank=" + rangeType + "&rtype=" + rType;        
    else if (inval == "type27")
        window.location = "ranking.html?type=27&rank=" + rangeType + "&rtype=" + rType;
    else if (inval == "type28")
        window.location = "ranking.html?type=28&rank=" + rangeType + "&rtype=" + rType;
    else if (inval == "type29")
        window.location = "ranking.html?type=29&rank=" + rangeType + "&rtype=" + rType;
    else if (inval == "type30")
        window.location = "ranking.html?type=30&rank=" + rangeType + "&rtype=" + rType;
}

function ShowSearch() {
    window.location = "../search/result.html";
}

function showDaily(inval) {
    if (document.getElementById('daily').style.display == "block")
        return;

    //set as selected
    document.getElementById('week').className = "";
    document.getElementById('month').className = "";    

    //change the displayed table
    hideTable(document.getElementById('weekly'));
    hideTable(document.getElementById('weekly2')); 
       
    hideTable(document.getElementById('monthly'));
    hideTable(document.getElementById('monthly2'));
       

    document.getElementById('day').className = "selected";
    document.getElementById('daily').style.display = "block";
    document.getElementById('daily2').style.display = "block";    
    

    if (inval == 1 || inval == 5) {
        hideTable(document.getElementById('weekly5'));
        hideTable(document.getElementById('monthly5'));
        document.getElementById('daily5').style.display = "block";

        hideTable(document.getElementById('weekly6'));
        hideTable(document.getElementById('monthly6'));
        document.getElementById('daily6').style.display = "block";
    }


    if (inval == 3) {
        //do nothing
    } else {        
        hideTable(document.getElementById('weekly3'));
        hideTable(document.getElementById('monthly3'));
        document.getElementById('daily3').style.display = "block";
        hideTable(document.getElementById('weekly4'));
        hideTable(document.getElementById('monthly4'));
        document.getElementById('daily4').style.display = "block";
    }    
}

function showWeekly(inval) {
    if (document.getElementById('weekly').style.display == "block")
        return;

    //set as selected
    document.getElementById('day').className = "";
    document.getElementById('month').className = "";

    //change the displayed table
    hideTable(document.getElementById('daily'));
    hideTable(document.getElementById('daily2'));    
    hideTable(document.getElementById('monthly'));
    hideTable(document.getElementById('monthly2'));    
    

    document.getElementById('week').className = "selected";
    document.getElementById('weekly').style.display = "block";
    document.getElementById('weekly2').style.display = "block";    
    

    if (inval == 1 || inval == 5) {
        hideTable(document.getElementById('daily5'));
        hideTable(document.getElementById('monthly5'));
        document.getElementById('weekly5').style.display = "block";
        
        hideTable(document.getElementById('daily6'));
        hideTable(document.getElementById('monthly6'));
        document.getElementById('weekly6').style.display = "block";
        
    }


    if (inval == 3) {
        //do nothing
    } else if (inval == 2) {
        //show table3
        hideTable(document.getElementById('daily3'));
        hideTable(document.getElementById('monthly3'));
        document.getElementById('weekly3').style.display = "block";
        //hoide table4
        hideTable(document.getElementById('daily4'));
        hideTable(document.getElementById('weekly4'));
        hideTable(document.getElementById('monthly4'));
        //document.getElementById('weekly4').style.display = "block";
    } else {
        hideTable(document.getElementById('daily3'));
        hideTable(document.getElementById('monthly3'));
        document.getElementById('weekly3').style.display = "block";
        hideTable(document.getElementById('daily4'));
        hideTable(document.getElementById('monthly4'));
        document.getElementById('weekly4').style.display = "block";
    }


}

function showMonthly(inval) {
    if (document.getElementById('monthly').style.display == "block")
        return;

    //set as selected
    document.getElementById('day').className = "";
    document.getElementById('week').className = "";

    //change the displayed table
    hideTable(document.getElementById('daily'));
    hideTable(document.getElementById('daily2'));    
    hideTable(document.getElementById('weekly'));
    hideTable(document.getElementById('weekly2'));    
    
    document.getElementById('month').className = "selected";
    document.getElementById('monthly').style.display = "block";
    document.getElementById('monthly2').style.display = "block";    
    

    if (inval == 1 || inval == 5) {
        hideTable(document.getElementById('daily5'));
        hideTable(document.getElementById('weekly5'));
        hideTable(document.getElementById('daily6'));
        hideTable(document.getElementById('weekly6'));

        document.getElementById('monthly5').style.display = "block";
        document.getElementById('monthly6').style.display = "block";
    }



    if (inval == 3) {
        //do nothing
    } else if (inval == 2) {
        //show table3
        hideTable(document.getElementById('daily3'));
        hideTable(document.getElementById('weekly3'));
        document.getElementById('monthly3').style.display = "block";
        //hide table4
        hideTable(document.getElementById('daily4'));
        hideTable(document.getElementById('weekly4'));
        hideTable(document.getElementById('monthly4'));        
    } else {
        hideTable(document.getElementById('daily3'));
        hideTable(document.getElementById('weekly3'));
        document.getElementById('monthly3').style.display = "block";
        hideTable(document.getElementById('daily4'));
        hideTable(document.getElementById('weekly4'));
        document.getElementById('monthly4').style.display = "block";
    }
}

function hideTable(object1) {
    //object1.style.visibility = "hidden";
    //object1.style.position = "absolute";
    object1.style.display = "none";
}