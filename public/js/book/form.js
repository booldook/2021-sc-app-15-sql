function onSubmit(f) {
	var title = f.title.value.trim();
	var writer = f.writer.value.trim();
	var content = f.content.value.trim();
	if(!title) {
		alert('도서명을 입력하세요.');
		f.title.focus();
		return false;
	}
	return true;
}