// 要素を取得
const exitIntentModal = document.querySelector('.js-modal-exitintent'),
  closeExitIntent = document.querySelector('.js-modal-exitintent-close'),
  exitIntentContainer = document.querySelector('.modal-exitintent__container'); // モーダルコンテナの要素を取得

// モーダルを開く
function openExitIntentModal() {
  // console.log('モーダルを開く');
  exitIntentModal.classList.add('is-active');
}

// 「閉じるボタン」をクリックしてモーダルを閉じる
function closeExitIntentModal() {
  // console.log('モーダルを閉じる');
  exitIntentModal.classList.remove('is-active');
}
closeExitIntent.addEventListener('click', closeExitIntentModal);

// 「モーダルの外側」をクリックしてモーダルを閉じる
function outsideClickExitIntentModal(e) {
  if (e.target == exitIntentModal) {
    // console.log('モーダルの外側をクリックしてモーダルを閉じる');
    exitIntentModal.classList.remove('is-active');
  }
}
addEventListener('click', outsideClickExitIntentModal);

// モーダルが表示されているかどうかをチェックする関数
function isExitIntentModalVisible() {
  return exitIntentModal.classList.contains('is-active');
}

// N秒以上の滞在で表示
function showModalAfterStayTime(stayTime) {
  // queryModalCheckがtrueでない場合は何もしない
  if (queryModalCheck) {
    return;
  }

  // 既存のタイマーをクリア
  if (stayTimer) {
    clearTimeout(stayTimer);
  }
  stayTimer = setTimeout(function() {
    if (!isExitIntentModalVisible() && !hasShownModal) {
      // console.log('N秒以上の滞在でモーダルを表示');
      openExitIntentModal();
      hasShownModal = true;
    }
  }, stayTime);
}

// 別のタブに移って戻ってきたら表示
function showModalOnVisibilityChange() {
  // queryModalCheckがtrueでない場合は何もしない
  if (queryModalCheck) {
    return;
  }
  document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible' && !hasShownModal && !isExitIntentModalVisible()) {
      setTimeout(function() {
        if (!isExitIntentModalVisible() && !hasShownModal) {
          // console.log('別のタブに移って戻ってきたらモーダルを表示');
          openExitIntentModal();
          hasShownModal = true;
        }
      }, 0);
    }
  });
}

// .js-modal-attention.is-activeが存在するかチェック
let queryModalCheck = false;
if (document.querySelector('.js-modal-attention.is-active')) {
  queryModalCheck = true;
}
// console.log('queryModalCheck:', queryModalCheck);

// モーダルが表示されたかどうかを記録するフラグ
var hasShownModal = false;

// N秒以上の滞在で表示
var stayTime = 50000; // 50秒をミリ秒に変換
var stayTimer; // タイマーIDを保持する変数
showModalAfterStayTime(stayTime);

// 別のタブに移って戻ってきたら表示
showModalOnVisibilityChange();

// モーダルコンテナ全体にリンクを設定
if (exitIntentContainer) {
  exitIntentContainer.addEventListener('click', function(e) {
    // クリックイベントが閉じるボタンに発生した場合は無視
    if (e.target.closest('.js-modal-exitintent-close')) {
      return;
    }
    // console.log('モーダルコンテナがクリックされました');

    // デバイスがスマートフォンかどうかを判定
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // リンク先を取得
    let link;
    if (isMobile) {
      link = exitIntentModal.getAttribute('data-link-sp');
    } else {
      link = exitIntentModal.getAttribute('data-link');
    }

    if (link) {
      // リンク先に遷移する
      window.location.href = link;
    } else {
      console.error('リンク先が設定されていません');
    }
  });
}
