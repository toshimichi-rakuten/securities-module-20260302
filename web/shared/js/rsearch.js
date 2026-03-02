'use strict';

(function () {
  /* Utils */
  // Constanst
  const QUERY_URL =
    'https://gateway-api.global.rakuten.com/bot/deepqa-knowledge-discovery-sec-visitor/v4/sec-search-visitor/query';

  const SMART_INPUT_URL =
    'https://gateway-api.global.rakuten.com/bot/deepqa-smart-input-sec-search/sec-search-visitor/smart-input';

  const SMART_ADS_URL = 'https://gateway-api.global.rakuten.com/bot/deepqa-smart-ad-sec/secsearchvisitor/smart-ads';

  const FREQ_WORDS_URL =
    'https://gateway-api.global.rakuten.com/bot/deepqa-analytics-sec/secsearchvisitor/frequently-search-words?count=5';

  const COMMON_ISSUES_URL =
    'https://gateway-api.global.rakuten.com/bot/deepqa-analytics-sec/secsearchvisitor/common-questions?count=3&category=site';

  const LOGGING_API_URL =
    'https://gateway-api.global.rakuten.com/bot/deepqa-data-collection-api-sec/sec_search_visitor/user_journey/send-data';

  // Set global variables
  const rsearchResultMain = document.querySelector('.v1-rsearch-result__main');
  const rsearchResultSub = document.querySelector('.v1-rsearch-result__sub');

  // Modal search
  const searchModalInput = document.querySelector('.js-search-modal-input');
  const searchModalSubmit = document.querySelector('.js-search-modal-submit');
  const searchModalResult = document.querySelector('.js-search-modal-result .v1-rsearch-modal__articles');

  // Page search
  const searchInputs = document.querySelectorAll('.js-rsearch-input');
  const searchListboxes = document.querySelectorAll('.js-rsearch-listbox');
  const searchSubmits = document.querySelectorAll('.js-rsearch-submit');

  // Configuration object
  const CONFIG = {
    faqLists: [
      { id: 'v1-rsearch-frequent-keywords', apiUrl: FREQ_WORDS_URL, type: 'keywords' },
      { id: 'v1-rsearch-no-result-frequent-keywords', apiUrl: FREQ_WORDS_URL, type: 'keywords' },
      { id: 'v1-rsearch-frequent-questions', apiUrl: COMMON_ISSUES_URL, type: 'questions' },
    ],
    incrementalSearchApiUrl: SMART_INPUT_URL,
    smartInputApiUrl: SMART_INPUT_URL,
    queryApiUrl: QUERY_URL,
    smartAdApiUrl: SMART_ADS_URL,
    historyStorageKey: 'history-rsearch-words',
    maxHistoryItems: 5,
    searchPath: '/web/rsearch/',
  };

  const paginationState = {
    all: { currentPage: 1, resultsPerPage: 10 },
    site: { currentPage: 1, resultsPerPage: 10 },
    stock: { currentPage: 1, resultsPerPage: 10 },
    stockAll: { currentPage: 1, resultsPerPage: 10 },
    stockFund: { currentPage: 1, resultsPerPage: 10 },
    stockJapan: { currentPage: 1, resultsPerPage: 10 },
    stockUs: { currentPage: 1, resultsPerPage: 10 },
    stockChina: { currentPage: 1, resultsPerPage: 10 },
    stockAsean: { currentPage: 1, resultsPerPage: 10 },
    tousiru: { currentPage: 1, resultsPerPage: 10 },
    video: { currentPage: 1, resultsPerPage: 10 },
    faq: { currentPage: 1, resultsPerPage: 10 },
  };

  const tabMapping = {
    all: 'resultTabpnl-1',
    site: 'resultTabpnl-2',
    stock: 'resultTabpnl-3',
    stockAll: 'issueTabpnl-1',
    stockFund: 'issueTabpnl-2',
    stockJapan: 'issueTabpnl-3',
    stockUs: 'issueTabpnl-4',
    stockChina: 'issueTabpnl-5',
    stockAsean: 'issueTabpnl-6',
    tousiru: 'resultTabpnl-4',
    video: 'resultTabpnl-5',
    faq: 'resultTabpnl-6',
  };

  // Initialize app
  const init = async () => {
    try {
      if (document.getElementById('modalRSearch')) {
        /* Modal search */
        // Fetch「よく検索されるワード」and「よくあるご質問」
        await Promise.all(
          CONFIG.faqLists.map(async (list) => {
            const data = await fetchDataGET(list.apiUrl);
            updateList(data, list.id, list.type);
          })
        );

        // Fetch smart ads
        const smartAdData = await fetchDataPOST(CONFIG.smartAdApiUrl, { query: '' });
        updateModalSmartAds(smartAdData);

        // Set 検索履歴
        updateList(getSearchHistory(), 'v1-rsearch-history', 'history');

        if (searchModalInput) {
          // Incremental search
          searchModalInput.addEventListener('input', debounce(handleModalIncSearch, 300));
          // Users input search keywords and press enter
          searchModalInput.addEventListener('keypress', handleEnterSearch);
        } else {
          console.error('Search input element not found');
        }

        // Users input search keywords and click on search icon
        if (searchModalSubmit) {
          searchModalSubmit.addEventListener('click', () => handleSearch(searchModalInput.value));
        } else {
          console.error('Search button element not found');
        }
      }

      /* Web search */
      if (document.getElementById('rsearch-head')) {
        // Hide result sections by default
        hideResultSections();

        // Get search query param from URL
        await handleQueryParam();

        if (searchInputs.length > 0) {
          searchInputs.forEach((input) => {
            input.addEventListener('input', debounce(handleSmartInput, 300));
            // Add event listener for Enter key
            input.addEventListener('keypress', handleEnterSearch);
          });
        } else {
          console.error('Smart search input elements not found');
        }

        if (searchListboxes.length > 0) {
          searchListboxes.forEach((listbox) => {
            listbox.addEventListener('click', handleSearchListbox);
          });
        } else {
          console.error('Search listbox elements not found');
        }

        if (searchSubmits.length > 0) {
          searchSubmits.forEach((submit) => {
            submit.addEventListener('click', () =>
              handleSearch(submit.closest('.v1-rsearch-search').querySelector('.js-rsearch-input').value)
            );
          });
        } else {
          console.error('Search submit elements not found');
        }
      }
    } catch (error) {
      console.error('Error initializing app:', error);
    }
  };

  // Update list in the UI
  // Update the Questions List
  const updateQuestionsList = (data, ulId) => {
    const ul = document.getElementById(ulId);
    if (!ul) {
      console.warn(`UL element not found: ${ulId}`);
      return;
    }

    ul.innerHTML = '';
    ul.className = '';

    data.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = `v1-rsearch-typo--regular-lv2${index < data.length - 1 ? ' v1-rsearch--is-mb-8' : ''}`;

      const a = document.createElement('a');
      a.href = item.url;
      a.target = '_blank';
      a.textContent = item.title;
      a.addEventListener('click', async (e) => {
        await logClickUrl({
          sentFromDeepqa: false,
          isSmartInput: false,
          isSmartAd: false,
          isFaq: true,
          inputText: '',
          url: a.href,
          fromFrequentlySearchedWords: false,
          fromRelatedWord: false,
          fromSuggestion: false,
        });
      });

      const icon = document.createElement('i');
      icon.className = 'v1-rsearch-ico rex-icon-newwindow-outline v1-rsearch--is-ml-4';
      icon.setAttribute('aria-label', '新しいタブまたはウィンドウで開く');
      icon.setAttribute('role', 'img');

      a.appendChild(icon);
      li.appendChild(a);
      ul.appendChild(li);
    });
  };

  // Update the History List
  const updateHistoryList = (data, ulId) => {
    const ul = document.getElementById(ulId);
    if (!ul) {
      console.error(`UL element not found: ${ulId}`);
      return;
    }

    ul.innerHTML = '';
    ul.className = 'v1-rsearch-lst-inline v1-rsearch--is-flex-wrap';

    data.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'v1-rsearch-lst-inline__item v1-rsearch--is-mr-16';

      const a = document.createElement('a');
      a.className = 'v1-rsearch-lst-inline__link v1-rsearch-typo--regular-lv2';
      a.href = `${getDomain()}${CONFIG.searchPath}?q=${encodeURIComponent(item)}`;
      a.textContent = item;
      a.addEventListener('click', (e) => {
        e.preventDefault();
        redirectToSearch(item);
      });

      li.appendChild(a);
      ul.appendChild(li);
    });
  };

  // Update the Keywords List
  const updateKeywordsList = (data, ulId) => {
    const ul = document.getElementById(ulId);
    if (!ul) {
      return;
    }

    ul.innerHTML = '';

    data.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'v1-rsearch-lst-inline__item v1-rsearch--is-mr-16';

      const a = document.createElement('a');
      a.className = 'v1-rsearch-lst-inline__link v1-rsearch-typo--regular-lv2';
      a.href = `${getDomain()}${CONFIG.searchPath}?q=${encodeURIComponent(item.input_text)}`;
      a.textContent = item.input_text;
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const keyword = e.target.textContent;
        logInquiryInput({
          inquiryToSuggestion: keyword,
          inquiryToDeepqa: keyword,
          selectedSuggestionItem: null,
          suggestionItems: [],
          fromFrequentlySearchedWords: true,
          fromRelatedWord: false,
          fromSuggestion: false,
        });

        redirectToSearch(item.input_text, true, false);
      });

      li.appendChild(a);
      ul.appendChild(li);
    });
  };

  // Main updateList function delegating to specialized functions
  const updateList = (data, ulId, type) => {
    switch (type) {
      case 'history':
        updateHistoryList(data, ulId);
        break;
      case 'keywords':
        updateKeywordsList(data, ulId);
        break;
      case 'questions':
        updateQuestionsList(data, ulId);
        break;
      default:
        console.error('Unknown list type:', type);
    }
  };

  // Create search result HTML
  const createResultHTML = (item) => {
    const query = searchModalInput.value;

    const highlightedHeading = highlightText(
      item.question || item.document_metadata.original_title || item.document_metadata.parent_title || '',
      query
    );
    const highlightedDescription = highlightText(item.description, query);

    // Format viewCount
    const viewCount = item.document_metadata.viewCount || 0;
    const formattedViewCount = viewCount >= 10000 ? `${Math.floor(viewCount / 10000)}万` : viewCount;

    // Format publishedAt date
    let formattedDate = '';
    if (item.document_metadata.publishedAt) {
      const publishedDate = new Date(item.document_metadata.publishedAt);
      formattedDate = publishedDate.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    }

    // Check for icon requirements
    const isSpOnly = item.categories && item.categories.length === 1 && item.categories[0] === 'site-sp';
    const isExternalLink = !item.URL.includes('www.rakuten-sec.co.jp');

    const spIcon = isSpOnly
      ? '<i class="v1-rsearch-ico rex-icon-smartphone-outline v1-rsearch--is-ml-4" aria-label="スマートフォンサイトで開く" role="img"></i>'
      : '';
    const externalIcon = isExternalLink
      ? '<i class="v1-rsearch-ico rex-icon-newwindow-outline v1-rsearch--is-ml-4" aria-label="新しいタブまたはウィンドウで開く" role="img"></i>'
      : '';

    return `
      <article class="v1-rsearch-article">
        <div class="v1-rsearch-article__body">
          <p class="v1-rsearch-article__heading">
            <a href="${item.URL}" ${isExternalLink ? 'target="_blank"' : ''}>
              ${highlightedHeading}
              ${spIcon}
              ${externalIcon}
            </a>
          </p>
          <p class="v1-rsearch-article__text">${highlightedDescription}</p>
          ${
            item.categories && item.categories.includes('video')
              ? `
            <p class="v1-rsearch-article__data">
              <span>${item.document_metadata.channelTitle}</span>
              <span>${formattedViewCount}回視聴</span>
              <span>${formattedDate}</span>
            </p>
          `
              : ''
          }
          ${
            item.categories && item.categories.includes('toshiru')
              ? `
            <p class="v1-rsearch-article__data">
              ${formattedDate}
            </p>
          `
              : ''
          }
        </div>
        ${
          item.document_metadata.thumbnails
            ? `
        <figure class="v1-rsearch-article__figure">
          ${
            item.document_metadata.thumbnails.default.url
              ? `<a href="${item.URL}" target="_self">
                  <img src="${item.document_metadata.thumbnails.default.url}" alt="" width="176" height="99">
                </a>`
              : ''
          }
          ${
            item.document_metadata.duration
              ? `<span class="v1-rsearch-article__time">${formatDuration(item.document_metadata.duration)}</span>`
              : ''
          }
        </figure>`
            : ''
        }
      </article>
    `;
  };

  // Update search results in the UI
  const updateModalSearchResults = (data) => {
    if (!data || !data.quick_links) {
      searchModalResult.innerHTML = '';
      return;
    }

    // Clear existing content
    searchModalResult.innerHTML = '';

    // Create container
    const articlesContainer = document.createElement('div');
    articlesContainer.className = 'v1-rsearch-modal__articles';

    // Add each result
    data.quick_links.forEach((item) => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = createResultHTML(item);

      // Add event listener to the link
      const link = wrapper.querySelector('a');
      link.addEventListener('click', async (e) => {
        await logClickUrl({
          sentFromDeepqa: false,
          isSmartInput: true,
          isSmartAd: false,
          isFaq: false,
          inputText: searchModalInput.value,
          url: item.URL,
          fromFrequentlySearchedWords: false,
          fromRelatedWord: false,
          fromSuggestion: false,
        });
      });

      // Append the wrapper's content
      const content = wrapper.querySelector('*');
      if (content) {
        articlesContainer.appendChild(content);
      }
    });

    // Append the container to searchModalResult
    searchModalResult.appendChild(articlesContainer);
  };

  // Create smart input suggestion HTML
  const createSmartInputSuggestion = (suggestion, index) => {
    const item = document.createElement('div');
    item.className = 'v1-rsearch-search__item';

    const button = document.createElement('button');
    button.className = 'v1-rsearch-search__option';
    button.type = 'button';
    button.setAttribute('role', 'option');
    button.setAttribute('aria-selected', 'false');
    button.setAttribute('aria-controls', 'rsearch-search-input');
    button.value = suggestion.text;

    const icon = document.createElement('i');
    icon.className = 'v1-rsearch-ico rex-icon-search-outline';
    icon.setAttribute('role', 'img');
    icon.setAttribute('aria-hidden', 'true');

    const span = document.createElement('span');
    span.className = 'v1-rsearch-search__text';
    span.innerHTML = highlightComboText(suggestion.text, searchInputs[0].value);

    button.append(icon, span);
    item.appendChild(button);
    return item;
  };

  // Display smart input suggestions in the UI
  const displaySmartInputSuggestions = (suggestions) => {
    searchListboxes.forEach((listbox) => {
      if (listbox) {
        listbox.innerHTML = '';
        if (suggestions.length > 0) {
          listbox.append(...suggestions.map(createSmartInputSuggestion));
        }
      }
    });
  };

  // Create smart ads HTML
  const createModalSmartAdHTML = (ad) => `
    <li>
      <a href="${ad.url}" target="_blank">
        <img src="${ad.img}" alt="${ad.title}" width="176" height="75">
      </a>
    </li>
  `;

  const updateModalSmartAds = (data) => {
    const bannerContainer = document.querySelector('.v1-rsearch-modal__banners');

    if (!bannerContainer) {
      console.error('Banner container not found');
      return;
    }

    // Clear existing content
    bannerContainer.innerHTML = '';

    if (!data || !data.contents || data.contents.length === 0) {
      return;
    }

    const ul = document.createElement('ul');

    data.contents.forEach((item) => {
      const li = document.createElement('li');
      li.innerHTML = createModalSmartAdHTML(item);

      const link = li.querySelector('a');
      link.addEventListener('click', async (e) => {
        await logClickUrl({
          sentFromDeepqa: false,
          isSmartInput: false,
          isSmartAd: true,
          isFaq: false,
          inputText: searchModalInput.value,
          url: item.url,
          fromFrequentlySearchedWords: false,
          fromRelatedWord: false,
          fromSuggestion: false,
        });
      });

      ul.appendChild(li);
    });

    bannerContainer.appendChild(ul);
  };

  const createSmartAdHTML = (ad) => `
  <li class="v1-rsearch--is-mb-16">
    <a href="${ad.url}" target="_blank">
      <img src="${ad.img}" alt="${ad.title}" width="268" height="115">
    </a>
  </li>
`;

  const updateSmartAds = (data) => {
    const bannerContainer = document.querySelector('.v1-rsearch-result__sub');
    if (!bannerContainer) {
      console.error('Banner container not found');
      return;
    }

    if (!data || !data.contents || data.contents.length === 0) {
      bannerContainer.innerHTML = '';
      return;
    }

    const adsHTML = data.contents.map(createSmartAdHTML).join('');
    bannerContainer.innerHTML = `<ul>${adsHTML}</ul>`;
  };

  // Fetch data from API
  const fetchDataGET = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  const fetchDataPOST = async (url, data) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  // Utility functions
  function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
    );
  }

  function generateSessionId(force = false) {
    const STORAGE_KEY = 'session_id';
    const EXPIRY_KEY = 'session_expiry';
    const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

    // Check for existing valid session
    if (!force) {
      const existingId = sessionStorage.getItem(STORAGE_KEY);
      const expiryTime = sessionStorage.getItem(EXPIRY_KEY);
      const now = Date.now();

      if (existingId && expiryTime && now < parseInt(expiryTime)) {
        // Update expiry time on activity
        sessionStorage.setItem(EXPIRY_KEY, String(now + SESSION_DURATION));
        return existingId;
      }
    }

    // Generate new session ID if none exists or is expired
    const newId = uuidv4();
    sessionStorage.setItem(STORAGE_KEY, newId);
    sessionStorage.setItem(EXPIRY_KEY, String(Date.now() + SESSION_DURATION));

    return newId;
  }

  const getCurrentTimestamp = () => {
    return new Date().toISOString();
  };

  // Logging
  const logInquiryInput = async (params) => {
    const {
      inquiryToSuggestion,
      inquiryToDeepqa,
      selectedSuggestionItem,
      suggestionItems,
      fromFrequentlySearchedWords,
      fromRelatedWord,
      fromSuggestion,
    } = params;

    const logData = {
      session_id: generateSessionId(),
      timestamp: getCurrentTimestamp(),
      event: 'inquiry_input',
      payload: {
        inquiry_to_suggestion: inquiryToSuggestion,
        inquiry_to_deepqa: inquiryToDeepqa,
        selected_suggestion_item: selectedSuggestionItem,
        suggestion_items: suggestionItems,
        from_frequently_searched_words: fromFrequentlySearchedWords,
        from_related_word: fromRelatedWord,
        from_suggestion: fromSuggestion,
      },
      user_device: 'PC',
    };

    try {
      const response = await fetch(LOGGING_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Inquiry input logged successfully: ', logData);
    } catch (error) {
      console.error('Error logging inquiry input:', error);
    }
  };

  const logSearchResults = async (params) => {
    const {
      inputText,
      categories,
      answerItems,
      productItems,
      fromFrequentlySearchedWords,
      fromRelatedWord,
      fromSuggestion,
    } = params;

    const logData = {
      session_id: generateSessionId(),
      timestamp: getCurrentTimestamp(),
      event: 'search',
      payload: {
        input_text: inputText,
        categories: categories,
        answer_items: answerItems,
        product_items: productItems,
        from_frequently_searched_words: fromFrequentlySearchedWords,
        from_related_word: fromRelatedWord,
        from_suggestion: fromSuggestion,
      },
      user_device: 'PC',
    };

    try {
      const response = await fetch(LOGGING_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Search results logged successfully: ', logData);
    } catch (error) {
      console.error('Error logging search results:', error);
    }
  };

  const logClickUrl = async (params) => {
    const {
      sentFromDeepqa,
      isSmartInput,
      isSmartAd,
      isFaq,
      inputText,
      url,
      fromFrequentlySearchedWords,
      fromRelatedWord,
      fromSuggestion,
    } = params;

    const logData = {
      session_id: generateSessionId(),
      timestamp: getCurrentTimestamp(),
      event: 'click_url',
      payload: {
        sent_from_deepqa: sentFromDeepqa,
        is_smart_input: isSmartInput,
        is_smart_ad: isSmartAd,
        is_faq: isFaq,
        input_text: inputText,
        url: url,
        from_frequently_searched_words: fromFrequentlySearchedWords,
        from_related_word: fromRelatedWord,
        from_suggestion: fromSuggestion,
      },
      user_device: 'PC',
    };

    try {
      const response = await fetch(LOGGING_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('URL click logged successfully', logData);
    } catch (error) {
      console.error('Error logging URL click:', error);
    }
  };

  const logImpression = async (params) => {
    const { inputText, smartInputItems, campaignItems, productItems } = params;

    const logData = {
      session_id: generateSessionId(),
      timestamp: getCurrentTimestamp(),
      event: 'impression',
      payload: {
        input_text: inputText,
        smart_input_items: smartInputItems,
        campaign_items: campaignItems,
        product_items: productItems,
      },
      user_device: 'PC',
    };

    try {
      const response = await fetch(LOGGING_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Impression logged successfully:', logData);
    } catch (error) {
      console.error('Error logging impression:', error);
    }
  };

  const getQuery = (query) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(query);
  };

  const highlightText = (text, query) => {
    if (!query) return text;
    if (!text) return '';

    const regex = new RegExp(`(${query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<em>$1</em>');
  };

  const highlightComboText = (text, query) => {
    if (!query) return text;
    if (!text) return '';

    const regex = new RegExp(`(${query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  };

  const formatDuration = (isoDuration) => {
    if (!isoDuration) return '';
    const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return '';

    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const getSearchHistory = () => JSON.parse(localStorage.getItem(CONFIG.historyStorageKey) || '[]');

  const saveSearchHistory = (keyword) => {
    let history = getSearchHistory();
    history = [keyword, ...history.filter((item) => item !== keyword)].slice(0, CONFIG.maxHistoryItems);
    localStorage.setItem(CONFIG.historyStorageKey, JSON.stringify(history));
    updateList(history, 'v1-rsearch-history', 'history');
  };

  const getDomain = () => window.location.origin;

  const redirectToSearch = (query = '', fromFrequentlySearchedWords = false, fromSuggestion = false) => {
    if (query.trim() === '') {
      console.log('Empty search query. Redirection prevented.');
      return;
    }

    let searchUrl = `${getDomain()}${CONFIG.searchPath}?q=${encodeURIComponent(query)}`;
    if (fromFrequentlySearchedWords) {
      searchUrl += '&from_frequently_searched_words=true';
    }
    if (fromSuggestion) {
      searchUrl += '&from_suggestion=true';
    }

    window.location.href = searchUrl;
  };

  // Event handler functions
  const handleModalIncSearch = async (event) => {
    const query = event.target.value;
    if (query.length < 2) {
      searchModalResult.innerHTML = '';
      const smartAdData = await fetchDataPOST(CONFIG.smartAdApiUrl, { query: '' });
      updateModalSmartAds(smartAdData);
      return;
    }

    try {
      const [incSearchData, smartAdData] = await Promise.all([
        fetchDataPOST(CONFIG.incrementalSearchApiUrl, {
          query: query,
          quick_links_count: 10,
        }),
        fetchDataPOST(CONFIG.smartAdApiUrl, { query: query }),
      ]);

      // Prepare data for logging
      const smartInputItems = incSearchData.quick_links.map((item) => ({
        title: item.question || item.document_metadata.original_title || item.document_metadata.parent_title || '',
        url: item.URL,
        categories: item.categories,
      }));

      const campaignItems = smartAdData.contents.map((item) => ({
        title: item.title,
        url: item.url,
        categories: ['smart_ad'],
      }));

      // Log impression
      logImpression({
        inputText: query,
        smartInputItems: smartInputItems,
        campaignItems: campaignItems,
        productItems: [],
      });

      updateModalSearchResults(incSearchData);
      updateModalSmartAds(smartAdData);
    } catch (error) {
      console.error('Error handling search:', error);
    }
  };

  // Handle Enter key press
  const handleEnterSearch = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(e.target.value);
    }
  };

  const handleSearch = (keyword) => {
    if (keyword.trim() !== '') {
      saveSearchHistory(keyword);

      // Log the search event
      logInquiryInput({
        inquiryToSuggestion: keyword,
        inquiryToDeepqa: keyword,
        selectedSuggestionItem: null,
        suggestionItems: [],
        fromFrequentlySearchedWords: false,
        fromRelatedWord: false,
        fromSuggestion: false,
      });

      redirectToSearch(keyword);
    }
  };

  const handleSmartInput = async (event) => {
    const query = event.target.value.trim();

    // Synchronize all inputs
    searchInputs.forEach((input) => {
      if (input !== event.target) {
        input.value = query;
      }
    });

    if (query.length < 2) {
      displaySmartInputSuggestions([]);
      return;
    }

    try {
      const smartInputData = await fetchDataPOST(CONFIG.smartInputApiUrl, {
        query: query,
        use_input_suggestions: true,
        limit: 10,
      });

      displaySmartInputSuggestions(smartInputData.input_suggestions);
    } catch (error) {
      console.error('Error handling smart search:', error);
    }
  };

  const handleSearchListbox = (event) => {
    const clickedOption = event.target.closest('.v1-rsearch-search__option');
    if (clickedOption) {
      const searchText = clickedOption.querySelector('.v1-rsearch-search__text').textContent;
      const listbox = clickedOption.closest('.js-rsearch-listbox');
      const selectedIndex = Array.from(listbox.children).indexOf(clickedOption.parentElement);

      // Get the current input value (query)
      const inputElement = listbox.closest('.v1-rsearch-search').querySelector('.js-rsearch-input');
      const query = inputElement ? inputElement.value : '';

      // Log the inquiry input
      logInquiryInput({
        inquiryToSuggestion: query,
        inquiryToDeepqa: searchText,
        selectedSuggestionItem: selectedIndex,
        suggestionItems: Array.from(listbox.querySelectorAll('.v1-rsearch-search__text')).map((el) => el.textContent),
        fromFrequentlySearchedWords: false,
        fromRelatedWord: false,
        fromSuggestion: true,
      });

      searchInputs.forEach((input) => {
        if (input) {
          input.value = searchText;
        }
      });

      redirectToSearch(searchText, false, true);
    }
  };

  // Function to hide result sections
  const hideResultSections = () => {
    if (rsearchResultMain) rsearchResultMain.style.display = 'none';
    if (rsearchResultSub) rsearchResultSub.style.display = 'none';
  };

  // Function to show result sections
  const showResultSections = () => {
    if (rsearchResultMain) rsearchResultMain.style.display = 'block';
    if (rsearchResultSub) rsearchResultSub.style.display = 'block';
  };

  let allResults = {};
  let filteredResults = {};
  let currentFilter = {
    all: 'PC対応ページのみ表示',
    site: 'PC対応ページのみ表示',
    stockAll: 'PC対応ページのみ表示',
    stockFund: 'PC対応ページのみ表示',
    stockJapan: 'PC対応ページのみ表示',
    stockUs: 'PC対応ページのみ表示',
    stockChina: 'PC対応ページのみ表示',
    stockAsean: 'PC対応ページのみ表示',
  };

  const addFilterEventListener = (elementId, filterKey) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.addEventListener('click', (event) => {
        const button = event.target.closest('.v1-rsearch-sort__option');
        if (button) {
          const filterValue = button.value;
          currentFilter[filterKey] = filterValue;
          applyFilter(filterValue, filterKey);
        }
      });
    }
  };

  // Add event listeners for filter buttons
  addFilterEventListener('sort-all-listbox', 'all');
  addFilterEventListener('sort-site-listbox', 'site');
  addFilterEventListener('sort-issue-listbox01', 'stockAll');
  addFilterEventListener('sort-issue-listbox02', 'stockFund');
  addFilterEventListener('sort-issue-listbox03', 'stockJapan');
  addFilterEventListener('sort-issue-listbox04', 'stockUs');
  addFilterEventListener('sort-issue-listbox05', 'stockChina');
  addFilterEventListener('sort-issue-listbox06', 'stockAsean');

  const applyFilter = (filterValue, tabId) => {
    if (filterValue === '全てのページを表示') {
      filteredResults[tabId] = allResults[tabId];
    } else if (filterValue === 'PC対応ページのみ表示') {
      filteredResults[tabId] = filterResultsByCategory(allResults[tabId], 'site');
    }

    // Update results for the specified tab
    updateSearchResults(filteredResults[tabId], tabId);
  };

  const filterResultsByCategory = (results, category) => {
    return results.filter((item) => {
      const categories = item.categories;

      // Exclude items that are only for SP
      if (categories.length === 1 && categories[0] === 'site-sp') {
        return false;
      }

      // Exclude items that are only for SP stock categories
      if (
        categories.length === 2 &&
        categories.includes('site-sp') &&
        (categories.includes('stock-fund-sp') || categories.includes('stock-japan-sp'))
      ) {
        return false;
      }

      // Include all other items
      return true;
    });
  };

  /**
   * Sets the search input value based on the query parameter from the URL.
   * If a query parameter 'q' is present in the URL, this function decodes it and sets the value of the search input field accordingly.
   * This allows the page to pre-fill the search input with a previously entered search term when the page is loaded or refreshed.
   */
  const handleQueryParam = async () => {
    const query = getQuery('q');
    const fromFrequentlySearchedWords = getQuery('from_frequently_searched_words') === 'true';
    const fromSuggestion = getQuery('from_suggestion') === 'true';
    const headingElement = document.querySelector('.v1-rsearch-result__heading');

    if (!query) {
      if (headingElement) {
        headingElement.textContent = '銘柄・サイト内検索';
        return;
      }
    }

    const param = decodeURIComponent(query);
    searchInputs.forEach((input) => {
      if (input) {
        input.value = param;
      }
    });

    // Change heading to "検索中..."
    if (headingElement) headingElement.textContent = '検索中...';

    try {
      // Set up a timeout promise
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Fetch timeout')), 60000));

      // Fetch all data at once with a timeout
      const [data, smartAdData] = await Promise.race([
        Promise.all([
          fetchDataPOST(CONFIG.queryApiUrl, {
            natural_language_query: param,
            count: 150,
            categories: ['site'],
          }),
          fetchDataPOST(CONFIG.smartAdApiUrl, { query: param }),
        ]),
        timeoutPromise,
      ]);

      // Change heading back to original format
      if (headingElement) {
        headingElement.innerHTML = `「<span id="v1-rsearch-result__heading-keyword">${param}</span>」の検索結果`;
      }

      // Check if there are no results
      if (!data.results || data.results.length === 0) {
        // Show no result element
        const noResultElement = document.querySelector('.v1-rsearch-no-result__error');
        if (noResultElement) {
          noResultElement.style.display = 'block';
          rsearchResultMain.classList.add('is-error');
        }

        return; // Exit the function early
      }

      // Store all results
      allResults = distributeResults(data);

      // Apply default filter "PC対応ページのみ表示"
      filteredResults = {
        all: filterResultsByCategory(allResults.all, 'site'),
        site: filterResultsByCategory(allResults.site, 'site'),
        stockAll: filterResultsByCategory(allResults.stockAll, 'site'),
        stockFund: filterResultsByCategory(allResults.stockFund, 'site'),
        stockJapan: filterResultsByCategory(allResults.stockJapan, 'site'),
        stockUs: filterResultsByCategory(allResults.stockUs, 'site'),
        stockChina: filterResultsByCategory(allResults.stockChina, 'site'),
        stockAsean: filterResultsByCategory(allResults.stockAsean, 'site'),
        tousiru: allResults.tousiru,
        video: allResults.video,
        faq: allResults.faq,
      };

      // Update results for all tabs
      Object.keys(filteredResults).forEach((tabId) => {
        updateSearchResults(filteredResults[tabId], tabId);
      });

      // Update smart ads
      updateSmartAds(smartAdData);

      // Show result sections when there's a query
      showResultSections();

      // Log search results
      const allCategories = [...new Set(data.results.flatMap((item) => item.categories))];
      const answerItems = data.results.slice(0, 10).map((item) => ({
        title: item.question || item.document_metadata.original_title || item.document_metadata.parent_title || '',
        url: item.URL,
        categories: item.categories,
      }));

      logSearchResults({
        inputText: param,
        categories: allCategories,
        answerItems: answerItems,
        productItems: [],
        fromFrequentlySearchedWords: fromFrequentlySearchedWords,
        fromRelatedWord: false,
        fromSuggestion: fromSuggestion,
      });
    } catch (error) {
      headingElement.textContent = 'エラー';
      // Show system error element
      const systemErrorElement = document.querySelector('.v1-rsearch-system__error');
      if (systemErrorElement) {
        systemErrorElement.style.display = 'block';
        rsearchResultMain.classList.add('is-error');
      }

      console.error('Error fetching search results:', error);
    }
  };

  const distributeResults = (data) => {
    const categorizedResults = {
      all: [],
      site: [],
      stockAll: [],
      stockFund: [],
      stockJapan: [],
      stockUs: [],
      stockChina: [],
      stockAsean: [],
      tousiru: [],
      video: [],
      faq: [],
    };

    data.results.forEach((item) => {
      categorizedResults.all.push(item);

      if (item.categories && item.categories.some((category) => category.includes('stock'))) {
        categorizedResults.stockAll.push(item);
        if (item.categories.some((category) => category.includes('stock-fund')))
          categorizedResults.stockFund.push(item);
        if (item.categories.some((category) => category.includes('stock-japan')))
          categorizedResults.stockJapan.push(item);
        if (item.categories.some((category) => category.includes('stock-us'))) categorizedResults.stockUs.push(item);
        if (item.categories.some((category) => category.includes('stock-china')))
          categorizedResults.stockChina.push(item);
        if (item.categories.some((category) => category.includes('stock-asean')))
          categorizedResults.stockAsean.push(item);
      } else if (item.URL && item.categories.includes('toshiru')) {
        categorizedResults.tousiru.push(item);
      } else if (item.URL && item.categories.includes('video')) {
        categorizedResults.video.push(item);
      } else if (item.URL && item.categories.includes('faq')) {
        categorizedResults.faq.push(item);
      } else {
        categorizedResults.site.push(item);
      }
    });

    Object.keys(categorizedResults).forEach((key) => {
      updateSearchResults(categorizedResults[key], key);
    });

    return categorizedResults;
  };

  const updateSearchResults = (results, tabId) => {
    let articlesContainer;
    let paginationContainer;

    const tabContent = document.getElementById(tabMapping[tabId]);
    if (!tabContent) {
      console.error(`Tab content element not found for tab: ${tabId}`);
      return;
    }
    articlesContainer = tabContent.querySelector('.v1-rsearch-result__articles');
    paginationContainer = tabContent.querySelector('.v1-rsearch-pagination');

    if (!articlesContainer) {
      console.error(`Articles container not found for tab: ${tabId}`);
      return;
    }

    articlesContainer.innerHTML = ''; // Clear existing content

    if (results && results.length > 0) {
      let { currentPage, resultsPerPage } = paginationState[tabId];
      const totalPages = Math.ceil(results.length / resultsPerPage);

      // Ensure currentPage is not greater than totalPages
      if (currentPage > totalPages) {
        currentPage = totalPages;
        paginationState[tabId].currentPage = totalPages;
      }

      const startIndex = (currentPage - 1) * resultsPerPage;
      const endIndex = startIndex + resultsPerPage;
      const pageResults = results.slice(startIndex, endIndex);

      pageResults.forEach((item) => {
        const article = createResultArticle(item, tabId);
        articlesContainer.appendChild(article);
      });

      updatePagination(results.length, tabId);
    } else {
      // Hide pagination when there are no results
      if (paginationContainer) {
        paginationContainer.style.display = 'none';
      }
    }
  };

  const updatePagination = (totalResults, tabId) => {
    const { currentPage, resultsPerPage } = paginationState[tabId];
    const totalPages = Math.ceil(totalResults / resultsPerPage);
    const paginationContainer = document.querySelector(`#${tabMapping[tabId]} .v1-rsearch-pagination`);

    if (!paginationContainer) {
      console.error(`Pagination container not found for tab: ${tabId}`);
      return;
    }

    paginationContainer.innerHTML = '';

    const maxVisiblePages = 10;
    let startPage = Math.max(1, Math.min(currentPage - 4, totalPages - maxVisiblePages + 1));
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    // Adjust startPage if endPage is less than maxVisiblePages
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    if (currentPage > 1) {
      const prevButton = createPaginationButton('前のページへ', currentPage - 1, 'prev', tabId);
      paginationContainer.appendChild(prevButton);
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      const pageButton = createPaginationButton(i.toString(), i, i === currentPage ? 'current' : 'number', tabId);
      paginationContainer.appendChild(pageButton);
    }

    // Next button
    if (currentPage < totalPages) {
      const nextButton = createPaginationButton('次のページへ', currentPage + 1, 'next', tabId);
      paginationContainer.appendChild(nextButton);
    }
  };

  // Update the createPaginationButton function
  const createPaginationButton = (text, page, type, tabId) => {
    const button = document.createElement('div');
    button.className = `v1-rsearch-pagination__item${type === 'current' ? ' -current' : ''}`;

    if (type === 'prev' || type === 'next') {
      const link = document.createElement('a');
      link.href = '#';
      const icon = document.createElement('i');
      icon.className = `v1-rsearch-ico rex-icon-chevron-${type === 'prev' ? 'left' : 'right'}`;
      icon.setAttribute('role', 'img');
      icon.setAttribute('aria-label', text);
      link.appendChild(icon);
      button.appendChild(link);
    } else {
      const content = type === 'current' ? document.createElement('span') : document.createElement('a');
      content.textContent = text;
      if (type !== 'current') {
        content.href = '#';
      }
      button.appendChild(content);
    }

    button.addEventListener('click', (e) => {
      e.preventDefault();
      if (page !== paginationState[tabId].currentPage) {
        paginationState[tabId].currentPage = page;
        // Apply the current filter state when updating the search results
        applyFilter(currentFilter[tabId], tabId);
        scrollToTop();
      }
    });

    return button;
  };

  const createResultArticle = (item, tabId) => {
    const query = getQuery('q');

    const highlightedHeading = highlightText(
      item.question || item.document_metadata.original_title || item.document_metadata.parent_title || '',
      query
    );
    const highlightedDescription = highlightText(item.description, query);

    // Check for icon requirements
    const isSpOnly = item.categories && item.categories.length === 1 && item.categories[0] === 'site-sp';
    const isExternalLink = !item.URL.includes('www.rakuten-sec.co.jp');

    const article = document.createElement('article');
    article.className = 'v1-rsearch-result-article';

    const body = document.createElement('div');
    body.className = 'v1-rsearch-result-article__body';

    const heading = document.createElement('h3');
    heading.className = 'v1-rsearch-result-article__heading';

    const link = document.createElement('a');
    link.href = item.URL;
    link.innerHTML = highlightedHeading;

    link.addEventListener('click', async (e) => {
      await logClickUrl({
        sentFromDeepqa: true,
        isSmartInput: false,
        isSmartAd: false,
        isFaq: false,
        inputText: getQuery('q'),
        url: item.URL,
        fromFrequentlySearchedWords: getQuery('from_frequently_searched_words') === 'true',
        fromRelatedWord: false,
        fromSuggestion: getQuery('from_suggestion') === 'true',
      });
    });

    if (isSpOnly && !tabId.includes('stock')) {
      const spIcon = document.createElement('i');
      spIcon.className = 'v1-rsearch-ico rex-icon-smartphone-outline v1-rsearch--is-ml-4';
      spIcon.setAttribute('aria-label', 'スマートフォン専用ページ');
      spIcon.setAttribute('role', 'img');
      link.appendChild(spIcon);
    }

    if (isExternalLink || tabId === 'tousiru' || tabId === 'video' || tabId === 'faq') {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      const icon = document.createElement('i');
      icon.className = 'v1-rsearch-ico rex-icon-newwindow-outline v1-rsearch--is-ml-4';
      icon.setAttribute('aria-label', '新しいタブまたはウィンドウで開く');
      icon.setAttribute('role', 'img');
      link.appendChild(icon);
    }

    heading.appendChild(link);
    body.appendChild(heading);

    if (tabId === 'stockAll' && item.categories) {
      const categorySpan = document.createElement('span');
      categorySpan.className = 'v1-rsearch-result-article__category';

      if (item.categories.some((category) => category.includes('stock-fund'))) {
        categorySpan.textContent = '投資信託';
      } else if (item.categories.some((category) => category.includes('stock-japan'))) {
        categorySpan.textContent = '国内株式';
      } else if (item.categories.some((category) => category.includes('stock-us'))) {
        categorySpan.textContent = '米国株式';
      } else if (item.categories.some((category) => category.includes('stock-china'))) {
        categorySpan.textContent = '中国株式';
      } else if (item.categories.some((category) => category.includes('stock-asean'))) {
        categorySpan.textContent = 'アセアン株式';
      } else {
        categorySpan.textContent = ''; // Default category if none of the above match
      }
      body.appendChild(categorySpan);
    }

    const text = document.createElement('p');
    text.className = 'v1-rsearch-result-article__text';
    text.innerHTML = highlightedDescription;
    body.appendChild(text);

    if (item.categories.includes('video')) {
      const data = document.createElement('p');
      data.className = 'v1-rsearch-result-article__data';

      // Format viewCount
      const viewCount = item.document_metadata.viewCount || 0;
      const formattedViewCount = viewCount >= 10000 ? `${Math.floor(viewCount / 10000)}万` : viewCount;

      // Format publishedAt date
      let formattedDate = '';
      if (item.document_metadata.publishedAt) {
        const publishedDate = new Date(item.document_metadata.publishedAt);
        formattedDate = publishedDate.toLocaleDateString('ja-JP', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
      }

      data.innerHTML = `
      <span>${item.document_metadata.channelTitle}</span>
      <span>${formattedViewCount}回視聴</span>
      <span>${formattedDate}</span>`;
      body.appendChild(data);
    } else if (item.categories.includes('toshiru')) {
      const data = document.createElement('p');
      data.className = 'v1-rsearch-result-article__data';

      data.innerHTML = `<span>${item.document_metadata.publishedAt}</span>`;
      body.appendChild(data);
    }

    article.appendChild(body);

    if (item.document_metadata && item.document_metadata.thumbnails) {
      const figureLink = document.createElement('a');
      const figure = document.createElement('figure');

      if (item.document_metadata.thumbnails.default.url) {
        figure.className = 'v1-rsearch-result-article__figure';
        figureLink.href = item.URL;
        figureLink.target = '_blank';

        const img = document.createElement('img');
        img.src = item.document_metadata.thumbnails.default.url;
        img.alt = item.question;
        img.style.width = '176px';

        figureLink.appendChild(img);
      }

      // Video duration
      if (item.document_metadata.duration) {
        const timeSpan = document.createElement('span');
        timeSpan.className = 'v1-rsearch-result-article__time';
        timeSpan.textContent = formatDuration(item.document_metadata.duration);
        figureLink.appendChild(timeSpan);
      }

      figure.appendChild(figureLink);
      article.appendChild(figure);
    }

    return article;
  };

  document.addEventListener('DOMContentLoaded', init);
})();
