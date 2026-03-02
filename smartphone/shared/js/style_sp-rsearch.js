"use strict";

document.addEventListener('DOMContentLoaded', () => {
  rsearchIncrement();
  rsearchTabs();
  rsearchSelect();
  rsearchSearch();
  rsearchFocusLoop();
  rsearchClear();
});

// インクリメントサーチ
function rsearchIncrement() {
  // "rsearch-increment" IDを持つ要素を取得
  const rsearchIncrement = document.getElementById("rsearch-increment");
  // "rsearch-increment-result" IDを持つ要素を取得
  const rsearchIncrementResult = document.getElementById(
    "rsearch-increment-result"
  );
  // "rsearch-help" IDを持つ要素を取得
  const rsearchHelp = document.getElementById("rsearch-help");

  // rsearchIncrement要素に対して、入力イベントのリスナーを追加
  rsearchIncrement.addEventListener("input", function () {
    // rsearchIncrementの入力値を取得
    const rsearchIncrementValue = rsearchIncrement.value;
    // 入力値の長さが1より大きい場合の処理
    if (rsearchIncrementValue.length > 1) {
      // ARIA属性を設定して、要素が展開されていることを示す
      rsearchIncrement.setAttribute("aria-expanded", "true");
      rsearchIncrementResult.setAttribute("aria-hidden", "false");
      rsearchHelp.setAttribute("aria-hidden", "true");
    } else {
      // ARIA属性を設定して、要素が折りたたまれていることを示す
      rsearchIncrement.setAttribute("aria-expanded", "false");
      rsearchIncrementResult.setAttribute("aria-hidden", "true");
      rsearchHelp.setAttribute("aria-hidden", "false");
    }
  });
}

// タブ切り替え
function rsearchTabs() {
  const tabLists = document.querySelectorAll('[data-scope="tabs"] > [role="tablist"]');

  tabLists.forEach((tabList) => {
    const tabs = tabList.querySelectorAll('[role="tab"]');

    // 各タブに click イベントハンドラーを追加します
    tabs.forEach((tab) => {
      tab.addEventListener("focus", rsearchChangeTabs);
    });

    // tabListの中で表示されているタブを指定するようの定数。
    let tabFocus = 0;
    tabList.addEventListener("keydown", (e) => {
      //← →を押したら
      if (e.keyCode === 37 || e.keyCode === 39) {
        tabs[tabFocus].setAttribute("tabindex", -1);

        if (e.keyCode === 37) {
          // ← を押したら
          tabFocus--;
          // 最初にいる場合は、最後に移動します
          if (tabFocus < 0) {
            tabFocus = tabs.length - 1;
          }
        } else if (e.keyCode === 39) {
          // → を押したら
          tabFocus++;
          // 最後にいる場合は、最初に移動します
          if (tabFocus >= tabs.length) {
            tabFocus = 0;
          }
        }
        tabs[tabFocus].setAttribute("tabindex", 0);
        tabs[tabFocus].focus();
      }
    });
  });
}

// タブを切り替える関数
function rsearchChangeTabs(e) {
  const target = e.target;
  const parent = target.parentNode;
  const grandparent = parent.parentNode;

  // タブから現在すべての選択状態を取り除きます
  const selectedElements = parent.querySelectorAll('[aria-selected="true"]');
  const directChildSelectedElements = Array.from(selectedElements).filter(el => el.parentNode === parent);

  directChildSelectedElements.forEach((t) =>
    t.setAttribute("aria-selected", false)
  );

  // このタブを選択されたタブとして設定します
  target.setAttribute("aria-selected", true);

  // すべてのタブパネルを非表示にします
  const selectedElementsGrandparent = grandparent.querySelectorAll('[role="tabpanel"]');
  const directChildSelectedElementsGrandparent = Array.from(selectedElementsGrandparent).filter(el => el.parentNode === grandparent);
  directChildSelectedElementsGrandparent.forEach((p) => p.setAttribute("hidden", true));

  // 選択されたパネルを表示します
  grandparent.parentNode
    .querySelector(`#${target.getAttribute("aria-controls")}`)
    .removeAttribute("hidden");
}

// セレクトボックス
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

    // [data-scope="search"]要素をintersectionObserverで監視し、位置がtop:0の場合に.is-fixedを付与
    function checkStickyElementPosition() {
      if (window.scrollY >= search.offsetTop) {
        search.classList.add('--sticky');
      } else {
        search.classList.remove("--sticky");
      }
    }

    // Listen for scroll events
    window.addEventListener('scroll', checkStickyElementPosition);

  });
}

function rsearchSearchChange(e) {
  const target = e.currentTarget;
  const targetValue = target.value;
  const targetAriaControls = target.getAttribute("aria-controls");
  const targetAriaControlsElement = document.getElementById(targetAriaControls);
  targetAriaControlsElement.value = targetValue;
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

// 検索ワードクリア
function rsearchClear() {
  const targetNode = document.getElementById("h-search");
  const rsearchIncrement = document.getElementById("rsearch-increment");
  const rsearchIncrementResultArea = document.getElementById("rsearch-increment-result-area");

  const observer = new MutationObserver(() => {
    if (targetNode.getAttribute("aria-hidden") === "true") {
      rsearchIncrement.value = "";
      rsearchIncrement.dispatchEvent(new KeyboardEvent("input"));
      rsearchIncrementResultArea.innerHTML = "";
    }
  });

  observer.observe(targetNode, {
    attributes: true,
    attributeFilter: ["aria-hidden"],
  });
}