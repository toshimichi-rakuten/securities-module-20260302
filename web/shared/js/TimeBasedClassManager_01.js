(function($) {
  $(document).ready(function() {
    // 日本時間で現在時刻を取得する関数
    function getJapanTime() {
      // テスト用の日付を設定
      // let testDate = new Date('2025-01-07T09:00:00+09:00'); // 平日の営業時間内
      // let testDate = new Date('2025-01-07T07:00:00+09:00'); // 平日の営業時間外
      // let testDate = new Date('2025-01-07T18:00:00+09:00'); // 平日の夕方
      // let testDate = new Date('2025-01-11T10:00:00+09:00'); // 土曜日の営業時間内
      // let testDate = new Date('2025-01-11T08:00:00+09:00'); // 土曜日の営業時間外
      // let testDate = new Date('2025-01-01T12:00:00+09:00'); // 平日の祝日
      // let testDate = new Date('2025-05-03T12:00:00+09:00'); // 土曜祝日営業時間内
      // let testDate = new Date('2025-05-03T08:00:00+09:00'); // 土曜祝日営業時間外
      // console.log("Test Date:", testDate);
      // return testDate;

      let now = new Date();
      let utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      let japanTime = new Date(utc + (3600000 * 9));
      // console.log("Current Japan Time:", japanTime);
      return japanTime;
    }

    // 特定の条件を満たすか確認する関数
    function checkCondition(date, holidays) {
      let day = date.getDay();
      let hours = date.getHours();
      let minutes = date.getMinutes();

      // console.log("Day:", day, "Hours:", hours, "Minutes:", minutes);

      // 月曜～金曜の0:00～8:29、17:00～23:59もしくは祝日の場合は終日
      if (day >= 1 && day <= 5) {
        if (isHoliday(date, holidays)) {
          // console.log("Condition met for Holiday");
          return true;
        }
        if ((hours >= 0 && hours < 8) || (hours === 8 && minutes < 30) || (hours >= 17 && hours <= 23)) {
          // console.log("Condition met for Monday to Friday");
          return true;
        }
      }

      // 土日の0:00～8:59、17:00～23:59
      if (day === 0 || day === 6) {
        if ((hours >= 0 && hours < 9) || (hours >= 17 && hours <= 23)) {
          // console.log("Condition met for Saturday or Sunday");
          return true;
        }
      }

      // console.log("No condition met");
      return false;
    }

    // 日付が祝日かどうかを確認する関数
    function isHoliday(date, holidays) {
      let year = date.getFullYear();
      let month = ("0" + (date.getMonth() + 1)).slice(-2);
      let day = ("0" + date.getDate()).slice(-2);
      let formattedDate = `${year}-${month}-${day}`;
      let isHoliday = holidays.includes(formattedDate);
      // console.log("Checking holiday for date:", formattedDate, "Is holiday:", isHoliday);
      return isHoliday;
    }

    // JSONファイルから祝日リストを読み込む
    $.getJSON('/web/shared/json/cs_holidays.json', function(data) {
      let holidays = data.holidays;
      // console.log("Holidays:", holidays);

      // 日本時間を取得し、.timeJage01 クラスの要素にクラスを設定
      let japanTime = getJapanTime();

      $('.timeJage01').each(function() {
        // 曜日を取得
        let dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let dayClass = `day-${dayNames[japanTime.getDay()]}`; // 曜日クラスを生成
      
        // 条件をチェック
        if (checkCondition(japanTime, holidays)) {
          $(this)
            .addClass(`is-disabled ${dayClass}`) // is-disabled と曜日クラスを付与
            .removeClass('is-active'); // is-active を削除
        } else {
          $(this)
            .addClass(`is-active ${dayClass}`) // is-active と曜日クラスを付与
            .removeClass('is-disabled'); // is-disabled を削除
        }
      });
    });
  });
})(window.jQuery || jqBase);
