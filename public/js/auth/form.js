/* 
userid : 6 ~ 24
passwd : 6 ~ 24
passwd === passwd2
email 검증
*/

var f = document.saveForm;
var useridEl = f.userid;
var passwdEl = f.passwd;
var passwd2El = f.passwd2;
var usernameEl = f.username;
var emailEl = f.email;
var useridTxt = document.querySelector('.userid');
var passwdTxt = document.querySelector('.passwd');
var passwd2Txt = document.querySelector('.passwd2');
var usernameTxt = document.querySelector('.username');
var emailTxt = document.querySelector('.email');


f.addEventListener('submit', onSubmit)
useridEl.addEventListener('blur', verifyUserid)
passwdEl.addEventListener('keyup', verifyPasswd)
passwdEl.addEventListener('blur', verifyPasswd)
passwd2El.addEventListener('keyup', verifyPasswd2)
passwd2El.addEventListener('blur', verifyPasswd2)
passwd2El.addEventListener('blur', verifyPasswdEqual)
usernameEl.addEventListener('keyup', verifyUsername)
usernameEl.addEventListener('blur', verifyUsername)
emailEl.addEventListener('keyup', verifyEmail)
emailEl.addEventListener('blur', verifyEmail)

function onSubmit(e) {
	e.preventDefault();
	
	var isUserid = verifyUserid();
	var isPasswd = verifyPasswd();
	var isPasswd2 = verifyPasswd2();
	var isPasswdEqual = verifyPasswdEqual();
	var isUsername = verifyUsername();
	var isEmail = verifyEmail();
	
	if(isUserid && isPasswd  && isPasswd2 && isPasswdEqual && isUsername && isEmail) f.submit();
}

function verifyUserid() {
	var userid = useridEl.value.trim();
	verifyReset(useridEl, useridTxt);
	if(userid === '' || userid.length < 6 || userid.length > 24) {
		verifyFalse(useridEl, useridTxt, userid === '' ? ERR.ID_NULL : ERR.ID_LEN);
		return false;
	}
	else {
		verifyTrue(useridEl, useridTxt, ERR.ID_OK);
		return true;
	}
}

function verifyPasswd() {
	var passwd = passwdEl.value.trim();
	useridEl.classList.remove('error');
	useridEl.classList.remove('active');
	useridTxt.classList.remove('error');
	useridTxt.innerHTML = '';
	if(passwd === '') {
		return false;
	}
	if(passwd.length < 6 || passwd.length > 24) {
		return false;
	}
	return true;
}

function verifyPasswd2() {
	var passwd2 = passwd2El.value.trim();
	if(passwd2 === '') {
		return false;
	}
	if(passwd2.length < 6 || passwd2.length > 24) {
		return false;
	}
	return true;
}

function verifyPasswdEqual() {
	var passwd = passwdEl.value.trim();
	var passwd2 = passwd2El.value.trim();
	if(passwd !== passwd2) {
		return false;
	}
	return true;
}

function verifyUsername() {
	var username = usernameEl.value.trim();
	if(username === '') {
		return false;
	}
	return true;
}

function verifyEmail() {
	var email = emailEl.value.trim();
	if(email === '') {
		return false;
	}
	return true;
}

function verifyReset(el, elTxt) {
	el.classList.remove('error');
	el.classList.remove('active');
	elTxt.classList.remove('error');
	elTxt.innerHTML = '';
}

function verifyFalse(el, elTxt, msg) {
	elTxt.classList.add('error');
	elTxt.innerHTML = msg;
	el.classList.add('error');
	el.focus();
}

function verifyTrue(el, elTxt, msg) {
	el.classList.add('active');
	elTxt.innerHTML = msg;
}