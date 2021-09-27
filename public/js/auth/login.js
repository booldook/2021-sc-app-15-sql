var f = document.loginForm;
var useridEl = f.userid;
var passwdEl = f.passwd;
var useridTxt = document.querySelector('.userid');
var passwdTxt = document.querySelector('.passwd');
f.addEventListener('submit', onSubmit);

function onSubmit(e) {
	e.preventDefault();
	var userid = useridEl.value.trim();
	var passwd = passwdEl.value.trim();
	verifyReset(useridEl, useridTxt);
	verifyReset(passwdEl, passwdTxt);
	if(userid === '' || userid.length < 6 || userid.length > 24) {
		return verifyFalse(useridEl, useridTxt, userid === '' ? ERR.ID_NULL : ERR.ID_LEN);
	}
	else if(passwd === '' || passwd.length < 6 || passwd.length > 24) {
		return verifyFalse(passwdEl, passwdTxt, passwd === '' ? ERR.PW_NULL : ERR.PW_LEN)
	}
	f.submit();
}


function verifyReset(el, elTxt) {
	el.classList.remove('error');
	el.classList.remove('active');
	elTxt.classList.remove('error');
	elTxt.innerHTML = '';
}

function verifyFalse(el, elTxt, msg) {
	el.classList.remove('active');
	el.classList.add('error');
	elTxt.classList.add('error');
	elTxt.innerHTML = msg;
	return false;
}


