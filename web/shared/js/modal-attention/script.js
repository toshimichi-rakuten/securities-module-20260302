//要素を取得
const modal = document.querySelector('.js-modal-attention'),
  open = document.querySelector('.js-modal-attention-open'),
  close = document.querySelector('.js-modal-attention-close');

//モーダルを開く
function modalOpen() {
  modal.classList.add('is-active');
}
// open.addEventListener('click', modalOpen);

//「閉じるボタン」をクリックしてモーダルを閉じる
function modalClose() {
  modal.classList.remove('is-active');
}
close.addEventListener('click', modalClose);

//「モーダルの外側」をクリックしてモーダルを閉じる
function modalOut(e) {
  if (e.target == modal) {
    modal.classList.remove('is-active');
  }
}
addEventListener('click', modalOut);

function checkQueryZ(){
  var queryString = location.search;
  var queryParamsArray = queryString.substring(1).split('&');

  if (queryString) {
    //強制非モーダル処理key配列
    var invalidParams = ['gclid='];
    //モーダル対象key配列
    var validParams = ['aid=','scid=wi_pnt','AC','TG','KC','VC','JN','TCS','RT'];

    //非モーダル処理判定
    var modalFlag = ''
    for (var k = 0; k < invalidParams.length; k++) {
      if (queryString.match(invalidParams[k])){
        // console.log(invalidParams[k])
        modalFlag = 'off' 
      }
    }

    //モーダルフラグがoff出ないときだけクエリー判定処理
    if (modalFlag === ''){
      for (var i = 0; i < queryParamsArray.length; i++) {
        for (var j = 0; j < validParams.length; j++) {
          if (queryParamsArray[i].match(validParams[j])){
            console.log(queryParamsArray[i] + ',' + validParams[j])
            return true;
          }
        }
      }
    }
  }

  // console.log('該当なし')
  return false;

}


function modalAttention() {
  if(checkQueryZ()) {
    console.log('OK')
    modalOpen()
  }else{
    console.log('no')
  }
}

modalAttention();

