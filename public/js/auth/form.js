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

document.saveForm.addEventListener('submit', onSubmit)
function onSubmit(e) {
	e.preventDefault();
	var userid = useridEl.value.trim();
	var passwd = passwdEl.value.trim();
	var passwd2 = passwd2El.value.trim();
	var username = usernameEl.value.trim();
	var email = emailEl.value.trim();

	
	if(passwd === '') {
		return false;
	}
	if(passwd.length < 6 || passwd.length > 24) {
		return false;
	}
	if(passwd2 === '') {
		return false;
	}
	if(passwd2.length < 6 || passwd2.length > 24) {
		return false;
	}
	if(passwd !== passwd2) {
		return false;
	}
	if(username === '') {
		return false;
	}
	if(email === '') {
		return false;
	}
}

function verifyUserId() {
	if(userid === '') {
		useridTxt.classList.add('error');
		useridTxt.innerHTML = ERR.ID_NULL;
		useridEl.classList.add('error');
		useridEl.focus();
		return false;
	}
	if(userid.length < 6 || userid.length > 24) {
		return false;
	}
	return true;
}