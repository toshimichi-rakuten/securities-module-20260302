// 日本時間を取得する関数
function getJapanTime() {
  // # test確認用
  // const urlParams = new URLSearchParams(window.location.search);
  // const timeParam = urlParams.get('time');
  // if (timeParam) {
  //   // クエリパラメータが存在する場合
  //   // 例: ?time=202510300000 (YYYYMMDDHHmm形式)
  //   const year = timeParam.substring(0, 4);
  //   const month = parseInt(timeParam.substring(4, 6)) - 1; // 月は0から始まるため-1
  //   const day = timeParam.substring(6, 8);
  //   const hour = timeParam.substring(8, 10);
  //   const minute = timeParam.substring(10, 12);

  //   // 日本時間としてDateオブジェクトを作成
  //   // ISO 8601形式で文字列を作成し、Dateオブジェクトに渡すことでタイムゾーンの指定が容易になります。
  //   // 'YYYY-MM-DDTHH:mm:00+09:00'
  //   const japanTimeStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${day}T${hour}:${minute}:00+09:00`;
  //   return new Date(japanTimeStr);
  // } else {
  //   // クエリパラメータが存在しない場合、現在の日本時間を返す
  //   let now = new Date();
  //   let utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  //   let japanTime = new Date(utc + (3600000 * 9));
  //   return japanTime;
  // }
  // # リリース用
  let now = new Date();
  let utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  let japanTime = new Date(utc + (3600000 * 9));
  return japanTime;
}


// 曜日と時間帯に基づいて要素の表示・非表示を更新する関数
async function updateScheduleVisibility() {
  // 現在の日時を設定
  const jstNow = getJapanTime();

  // 現在の曜日と時刻を取得
  const currentDay = jstNow.getDay(); // 0:日曜日, 1:月曜日, ..., 6:土曜日
  const currentTime = jstNow.getHours() * 60 + jstNow.getMinutes(); // 現在の時刻を分単位に変換
  const year = jstNow.getFullYear();
  const month = (jstNow.getMonth() + 1).toString().padStart(2, '0'); // 月は0-11なので+1し、2桁にする
  const day = jstNow.getDate().toString().padStart(2, '0'); // 日を2桁にする
  const currentDate = `${year}-${month}-${day}`;

  // 曜日を短縮形で取得
  const daysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = daysShort[currentDay]; // 現在の曜日を短縮形で取得

  // 特定の日付条件（祝日や特別な日）を取得
  const specialDates = {};
  const dateFiles = {
    "cs-holiday": "/web/shared/json/holidays.json",
    "ifa-holiday": "/web/shared/json/holidays_ifa.json"
    // "bu-holiday": "bu_holidays.json",
    // "ifa-day": "ifa_days.json"
  };

  // 各 JSON ファイルを非同期で取得
  await Promise.all(
    Object.entries(dateFiles).map(async ([key, file]) => {
      try {
        const response = await fetch(file);
        const data = await response.json();
        specialDates[key] = data.holidays || [];
      } catch (error) {
        console.error(`${file} の取得に失敗しました:`, error);
        specialDates[key] = []; // エラー時は空配列を設定
      }
    })
  );

  // コンソールログで確認
  console.log(`現在の日時（日本時間）: ${jstNow}`);
  console.log(`現在の曜日: ${today}`);
  console.log(`現在の日付: ${currentDate}`);
  console.log(`特定の日付リスト:`, specialDates);

  const elements = document.querySelectorAll('.schedule-item');

  elements.forEach(element => {
    const dataDays = element.getAttribute('data-days');
    const dataTime = element.getAttribute('data-time');
    const dataDate = element.getAttribute('data-date');

    // 曜日判定
    let isDayMatch = true; // デフォルトで true
    if (dataDays) {
      const daysArray = dataDays.split(',');
      const positiveDays = daysArray.filter(day => !day.startsWith('!')); // 通常条件
      const negativeDays = daysArray.filter(day => day.startsWith('!')); // 否定条件

      if (positiveDays.length > 0) {
        isDayMatch = positiveDays.some(day => today === day);
      }

      if (negativeDays.length > 0) {
        isDayMatch = isDayMatch && negativeDays.every(day => today !== day.slice(1));
      }
    }

    // 時間帯判定
    let isTimeMatch = true; // デフォルトで true
    if (dataTime) {
      const timeRanges = dataTime.split(',');
      isTimeMatch = timeRanges.some(range => {
        if (range.startsWith('!')) {
          const [start, end] = range.slice(1).split('-');
          const [startHour, startMinute] = start.split(':').map(Number);
          const [endHour, endMinute] = end.split(':').map(Number);
          const startTime = startHour * 60 + startMinute;
          const endTime = endHour * 60 + endMinute;
          return !(currentTime >= startTime && currentTime <= endTime);
        } else {
          const [start, end] = range.split('-');
          const [startHour, startMinute] = start.split(':').map(Number);
          const [endHour, endMinute] = end.split(':').map(Number);
          const startTime = startHour * 60 + startMinute;
          const endTime = endHour * 60 + endMinute;
          return currentTime >= startTime && currentTime <= endTime;
        }
      });
    }

    // 特定の日付条件判定
    let isDateMatch = true; // デフォルトで true
    if (dataDate) {
      const dateConditions = dataDate.split(',');
      const positiveDates = dateConditions.filter(date => !date.startsWith('!')); // 通常条件
      const negativeDates = dateConditions.filter(date => date.startsWith('!')); // 否定条件

      if (positiveDates.length > 0) {
        isDateMatch = positiveDates.some(date => {
          if (specialDates[date]) {
            return specialDates[date].includes(currentDate);
          }
          return false;
        });
      }

      if (negativeDates.length > 0) {
        isDateMatch = isDateMatch && negativeDates.every(date => {
          if (specialDates[date.slice(1)]) {
            return !specialDates[date.slice(1)].includes(currentDate);
          }
          return true;
        });
      }
    }

    // 最終判定
    if (isDayMatch && isTimeMatch && isDateMatch) {
      element.classList.add('is-active');
      element.classList.remove('is-disabled');
    } else {
      element.classList.add('is-disabled');
      element.classList.remove('is-active');
    }
  });
}

// 初期化処理
updateScheduleVisibility();