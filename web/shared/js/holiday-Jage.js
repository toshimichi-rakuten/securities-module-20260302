(function($) {
  $(document).ready(function() {
    // 日本時間で現在時刻を取得する関数
    function getJapanTime() {
      // テスト用の特定の日付を設定（例：2024年6月14日金曜日の18時30分）
      // return new Date('2024-06-15T00:30:00+09:00');

      let now = new Date();
      let utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      let japanTime = new Date(utc + (3600000 * 9));
      return japanTime;
    }

    // 特定の条件を満たすか確認する関数
    function checkCondition(date, holidays) {
        let day = date.getDay();
        let hours = date.getHours();
        let minutes = date.getMinutes();

        // 全日の18時以降
        if (hours > 18 || (hours === 18 && minutes >= 0)) {
            return true;
        }
        // 土曜日
        if (day === 6) {
            return true;
        }
        // 日曜日
        if (day === 0) {
            return true;
        }
        // 月曜日の9時以前
        // if (day === 1 && (hours < 9 || (hours === 9 && minutes === 0))) {
        //     return true;
        // }
        // 祝日
        // if (isHoliday(date, holidays)) {
        //     return true;
        // }
        return false;
    }

    // 日付が祝日かどうかを確認する関数
    function isHoliday(date, holidays) {
        let year = date.getFullYear();
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);
        let formattedDate = `${year}-${month}-${day}`;
        return holidays.includes(formattedDate);
    }

    // JSONファイルから祝日リストを読み込む
    $.getJSON('/web/shared/json/holidays.json', function(data) {
        let holidays = data.holidays;

        // 日本時間を取得し、.holidayJage クラスの要素にクラスを設定
        let japanTime = getJapanTime();

        $('.holidayJage').each(function() {
            if (checkCondition(japanTime, holidays)) {
                $(this).addClass('is-active').removeClass('is-disabled');
            } else {
                $(this).addClass('is-disabled').removeClass('is-active');
            }
        });
    });
  });
})(window.jQuery || jqBase);