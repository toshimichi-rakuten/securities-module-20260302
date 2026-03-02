// microModal
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).MicroModal=t()}(this,(function(){"use strict";function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function t(e){return function(e){if(Array.isArray(e))return o(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return o(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var o=0,n=new Array(t);o<t;o++)n[o]=e[o];return n}var n,i,a,r,s,l=(n=["a[href]","area[href]",'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',"select:not([disabled]):not([aria-hidden])","textarea:not([disabled]):not([aria-hidden])","button:not([disabled]):not([aria-hidden])","iframe","object","embed","[contenteditable]",'[tabindex]:not([tabindex^="-"])'],i=function(){function o(e){var n=e.targetModal,i=e.triggers,a=void 0===i?[]:i,r=e.onShow,s=void 0===r?function(){}:r,l=e.onClose,c=void 0===l?function(){}:l,d=e.openTrigger,u=void 0===d?"data-micromodal-trigger":d,f=e.closeTrigger,h=void 0===f?"data-micromodal-close":f,v=e.openClass,g=void 0===v?"is-open":v,m=e.disableScroll,b=void 0!==m&&m,y=e.disableFocus,p=void 0!==y&&y,w=e.awaitCloseAnimation,E=void 0!==w&&w,k=e.awaitOpenAnimation,M=void 0!==k&&k,A=e.debugMode,C=void 0!==A&&A;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,o),this.modal=document.getElementById(n),this.config={debugMode:C,disableScroll:b,openTrigger:u,closeTrigger:h,openClass:g,onShow:s,onClose:c,awaitCloseAnimation:E,awaitOpenAnimation:M,disableFocus:p},a.length>0&&this.registerTriggers.apply(this,t(a)),this.onClick=this.onClick.bind(this),this.onKeydown=this.onKeydown.bind(this)}var i,a,r;return i=o,(a=[{key:"registerTriggers",value:function(){for(var e=this,t=arguments.length,o=new Array(t),n=0;n<t;n++)o[n]=arguments[n];o.filter(Boolean).forEach((function(t){t.addEventListener("click",(function(t){return e.showModal(t)}))}))}},{key:"showModal",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;if(this.activeElement=document.activeElement,this.modal.setAttribute("aria-hidden","false"),this.modal.classList.add(this.config.openClass),this.scrollBehaviour("disable"),this.addEventListeners(),this.config.awaitOpenAnimation){var o=function t(){e.modal.removeEventListener("animationend",t,!1),e.setFocusToFirstNode()};this.modal.addEventListener("animationend",o,!1)}else this.setFocusToFirstNode();this.config.onShow(this.modal,this.activeElement,t)}},{key:"closeModal",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=this.modal;if(this.modal.setAttribute("aria-hidden","true"),this.removeEventListeners(),this.scrollBehaviour("enable"),this.activeElement&&this.activeElement.focus&&this.activeElement.focus(),this.config.onClose(this.modal,this.activeElement,e),this.config.awaitCloseAnimation){var o=this.config.openClass;this.modal.addEventListener("animationend",(function e(){t.classList.remove(o),t.removeEventListener("animationend",e,!1)}),!1)}else t.classList.remove(this.config.openClass)}},{key:"closeModalById",value:function(e){this.modal=document.getElementById(e),this.modal&&this.closeModal()}},{key:"scrollBehaviour",value:function(e){if(this.config.disableScroll){var t=document.querySelector("body");switch(e){case"enable":Object.assign(t.style,{overflow:""});break;case"disable":Object.assign(t.style,{overflow:"hidden"})}}}},{key:"addEventListeners",value:function(){this.modal.addEventListener("touchstart",this.onClick),this.modal.addEventListener("click",this.onClick),document.addEventListener("keydown",this.onKeydown)}},{key:"removeEventListeners",value:function(){this.modal.removeEventListener("touchstart",this.onClick),this.modal.removeEventListener("click",this.onClick),document.removeEventListener("keydown",this.onKeydown)}},{key:"onClick",value:function(e){(e.target.hasAttribute(this.config.closeTrigger)||e.target.parentNode.hasAttribute(this.config.closeTrigger))&&(e.preventDefault(),e.stopPropagation(),this.closeModal(e))}},{key:"onKeydown",value:function(e){27===e.keyCode&&this.closeModal(e),9===e.keyCode&&this.retainFocus(e)}},{key:"getFocusableNodes",value:function(){var e=this.modal.querySelectorAll(n);return Array.apply(void 0,t(e))}},{key:"setFocusToFirstNode",value:function(){var e=this;if(!this.config.disableFocus){var t=this.getFocusableNodes();if(0!==t.length){var o=t.filter((function(t){return!t.hasAttribute(e.config.closeTrigger)}));o.length>0&&o[0].focus(),0===o.length&&t[0].focus()}}}},{key:"retainFocus",value:function(e){var t=this.getFocusableNodes();if(0!==t.length)if(t=t.filter((function(e){return null!==e.offsetParent})),this.modal.contains(document.activeElement)){var o=t.indexOf(document.activeElement);e.shiftKey&&0===o&&(t[t.length-1].focus(),e.preventDefault()),!e.shiftKey&&t.length>0&&o===t.length-1&&(t[0].focus(),e.preventDefault())}else t[0].focus()}}])&&e(i.prototype,a),r&&e(i,r),o}(),a=null,r=function(e){if(!document.getElementById(e))return console.warn("MicroModal: ❗Seems like you have missed %c'".concat(e,"'"),"background-color: #f8f9fa;color: #50596c;font-weight: bold;","ID somewhere in your code. Refer example below to resolve it."),console.warn("%cExample:","background-color: #f8f9fa;color: #50596c;font-weight: bold;",'<div class="modal" id="'.concat(e,'"></div>')),!1},s=function(e,t){if(function(e){e.length<=0&&(console.warn("MicroModal: ❗Please specify at least one %c'micromodal-trigger'","background-color: #f8f9fa;color: #50596c;font-weight: bold;","data attribute."),console.warn("%cExample:","background-color: #f8f9fa;color: #50596c;font-weight: bold;",'<a href="#" data-micromodal-trigger="my-modal"></a>'))}(e),!t)return!0;for(var o in t)r(o);return!0},{init:function(e){var o=Object.assign({},{openTrigger:"data-micromodal-trigger"},e),n=t(document.querySelectorAll("[".concat(o.openTrigger,"]"))),r=function(e,t){var o=[];return e.forEach((function(e){var n=e.attributes[t].value;void 0===o[n]&&(o[n]=[]),o[n].push(e)})),o}(n,o.openTrigger);if(!0!==o.debugMode||!1!==s(n,r))for(var l in r){var c=r[l];o.targetModal=l,o.triggers=t(c),a=new i(o)}},show:function(e,t){var o=t||{};o.targetModal=e,!0===o.debugMode&&!1===r(e)||(a&&a.removeEventListeners(),(a=new i(o)).showModal())},close:function(e){e?a.closeModalById(e):a.closeModal()}});return"undefined"!=typeof window&&(window.MicroModal=l),l}));

