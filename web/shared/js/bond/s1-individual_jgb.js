function createMain(){
  var tempHead = '<table class="s1-tbl-data01 s1-tbl--width-full"><tbody>';
	var tempFoot = '<tr><th scope="row">募集価格</th><td>額面金額100円につき100円</td></tr><tr><th scope="row">償還金額</th><td>額面金額100円につき100円</td></tr><tr><th scope="row">買付単位</th><td>10,000円以上、10,000円単位</td></tr></tbody></table>';
  fetch("/web/bond/jbond/json/jgb.json", {
    method: "get",
    cache: "no-store",
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    //var cnt = 0;
    var bnrtxt = "";
    var i = 0;
    var n = data[i];
    var plan = '<td class="fc-r-01 fw-b ta-l" colspan="2">※'+n.plan+'条件決定予定</td>'
    bnrtxt = '当社販売期間：'+n.term;
    // bnrtxt = bnrtxt.replace(/（.）/g,'')
    // bnrtxt = bnrtxt.replace(/年/g,'年<br>')
    // bnrtxt = bnrtxt.replace(/～/g,'～<br>')
    var rate = (n.plan=='')?('<tr><th scope="row">利率（年率）</th><td> 固定3年　/　<span class="fc-r fw-b">'+n.rate3+'％</span>（税引前） '+n.zrate3+'％（税引後）<br>固定5年　/　<span class="fc-r fw-b">'+n.rate5+'％</span>（税引前） '+n.zrate5+'％（税引後）<br>変動10年　/　<span class="fc-r fw-b">'+n.rate10+'％</span>（税引前） '+n.zrate10+'％（税引後）<br>※半年毎に見直し</td></tr>'):('<tr><th scope="row">利率（年率）</th><td>固定3年　/　基準金利-0.03％<br />固定5年　/　基準金利-0.05％<br />変動10年　/　基準金利×0.66　※'+n.plan+'条件決定予定</em><br />※半年毎に見直し</td></tr>')
    var src = '<tr><th scope="row" class="w-25">正式名称</th><td>個人向け国債　固定3年（第'+n.name3+'回）、固定5年（第'+n.name5+'回）、変動10年（第'+n.name10+'回）</td></tr>' +
    '<tr><th scope="row">当社募集期間</th><td>'+n.term+'</td></tr>' +
    '<tr><th scope="row">発行日</th><td>'+n.date+'</td></tr>' +
    rate +
    '<tr><th scope="row">利払日</th><td>'+n.pay+'（年2回）</td></tr>' +
    '<tr><th scope="row">償還日</th><td>固定3年　/　'+n.rede3+'<br>固定5年　/　'+n.rede5+'<br>変動10年　/　'+n.rede10+'</td></tr>'
    src = tempHead + src + tempFoot;
    $("#data-json-bnrtxt").replaceWith(bnrtxt);
    $("#data-json-jbond-table").replaceWith(src);
    
  });
}



createMain();