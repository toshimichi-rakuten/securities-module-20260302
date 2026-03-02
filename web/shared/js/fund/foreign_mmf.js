  async function fetchDataAndProcess() {
    try {
      let result = await fetch("/web/shared/json/fund/foreign_mmf.json");
      let json = await result.json();
      // json オブジェクトを使って何かしらの処理を行う
      // function1(json);
      // function2(json);
      // 他の関数も同様に json オブジェクトを使うことができます
      return json; // json を返す
    } catch (error) {
      console.error("Error occurred while fetching data:", error);
      throw error; // エラーを再度投げる
    }
  }

  async function createMain(){
    try {
      // 非同期関数 fetchDataAndProcessAndLog を await で待機し、結果を取得する
      // 変数一式
      const variableArr = await fetchDataAndProcess();
      const currentDate = variableArr.date;
      const currentYear = parseInt(currentDate.substring(0, 4));
      const currentMonth = parseInt(currentDate.substring(4));
      const brandArr = variableArr.brand;
      const holiday = variableArr.holiday;
      let completedHTML = '';

      // メイン動作
      for (let i = 0; i < brandArr.length; i++) {
        const str = await createBrand(variableArr,brandArr[i][0],brandArr[i][1])
        const holidayArr = holiday[i];
        completedHTML = completedHTML + await matchHoliday(str,holidayArr)
      }

      // console.log(modifiedHTML)
      $("#calendar").replaceWith(completedHTML);

    } catch (error) {
      // エラーが発生した場合の処理
      console.error("Error occurred:", error);
    }
  }

  async function createBrand(variableArr,brand,key){

    const currentDate = variableArr.date;
    const currentYear = parseInt(currentDate.substring(0, 4));
    const currentMonth = parseInt(currentDate.substring(4));

    const h3 = '<div class="s1-hdg-lv2"><h2 id="hdg-brand-'+key+'" class="s1-hdg-lv2__element">'+brand+'</h2></div>'
    const tempHead = '<div id="brand-'+key+'" class="s1-grid">'
    const tempFoot = '</div>'
    let str = h3 + tempHead + await createCalendar(variableArr,currentMonth) + await createCalendar(variableArr,currentMonth+1) + await createCalendar(variableArr,currentMonth+2) + tempFoot
    return str
  }


  async function createCalendar(variableArr,month) {
    const currentDate = variableArr.date;
    const currentYear = parseInt(currentDate.substring(0, 4));
    const currentMonth = parseInt(currentDate.substring(4));
    const monthDays = ["日", "月", "火", "水", "木", "金", "土"];
    let monthNumber = month === 12 ? 12 : month % 12;
    let monthNumber00 = monthNumber.toString().padStart(2, '0');
    // let currentYear = new Date().getFullYear();
    let yearNumber = currentYear;
      // 現在の月が11月か12月で、かつmonthが1月か2月の時、翌年になる。
      if ((currentMonth === 11 || currentMonth === 12) && (month === 13 || month === 14)) {
        yearNumber = currentYear + 1;
      } else {
        yearNumber = currentYear;
      }
    let calendarHTML = '<div class="s1-grid__col-1-3"><table class="s1-tbl-data01"><thead><tr><th colspan="7">'+ monthNumber +'月</th></tr></thead><tbody><tr class="bg-silver">';

    //日、土でだし分け（今回は使用しない）
    for (let i = 0; i < 7; i++) {
        if (i === 0) {
            calendarHTML += `<td>${monthDays[i]}</td>`;
        } else if (i === 6) {
            calendarHTML += `<td>${monthDays[i]}</td>`;
        } else {
            calendarHTML += `<td>${monthDays[i]}</td>`;
        }
    }

    calendarHTML += '</tr>';

    const daysInMonth = new Date(currentYear, month, 0).getDate();
    const firstDay = new Date(currentYear, month - 1, 1).getDay();
    const daysInPrevMonth = new Date(currentYear, month - 1, 0).getDate();
    let dayCount = 1;
    let prevDayCount = daysInPrevMonth - firstDay + 1;

    for (let i = 0; i < 6; i++) {
        calendarHTML += '<tr>';

        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                calendarHTML += `<td class="mute bg-silver">&nbsp;</td>`;
                prevDayCount++;
            } else if (dayCount > daysInMonth) {
                let nextMonthDayCount = dayCount - daysInMonth;
                calendarHTML += `<td class="mute bg-silver">&nbsp;</td>`;
                dayCount++;
            } else {
              let dayCount00 = dayCount.toString().padStart(2, '0');
              let dataKey = yearNumber + monthNumber00 + dayCount00
                if (j === 0 || j === 6) {
                    calendarHTML += `<td class="bg-r-01-light" data-day="`+ dataKey +`">${dayCount}</td>`;
                } else {
                    calendarHTML += `<td data-day="`+ dataKey +`">${dayCount}</td>`;
                }
                dayCount++;
            }
        }
        calendarHTML += '</tr>';
        if (dayCount - daysInMonth > 7) {
            break;
        }
    }
    calendarHTML += '</tbody></table></div>';
    calendarHTML = calendarHTML.replace(/<tr><td class="mute bg-silver">&nbsp;<\/td><td class="mute bg-silver">&nbsp;<\/td><td class="mute bg-silver">&nbsp;<\/td><td class="mute bg-silver">&nbsp;<\/td><td class="mute bg-silver">&nbsp;<\/td><td class="mute bg-silver">&nbsp;<\/td><td class="mute bg-silver">&nbsp;<\/td><\/tr>/g, "");
    return calendarHTML;
  }

  async function matchHoliday(str,holidayArr){
    // HTML文字列をjQueryオブジェクトに変換
    const $str = $(str);

    // holidayArr内の日付に該当する要素にクラスを追加する
    for (let i = 0; i < holidayArr.length; i++) {
      $str.find('[data-day="' + holidayArr[i] + '"]').addClass('bg-r-01-light');
    }

    // 配列内の要素を連結して1つのHTML文字列にする
    const modifiedHTML = $str.map(function() {
      return this.outerHTML;
    }).get().join('');

    return modifiedHTML;
  }
  createMain()