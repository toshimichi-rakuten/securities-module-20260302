//Read me
/******************************************************************************************************************************
The s_code.js file is a tag required to load the AdobeAnalytics tool. s_code.js file is loaded on many pages.
The AdobeAnalytics tool that was implemented in the past has now been discontinued.
All JavaScript code in the s_code.js content has been removed. However, functions that may be called on the web page side have been left in.
The functions that may be called on the web page side are "s.t", "s.tl", and "s.lidTrack".
These functions have also been modified to return an empty value when they are called.
In addition to these functions, AdobeAnalytics tags may contain things like "s.propXX = ...", "s.eVarXX = ...", "s.events=...", etc.
AdobeAnalytics Tags are characterized by having an s object.
When removing s_code.js file, first remove any AdobeAnalytics tags that may be left on the web page side.
There are several implementation patterns for AdobeAnalytics tags, including include files, tag manager tools (e.g. GTM), or hard coding on the web page side.
Second, delete the s.code.js file.If you delete the s_code.js file while the Adobe Analytics tag remains on the web page side, a JavaScript error is likely to occur.
When a JavaScript error occurs, it can adversely affect the action on the web page side. Please be careful.
*****************************************************************************************************************************/

// To stop sending web beacon of Adobe Analytics, add the following determination variables
var runAdobeJudge = "no";

try{

    if(runAdobeJudge == "no"){throw new Error('stop Adobe s_code');}

} catch (e) {
 var s = {};
 s.t = function(){return;};
 s.tl = function(){return;};
 s.lidTrack = function(){return;};

}