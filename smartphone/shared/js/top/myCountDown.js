// JavaScript Document カウントダウンします。

function myCountDown(myYear,myMonth,myDay){
   myNow   = new Date();
   myRunDate = new Date( myYear , myMonth-1 , myDay );
   myMsec = myNow.getTime()-myRunDate.getTime();
   myDayCount = Math.floor(myMsec / (1000*60*60*24));
   return myDayCount; // 指定日も１日と数える場合は１を足します(myDayCount+1)
}

myDay = myCountDown(2012,7,30);