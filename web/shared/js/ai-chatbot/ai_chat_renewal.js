/**
 * 19-02290_有人チャット導入 デザイン変更
 * @see MOCK-331
 */
document.addEventListener('DOMContentLoaded',function() {
  'use strict';

  const ai_chat                 = document.getElementById('ai-chat');
  const ai_chat_balloon         = document.querySelectorAll('.ai-chat-balloon')[0];
  const ai_chat_btn_close       = document.querySelectorAll('.js-ai-chat-btn-close')[0];
  const ai_chat_btn_minimize    = document.querySelectorAll('.js-ai-chat-btn-minimize')[0];
  const ai_chat_support_message = document.querySelectorAll('.ai-chat-support__message')[0];
  const ai_chat_support_open    = document.querySelectorAll('.ai-chat-support__open')[0];
  const ai_chat_trigger         = document.querySelectorAll('.js-ai-chat-trigger')[0];

  /**
   * 画面最下部の『最近チェックした銘柄』の開閉にあわせて、
   * チャットボットの表示位置がかわるようにする。
   */
  // Select the node that will be observed for mutations
  const footer_fav = document.getElementsByClassName('footer-fav')[0];

  if(typeof footer_fav !== 'undefined') {
    // Callback function to execute when mutations are observed
    const callback = function(mutationsList, observer) {
        // Use traditional 'for loops' for IE 11
        for(var i = 0; i < mutationsList.length; i++) {
          if (mutationsList[i].type === 'attributes') {
            ai_chat.style.bottom = parseInt(footer_fav.style.bottom, 10) + 205 + "px";
            break;
          }
        }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(footer_fav, { attributes: true });
  }


  if(isMobile()) {
    /**
     * SP対応
     */
    if (isMinimized()) {
      ai_chat.setAttribute('style', 'display:none;');
    } else {

      /**
       * ページ読み込み → 2秒経過後に出現
       */
      setTimeout(function(){ ai_chat.setAttribute('style','bottom: 30px;'); }, 2000);

      // 最小化した情報をセッションで記憶
      ai_chat_btn_minimize.addEventListener('click', function(event) {
        event.stopPropagation();
        this.style.display                 = 'none';
        ai_chat_trigger.style.visibility   = 'hidden';
        ai_chat_support_open.style.display = 'block';

        setTimeout(function() {
          ai_chat_support_open.style.display = 'none';
          ai_chat.style.display = 'none';
        }, '10000');
        sessionStorage.setItem('chatbotMinimized', '1');
      });

      ai_chat_trigger.addEventListener('click', function(event) {
        event.preventDefault();
        openWin();
      }, false);

      // 「×」閉じるボタンを押すとメッセージを消せるようにする。
      ai_chat_btn_close.addEventListener('click', function(event) {
        event.stopPropagation();
        this.style.display = 'none';
        ai_chat_support_message.style.display = 'none';
      });

      // スクロール処理
      let set_position = 0;
      let isScrolling = 0;
      let timeout_id;
      window.addEventListener('scroll', function () {
        isScrolling = 1;
        this.clearTimeout(timeout_id);

        if (set_position < document.documentElement.scrollTop) {
          ai_chat.setAttribute('style','bottom: -200px;');
        } else {
          ai_chat.setAttribute('style','bottom: 30px;');
        }

        set_position = document.documentElement.scrollTop;

        timeout_id = setTimeout( function() {
          isScrolling = 0;
          ai_chat.setAttribute('style','bottom: 30px;');
        }, 5000);
      });
    }

  } else {
    /**
     * PC対応
     */

    /**
     * ページ読み込み → 2秒経過後に出現
     */
    setTimeout(function(){ ai_chat.setAttribute('style','bottom: 30px;'); }, 2000);

    if (isMinimized()) {
      ai_chat.classList.add('is-minimize');
    }

    if(isClicked()) {
      ai_chat_balloon.setAttribute('style', 'display: none;');
      ai_chat_btn_minimize.setAttribute('style', 'top:-2px; right:-10px;');

    } else {
      ai_chat_balloon.addEventListener('animationend', function(){
        this.style.display = 'none';
        ai_chat_btn_minimize.setAttribute('style', 'top:-2px; right:-10px;');
      });
    }

    // 最小化した情報をセッションで記憶
    ai_chat_btn_minimize.addEventListener('click', function(event) {
      event.stopPropagation();
	  ai_chat_btn_minimize.setAttribute('style', 'top:-2px; right:-10px;');
      ai_chat.classList.add('is-minimize');
      sessionStorage.setItem('chatbotMinimized', '1');
    });

    ai_chat_trigger.addEventListener('click', function(event) {
      event.preventDefault();
	  ai_chat_btn_minimize.setAttribute('style', 'top:-2px; right:-10px;');
      openWin();
      // 最小化されたボタンをクリックするとサポートページに遷移し、デフォルトのボタンに戻る
      ai_chat.classList.remove('is-minimize');
      ai_chat_balloon.style.display = 'none';
      sessionStorage.setItem('chatbotMinimized', '0');
      sessionStorage.setItem('chatbotClicked', '1');
    });
  }
});


/**
 * 初期表示の時セッションの中に最小化した情報があるか判定
 */
function isMinimized() {
  const isMinimized = sessionStorage.getItem('chatbotMinimized');
  if (isMinimized == 1) return true;
  return false;
}

function isClicked() {
  const isClicked = sessionStorage.getItem('chatbotClicked');
  if (isClicked == 1) return true;
  return false;
}

function isMobile() {
  if (window.matchMedia('(max-width: 899px)').matches) return true;
  return false;
}

function openWin() {
  let url;
  try {
    url = usergram.link('/web/help/chat/visitor');
  } catch(e) {
    url = '/web/help/chat/visitor';
  }
  window.open(
    url,
    '_blank',
    'menubar=0,width=400,height=600,top=0,left=0,resizable=yes,scrollbars=1'
  );
}