const trigger = document.getElementsByClassName('js-rsearch')[0];
let itemsHeight;

const openAddClass = () => {
  const modal = document.querySelector('.v1-rsearch-modal');
  const form = document.querySelector('.v1-rsearch-modal__form');
  const banners = document.querySelector('.v1-rsearch-modal__banners');

  trigger.classList.add('is-open');
  trigger.setAttribute('aria-label', '検索パネルを閉じる');

  setTimeout(() => {
    if (modal && form && banners) {
      itemsHeight = modal.offsetHeight - form.offsetHeight - banners.offsetHeight - 56;
    }
  }, 200);
  rsearchPosition();
};

const closeRemoveClass = () => {
  trigger.classList.remove('is-open');
  trigger.setAttribute('aria-label', '検索パネルを開く');

  const inputField = document.querySelector('.v1-rsearch-modal__input');
  if (inputField) inputField.value = '';
  backContent();
}

if (document.getElementsByClassName("v1-rsearch-modal") !== null) {
  MicroModal.init({
    onShow: openAddClass,
    onClose: closeRemoveClass,
    openTrigger: "data-v1-rsearch-mdl-open",
    closeTrigger: "data-v1-rsearch-mdl-close",
    disableScroll: true,
    disableFocus: true,
    awaitOpenAnimation: true,
    awaitCloseAnimation: true,
  });

  document.querySelector('.js-rsearch__close').addEventListener('click', () => {
    MicroModal.close('modalRSearch');
});
}

