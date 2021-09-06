document.saveForm.addEventListener('submit', onSubmit);
function onSubmit(e) {
	e.preventDefault();
	var title = this.title.value.trim();
	var writer = this.writer.value.trim();
	var content = this.content.value.trim();
	if(!title) {
		alert('도서명을 입력하세요.');
		this.title.focus();
		return false;
	}
	this.submit();
}