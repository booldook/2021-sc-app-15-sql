const createError = require('http-errors')
const path = require('path')

const error = (code, msg) => {
	let message = '서버 에러입니다. 관리자에게 문의하세요.'
	switch(code) {
		case 400:
			message = '요청이 잘못되었습니다.'
			break;
		case 401:
			message = '사용자 인증이 처리되지 않았습니다.'
			break;
		case 403:
			message = '허가되지 않은 접근입니다.'
			break;
		case 404:
			message = '경로를 찾을 수 없습니다.'
			break;
		case 500:
			message = '서버 내부 에러입니다. 잠시후 다시 시도해 주세요.'
			break;
		default:
			break;
	}
	return createError(code || 500, message + '^^' + msg)
}

const location = src => path.join(__dirname, '../', src)

const cutTail = (str, len = 12) => str.length > len ? str.substr(0, len) + ' ...' : str

const chgStatus = status => {
	switch(status) {
		case '0': return '절판'
		case '1': return '판매중'
		case '2': return '발행예정'
		default : return '기타'
	}
}

const imgExt = ['jpg', 'jpeg', 'gif', 'png']
const mediaExt = ['mp3', 'mp4']
const docExt = ['ppt', 'pptx', 'xls', 'xlsx', 'doc', 'docx', 'hwp', 'pdf']
const zipExt = ['zip', 'alz']
const exts = { imgExt, mediaExt, docExt, zipExt }

const relPath = file => `/uploads/${file.split('_')[0]}/${file}`

const getIcon = file => {
	const ext = path.extname(file).substr(1)
	if(imgExt.includes(ext)) return '/img/icons/img.png'
	if(mediaExt.includes(ext)) return '/img/icons/video.png'
	if(docExt.includes(ext)) return '/img/icons/doc.png'
	if(zipExt.includes(ext)) return '/img/icons/zip.png'
	return ''
}

const isImg = file => imgExt.includes(path.extname(file).substr(1)) ? true : false


module.exports = { error, location, cutTail, chgStatus, exts, relPath, getIcon, isImg }