// modalRSearch 位置調整

const rsearchPosition = () => {
  let windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  // ヘッダーとグローバルナビゲーションの高さを取得
  let headerElement = document.querySelector(".p-rf-h");
  let gnavElement = document.querySelector(".p-rf-h__gnav");

  let headerHeight = headerElement ? headerElement.offsetHeight : 0;
  const gnavHeight = gnavElement ? gnavElement.offsetHeight : 0;
  const topHeight = headerHeight - gnavHeight;

  // モーダルオーバーレイのスタイルを変更
  const overlay = document.querySelector("#modalRSearch .v1-rsearch-mdl__overlay");
  if (overlay) {
    overlay.style.height = `${windowHeight - topHeight}px`;
    overlay.style.top = `${topHeight}px`;
  }
}

window.addEventListener("scroll", () => {
  let headerElement = document.querySelector(".p-rf-h");
  let gnavElement = document.querySelector(".p-rf-h__gnav");
  let scroll = window.pageYOffset || document.documentElement.scrollTop; // スクロール位置を取得
  let headerHeight = headerElement ? headerElement.offsetHeight : 0; // ヘッダーの高さを取得
  const gnavHeight = gnavElement ? gnavElement.offsetHeight : 0;
  const topHeight = headerHeight - gnavHeight; // `gnavHeight` は定義済みとして扱う

  if (scroll <= topHeight) {
    const overlay = document.querySelector("#modalRSearch .v1-rsearch-mdl__overlay");
    if (overlay) {
      // オーバーレイの高さと位置を調整
      overlay.style.height = `${window.innerHeight - (topHeight - scroll)}px`;
      overlay.style.top = `${topHeight - scroll}px`;
    }
  }
});

// 2文字でインクリメンタルサーチ発火

const modalInput = document.getElementById("rsearchInput");
modalInput.addEventListener("keyup", (event) => {
  let count = modalInput.value.length;
  if (count >= 2) {
    changeContent();
  } else {
    backContent();
  }
});

// インクリメンタルサーチ代わりにコンテンツ差し替え

// const changeContent = () => {
//   $(".v1-rsearch-modal__items").hide();
//   $(".v1-rsearch-modal__articles").css("height", itemsHeight);
//   $(".v1-rsearch-modal__result").show();
// };
const changeContent = () => {
  const items = document.querySelector('.v1-rsearch-modal__items');
  const articles = document.querySelector('.v1-rsearch-modal__articles');
  const result = document.querySelector('.v1-rsearch-modal__result');

  if (items) items.style.display = 'none';
  if (articles) articles.style.height = `${itemsHeight}px`;
  if (result) result.style.display = 'block';
};

// const backContent = () => {
//   $(".v1-rsearch-modal__items").show();
//   $(".v1-rsearch-modal__result").hide();
// };

const backContent = () => {
  const items = document.querySelector('.v1-rsearch-modal__items');
  const result = document.querySelector('.v1-rsearch-modal__result');

  if (items) items.style.display = 'block';
  if (result) result.style.display = 'none';
};

/**
 * Tabs
 */

class TabsAutomatic {
  constructor(groupNode) {
    this.tablistNode = groupNode;

    this.tabs = [];

    this.firstTab = null;
    this.lastTab = null;

    this.tabs = Array.from(this.tablistNode.querySelectorAll('[role=tab]'));
    this.tabpanels = [];

    for (var i = 0; i < this.tabs.length; i += 1) {
      var tab = this.tabs[i];
      var tabpanel = document.getElementById(tab.getAttribute('aria-controls'));

      tab.tabIndex = -1;
      tab.setAttribute('aria-selected', 'false');
      this.tabpanels.push(tabpanel);

      tab.addEventListener('keydown', this.onKeydown.bind(this));
      tab.addEventListener('click', this.onClick.bind(this));

      if (!this.firstTab) {
        this.firstTab = tab;
      }
      this.lastTab = tab;
    }

    this.setSelectedTab(this.firstTab, false);
  }

