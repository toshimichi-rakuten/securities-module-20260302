window.onload=function(){
	if(document.loginform != null && document.loginform.loginid != null && document.loginform.loginid != undefined){
		document.loginform.loginid.focus();
	}
	else if(document.LoginForm != null && document.LoginForm.loginId != null && document.LoginForm.loginId != undefined){
		document.LoginForm.loginId.focus();
	}
}