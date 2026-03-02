var cpTbl = [
  { "kwd":"K01","flg":0x4000 },
  { "kwd":"K02","flg":0x2000 },
  { "kwd":"K03","flg":0x1000 },
  { "kwd":"K04","flg":0x0800 },
  { "kwd":"K05","flg":0x0400 },
  { "kwd":"K06","flg":0x0200 },
  { "kwd":"K07","flg":0x0100 },
  { "kwd":"K08","flg":0x0080 },
  { "kwd":"K09","flg":0x0040 },
  { "kwd":"K10","flg":0x0020 },
  { "kwd":"K11","flg":0x0010 },
  { "kwd":"K12","flg":0x0008 },
  { "kwd":"K13","flg":0x0004 },
  { "kwd":"K14","flg":0x0002 },
  { "kwd":"K15","flg":0x0001 }
 ];
var cpFlag = 0x0000;

function getCPKWD(flg) {
  var cpKWD = "";

  for(var i=0; i<cpTbl.length; i++) {
    if(flg & cpTbl[i].flg) {
      cpKWD = cpKWD + " " + cpTbl[i].kwd;
    }
  }
  return(cpKWD);
}



async function createInfoCp(){
  var str = '';
  var tempHead = '';
  var tempFoot = '';
  await fetch('/web/campaign/campaign.json')// (1) リクエスト送信
  .then(response => response.json()) // (2) レスポンスデータを取得
	.then(data => { // (3)レスポンスデータを処理
    for(let i=0; i < data.length; i++){
      var n = data[i];
      var checkkwd = getCPKWD(n.cpFlag);
      if(checkkwd.indexOf('K06') !== -1 || checkkwd.indexOf('K11') !== -1){
        str = str + '<div class="s1-box s1-link-box-03 mb-normal"><a href="'+n.linkpath+'"></a><div class="clearfix"><div class="s1-box-media s1-box-media--left"><p><img src="https://www.rakuten-sec.co.jp'+n.imagepath+'" alt="" class="s1-box-media__img" /></p></div><div class="s1-box-section"><p class="fc-b-01 fw-b fs-l">'+n.cpTitle+'</p><p>'+n.description+'</p></div></div></div>'
      }
    }
    str = tempHead + str + tempFoot;
    //console.log(str)
    $("#data-json-cp").replaceWith(str);
  });
}

createInfoCp();