  setSelectedTab(currentTab, setFocus) {
    if (typeof setFocus !== 'boolean') {
      setFocus = true;
    }
    for (var i = 0; i < this.tabs.length; i += 1) {
      var tab = this.tabs[i];
      if (currentTab === tab) {
        tab.setAttribute('aria-selected', 'true');
        tab.removeAttribute('tabindex');
        // this.tabpanels[i].classList.remove('is-hidden');
        this.tabpanels[i].classList.add('v1-rsearch--is-dis-block');
        if (setFocus) {
          tab.focus();
        }
      } else {
        tab.setAttribute('aria-selected', 'false');
        tab.tabIndex = -1;
        // this.tabpanels[i].classList.add('is-hidden');
        this.tabpanels[i].classList.remove('v1-rsearch--is-dis-block');
      }
    }
  }

  setSelectedToPreviousTab(currentTab) {
    var index;

    if (currentTab === this.firstTab) {
      this.setSelectedTab(this.lastTab);
    } else {
      index = this.tabs.indexOf(currentTab);
      this.setSelectedTab(this.tabs[index - 1]);
    }
  }

  setSelectedToNextTab(currentTab) {
    var index;

    if (currentTab === this.lastTab) {
      this.setSelectedTab(this.firstTab);
    } else {
      index = this.tabs.indexOf(currentTab);
      this.setSelectedTab(this.tabs[index + 1]);
    }
  }

  /* EVENT HANDLERS */

  onKeydown(event) {
    var tgt = event.currentTarget,
      flag = false;

    switch (event.key) {
      case 'ArrowLeft':
        this.setSelectedToPreviousTab(tgt);
        flag = true;
        break;

      case 'ArrowRight':
        this.setSelectedToNextTab(tgt);
        flag = true;
        break;

      case 'Home':
        this.setSelectedTab(this.firstTab);
        flag = true;
        break;

      case 'End':
        this.setSelectedTab(this.lastTab);
        flag = true;
        break;

      default:
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  onClick(event) {
    this.setSelectedTab(event.currentTarget);
  }
}

window.addEventListener('load', function () {
  var tablists = document.querySelectorAll('[role=tablist].v1-rsearch-tab');
  for (var i = 0; i < tablists.length; i++) {
    new TabsAutomatic(tablists[i]);
  }

  var tablistsIssue = document.querySelectorAll('[role=tablist].v1-rsearch-tab');
  for (var i = 0; i < tablistsIssue.length; i++) {
    new TabsAutomatic(tablistsIssue[i]);
  }
});

// refine

// セレクトボックス
document.addEventListener('DOMContentLoaded', () => {
  rsearchSelect();
  rsearchSearch();
  rsearchFocusLoop();
});

function rsearchSelect(){
  const selects = document.querySelectorAll('[data-scope="select"]');
  selects.forEach((select) => {
    const combobox = select.querySelector('[role="combobox"]');
    const targetAriaControls = combobox.getAttribute("aria-controls");
    const targetAriaControlsElement = document.getElementById(targetAriaControls);
    const targetAriaControlsOptions = targetAriaControlsElement.querySelectorAll('[role="option"]');

    document.addEventListener("click", (e) => {
      if (!combobox.contains(e.target)) {
        const comboboxAriaControls = combobox.getAttribute("aria-controls");
        const comboboxAriaControlsElement = document.getElementById(comboboxAriaControls);
        combobox.setAttribute("aria-expanded", "false");
        comboboxAriaControlsElement.hidden = true;
      }
    });
    combobox.addEventListener("click", rsearchSelectChange);

    targetAriaControlsOptions.forEach((option) => {
      option.addEventListener("click", rsearchSelectSet);
    });

  });
}

function rsearchSelectChange(e) {
  e.preventDefault();
  const target = e.currentTarget;
  const targetAriaControls = target.getAttribute("aria-controls");
  const targetAriaControlsElement = document.getElementById(targetAriaControls);

  targetAriaControlsElement.toggleAttribute("hidden");
  target.setAttribute(
    "aria-expanded",
    targetAriaControlsElement.hidden ? "false" : "true"
  );
  targetAriaControlsElement.querySelector("[aria-selected='true']").focus();
}

function rsearchSelectSet(e) {
  const target = e.currentTarget;
  const targetValue = target.value;
  const targetAriaControls = target.getAttribute("aria-controls");
  const targetAriaControlsElement = document.getElementById(targetAriaControls);
  if (targetAriaControlsElement.querySelector('span')) {
    targetAriaControlsElement.querySelector('span').textContent = targetValue;
  } else {
    targetAriaControlsElement.textContent = targetValue;
  }
}

// 検索
function rsearchSearch() {
  const searches = document.querySelectorAll('[data-scope="search"]');
  searches.forEach((search) => {
    const combobox = search.querySelector('[role="combobox"]');
    const targetAriaControls = combobox.getAttribute("aria-controls");
    const targetAriaControlsElement =
      document.getElementById(targetAriaControls);
    const targetAriaControlsOptions =
      targetAriaControlsElement.querySelectorAll('[role="option"]');

    combobox.addEventListener("input", function (e) {
      const target = e.currentTarget;
      // rsearchIncrementの入力値を取得
      const rsearchSearchValue = target.value;
      // 入力値の長さが1より大きい場合の処理
      if (rsearchSearchValue.length > 1) {
        target.setAttribute("aria-expanded", "true");
        targetAriaControlsElement.hidden = false;
      } else {
        target.setAttribute("aria-expanded", "false");
        targetAriaControlsElement.hidden = true;
      }
    });

    combobox.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        targetAriaControlsOptions[0].focus();
      }
    });

    document.addEventListener("click", (e) => {
      if (!combobox.contains(e.target)) {
        combobox.setAttribute("aria-expanded", "false");
        targetAriaControlsElement.hidden = true;
      }
    });

    targetAriaControlsOptions.forEach((option) => {
      option.addEventListener("click", rsearchSearchChange);
    });
  });
}

