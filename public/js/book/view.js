document.querySelector('#btDelete').addEventListener('click', onDelete)
function onDelete(e) {
	if(confirm('정말로 삭제하시겠습니까?')) {
		document.deleteForm.submit();
	}
}

document.querySelector('#btUpdate').addEventListener('click', onUpdate)
function onUpdate(e) {
	location.href = '/book/form/' + this.dataset['idx'];
}