var hasCalculationError = false;
/** 計算を実行する */
function calculate(){
	hasCalculationError = false;
	var goalValue = setCalculatorInt(document.form1.goal, '目標金額');
	var startValue = setCalculatorInt(document.form1.start, '当初元本');
	var incleaseMonth = setCalulatorDouble(document.form1.inclease_month);
	var periodYear = setCalculatorInt(document.form1.period_year,'積立期間（年）');
	var periodMonth = setCalculatorInt(document.form1.period_month,'積立期間（月）');
	var ratio = setCalulatorDouble(document.form1.ratio);
	
	var periodTotal = periodYear * 12 + periodMonth;
	if(periodTotal < 1){
		alert('積立期間は1ヶ月以上になるように設定してください。');
		return;
	}
	
	if(ratio > 100){
		alert('期待利回りは100%以内で設定してください。');
		return;
	}
	
	if( incleaseMonth < 0 || incleaseMonth > 9){
		alert('積立の増額は0.0 ～ 9.0の間で設定してください。')
		return;
	}
	
	if(hasCalculationError){
		return;
	}
	
	var nowValue = startValue;
	var totalIncleaseValue = startValue;
	
	for(i = 0; i <= periodTotal; i++){
		if(i==0){
			continue;
		}
		if(i % 12 == 0 ){
			nowValue += incleaseMonth;
		}
		
		nowValue =  (nowValue + 1) * ( 1 + ratio / 1200);
		totalIncleaseValue = totalIncleaseValue *  ( 1 + ratio / 1200);
		
	}
	var answer = Math.ceil( (goalValue - totalIncleaseValue) / (nowValue - totalIncleaseValue) );

	if( answer < 0 || answer.toString()  == 'NaN' ){
		answer = 0;
	}
	
	nowValue = startValue;
	for(i = 0; i <= periodTotal; i++){
		if(i==0){
			continue;
		}
		if(i % 12 == 0 ){
			nowValue += Math.round(incleaseMonth * answer);
		}
		
		nowValue = Math.round((nowValue + answer) * ( 1 + ratio / 1200) );
		
	}
	
	var resultTotal = nowValue;
	if(resultTotal < goalValue){
		while(resultTotal < goalValue ){
			resultTotal = 0;
			nowValue = startValue;
			var result = answer;
			for(i = 0; i <= periodTotal; i++){
				if(i==0){
					continue;
				}
				if(i % 12 == 0 ){
					nowValue += Math.round(incleaseMonth * result);
				}
				
				nowValue = Math.round((nowValue + result) * ( 1 + ratio / 1200) );
				
			}
			resultTotal = nowValue;
			if(resultTotal < goalValue){
				answer++;
			}
		}
	}else{
		while(resultTotal > goalValue && answer > 0){
			nowValue = startValue;
			var result = answer;
			result--;
			for(i = 0; i <= periodTotal; i++){
				if(i==0){
					continue;
				}
				if(i % 12 == 0 ){
					nowValue += Math.round(incleaseMonth * result);
				}
				
				nowValue = Math.round((nowValue + result) * ( 1 + ratio / 1200) );
				
			}
			resultTotal = nowValue;
			if(resultTotal > goalValue){
				answer--;
			}
		}
	}	
	document.getElementById('calc_result').innerHTML = addComma(answer);
	writeTable(answer);

}

/**
 * 入力の値が正常か確認する。
 */
function setCalculatorInt(inputObject, message){
	if(isNaN(removeComma(inputObject.value)) || inputObject.value == ''){
		inputObject.value = 0;
	}
	
	var ret = parseInt(removeComma(inputObject.value));
	if(ret < 0){
		alert(message + 'は正の整数を入力してください。');
		hasCalculationError = true;
	}
	return ret;
}

/**
 * 入力の値が正常か確認する。
 */
function setCalulatorDouble(inputObject){
	if(isNaN(removeComma(inputObject.value)) || inputObject.value == ''){
		inputObject.value = 0;
	}
	
	var ret = removeComma(inputObject.value) * 10;
	ret = parseInt(ret);
	ret = ret / 10;
	return ret;
}


/** カンマを追加する */
function addComma(str) {
	var num = new String(str).replace(/,/g, "");
	while(num != (num = num.replace(/^(-?\d+)(\d{3})/, "$1,$2")));
	return num;
}

/** カンマを削除する */
function removeComma(value) {
	return value.split(",").join("")
}

function writeTable(result){
	var	goalValue = parseInt(removeComma(document.form1.goal.value));
	var	startValue = parseInt(removeComma(document.form1.start.value));
	var	incleaseMonth = removeComma(document.form1.inclease_month.value);
	var	periodYear = parseInt(removeComma(document.form1.period_year.value));
	var	periodMonth = parseInt(removeComma(document.form1.period_month.value));
	var	ratio = removeComma(document.form1.ratio.value);
	
	var periodTotal = periodYear * 12 + periodMonth;
	
	var html = '<table class="tbl-data-01" border="1" cellspacing="0"><thead><tr><th class=\"align-C\">積立経過月数</th><th class=\"align-C\">前月末残高</th><th class=\"align-C\">積立額</th><th class=\"align-C\">期待収益</th><th class=\"align-C\">月末残高</th></tr></thead>';
	
	var nowValue = startValue;
	for(i = 0; i <= periodTotal; i++){
		if( i == 0 ){
			continue;
		}
		var additionalValue = 0;
		var additionalRate = 0;
		if( i % 12 == 0 ){
			additionalValue += Math.round(incleaseMonth * result);
		}
		additionalValue += result;
		additionalRate = Math.round((nowValue + additionalValue) * ratio / 1200);
		
		html+='<tbody><tr><td>' + i + 'ヶ月</td><td class=\"align-R\">' + addComma(nowValue) +'</td><td class=\"align-R\">' + addComma(additionalValue) + '</td><td class=\"align-R\">'+ addComma(additionalRate) +'</td><td class=\"align-R\">' + addComma(nowValue + additionalValue + additionalRate) +'</td></tr></tbody>';
		nowValue = nowValue + additionalValue + additionalRate;
	}
	
	html += '</table>';
	document.getElementById('resultTable').innerHTML = html;
}