function rsearchSearchChange(e) {
  const target = e.currentTarget;
  const targetValue = target.value;
  const targetAriaControls = target.getAttribute("aria-controls");
  const targetAriaControlsElement = document.getElementById(targetAriaControls);
  const inputElement = document.getElementsByClassName('v1-rsearch-search__input');
  // targetAriaControlsElement.value = targetValue;
  for (let i = 0; i < inputElement.length; i++) {
    inputElement[i].value = targetValue;
  }
  targetAriaControlsElement.focus();
}

// フォーカスループ
function rsearchFocusLoop(e) {
  const tabLists = document.querySelectorAll('[data-scope="focus-loop"]');
  tabLists.forEach((tabList) => {
    const observer = new MutationObserver(() => {
      initializeFocusLoop(tabList);
    });
    observer.observe(tabList, { childList: true, subtree: true });
    initializeFocusLoop(tabList);
  });

function initializeFocusLoop(tabList) {
  const tabs = tabList.querySelectorAll('[role="option"]');
  let tabFocus = Array.from(tabs).findIndex(
    (tab) => tab.getAttribute("aria-selected") === "true",
  );
  tabFocus = tabFocus !== -1 ? tabFocus : 0;

  function updateFocus(direction) {
    if (tabs[tabFocus]) {
      tabs[tabFocus].setAttribute("tabindex", -1);
    }
    tabFocus += direction ? 1 : -1;
    if (tabFocus < 0) tabFocus = tabs.length - 1;
    if (tabFocus >= tabs.length) tabFocus = 0;
    if (tabs[tabFocus]) {
      tabs[tabFocus].setAttribute("tabindex", 0);
      tabs[tabFocus].focus();
    }
  }

  function updateSelection(target) {
    tabs.forEach((t) => t.setAttribute("aria-selected", false));
    target.setAttribute("aria-selected", true);
    tabFocus = Array.from(tabs).indexOf(target);
    tabList.setAttribute("hidden", true);
  }

  tabList.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Tab") {
      e.preventDefault();
      const isForward =
        (e.key === "Tab" && !e.shiftKey) || e.key === "ArrowDown";
      updateFocus(isForward);
    }
  });

  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      updateSelection(e.currentTarget);
    });
    tab.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        updateSelection(e.currentTarget);
      }
    });
  });
}}

// 追従エリア

const resultBody = document.querySelector(".v1-rsearch-result__body");
if (resultBody !== null) {
  const floatingElm = document.querySelector(".js-result-floating");
  const resultTop = resultBody.getBoundingClientRect().top + window.pageYOffset;

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset; // 現在のスクロール位置を取得
    if (scrollTop > resultTop) {
      floatingElm.classList.add("is-show");
    } else {
      floatingElm.classList.remove("is-show");
    }
  });
}

