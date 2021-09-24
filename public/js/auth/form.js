/* 
userid : 6 ~ 24
userid 존재 여부 - ajax
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
	verifyReset(passwdEl, passwdTxt)
	if(passwd === '' || passwd.length < 6 || passwd.length > 24) {
		verifyFalse(passwdEl, passwdTxt, passwd === '' ? ERR.PW_NULL : ERR.PW_LEN)
		return false;
	}
	else {
		verifyTrue(passwdEl, passwdTxt)
		return true;
	}
}

function verifyPasswd2() {
	var passwd2 = passwd2El.value.trim();
	verifyReset(passwd2El, passwd2Txt)
	if(passwd2 === '' || passwd2.length < 6 || passwd2.length > 24) {
		verifyFalse(passwd2El, passwd2Txt, passwd2 === '' ? ERR.PW2_NULL : ERR.PW2_LEN)
		return false;
	}
	else {
		verifyTrue(passwd2El, passwd2Txt)
		return true;
	}
}

function verifyPasswdEqual() {
	var passwd = passwdEl.value.trim();
	var passwd2 = passwd2El.value.trim();
	if(!(verifyPasswd() && verifyPasswd2())) {
		return false;
	}
	if(passwd !== passwd2) {
		verifyFalse(passwdEl, passwdTxt, ERR.PW_TAKEN);
		verifyFalse(passwd2El, passwd2Txt, ERR.PW_TAKEN);
		return false;
	}
	else {
		verifyTrue(passwdEl, passwdTxt);
		verifyTrue(passwd2El, passwd2Txt);
		passwdEl.classList.remove('error');
		passwd2El.classList.remove('error');
		passwdTxt.innerHTML = '';
		passwd2Txt.innerHTML = '';
		return true;
	}
}

function verifyUsername() {
	var username = usernameEl.value.trim();
	verifyReset(usernameEl, usernameTxt)
	if(username === '') {
		verifyFalse(usernameEl, usernameTxt, ERR.NAME_NULL)
		return false;
	}
	else {
		verifyTrue(usernameEl, usernameTxt)
		return true;
	}
}

function verifyEmail() {
	var regExp = /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/;
	var email = emailEl.value.trim();
	verifyReset(emailEl, emailTxt)
	if(email === '') {
		verifyFalse(emailEl, emailTxt, ERR.EMAIL_NULL)
		return false;
	}
	else if(!regExp.test(email)) {
		verifyFalse(emailEl, emailTxt, ERR.EMAIL_TAKEN)
		return false;
	}
	else {
		verifyTrue(emailEl, emailTxt)
		return true;
	}
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
}

function verifyTrue(el, elTxt, msg) {
	el.classList.add('active');
	el.classList.remove('error');
	elTxt.classList.remove('error');
	elTxt.innerHTML = msg || '';
}
