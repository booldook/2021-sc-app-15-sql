module.exports = _lang => {
	lang = _lang.toUpperCase()
	switch(lang) {
		case 'KO':
			return {
				ERROR: {
					NOT_FOUND 		: '존재하지 않는 데이터 입니다.',
				},
				GLOBAL: {
					LOGO					: '도서관리시스템',
					TAB_TITLE			: 'Express 게시판',
					NAVI: 				['도서 등록', '도서 리스트']
				},
				LIST: {
					TITLE 				: '도서 목록',
					DESC 					: '등록된 도서들의 리스트 입니다.',
				},
				VIEW: {
					TITLE 				: '도서 상세 정보',
					DESC 					: '선택하신 도서의 상세 정보 입니다.',
				},
				CREATE: {
					TITLE 				: '도서 등록',
					DESC 					: '등록할 도서를 아래에서 입력하세요.',
				},
				UPDATE: {
					TITLE 				: '도서 수정',
					DESC 					: '수정할 도서 내용을 아래에서 변경하세요.',
				}
			}
		case 'EN': 
			return {
				ERROR: {
					NOT_FOUND 		: 'Data Not Found',
				},
				GLOBAL: {
					LOGO					: 'BOOK MANAGEMENT SYSTEM',
					TAB_TITLE			: 'Express Board',
					NAVI: 				['Book Register', 'Book List']
				},
				LIST: {
					TITLE 				: 'Book List',
					DESC 					: 'This is a list of registered books.',
				},
				VIEW: {
					TITLE 				: 'Book Detail Information',
					DESC 					: 'Detailed information of the selected book.',
				},
				CREATE: {
					TITLE 				: 'Book Register',
					DESC 					: 'Please enter the book you wish to register below.',
				},
				UPDATE: {
					TITLE 				: 'Book Update',
					DESC 					: 'Change the contents of the book to be edited below.',
				}
			}
	}
}