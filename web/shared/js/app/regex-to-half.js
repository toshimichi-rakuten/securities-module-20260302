(function($) {
	function toHalfWidth(strVal) {
		var halfVal = strVal.replace(/[！-～]/g,
		function(tmpStr) {
			return String.fromCharCode( tmpStr.charCodeAt(0) - 0xFEE0 );
		});
		return halfVal.replace(/”/g, "\"")
		.replace(/’/g, "'")
		.replace(/‘/g, "`")
		.replace(/￥/g, "\\")
		.replace(/　/g, " ")
		.replace(/・/g, "･")
		.replace(/〜/g, "~")
		.replace(/―/g, "-")
		.replace(/＿/g, "_");
	}

	$(function() {
		// $("#form-login-id").blur(function() {
		// 		$(this).val( toHalfWidth( $(this).val().toUpperCase() ) );
		// });
		$("#form-login-id, #form-login-pass").blur(function() {
			$(this).val( toHalfWidth( $(this).val() ) );
		});
	});
})(window.jqBase || jQuery);