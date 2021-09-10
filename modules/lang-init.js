module.exports = _lang => {
	lang = _lang.toUpperCase()
	switch(lang) {
		case 'KO':
			return {
				ERR_NOT_FOUND 		: '존재하지 않는 데이터 입니다.',
				TITLE_LIST 				: '도서 목록',
				TITLE_VIEW 				: '도서 상세 정보',
				TITLE_CREATE 			: '도서 등록',
				TITLE_UPDATE 			: '도서 수정',
				DESC_LIST 				: '등록된 도서들의 리스트 입니다.',
				DESC_VIEW 				: '선택하신 도서의 상세 정보 입니다.',
				DESC_CREATE 			: '등록할 도서를 아래에서 입력하세요.',
				DESC_UPDATE 			: '수정할 도서 내용을 아래에서 변경하세요.',
			}
		case 'EN': 
			return {
				ERR_NOT_FOUND 		: 'Data Not Found',
				TITLE_LIST 				: 'Book List',
				TITLE_VIEW 				: 'Book Detail Information',
				TITLE_CREATE 			: 'Book Register',
				TITLE_UPDATE 			: 'Book Update',
				DESC_LIST 				: 'This is a list of registered books.',
				DESC_VIEW 				: 'Detailed information of the selected book.',
				DESC_CREATE 			: 'Please enter the book you wish to register below.',
				DESC_UPDATE 			: 'Change the contents of the book to be edited below.',
			}
	}
}