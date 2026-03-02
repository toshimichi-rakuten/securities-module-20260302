$(function(){
	/*
	 * author: yossy
	 * created: 2012/5/18
	 * version: 1.0.0 
	 */
	
	/*-------------------------------------------
	 *  Input validation
	 --------------------------------------------*/
	// variables
	var input = $('input[type=text]', '#simulator');
	var ageList = new Array();
	
	// initialize
	input.val('00');
	
	// events
	input.keypress(filterInput);
	input.keyup(function(){
		if(!checkByte(this)){
			$(this).val('00');
			return;
		}
	}).blur(function(){
		if(!checkAge(this)){
			$(this).addClass('err');
			return;
		}
		if(!checkRange(this)){
			$(this).addClass('err');
			return;
		}
		$(this).removeClass('err');
	});
	
	/*-------------------------------------------
	 *  Simulation
	 --------------------------------------------*/
	$('.btnBack a').click(function(){carousel(1);});
	
	var ageList = new Array(130);
	$('.btnAdd', '.inputForm').click(function(){
		var flg = true;
		var age = 0;
		var list = new Array();
		input.each(function(){
			list.push(parseInt($(this).val()));
			age += parseInt($(this).val());
			if(!checkByte(this) || !checkAge(this) || !checkRange(this) || age === 0){
				flg = false;
			}
		});
		if(flg){
			$('a', '.btnCalc').addClass('active').html('「年金支給額」を計算する');
			$('img', this).attr('src', '/web/shared/img/fund/migration/think/pension/btn_add02.gif');
			$('a', '.btnCalc').unbind().bind('click', function(){carousel(-1);});
			updLayout(list);
		}
		return false;
	});

	var padBtm = parseInt($('.inputForm').css('paddingBottom'));
	function updLayout(list){
		var stIdx = list[0] * 2 - 1;
		var edIdx = list[1] * 2 - 1;
		for(var i = stIdx; i <= edIdx; i++){
			ageList[i] = true;
		}
		$('.inputForm').animate({paddingBottom: padBtm+10}, 'fast', function(){
			var j = 0;
			var frmVal = 0;
			var toVal = 0;
			var mgn = 0;
			var w_bar = 0;
			$('.bar').remove();
			$('.barTip').remove();
			for(var i = 0; i < ageList.length; i++) {
				if(ageList[i] != undefined){
					if(j === 0){
						frmVal = (i + 1) / 2;
						w_bar = (frmVal - 20) * 7;
						mgn = (frmVal - 20) * 7;
						j++;
					} else if(i === 129){
						toVal = (i + 1) / 2;
						w_bar = (60 - 20) * 7 - w_bar;
						
						$('.inputForm', '#sInput').append('<div id="span_'+frmVal+'" class="bar"></div>');
						$('#span_'+frmVal).width(w_bar + 'px').css('marginLeft', mgn + 'px').show();
						$('.inputForm', '#sInput').append('<div id="spanTip_'+frmVal+'_'+toVal+'" class="barTip">'+frmVal+'-'+toVal+'</div>');
						$('#spanTip_'+frmVal+'_'+toVal).css('left', (mgn - 4) + 'px').show();
						
					}
				} else {
					if(j !== 0){
						toVal = i / 2;
						if(i >= 119){
							w_bar = (60 - 20) * 7 - w_bar;
						} else {
							w_bar = (toVal - 20) * 7 - w_bar;
						}
						
						$('.inputForm', '#sInput').append('<div id="span_'+frmVal+'" class="bar"></div>');
						$('#span_'+frmVal).width(w_bar + 'px').css('marginLeft', mgn + 'px').show();
						$('.inputForm', '#sInput').append('<div id="spanTip_'+frmVal+'_'+toVal+'" class="barTip">'+frmVal+'-'+toVal+'</div>');
						$('#spanTip_'+frmVal+'_'+toVal).css('left', (mgn - 4) + 'px').show();
						
						w_bar = 0;
						mgn = 0;
						j = 0;
					}
				}
			}

			// initialize value
			$('input[type=text]', '#sInput').val('00').eq(0).focus();
			// add event
			$('.barTip').unbind().bind('click', function(){
				var frmVal = $(this).attr('id').split('_')[1];
				var toVal = $(this).attr('id').split('_')[2];
				$(this).remove();
				$('#span_'+frmVal).remove();
				// initialize array
				for(var j = (frmVal * 2 - 1); j <= (toVal * 2 -1); j++){
					ageList[j] = undefined;
				}
				var flg = false;
				for(var k in ageList) {
					if(ageList[k] != undefined){
						flg = true;
					}
				}
				if(!flg){
					$('a', '.btnCalc').removeClass('active').html('<img src="/web/shared/img/fund/migration/think/pension/btn_calc_off.gif">');
					$('img', '.btnAdd').attr('src', '/web/shared/img/fund/migration/think/pension/btn_add01.gif');
					$('.inputForm').animate({paddingBottom: padBtm}, 'fast');
					$('.btnCalc', 'inputForm' ).unbind();
					$('a', '.btnCalc').unbind();
				}
					
			});

		});
	}
	
	// Utils
	// varidation 01
	function checkByte(obj){
		var str = $(obj).val();
		if(str.length !== countByte(str)){
			return false;
		}
		return true;
	}
	// varidation 02
	function checkAge(obj){
		var str = $(obj).val();
		if(0 < parseInt(str) && parseInt(str) < 20 || 65 < parseInt(str) || str === ''){
			return false;
		}
		return true;
	}
	// varidation 03
	function checkRange(obj){
		var str = $(obj).val();
		var idx = input.index(obj);
		var siblStr = input.not(obj).val();
		if(idx === 0){
			if(0 < parseInt(siblStr) && parseInt(siblStr) <= parseInt(str)){
				return false;
			}
		} else {
			if(0 < parseInt(siblStr) && parseInt(str) <= parseInt(siblStr)){
				return false;
			}
		}
		return true;
	}
	// get byte size
	function countByte(str) {
	    var count = 0;
	    for(var i = 0; i < str.length; i++) {
	       if (escape(str.charAt(i)).length < 4) {
	          count++;
	       }
	       else {
	          count += 2;
	       }
	    }
	    return count;
	}
	// input filter
	function filterInput(event) {
		var e = event || window.event;
		var code = e.charCode || e.keyCode;

		if(e.charCode === 0) return true;
		if(e.ctrlKey || e.altKey) return true;
		if(code < 32) return true;

		var allowed = new RegExp('^[0-9]', 'g');
		var inputVal = String.fromCharCode(code);

		if(inputVal.match(allowed)){
			return true;
		} else {
			if(e.preventDefault) e.preventDefault();
			if(e.returnValue) e.returnValue = false;
			return false;
		}
	}
	/*-------------------------------------------
	 *  Pension result
	 --------------------------------------------*/
	function carousel(type){
		var wid = (type == 1)? '+='+$('#innerWrap').width()+'px': '-='+$('#innerWrap').width()+'px';
		var pension = 0;
		var val1 = 0;
		var val2 = 0;
		var val3 = 0;
		if(type === -1){
			pension = calcPension();
			var tmp = ("0" + Math.floor(pension).toString()).slice(-2);
			val1 = tmp.substr(0, 1);
			val2 = tmp.substr(1, 1);
			val3 = Math.round((pension - parseInt(tmp)) * 10) / 10;
			val3 = val3.toString().slice(-1);
		}
		var mgn = $('#resVal').height();
		
		$('div#inner').animate({marginLeft: wid}, 'normal', function(){
			if(type === -1){
				$('#val1').stop(true, true).animate({backgroundPosition: '0 ' + -(mgn*val1) + 'px'}, 600, 'easeInCirc');
				$('#val2').stop(true, true).animate({backgroundPosition: '0 ' + -(mgn*val2) + 'px'}, 600, 'easeInCirc');
				$('#val3').stop(true, true).animate({backgroundPosition: '0 ' + -(mgn*val3) + 'px'}, 600, 'easeInCirc');
			} else {
				$('.val').css('backgroundPosition', '');
			}
		});
	}
	
	function calcPension() {
		var frmAge = 0;
		var toAge = 0;
		var range = 0;
		var srRange = 0;
		var jrVal = 0;
		var avg = 0;
		var resVal = 0;
		var j = 0;
		var tmpVal1 = 0;
		var tmpVal2 = 0;
		var tmpVal3 = 0;
		var tmpVal4 = 0;
		var tmpVal5 = 0;
		var tmpVal6 = 0;
		var tmpVal7 = 0;
		var tmpVal8 = 0;
		var tmpVal9 = 0;
		var tmpVal10 = 0;
		for(var i = 39; i <= 130; i++ ){
			if(ageList[i]){
				if(j === 0) {
					frmAge = (i + 1) / 2;
					j++;
				} else {
					toAge = (i + 1) / 2;
				}
			} else if(j !== 0){
//				range += (toAge - frmAge);
				//console.log(frmAge);
				//console.log(toAge);
				for(var k = frmAge; k < toAge; k++){
					if(20 <= k && k < 25){
						tmpVal1 += 307;
						if(tmpVal1 === 307){
							avg += 307;
							range++;
							//console.log('a'+tmpVal1);
						}
						jrVal += 307 / 100 / 12;
						srRange++;
					} else if(25 <= k && k < 30){
						tmpVal2 += 379;
						if(tmpVal2 === 379){
							avg += 379;
							range++;
						}
						srRange++;
					} else if(30 <= k && k < 35){
						tmpVal3 += 442;
						if(tmpVal3 === 442){
							avg += 442;
							range++;
						}
						srRange++;
					} else if(35 <= k && k < 40){
						tmpVal4 += 502; 
						if(tmpVal4 === 502){
							avg += 502;
							range++;
						}
						srRange++;
					} else if(40 <= k && k < 45){
						tmpVal5 += 568; 
						if(tmpVal5 === 568){
							avg += 568;
							range++;
						}
						srRange++;
					} else if(45 <= k && k < 50){
						tmpVal6 += 611; 
						if(tmpVal6 === 611){
							avg += 611;
							range++;
						}
						srRange++;
					} else if(50 <= k && k < 55){
						tmpVal7 += 616; 
						if(tmpVal7 === 616){
							avg += 616;
							range++;
						}
						srRange++;
					} else if(55 <= k && k < 60){
						tmpVal8 += 582; 
						if(tmpVal8 === 582){
							avg += 582;
							range++;
						}
						srRange++;
					} else if(60 <= k && k < 65){
						tmpVal9 += 425; 
						if(tmpVal9 === 425){
							avg += 425;
							range++;
						}
						srRange++;
					} else if(65 <= k && k < 70){
						tmpVal10 += 396; 
						if(tmpVal10 === 396){
							avg += 396;
							range++;
						}
						srRange++;
					}
				}
				j = 0;
			}
		}
		//console.log(srRange);
		//console.log(range);
		//console.log(avg);
		avg = avg / range;
		//console.log(avg);
		resVal = (80+0.54*srRange*avg/100)/12;
		resVal = Math.round(resVal * 10) / 10;

		return resVal;
	}
});