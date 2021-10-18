if(document.querySelector('#btDelete')) {
	document.querySelector('#btDelete').addEventListener('click', onDelete)
	function onDelete(e) {
		if(confirm(this.dataset['msg'])) {
			document.deleteForm.submit();
		}
	}
}

if(document.querySelector('#btUpdate')) {
	document.querySelector('#btUpdate').addEventListener('click', onUpdate)
	function onUpdate(e) {
		location.href = '/'+this.dataset['lang']+'/book/form/' + this.dataset['idx'];
	}
}
