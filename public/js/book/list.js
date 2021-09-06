document.querySelectorAll('.book-tbl tbody tr').forEach(function(v, i) {
	v.addEventListener('click', function(e) {
		location.href = "/book/view/" + this.dataset['idx']
	})
})