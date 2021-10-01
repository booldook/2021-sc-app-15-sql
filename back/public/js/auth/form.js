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
	
	var isPasswd = verifyPasswd();
	var isPasswd2 = verifyPasswd2();
	var isPasswdEqual = verifyPasswdEqual();
	var isUsername = verifyUsername();

	if(isPasswd && isPasswd2 && isPasswdEqual && isUsername) {
		axios
		.get('/api/auth/verify', { params: { key: 'userid', value: useridEl.value.trim() } })
		.then(function(r) {
			if(r.data.isUsed) return verifyFalse(useridEl, useridTxt, ERR.ID_TAKEN)
			else {
				verifyTrue(useridEl, useridTxt, ERR.ID_OK);
				axios.get('/api/auth/verify', { params: { key: 'email', value: emailEl.value.trim() } })
				.then(function(r) {
					if(r.data.isUsed) return verifyFalse(emailEl, emailTxt, ERR.EMAIL_TAKEN)
					else {
						verifyTrue(emailEl, emailTxt);
						f.submit();
					}
				})
				.catch(function(err) {
					return verifyFalse(useridEl, useridTxt, err.response.data.msg)
				})
			}
		})
		.catch(function(err) {
			return verifyFalse(useridEl, useridTxt, err.response.data.msg)
		})
	}
}

function verifyUserid() {
	var userid = useridEl.value.trim();
	verifyReset(useridEl, useridTxt);
	if(userid === '' || userid.length < 6 || userid.length > 24) {
		return verifyFalse(useridEl, useridTxt, userid === '' ? ERR.ID_NULL : ERR.ID_LEN);
	}
	else if(!validator.isAlphanumeric(userid)) {
		return verifyFalse(useridEl, useridTxt, ERR.ID_VALID);
	}
	else {
		axios
		.get('/api/auth/verify', { params: { key: 'userid', value: userid } })
		.then(function(r) {
			if(r.data.isUsed) return verifyFalse(useridEl, useridTxt, ERR.ID_TAKEN)
			else validId = verifyTrue(useridEl, useridTxt, ERR.ID_OK)
		})
		.catch(function(err) {
			return verifyFalse(useridEl, useridTxt, err.response.data.msg)
		})
	}
}

function verifyPasswd() {
	var passwd = passwdEl.value.trim();
	verifyReset(passwdEl, passwdTxt)
	if(passwd === '' || passwd.length < 6 || passwd.length > 24) {
		return verifyFalse(passwdEl, passwdTxt, passwd === '' ? ERR.PW_NULL : ERR.PW_LEN)
	}
	else {
		return verifyTrue(passwdEl, passwdTxt)
	}
}

function verifyPasswd2() {
	var passwd2 = passwd2El.value.trim();
	verifyReset(passwd2El, passwd2Txt)
	if(passwd2 === '' || passwd2.length < 6 || passwd2.length > 24) {
		return verifyFalse(passwd2El, passwd2Txt, passwd2 === '' ? ERR.PW2_NULL : ERR.PW2_LEN)
	}
	else {
		return verifyTrue(passwd2El, passwd2Txt)
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
		return true;
	}
}

function verifyUsername() {
	var username = usernameEl.value.trim();
	verifyReset(usernameEl, usernameTxt)
	if(username === '') {
		return verifyFalse(usernameEl, usernameTxt, ERR.NAME_NULL)
	}
	else {
		return verifyTrue(usernameEl, usernameTxt)
	}
}

function verifyEmail() {
	// var regExp = /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/;
	var email = emailEl.value.trim();
	verifyReset(emailEl, emailTxt)
	if(email === '') {
		return verifyFalse(emailEl, emailTxt, ERR.EMAIL_NULL)
	}
	// else if(!regExp.test(email)) {
	else if(!validator.isEmail(email)) {
		return verifyFalse(emailEl, emailTxt, ERR.EMAIL_VALID)
	}
	else {
		axios
		.get('/api/auth/verify', { params: { key: 'email', value: email } })
		.then(function(r) {
			if(r.data.isUsed) return verifyFalse(emailEl, emailTxt, ERR.EMAIL_TAKEN)
			else validEmail = verifyTrue(emailEl, emailTxt)
		})
		.catch(function(err) {
			return verifyFalse(emailEl, emailTxt, err.response.data.msg)
		})
		return verifyTrue(emailEl, emailTxt)
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
	return false;
}

function verifyTrue(el, elTxt, msg) {
	el.classList.add('active');
	el.classList.remove('error');
	elTxt.classList.remove('error');
	elTxt.innerHTML = msg || '';
	return true;
}
