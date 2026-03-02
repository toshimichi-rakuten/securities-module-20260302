if(document.getElementById('pcm-fsearch') !== undefined) {
    /**
     * jQuery
     * ※読み込まれているjQueryのVerは1.6.2
     */
    $(function() {
        'use strict';

        $('#pcm-fsearch').find('a[href="#"]').click(function(e) {
            e.preventDefault();
        });

        /**
         * イチ押し条件検索
         *
         * スライダー
         * @see /member/js/fund/lemmon-slider.js
         */
        if($('.pcm-fsearch-slide').length) {
            const $icnChevron   = $('.js-prev-slide, .js-next-slide');
            $icnChevron.prop('disabled', true);
            $('.pcm-fsearch-slide').lemmonSlider();

            /**
             * 矢印の活性・非活性 処理
             */
            const listWrapWidth = $('.pcm-fsearch-slide').outerWidth(true);
            const listWidth     = $('.pcm-fsearch-slide-list').innerWidth();
            if(listWrapWidth < listWidth) {
                $icnChevron.prop('disabled', false);
            } else {
                $icnChevron.prop('disabled', true);
            }
        }


        /**
         * 選択条件
         * 条件エリア - アコーディオン
         */

        /**
         * アコーディオン開閉矢印
         * @type  {Object} '.pcm-fsearch-selection-condition-result-tag__ctrl__icon'
         */
        const $iconArrow = $('.pcm-fsearch-selection-condition-result-tag__ctrl__icon');

        /**
         * アコーディオンのパネル
         * @type  {Object}
         */
        const $accordionPanel = $(document).find('.pcm-fsearch-selection-condition-result-tag__panel');

        /**
         * アコーディオンのパネルのpadding-topの値取得
         * @type  {Number}
         */
        const accordionPanel_padTop = parseInt($accordionPanel.css('padding-top'));

        /**
         * 選択条件タグ 削除ボタン
         * @type {Object}
         */
        const $tagDelete = $(document).find('.pcm-fsearch-tag__dismiss');

        /**
         * パネルの高さの初期値、最大値
         * @type  {Number}  accordionPanel_initHeight
         * @type  {Number}  accordionPanel_maxHeight
         */
        let accordionPanel_initHeight;
        let accordionPanel_maxHeight;

        const $tagListWrap = $('.pcm-fsearch-selection-condition-result-tag').find('.pcm-fsearch-tag');
        const observer     = new MutationObserver(function(mutations) {
            /**
             * 条件タグ
             * @type {Object}
             */
            const $tagList = $accordionPanel.find('li');

            if(!$tagList.length) {
                $('.pcm-fsearch-selection-condition-result-tag').hide();
                return false;
            } else {
                $('.pcm-fsearch-selection-condition-result-tag').show();
                /**
                 * 条件タグの高さ取得
                 * @type  {Number}  tagList_oneHeight
                 */
                const tagList_oneHeight = $tagList.outerHeight(true);

                /**
                 * パネルの高さの初期値、最大値
                 * @type  {Number}  accordionPanel_initHeight
                 * @type  {Number}  accordionPanel_maxHeight
                 */
                accordionPanel_initHeight = accordionPanel_padTop + tagList_oneHeight;
                accordionPanel_maxHeight  = $tagListWrap.outerHeight(true) + 12;

                $accordionPanel.css({
                    'height': accordionPanel_initHeight,
                    'min-height': accordionPanel_initHeight
                });

                if(!$iconArrow.hasClass('is-rotate')) {
                    $accordionPanel.css('height', accordionPanel_initHeight);
                } else {
                    $accordionPanel.css('height', accordionPanel_maxHeight);
                }

                /**
                 * 条件タグが複数行にわたる場合、アコーディオンを活性化
                 */
                if(accordionPanel_maxHeight === accordionPanel_initHeight) {
                    $iconArrow.hide();
                } else {
                    $iconArrow.fadeIn(150);
                }
            }
        });

        /**
         * 選択条件　非表示
         *
         * ※モックアップではデモ表示のため、コメントアウト
         * 　本番実装時はコメントアウトを外してください
         */
        // $accordionPanel.parent().hide();

        /**
         * ※モックアップのデモ表示のための処理
         * 　本番では不要
         * 　135行目から145行目まで
         */
        const $tagList = $accordionPanel.find('li');
        const tagList_oneHeight = $tagList.outerHeight(true);
        if($tagList.length) {
            accordionPanel_initHeight = accordionPanel_padTop + tagList_oneHeight;
            accordionPanel_maxHeight  = $tagListWrap.outerHeight(true) + 12;
            $accordionPanel.css({
                'height': accordionPanel_initHeight,
                'min-height': accordionPanel_initHeight
            });
        }


        /**
         * パネルを監視
         */
        observer.observe($accordionPanel[0], {
            childList: true, // 子ノードの変化を監視
            subtree: true // 子孫ノードも監視対象に含める
        });

        /**
         * アコーディオン制御
         */
        $iconArrow.click(function(event) {
            event.preventDefault();
            if(!$(this).hasClass('is-rotate')) {
                $(this).addClass('is-rotate');
                $(this).attr('aria-label', '閉じる');
                $iconArrow.attr('aria-expanded', true);
                $accordionPanel.animate({
                    'height': accordionPanel_maxHeight
                }, 'fast');
            } else {
                $(this).removeClass('is-rotate');
                $(this).attr('aria-label', '開く');
                $iconArrow.attr('aria-expanded', false);
                $accordionPanel.animate({
                    'height': accordionPanel_initHeight
                }, 'fast');
            }
        });

        /**
         * 条件タグ削除 押下
         */
        $tagDelete.on('click', function(e) {
            e.preventDefault();
            $(this).parent().fadeOut(150, function() {
                $(this).remove();
            });
        });


        /**
         * フローティングボタン
         */
        {
            const $floatingBtn = $('.pcm-fsearch-floating-button');
            const $footerFav = $('.footer-fav');

            if($footerFav.length) {
                const observer = new MutationObserver(function(mutations) {
                    $floatingBtn.toggleClass('is-move');
                });

                observer.observe($footerFav[0], {
                    attributes: true,
                    attributeFilter: ['class']
                });
            }

            $floatingBtn.hide();

            $(window).scroll(function() {
                if($(this).scrollTop() > 60 ) {
                    $floatingBtn.fadeIn('fast');
                } else {
                    $floatingBtn.fadeOut('fast');
                }
            });

            $floatingBtn.find('a').click(function(e) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: 0
                }, 200);
                return false;
            });
        }


        /**
         * Pagenation
         */
        {
            /**
             * ページネーション
             * @type {Object}
             */
            const $pageLink     = $('a.pcm-fsearch-page-link:not(.pcm-fsearch-page-link--prev):not(.pcm-fsearch-page-link--next)')
            const $pageListItem = $pageLink.parent();

            /**
             * 前のページ
             * @type {Object}
             */
            const $pageLinkPrev = $('.pcm-fsearch-page-link--prev');

            /**
             * 次のページ
             * @type {Object}
             */
            const $pageLinkNext = $('.pcm-fsearch-page-link--next');

            /**
             * ページ数の最大値
             * @type {Number}
             */
            const max_pageListItem = $pageListItem.length;

            /**
             * ページリンクをクリック
             */
            $pageLink.click(function(e) {
                e.preventDefault();
                $pageLink.removeClass('is-current');
                $(this).addClass('is-current');
                if(!$pageLink.eq(0).hasClass('is-current')) {
                    $pageLinkPrev.removeClass('is-disabled');
                } else {
                    $pageLinkPrev.addClass('is-disabled');
                }

                if(!$pageLink.eq(-1).hasClass('is-current')) {
                    $pageLinkNext.removeClass('is-disabled');
                } else {
                    $pageLinkNext.addClass('is-disabled');
                }
            });

            /**
             * 前のページへ　クリック
             */
            $pageLinkPrev.click(function(e) {
                e.preventDefault();
                const $tgtPageListItem = $('a.pcm-fsearch-page-link.is-current').parent();
                let i = $tgtPageListItem.index();
                $pageLink.removeClass('is-current');
                if(i > 0) {
                    i--;
                    $pageListItem.eq(i).prev().find('.pcm-fsearch-page-link').toggleClass('is-current');
                    $pageLinkNext.removeClass('is-disabled');
                    if(i === 1) {
                        $(this).addClass('is-disabled');
                    } else if(i === max_pageListItem) {
                        $pageListItem.eq(-2).find('.pcm-fsearch-page-link').toggleClass('is-current');
                    }
                }
            });

            /**
             * 次のページへ　クリック
             */
            $pageLinkNext.click(function(e) {
                e.preventDefault();
                const $tgtPageListItem = $('a.pcm-fsearch-page-link.is-current').parent();
                let i = $tgtPageListItem.index();
                $pageLink.removeClass('is-current');
                $pageLinkPrev.removeClass('is-disabled');
                $pageListItem.eq(i).find('.pcm-fsearch-page-link').toggleClass('is-current');
                if(i === max_pageListItem - 1) {
                    $(this).addClass('is-disabled');
                }
            });
        }
    });



    /**
     * Vanilla Javascript
     */
    document.addEventListener('DOMContentLoaded', function() {
        'use strict';

        /**
         * つみNI 判定用変数
         */
        const fsearchNisa = document.getElementsByClassName('pcm-fsearch--nisa')[0];


        /**
         * サイドメニューの最小値の高さをメインに設定
         * @type {Function}
         */
        const setMinHeight = function() {
            const sidebar                 = document.getElementsByClassName('pcm-fsearch-container__side')[0];
            const mainContainer           = document.getElementsByClassName('pcm-fsearch-container__main')[0];
            const selectCondition         = document.getElementsByClassName('pcm-fsearch-selection-condition')[0];
            const init_selectConditionH   = selectCondition.clientHeight - 18;
            const min_sidebarH            = sidebar.clientHeight - init_selectConditionH;
            mainContainer.style.minHeight = min_sidebarH + 'px';
        };

        setMinHeight();


        /**
         * Sticky IE対応
         * @see /member/js/fund/Stickyfill.min.js
         * @see {@link https://github.com/wilddeer/stickyfill}
         */
        {
            const fsearchSidebar = document.querySelectorAll('.pcm-fsearch-sidebar');
            Stickyfill.add(fsearchSidebar);
        }

        /**
         * タブの切り替え 処理
         */
        {
            /**
             * タブを取得
             * @type {Object}
             */
            const tabList = document.getElementById('pcm-fsearch-tab').querySelectorAll('.pcm-fsearch-nav__item > a');

            /**
             * パネルを取得
             * @type {Object}
             */
            const tabPanel = document.getElementById('pcm-fsearch-tab-content').querySelectorAll('.pcm-fsearch-tab-panel');

            /**
             * 切り替え関数
             * @type {Function}
             */
            const tabSwitch = function(e) {
                e.preventDefault();
                const _this = e.target;

                /**
                 * 初期化
                 * @type  {Function}
                 * @param {Object}   tabList  取得したタブ
                 * @param {Object}   tabPanel 取得したタブパネル
                 */
                const tabInit = function(tabList, tabPanel) {
                    for(let i=0; i<tabList.length; i++) {
                        tabList[i].classList.remove('is-active');
                        tabList[i].setAttribute('aria-selected', false);
                        tabPanel[i].classList.remove('is-active', 'is-show');
                    }
                };

                /**
                 * タブをアクティブに
                 * @param {*} _this 対象のa要素
                 */
                const tabCurrent = function(_this) {
                    const controlsName  = _this.getAttribute('aria-controls');
                    const tgtTabPanelId = document.getElementById(controlsName);
                    _this.classList.add('is-active');
                    _this.setAttribute('aria-selected', true);
                    tgtTabPanelId.classList.add('is-active');
                    setTimeout(function() {
                        tgtTabPanelId.classList.add('is-show');
                    });
                };

                tabInit(tabList, tabPanel);
                tabCurrent(_this);
            };

            /**
             * クリック イベント
             */
            for(let i=0; i<tabList.length; i++) {
                tabList[i].removeEventListener('click', tabSwitch);
                tabList[i].addEventListener('click', tabSwitch);
            }
        }


        /**
         * Accordion
         */
        {
            const tgtAccordion = document.querySelectorAll('.pcm-fsearch-accordion');

            /**
             * 初期化
             */
            const accordionInit = function() {
                for(let j=0; j<tgtAccordion.length; j++) {
                    const initAccordionHeader = tgtAccordion[j].querySelector('.pcm-fsearch-accordion__header > a');
                    const initAccordionBody   = tgtAccordion[j].querySelector('.pcm-fsearch-accordion__body');
                    initAccordionHeader.setAttribute('aria-expanded', false);
                    initAccordionBody.removeAttribute('style');
                }
            };

            /**
             * アコーディオン開閉 処理
             */
            const onAccordion = function(e) {
                e.preventDefault();
                const _this            = e.currentTarget;
                const rootElement      = _this.closest('.pcm-fsearch-accordion');
                const tgtAccordionBody = rootElement.querySelector('.pcm-fsearch-accordion__body');
                const tgtAccordionText = rootElement.querySelector('.pcm-fsearch-accordion__header').querySelector('span:not(.rex-icon-chevron-down)');
                const tgtAccordionIcon = rootElement.querySelector('.pcm-fsearch-accordion__header').querySelector('span.rex-icon-chevron-down');

                if(tgtAccordionBody.style.maxHeight) {
                    _this.setAttribute('aria-expanded', false);
                    tgtAccordionBody.style.maxHeight = null;
                    tgtAccordionBody.style.overflow = 'hidden';
                    tgtAccordionText.textContent = '表示する';
                    tgtAccordionIcon.classList.remove('is-rotate');
                } else {
                    const fsearchSidebar = document.getElementsByClassName('pcm-fsearch-sidebar')[0];
                    if (fsearchSidebar) {
                        fsearchSidebar.scrollTop = fsearchSidebar.scrollTop - 1;
                    }
                    _this.setAttribute('aria-expanded', true);
                    tgtAccordionBody.style.maxHeight = tgtAccordionBody.scrollHeight + 'px';
                    tgtAccordionBody.style.overflow = 'unset';
                    tgtAccordionText.textContent = '閉じる';
                    tgtAccordionIcon.classList.add('is-rotate');
                }

                setTimeout(function(){
                    setMinHeight();
                }, 200);
            };

            accordionInit();

            for(let i=0; i<tgtAccordion.length; i++) {
                const tgtAccordionHeader = tgtAccordion[i].querySelector('.pcm-fsearch-accordion__header > a');
                tgtAccordionHeader.removeEventListener('click', onAccordion);
                tgtAccordionHeader.addEventListener('click', onAccordion);
            }
        }


        /**
         * 条件ボタンの活性・非活性 制御
         * 「条件をクリア」を押下時 制御
         *
         */
        {
            /**
             * サイドメニュー内のチェックボックス取得
             * @type {Object}
             */
            const cb = document.querySelectorAll('.pcm-fsearch-sidebar input[type="checkbox"]');

            /**
             * 保存ボタン・クリアボタン
             */
            const getTypeBtnSave = typeof document.getElementsByClassName('pcm-fsearch-button--save')[0];
            const btnClear = document.querySelectorAll('.pcm-fsearch-button--clear');
            let btnSave;
            if(getTypeBtnSave !== 'undefined') {
                btnSave  = document.querySelectorAll('.pcm-fsearch-button--save');
            }

            /**
             * 条件項目数
             */
            const numItem = document.querySelector('.pcm-fsearch-selection-condition-result__num > span');

            let count = 0;

            /**
             * チェック数を数え、チェックがある場合→ボタンを活性化
             */
            for(let i=0; i<cb.length; i++) {
                cb[i].addEventListener('change', function() {

                    if(this.checked) {
                        count++;
                    } else {
                        count--;
                    }
                    numItem.textContent = count;

                    const cbAttrName = this.getAttribute('name');
                    if(cbAttrName === 'investment-target-area-global') {
                        /**
                         * @todo
                         * グローバルのチェック(true)  → 全てチェック（true）
                         * グローバルのチェック(false) → 全てチェック(false)
                         *
                         * 日本除くのチェック(true)かつ日本含むのチェック(true)  → グローバルのチェック(true)
                         * 日本除くのチェック(true)かつ日本含むのチェック(false) → グローバルのチェック(false)
                         * 日本除くのチェック(false)かつ日本含むのチェック(true) → グローバルのチェック(false)
                         *
                         * 日本含むのチェック(true)かつ日本除くのチェック(true)  → グローバルのチェック(true)
                         * 日本含むのチェック(true)かつ日本除くのチェック(false) → グローバルのチェック(false)
                         * 日本含むのチェック(false)かつ日本除くのチェック(true) → グローバルのチェック(false)
                         */
                        const cbInvestmentGlobal     = document.getElementById('it-02');
                        const cbInvestmentGlobal_exe = document.getElementById('it-02-01');
                        const cbInvestmentGlobal_inc = document.getElementById('it-02-02');
                        const cbAttrId = this.getAttribute('id');
                        switch(cbAttrId){
                            // グローバル
                            case 'it-02':
                                if(this.checked) {
                                    if(cbInvestmentGlobal_exe.checked || cbInvestmentGlobal_inc.checked) {
                                        count = count + 1;
                                    } else {
                                        count = count + 2;
                                    }
                                    cbInvestmentGlobal_exe.checked = true;
                                    cbInvestmentGlobal_inc.checked = true;
                                } else {
                                    cbInvestmentGlobal_exe.checked = false;
                                    cbInvestmentGlobal_inc.checked = false;
                                    count = count - 2;
                                }
                                break;
                            // 日本除く
                            case 'it-02-01':
                                if(this.checked) {
                                    if(cbInvestmentGlobal_inc.checked) {
                                        cbInvestmentGlobal.checked = true;
                                        count = count + 1;
                                    } else {
                                        cbInvestmentGlobal.checked = false;
                                    }
                                } else {
                                    if(cbInvestmentGlobal_inc.checked) {
                                        cbInvestmentGlobal.checked = false;
                                        count = count - 1;
                                    }
                                }
                                break;
                            // 日本含む
                            case 'it-02-02':
                                if(this.checked) {
                                    if(cbInvestmentGlobal_exe.checked) {
                                        cbInvestmentGlobal.checked = true;
                                        count = count + 1;
                                    } else {
                                        cbInvestmentGlobal.checked = false;
                                    }
                                } else {
                                    if(cbInvestmentGlobal_exe.checked) {
                                        cbInvestmentGlobal.checked = false;
                                        count = count - 1;
                                    }
                                }
                                break;
                            default:
                                break;
                        }
                        numItem.textContent = count;
                    }

                    if(cbAttrName === 'investment-target-area-asia') {
                        /**
                         * @todo
                         * アジアのチェック(true)  → 全てチェック(true)
                         * アジアのチェック(false) → 全てチェック(false)
                         *
                         * インドのチェック(true)かつインドネシア、中国・香港のチェック(true) → アジアのチェック(true)
                         * インドのチェック(true)かつインドネシア、中国・香港のいずれかのチェック(false) → アジアのチェック(false)
                         * インドのチェック(false) → アジアのチェック(false)
                         *
                         * インドネシアのチェック(true)かつインド、中国・香港のチェック(true) → アジアのチェック(true)
                         * インドネシアのチェック(true)かつインド、中国・香港のいずれかのチェック(false) → アジアのチェック(false)
                         * インドネシアのチェック(false) → アジアのチェック(false)
                         *
                         * 中国・香港のチェック(true)かつインド、インドネシアのチェック(true) → アジアのチェック(true)
                         * 中国・香港のチェック(true)かつインド、インドネシアのいずれかのチェック(false) → アジアのチェック(false)
                         * 中国・香港のチェック(false) → アジアのチェック(false)
                         */
                        const cbInvestmentAsia     = document.getElementById('it-03');
                        const cbInvestmentAsia_ind = document.getElementById('it-03-01');
                        const cbInvestmentAsia_idn = document.getElementById('it-03-02');
                        const cbInvestmentAsia_chn = document.getElementById('it-03-03');
                        const cbAttrId             = this.getAttribute('id');
                        const cbInvestmentAsia_all = document.querySelectorAll('input[name="' + cbAttrName + '"]');
                        const checkedLen           = document.querySelectorAll('input[name="' + cbAttrName + '"]:checked').length;

                        switch(cbAttrId){
                            // アジア
                            case 'it-03':
                                if(this.checked) {
                                    if(checkedLen === 1) {
                                        count = count + 3;
                                    } else if(checkedLen === 2) {
                                        count = count + 2;
                                    } else if(checkedLen === 3) {
                                        count = count + 1;
                                    }

                                    for(let i=0; i<cbInvestmentAsia_all.length; i++) {
                                        cbInvestmentAsia_all[i].checked = true;
                                    }
                                } else {
                                    for(let i=0; i<cbInvestmentAsia_all.length; i++) {
                                        cbInvestmentAsia_all[i].checked = false;
                                    }
                                    count = count - 3;
                                }
                                break;
                            // インド
                            case 'it-03-01':
                                if(this.checked) {
                                    if(cbInvestmentAsia_idn.checked && cbInvestmentAsia_chn.checked) {
                                        cbInvestmentAsia.checked = true;
                                        count = count + 1;
                                    } else if(!cbInvestmentAsia_idn.checked || !cbInvestmentAsia_chn.checked) {
                                        cbInvestmentAsia.checked = false;
                                    }
                                } else {
                                    if(cbInvestmentAsia_idn.checked && cbInvestmentAsia_chn.checked) {
                                        count = count - 1;
                                    }
                                    cbInvestmentAsia.checked = false;
                                }
                                break;
                            // インドネシア
                            case 'it-03-02':
                                if(this.checked) {
                                    if(cbInvestmentAsia_ind.checked && cbInvestmentAsia_chn.checked) {
                                        cbInvestmentAsia.checked = true;
                                        count = count + 1;
                                    } else if(!cbInvestmentAsia_ind.checked || !cbInvestmentAsia_chn.checked) {
                                        cbInvestmentAsia.checked = false;
                                    }
                                } else {
                                    if(cbInvestmentAsia_ind.checked && cbInvestmentAsia_chn.checked) {
                                        count = count - 1;
                                    }
                                    cbInvestmentAsia.checked = false;
                                }
                                break;
                            // 中国・香港
                            case 'it-03-03':
                                if(this.checked) {
                                    if(cbInvestmentAsia_ind.checked && cbInvestmentAsia_idn.checked) {
                                        cbInvestmentAsia.checked = true;
                                        count = count + 1;
                                    } else if(!cbInvestmentAsia_ind.checked || !cbInvestmentAsia_idn.checked) {
                                        cbInvestmentAsia.checked = false;
                                    }
                                } else {
                                    if(cbInvestmentAsia_ind.checked && cbInvestmentAsia_idn.checked) {
                                        count = count - 1;
                                    }
                                    cbInvestmentAsia.checked = false;
                                }
                                break;
                            default:
                                break;
                        }
                        numItem.textContent = count;
                    }

                    if(count > 0) {
                        if(getTypeBtnSave !== 'undefined') {
                            btnSave[0].disabled  = false;
                            btnSave[1].disabled  = false;
                        }
                        btnClear[0].disabled = false;
                        btnClear[1].disabled = false;
                    } else {
                        if(getTypeBtnSave !== 'undefined') {
                            btnSave[0].disabled  = true;
                            btnSave[1].disabled  = true;
                        }
                        btnClear[0].disabled = true;
                        btnClear[1].disabled = true;
                    }
                });
            }

            /**
             * 「条件をクリア」を押下時の処理
             */
            for(let j=0; j<btnClear.length; j++) {
                btnClear[j].addEventListener('click', function() {
                    for(let i=0; i<cb.length; i++) {
                        cb[i].checked = false;
                    }
                    count = 0;
                    numItem.textContent = count;
                    if(getTypeBtnSave !== 'undefined') {
                        btnSave[0].disabled  = true;
                        btnSave[1].disabled  = true;
                    }
                    btnClear[0].disabled = true;
                    btnClear[1].disabled = true;
                });
            }
        }

        /**
         * 比較リストに関連する処理
         */
        if(fsearchNisa === undefined) {
            /**
             * 表組内比較のチェックボックス
             * @type {Object}
             */
            const cbComparison = document.querySelectorAll('.pcm-fsearch-result-table .pcm-fsearch-check-button');

            /**
             * 比較ボタン
             * @type {Object}
             */
            const btnComparison = document.querySelectorAll('.pcm-fsearch-comparison > button');

            /**
             * 比較リスト内のチェック数
             */
            const result = document.getElementsByClassName('pcm-fsearch-result')[0];
            const numBtnComparisonlabel = result.querySelectorAll('.pcm-fsearch-comparison span:not([class*="rex-icon-"])');
            let count2 = 0;

            const scrollbarSize = window.innerWidth - document.body.clientWidth;

            /**
             * チェック数を数え、チェックがある場合→ボタンを活性化
             */
            for(let i=0; i<cbComparison.length; i++) {

                cbComparison[i].addEventListener('change', function() {
                    const elemTr = this.closest('tr');
                    if(this.checked) {
                        count2++;
                        elemTr.classList.add('is-current');
                    } else {
                        count2--;
                        elemTr.classList.remove('is-current');
                    }

                    if(count2 > 0) {
                        btnComparison[0].disabled = false;
                        btnComparison[1].disabled = false;

                        /**
                         * 比較リストに追加したことを知らせるスナックバーの制御
                         */
                        if(this.checked && count2 < 6) {
                            const noticeSnackbar           = document.getElementsByClassName('pcm-fsearch-snackbar--al-04')[0];
                            const noticeSnackbar_copy      = noticeSnackbar.cloneNode(true);
                            const noticeSnackbar_copy_link = noticeSnackbar_copy.querySelector('.pcm-fsearch-target-modal');
                            const targetId                 = document.getElementById('pcm-fsearch').parentNode;
                            const footerFav = document.getElementsByClassName('footer-fav')[0];
                            /**
                             * リンクにIDを追加
                             */
                            noticeSnackbar_copy_link.id = 'pcm-fsearch-target-modal-snackbar--comparison';

                            noticeSnackbar_copy_link.addEventListener('click', function(e) {

                                /**
                                 * クリックしたモーダルボタンのIDを取得して分割
                                 */
                                const _this     = e.currentTarget;
                                const getBtnId  = _this.getAttribute('id');
                                const btnIdText = getBtnId.split('--');

                                /**
                                 * IDで対象のモーダルを判別
                                 */
                                const idNamePrefix = 'pcm-fsearch-modal--';
                                const makedIdName  = idNamePrefix + btnIdText[1];
                                const targetModal  = document.getElementById(makedIdName);

                                /**
                                 * Class付与
                                 */
                                targetModal.classList.add('is-active');
                                setTimeout(function() {
                                    targetModal.classList.add('is-show');
                                });

                                const scrollbarSize = window.innerWidth - document.body.clientWidth;
                                document.body.classList.add('is-modal-open');
                                document.body.style.paddingRight = scrollbarSize + 'px';
                            }, {once: true, passive: true, capture: false});

                            /**
                             * クローンしたスナックバーを挿入
                             */
                            targetId.insertBefore(noticeSnackbar_copy, targetId.lastElementChild);

                            /**
                              * 「最近チェックした銘柄」が開いてるか 判定
                              */
                            if(!footerFav.classList.contains('footer-fav--open')) {
                                noticeSnackbar_copy.classList.add('is-show');
                                setTimeout(function() {
                                    noticeSnackbar_copy.classList.remove('is-show');
                                    targetId.removeChild(noticeSnackbar_copy);
                                }, 3800);
                            } else {
                                noticeSnackbar_copy.classList.add('is-open-footer-fav');
                                setTimeout(function() {
                                    noticeSnackbar_copy.classList.add('is-show2');
                                });
                                setTimeout(function() {
                                    noticeSnackbar_copy.classList.remove('is-show2');
                                    targetId.removeChild(noticeSnackbar_copy);
                                }, 3800);
                            }
                        } else {
                            elemTr.classList.remove('is-current');
                        }

                        /**
                         * 5つ以上チェックするとモーダルが開く
                         */
                        if(count2 === 6) {
                            const modalComparisonConfirm = document.getElementById('pcm-fsearch-modal--comparison-confirm');
                            this.checked = false;
                            modalComparisonConfirm.classList.add('is-show');
                            setTimeout(function() {
                                modalComparisonConfirm.classList.add('is-active');
                            });
                            document.body.classList.add('is-modal-open');
                            document.body.style.paddingRight = scrollbarSize + 'px';
                            count2--;
                        }
                    } else {
                        btnComparison[0].disabled = true;
                        btnComparison[1].disabled = true;
                    }

                    for(let j=0;j<numBtnComparisonlabel.length; j++) {
                        numBtnComparisonlabel[j].textContent = count2;
                    }
                });
            }
        }


        /**
         * Dropdown Button
         * 保存した条件で探す・お気に入り
         */
        {
            const initDropdown = function() {
                const dropdownContentAll = document.querySelectorAll('.pcm-fsearch-dropdown__content');
                for(let j=0; j<dropdownContentAll.length; j++) {
                    dropdownContentAll[j].classList.remove('is-active');
                }
                const dropdownButtonAll = document.querySelectorAll('.pcm-fsearch-dropdown-button');
                for(let j=0; j<dropdownButtonAll.length; j++) {
                    dropdownButtonAll[j].setAttribute('aria-expanded', false);
                }
            };

            if(fsearchNisa === undefined) {
                const dropdownBtn = document.querySelector('.pcm-fsearch-dropdown-button');
                const switchDisplay = function(event) {
                    event.stopPropagation();
                    const _this = event.currentTarget;
                    const dropdownContent = _this.nextElementSibling;

                    if(!dropdownContent.classList.contains('is-active')) {
                        initDropdown();
                        dropdownContent.classList.add('is-active');
                        _this.setAttribute('aria-expanded', true);
                    } else {
                        dropdownContent.classList.remove('is-active');
                        _this.setAttribute('aria-expanded', false);
                    }
                };
                dropdownBtn.removeEventListener('click', switchDisplay);
                dropdownBtn.addEventListener('click', switchDisplay);
            }

            /**
             * お気に入り登録
             */
            const dropdownBtnFav = document.getElementsByClassName('pcm-fsearch-result-table__button--fav');
            const dropdownContentFav = document.getElementsByClassName('pcm-fsearch-result-table__content--fav')[0];
            const dropdownContentFav_copy = dropdownContentFav.cloneNode(true);

            const switchDisplayFav = function(event) {
                event.stopPropagation();
                const _this = event.currentTarget;

                /**
                 * クローンしたお気に入り登録のドロップダウンを挿入
                 */
                _this.insertAdjacentElement('afterend', dropdownContentFav_copy);

                if(_this.getAttribute("aria-expanded") === "false") {
                    initDropdown();
                    dropdownContentFav_copy.classList.add('is-active');
                    _this.setAttribute('aria-expanded', true);
                } else {
                    dropdownContentFav_copy.classList.remove('is-active');
                    _this.setAttribute('aria-expanded', false);
                    _this.nextElementSibling.remove();
                }
            };

            for(let i=0; i<dropdownBtnFav.length; i++) {
                dropdownBtnFav[i].removeEventListener('click', switchDisplayFav, false);
                dropdownBtnFav[i].addEventListener('click', switchDisplayFav, false);
            }

            /**
             * お気に入り登録 Demo
             */
            const link_onSnackbar = dropdownContentFav_copy.querySelectorAll('.pcm-fsearch-result-table-fav__item > a');
            const registerFav     = document.querySelector('.pcm-fsearch-snackbar--al-02');
            const registerFavErr  = document.querySelector('.pcm-fsearch-snackbar--al-03');
            const footerFav           = document.getElementsByClassName('footer-fav')[0];

            for(let i=0; i<link_onSnackbar.length; i++) {
                link_onSnackbar[i].addEventListener('click', function(e) {
                    e.preventDefault();
                    if(this.classList.contains('pcm-fsearch-on-snackbar--al-02')) {
                        /**
                         * 「最近チェックした銘柄」が開いてるか 判定
                         */
                        if(!footerFav.classList.contains('footer-fav--open')) {
                            registerFav.classList.add('is-show');
                            setTimeout(function() {
                                registerFav.classList.remove('is-show');
                            }, 3800);
                        } else {
                            registerFav.classList.add('is-show2', 'is-open-footer-fav');
                            setTimeout(function() {
                                registerFav.classList.remove('is-show2');
                                setTimeout(function() {
                                    registerFav.classList.remove('is-open-footer-fav');
                                });
                            }, 3800);
                        }
                    } else if(this.classList.contains('pcm-fsearch-on-snackbar--al-03')) {
                        /**
                         * 「最近チェックした銘柄」が開いてるか 判定
                         */
                        if(!footerFav.classList.contains('footer-fav--open')) {
                            registerFavErr.classList.add('is-show');
                            setTimeout(function() {
                                registerFavErr.classList.remove('is-show');
                            }, 3800);
                        } else {
                            registerFavErr.classList.add('is-show2', 'is-open-footer-fav');
                            setTimeout(function() {
                                registerFavErr.classList.remove('is-show2');
                                setTimeout(function() {
                                    registerFavErr.classList.remove('is-open-footer-fav');
                                });
                            }, 3800);
                        }
                    } else {
                        return false;
                    }
                });
            }
        }


        /**
         * モーダル
         */
        {
            /**
             * モーダル トリガーボタン 取得
             * @type {Object}
             */
            const tgtModalBtn = document.querySelectorAll('.pcm-fsearch-target-modal');

            /**
             * モーダル 取得
             * @param  {Object} '.pcm-fsearch-modal'
             */
            const tgtModal = document.querySelectorAll('.pcm-fsearch-modal');

            /**
             * 開いてるモーダルを数える
             * @type {Function}
             * @return {Number}
             */
            const countModal = function() {
                const shownModal = document.querySelectorAll('.pcm-fsearch-modal.is-show');
                return shownModal.length;
            };

            const scrollbarSize = window.innerWidth - document.body.clientWidth;

            const openModal = function(e) {
                e.preventDefault();

                /**
                 * クリックしたモーダルボタンのIDを取得して分割
                 */
                const _this     = e.currentTarget;
                const getBtnId  = _this.getAttribute('id');
                const btnIdText = getBtnId.split('--');

                /**
                 * IDで対象のモーダルを判別
                 */
                const idNamePrefix = 'pcm-fsearch-modal--';
                const makedIdName  = idNamePrefix + btnIdText[1];
                const targetModal  = document.getElementById(makedIdName);

                /**
                 * モーダルの高さ設定（画面の80%）
                 */
                const targetModalBody = targetModal.querySelector('.pcm-fsearch-modal__body');
                const windowHeight    = Math.round(window.innerHeight * 0.8);
                const modalBodyHeight = windowHeight - (72 + 90);
                targetModalBody.style.height = modalBodyHeight + 'px';

                /**
                 * Class付与
                 */
                targetModal.classList.add('is-active');
                setTimeout(function() {
                    targetModal.classList.add('is-show');
                });

                document.body.classList.add('is-modal-open');
                document.body.style.paddingRight = scrollbarSize + 'px';
            };

            for(let i=0; i<tgtModalBtn.length; i++) {
                tgtModalBtn[i].removeEventListener('click', openModal);
                tgtModalBtn[i].addEventListener('click', openModal);
            }

            /**
             * Close ボタン
             */
            for(let i=0; i<tgtModal.length; i++) {
                const btnModalClose = tgtModal[i].querySelectorAll('.pcm-fsearch-modal__dismiss');

                for(let j=0; j<btnModalClose.length; j++) {
                    btnModalClose[j].addEventListener('click', function() {
                        const rootElem = this.closest('.pcm-fsearch-modal');
                        const len      = countModal();

                        rootElem.classList.remove('is-show');
                        setTimeout(function() {
                            rootElem.classList.remove('is-active');
                        });

                        /**
                         * 開いてるモーダルが無ければ背景を消す
                         */
                        if(len === 1) {
                            document.body.classList.remove('is-modal-open');
                            document.body.removeAttribute('style');
                        }
                    });
                }
            }
        }


        /**
         * スナックバー　通知
         */
        if(typeof document.getElementsByClassName('pcm-fsearch-on-snackbar--al-01')[0] !== 'undefined') {
            /**
             * 検索条件 削除
             */
            const btn_onSnackbar_al01 = document.querySelector('.pcm-fsearch-on-snackbar--al-01');
            const del_searchCondition = document.querySelector('.pcm-fsearch-snackbar--al-01');
            const footerFav           = document.getElementsByClassName('footer-fav')[0];

            btn_onSnackbar_al01.addEventListener('click', function(e) {
                e.stopPropagation();

                /**
                 * 「最近チェックした銘柄」が開いてるか 判定
                 */
                if(!footerFav.classList.contains('footer-fav--open')) {
                    del_searchCondition.classList.add('is-show');
                    setTimeout(function() {
                        del_searchCondition.classList.remove('is-show');
                    }, 3800);
                } else {
                    del_searchCondition.classList.add('is-show2', 'is-open-footer-fav');
                    setTimeout(function() {
                        del_searchCondition.classList.remove('is-show2');
                        setTimeout(function() {
                            del_searchCondition.classList.remove('is-open-footer-fav');
                        });
                    }, 3800);
                }
            });
        }


        /**
         * Sort アイコン切り替え
         */
        {
            /**
             * 対象となるソートアイコン
             */
            const sortSwitch = document.querySelectorAll('.pcm-fsearch-result-table__sort img');

            /**
             * アイコンの全種類
             * @type {Object} Array
             */
            const sortIcon = ['icn-change-order.svg', 'icn-change-order-asc.svg', 'icn-change-order-desc.svg'];

            /**
             * 画像のパス
             * @type {String}
             */
            const imgPath = '/web/shared/img/fund/search/';

            /**
             * 初期化
             */
            const initSort = function() {
                for(let i=0; i<sortSwitch.length; i++) {
                    sortSwitch[i].setAttribute('src', imgPath + sortIcon[0]);
                }
            };

            /**
             * 画像切り替え
             * @type {Function}
             */
            const onSwitch = function(e) {
                e.preventDefault();

                /**
                 * クリックした画像ファイル名 取得
                 */
                const _this       = e.target;
                const imgSrc      = _this.src;
                const imgFileName = imgSrc.split('/').slice(-1)[0];

                switch (imgFileName) {
                    case sortIcon[0]:
                        initSort();
                        _this.setAttribute('src', imgPath + sortIcon[1]);
                        break;

                    case sortIcon[1]:
                        initSort();
                        _this.setAttribute('src', imgPath + sortIcon[2]);
                        break;

                    case sortIcon[2]:
                        initSort();
                        _this.setAttribute('src', imgPath + sortIcon[0]);
                        break;

                    default:
                        break;
                }
            };

            for(let i=0; i<sortSwitch.length; i++) {
                sortSwitch[i].removeEventListener('click', onSwitch, false);
                sortSwitch[i].addEventListener('click', onSwitch, false);
            }
        }


        /**
         * 楽天証券分類 - チェックボックス全選択
         */
        {
            const tgtIsModal = document.getElementById('pcm-fsearch-modal--classification');
            const CbThAll    = tgtIsModal.querySelectorAll('th input');
            const CbTd       = tgtIsModal.querySelectorAll('td input');

            /**
             * thのチェックボックスにチェックが入ったら、tdのチェックボックスにもチェックが入る
             * name属性で判別
             */
            for(let j=0; j<CbThAll.length; j++) {
                CbThAll[j].addEventListener('change', function() {
                    const cbAttrName = this.getAttribute('name');
                    const CbTdAll = document.querySelectorAll('td input[name="' + cbAttrName + '"]');

                    for(let k=0; k<CbTdAll.length; k++) {
                        if(this.checked) {
                            CbTdAll[k].checked = true;
                        } else {
                            CbTdAll[k].checked = false;
                        }
                    }
                });
            }

            /**
             * tdのチェックボックス判定
             */
            for(let j=0; j<CbTd.length; j++) {
                CbTd[j].addEventListener('change', function() {
                    const cbAttrName = this.getAttribute('name');

                    /**
                     * 対象のthのチェックボックス
                     */
                    const parentsTd  = this.closest('td');
                    const prevElemTh = parentsTd.previousElementSibling;
                    const targetCbTh = prevElemTh.querySelector('input[name="' + cbAttrName + '"]');

                    /**
                     * 対象のtdのチェックボックス
                     */
                    const rootTr     = this.closest('tr');
                    const targetCbTd = rootTr.querySelectorAll('td input[name="' + cbAttrName + '"]');

                    /**
                     * 対象のtdのチェックボックスでチェックされてる数
                     * @type {Number}
                     */
                    const targetCbTd_checked = rootTr.querySelectorAll('td input[name="' + cbAttrName + '"]:checked').length;

                    /**
                     * 対象のtdのチェックボックスの総数
                     * @type {Number}
                     */
                    const max_CbTdLen = targetCbTd.length;

                    for(let k=0; k<targetCbTd.length; k++) {
                        if(!targetCbTd[k].checked) {
                            targetCbTh.checked = false;
                        } else {
                            if(targetCbTd_checked === max_CbTdLen) {
                                targetCbTh.checked = true;
                            }
                        }
                    }
                });
            }
        }


        /**
         * 検索条件の保存　制御
         */
        if(fsearchNisa === undefined) {
            const modalSaveCondition = document.getElementById('pcm-fsearch-modal--save-condition');
            const modalOverwriteSave = document.getElementById('pcm-fsearch-modal--save-condition-confirm');
            const btnOverwriteSave   = modalOverwriteSave.getElementsByClassName('pcm-fsearch-on-snackbar--speech-bubble')[0];
            const alertMsg           = document.getElementsByClassName('pcm-fsearch-snackbar--speech-bubble')[0];

            /**
             * ページトップへスクロールする関数
             */
            /*
            const topScroll = function() {
                if(document.scrollingElement.scrollTop < 10) {
                  document.scrollingElement.scrollTop = 0;
                } else {
                  document.scrollingElement.scrollTop = document.scrollingElement.scrollTop / 1.4; // スピード調整 1.1～2
                  setTimeout(topScroll , 10);
                }
            };
            */

            const closeModal = function(e) {
                e.preventDefault();
                modalOverwriteSave.classList.remove('is-show');
                modalSaveCondition.classList.remove('is-show');
                setTimeout(function() {
                    modalOverwriteSave.classList.remove('is-active');
                    modalSaveCondition.classList.remove('is-active');
                }, 1000);
                document.body.classList.remove('is-modal-open');
                document.body.removeAttribute('style');

                // setTimeout(function() {
                //     topScroll();

                    alertMsg.classList.add('is-show');
                    setTimeout(function() {
                        alertMsg.classList.remove('is-show');
                    }, 2800);
                // });
            };

            btnOverwriteSave.removeEventListener('click', closeModal, false);
            btnOverwriteSave.addEventListener('click', closeModal, false);

            /**
             * 検索条件を保存モーダル内
             * テキストフィールドの文字数カウント
             */
            const targetTextField = document.getElementById('pcm-fsearch-input--condition-name');
            const textCounter     = modalSaveCondition.getElementsByClassName('pcm-fsearch-save-condition__help__count-num')[0];
            targetTextField.addEventListener('keyup', function(e) {
                if(targetTextField.value.length < 21) {
                    textCounter.textContent = targetTextField.value.length;
                }
            });

            /**
             * 検索条件を保存モーダル内
             * 保存先をテキストフィールドに反映処理
             */
            const radio      = modalSaveCondition.getElementsByClassName('pcm-fsearch-radio-button');
            const radio1_val = modalSaveCondition.getElementsByClassName('pcm-fsearch-radio-button-text')[0];
            targetTextField.value = radio1_val.textContent;
            for(let i=0; i<radio.length; i++) {
                radio[i].addEventListener('change', function() {
                    const radioVal = this.nextElementSibling;
                    targetTextField.value = radioVal.textContent;
                });
            }
        }


        /**
         * タグの削除
         * 楽天証券分類、運用（委託）会社
         */
        {
            const sidebar = document.getElementsByClassName('pcm-fsearch-sidebar')[0];
            const tagList  = sidebar.getElementsByClassName('pcm-fsearch-tag');
            const onDelete = function(e) {
                e.preventDefault();
                const _this       = e.currentTarget;
                const tagListItem = _this.closest('.pcm-fsearch-tag__list');
                tagListItem.classList.add('is-fadeout');
                setTimeout(function() {
                    tagListItem.remove();
                }, 80);
            };

            for(let i=0; i<tagList.length; i++) {
                const tagListItem_del = tagList[i].getElementsByClassName('pcm-fsearch-tag__dismiss');

                for(let j=0; j<tagListItem_del.length; j++) {
                    tagListItem_del[j].removeEventListener('click', onDelete, false);
                    tagListItem_del[j].addEventListener('click', onDelete, false);
                }
            }
        }


        /**
         * Tooltip
         * ツールチップ
         */
        {
            const pcmFsearch = document.getElementById('pcm-fsearch');
            let isTooltipFund = false;

            if(pcmFsearch) {
                const tooltipIcon = pcmFsearch.querySelectorAll('.rex-icon-help-outline');
                const tooltipFundSevenIcon = pcmFsearch.querySelectorAll('.sure-icon-fund-seven-outline');
                const tooltipFundSelectionIcon = pcmFsearch.querySelectorAll('.sure-icon-fund-selection-outline');
                const tooltipFundAwardIcon = pcmFsearch.querySelectorAll('.sure-icon-fund-award-outline');
                const tooltipCart = pcmFsearch.getElementsByClassName('pcm-fsearch-tooltip--cart')[0];

                const initTooltip = function() {
                    event.preventDefault();
                    if ( isTooltipFund ) {
                        const fundCloneTooltip = document.querySelectorAll('.is-fund-clone-tooltip');
                        for(let j=0; j<fundCloneTooltip.length; j++) {
                            fundCloneTooltip[j].parentNode.removeChild(fundCloneTooltip[j]);
                        }

                        isTooltipFund = false;
                    } else {
                        const fsearchTooltipAll = document.querySelectorAll('.pcm-fsearch-tooltip');

                        for(let j=0; j<fsearchTooltipAll.length; j++) {
                            fsearchTooltipAll[j].classList.remove('is-active');
                        }
                        const tooltipCloneNode = document.getElementById('tooltipCloneNode');
                        if (tooltipCloneNode) {
                            tooltipCloneNode.parentNode.removeChild(tooltipCloneNode);
                        }

                        const fsearchSticky = pcmFsearch.querySelectorAll('.pcm-fsearch-sticky');
                        if (fsearchSticky) {
                            for(let i=0; i<fsearchSticky.length; i++) {
                                fsearchSticky[i].style.zIndex = null;
                            }
                        }
                    }
                    document.body.removeEventListener('click', tooltipOtherClick);
                    tooltipFlag = false;
                };

                const tooltipOtherClick = function(event) {
                    const target = event.target;
                    const tooltipArea = target.closest('.pcm-fsearch-tooltip');
                    if(!tooltipArea) {
                        initTooltip();
                    }
                };

                const switchTooltipDisplay = function(event) {
                    event.stopPropagation();
                    const tooltipContent = this.parentNode.getElementsByClassName('pcm-fsearch-tooltip')[0];
                    if(tooltipContent) {
                        const fsearchSidebar = pcmFsearch.getElementsByClassName('pcm-fsearch-sidebar');
                        if (fsearchSidebar) {
                            fsearchSidebar[0].addEventListener('scroll', initTooltip);
                        }

                        if(!tooltipContent.classList.contains('is-active') && !tooltipContent.classList.contains('is-view')) {
                            initTooltip();
                            if (!isTooltipFund) {
                                const fsearchSticky = this.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('pcm-fsearch-sticky');
                                if (fsearchSticky) {
                                    this.parentNode.parentNode.parentNode.style.zIndex = 4;
                                }

                                document.body.addEventListener('click', tooltipOtherClick);
                                const thisRect = this.getBoundingClientRect();

                                const searchWrap = pcmFsearch.getElementsByClassName('pcm-fsearch-selection-condition__inner');
                                if(searchWrap) {
                                    const searchWrapRect = searchWrap[0].getBoundingClientRect();
                                    const searchWrapLeft = searchWrapRect.left;
                                    if (thisRect.left - tooltipContent.offsetWidth < searchWrapLeft) {
                                        /**
                                         * 画面左の場合は右に表示
                                         */
                                        tooltipContent.classList.add('is-left');
                                    } else if(thisRect.left + (tooltipContent.offsetWidth / 2) > searchWrapLeft + searchWrap[0].offsetWidth) {
                                        /**
                                         * 画面右の場合は左に表示
                                         */
                                        tooltipContent.classList.add('is-right');
                                    }
                                }

                                /**
                                 * 画面上部の場合は下に表示
                                 */
                                if (thisRect.top < tooltipContent.offsetHeight) {
                                    tooltipContent.classList.add('is-down');
                                } else {
                                    tooltipContent.classList.remove('is-down');
                                }

                                const tooltipContent_copy = tooltipContent.cloneNode(true);
                                tooltipContent_copy.setAttribute("id","tooltipCloneNode");
                                pcmFsearch.appendChild(tooltipContent_copy);
                                tooltipContent.classList.add('is-active');
                                tooltipContent_copy.classList.add('is-view');
                                const tooltipContentRect = tooltipContent.getBoundingClientRect();
                                tooltipContent_copy.style.left   = tooltipContentRect.left + window.pageXOffset + "px";
                                tooltipContent_copy.style.top    = tooltipContentRect.top + window.pageYOffset + "px";
                                tooltipContent_copy.style.height = tooltipContent.offsetHeight + "px";
                                tooltipFlag = true;

                                const tooltipDismiss = tooltipContent_copy.getElementsByClassName('pcm-fsearch-tooltip__dismiss')[0];
                                if (tooltipDismiss) {
                                    tooltipDismiss.removeEventListener('click', initTooltip);
                                    tooltipDismiss.addEventListener('click', initTooltip);
                                }
                                isTooltipFund = false;
                            }


                        } else {
                            tooltipContent.classList.remove('is-active');
                            initTooltip();
                        }
                    } else {
                        if(!tooltipContent || tooltipContent && !tooltipContent.classList.contains('is-view')) {
                            initTooltip();
                            if ( this.classList.contains('sure-icon-fund-seven-outline') == true || this.classList.contains('sure-icon-fund-selection-outline') == true || this.classList.contains('sure-icon-fund-award-outline') == true ){
                                isTooltipFund = true;
                                document.body.addEventListener('click', tooltipOtherClick);

                                let tooltipFund;
                                if ( this.classList.contains('sure-icon-fund-seven-outline') == true ) {
                                    tooltipFund = document.getElementById('tooltipFundSeven');
                                } else if ( this.classList.contains('sure-icon-fund-selection-outline') == true ) {
                                    tooltipFund = document.getElementById('tooltipFundSselection');
                                } else if ( this.classList.contains('sure-icon-fund-award-outline') == true ) {
                                    tooltipFund = document.getElementById('tooltipFundAward');
                                }

                                const tooltipFund_copy = tooltipFund.cloneNode(true);
                                this.parentNode.appendChild(tooltipFund_copy);
                                tooltipFund_copy.classList.add('is-view','is-fund-clone-tooltip');
                                tooltipFund_copy.setAttribute("id","tooltipCloneNode");

                                /**
                                 * 画面上部の場合は下に表示
                                 */
                                const thisRect = this.getBoundingClientRect();
                                if (thisRect.top < tooltipFund_copy.offsetHeight + 20) {
                                    tooltipFund_copy.classList.add('is-down');
                                } else {
                                    tooltipFund_copy.classList.remove('is-down');
                                }

                                const tooltipDismiss = tooltipFund_copy.getElementsByClassName('pcm-fsearch-tooltip__dismiss')[0];
                                if (tooltipDismiss) {
                                    tooltipDismiss.removeEventListener('click', initTooltip);
                                    tooltipDismiss.addEventListener('click', initTooltip);
                                }
                                tooltipFlag = true;
                            }

                        } else {
                            initTooltip();
                            isTooltipFund = false;
                        }


                    }
                };

                for(let i=0; i<tooltipIcon.length; i++) {
                    tooltipIcon[i].removeEventListener('click', switchTooltipDisplay);
                    tooltipIcon[i].addEventListener('click', switchTooltipDisplay);
                }
                for(let i=0; i<tooltipFundSevenIcon.length; i++) {
                    tooltipFundSevenIcon[i].removeEventListener('click', switchTooltipDisplay);
                    tooltipFundSevenIcon[i].addEventListener('click', switchTooltipDisplay);
                }
                for(let i=0; i<tooltipFundSelectionIcon.length; i++) {
                    tooltipFundSelectionIcon[i].removeEventListener('click', switchTooltipDisplay);
                    tooltipFundSelectionIcon[i].addEventListener('click', switchTooltipDisplay);
                }
                for(let i=0; i<tooltipFundAwardIcon.length; i++) {
                    tooltipFundAwardIcon[i].removeEventListener('click', switchTooltipDisplay);
                    tooltipFundAwardIcon[i].addEventListener('click', switchTooltipDisplay);
                }
            }
        }


        /**
         * 表組のTHのスクロール固定
         *
         */
        {
            let browserIeFlag = false;
            const userAgent = window.navigator.userAgent.toLowerCase();
            let tableHeaderIeHeight = 0;

            if (userAgent.indexOf('msie') != -1 || userAgent.indexOf('trident') != -1) {
                browserIeFlag = true;
            }

            const ieScrollInit = function() {
                const tableHeaderIe = document.getElementById('fsearch-tableHeader-Ie');
                if (tableHeaderIe) {
                    tableHeaderIe.parentNode.removeChild(tableHeaderIe);
                }

                const fsearchTabPanel = document.querySelector('.pcm-fsearch-tab-panel.is-active');

                if (fsearchTabPanel) {
                    const fsearchTable = fsearchTabPanel.querySelector('.pcm-fsearch-table');
                    const fsearchTableHeader = fsearchTable.getElementsByTagName('tr')[0];
                    const fsearchTableHeader2 = fsearchTable.getElementsByTagName('tr')[1];
                    const fsearchTableHeader_copy = fsearchTableHeader.cloneNode(true);

                    const fsearchTableHeaderTh = fsearchTableHeader.getElementsByTagName('th');
                    tableHeaderIeHeight = fsearchTableHeader.clientHeight;

                    const fsearchTableHeader_Ie = document.createElement("table");
                    fsearchTableHeader_Ie.appendChild(fsearchTableHeader_copy);
                    fsearchTableHeader_Ie.className = fsearchTable.className;
                    fsearchTableHeader_Ie.classList.add('pcm-fsearch-table__copy-header');
                    fsearchTableHeader_Ie.setAttribute("id","fsearch-tableHeader-Ie");

                    const fsearchTableHeader2Th = fsearchTableHeader2.getElementsByTagName('th');

                    if (fsearchTableHeader2Th.length)  {
                        const fsearchTableHeader2_copy = fsearchTableHeader2.cloneNode(true);
                        fsearchTableHeader_Ie.appendChild(fsearchTableHeader2_copy);
                    }

                    const fsearchTableHeader_IeTh = fsearchTableHeader_Ie.getElementsByTagName('th');
                    for(let j=0; j < fsearchTableHeaderTh.length; j++) {
                        if (fsearchTableHeader_IeTh[j]) {
                            fsearchTableHeader_IeTh[j].style.width = fsearchTableHeaderTh[j].clientWidth + "px";
                        }
                    }
                    for(let j=0; j < fsearchTableHeader_IeTh.length; j++) {
                        fsearchTableHeader_IeTh[j].classList.add('is-fixed');
                    }
                    fsearchTabPanel.appendChild(fsearchTableHeader_Ie);
                }
            };

            if (!browserIeFlag) {
                const fsearchSticky = document.querySelectorAll('.pcm-fsearch-sticky');
                const observer = new IntersectionObserver(function(entries){
                    entries.forEach( function( entry ) {
                        if (entry.isIntersecting) {
                            for(let i=0; i<fsearchSticky.length; i++) {
                                fsearchSticky[i].classList.remove('is-fixed');
                            }
                        } else {
                            for(let i=0; i<fsearchSticky.length; i++) {
                                fsearchSticky[i].classList.add('is-fixed');
                            }
                        }
                    });
                });
                if(document.getElementById('pcm-fsearch-comparison-top') !== null) {
                    observer.observe(document.getElementById('pcm-fsearch-comparison-top'));
                }
            } else {
                let timeoutTableHeader;
                window.addEventListener( "scroll", function () {
                    if ( timeoutTableHeader ) return ;

                    timeoutTableHeader = setTimeout( function () {
                        timeoutTableHeader = 0 ;
                        const fsearchTabPanel = document.querySelector('.pcm-fsearch-tab-panel.is-active');
                        const fsearchTabPanelRect = fsearchTabPanel.getBoundingClientRect();
                        const fsearchTabPanelTop = fsearchTabPanelRect.top + window.pageYOffset;
                        const fsearchTabPanelHeight = fsearchTabPanel.clientHeight;
                        const fsearchTabPanelBottom = fsearchTabPanelRect.top + window.pageYOffset + fsearchTabPanelHeight;
                        const tableHeaderIe = document.getElementById('fsearch-tableHeader-Ie');

                        if (window.pageYOffset > fsearchTabPanelTop + 20 && window.pageYOffset < fsearchTabPanelBottom - tableHeaderIeHeight) {
                            tableHeaderIe.classList.add('is-top');
                        } else {
                            tableHeaderIe.classList.remove('is-top');
                        }
                    }, 250 ) ;
                } )
                ieScrollInit();

                const fsearchNavLink = document.querySelectorAll('.pcm-fsearch-nav__link');
                for(let j=0; j < fsearchNavLink.length; j++) {
                    fsearchNavLink[j].addEventListener('click', ieScrollInit);
                }

            }

        }
    });

    /**
     * スクリムクリック 処理
     */
    window.onclick = function(event) {
        const tgtTarget       = event.target;
        const tgtParents      = tgtTarget.closest('.pcm-fsearch-dropdown__content');
        const tgtModalArea    = tgtTarget.closest('.pcm-fsearch-modal');
        const tgtModalContent = tgtTarget.closest('.pcm-fsearch-modal__content');
        clickEvent = false;
        if(!tgtModalArea) {
            /**
             * ドロップダウンメニューの外側をクリックした場合、ドロップダウンメニューを閉じる。
             */
            if(!tgtParents) {
                const dropdowns = document.getElementsByClassName('pcm-fsearch-dropdown__content');
                for(let i=0; i<dropdowns.length; i++) {
                    const openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('is-active')) {
                        openDropdown.classList.remove('is-active');
                        openDropdown.previousElementSibling.setAttribute('aria-expanded', false);
                        if(openDropdown.classList.contains('pcm-fsearch-result-table__content--fav')) {
                            openDropdown.remove();
                        }
                    }
                }
            }
        } else {
            /**
             * モーダルの背景クリックで閉じる
             */
            if(!tgtModalContent) {
                tgtModalArea.classList.remove('is-show');
                setTimeout(function() {
                    tgtModalArea.classList.remove('is-active');
                });
                document.body.classList.remove('is-modal-open');
                document.body.removeAttribute('style');
                return false;
            }
        }

    }


    /**
     * サイドメニューの高さを表の高さに合わせる
     */
    let scrollEvent = 0;
    let clickEvent = false;
    let tooltipFlag = false;
    window.addEventListener( "scroll", function () {

        if (tooltipFlag) {
            scrollEvent2 = setTimeout( function () {
                const tooltipCloneNode = document.getElementById('tooltipCloneNode');
                if (tooltipCloneNode) {
                    tooltipCloneNode.parentNode.removeChild(tooltipCloneNode);
                }
                tooltipFlag = false;
            },250);
        }

        if ( scrollEvent ) return ;
        if ( clickEvent ) return ;
        scrollEvent = setTimeout( function () {
            scrollEvent = 0 ;
            const mainContainer = document.getElementsByClassName('pcm-fsearch-container__main')[0];
            const containerSide = document.getElementsByClassName('pcm-fsearch-container__side')[0];
            const resultBottom = document.getElementsByClassName('pcm-fsearch-result--bottom')[0];
            if (mainContainer && containerSide && resultBottom) {
                resultBottom
                const resultBottomRect = resultBottom.getBoundingClientRect();
                const containerSideRect = containerSide.getBoundingClientRect();
                const resultBottomTop = resultBottomRect.top + window.pageYOffset
                const containerSideTop = containerSideRect.top + window.pageYOffset

                const fsearchSidebar = containerSide.getElementsByClassName('pcm-fsearch-sidebar')[0];

                containerSide.style.height = mainContainer.clientHeight - 190 + 'px';
                clickEvent = true;

                // if (window.parent.screen.height > resultBottomTop) {
                //     fsearchSidebar.style.height = resultBottomTop - containerSideTop - 50 + "px";
                // } else {
                //     fsearchSidebar.style.height = null;
                // }


            }
            if (tooltipFlag) {
                const tooltipCloneNode = document.getElementById('tooltipCloneNode');
                if (tooltipCloneNode) {
                    tooltipCloneNode.parentNode.removeChild(tooltipCloneNode);
                }
                tooltipFlag = false;
            }
        },250);
    });


    /**
     * 画面リサイズでツールチップ閉じる
     */
    let resizeEvent = 0;
    window.addEventListener( "resize", function () {

        if ( resizeEvent ) return ;
        resizeEvent = setTimeout( function () {
            resizeEvent = 0 ;
            if (tooltipFlag) {
                const tooltipCloneNode = document.getElementById('tooltipCloneNode');
                if (tooltipCloneNode) {
                    tooltipCloneNode.parentNode.removeChild(tooltipCloneNode);
                }
                tooltipFlag = false;
            }
        }, 500 ) ;
    } ) ;
}


