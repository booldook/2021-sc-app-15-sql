document.querySelectorAll('.book-tbl tbody tr').forEach(function(v, i) {
	v.addEventListener('click', function(e) {
		location.href = '/'+this.dataset['lang']+'/book/view/' + this.dataset['idx']
	})
})