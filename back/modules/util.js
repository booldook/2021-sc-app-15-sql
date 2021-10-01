const path = require('path')
const fs = require('fs-extra')

const location = src => path.join(__dirname, '../', src)

const cutTail = (str, len = 12) => str.length > len ? str.substr(0, len) + ' ...' : str

const chgStatus = status => {
	switch(status) {
		case '1': return '판매중'
		case '2': return '발행예정'
		case '3': return '절판'
		default : return '기타'
	}
}

const imgExt = ['jpg', 'jpeg', 'gif', 'png']
const mediaExt = ['mp3', 'mp4']
const docExt = ['ppt', 'pptx', 'xls', 'xlsx', 'doc', 'docx', 'hwp', 'pdf']
const zipExt = ['zip', 'alz']
const exts = { imgExt, mediaExt, docExt, zipExt }

const relPath = file => `/uploads/${file.split('_')[0]}/${file}`
const absPath = file => path.join(__dirname, `../storages/${file.split('_')[0]}/${file}`)
const moveFile = async file => {
	try {
		let savePath = path.join(__dirname, '../storages-remove', file.split('_')[0]) 
		let oldPath = absPath(file)
		await fs.ensureDir(savePath)	// D:\ ~ /210909
		savePath = path.join(savePath, file)	// D:\ ~ /210909/210909_fjk2134-askdf2103.jpg
		await fs.move(oldPath, savePath)
		return true
	}
	catch(err) {
		return err
	}
}

const getIcon = file => {
	const ext = path.extname(file).substr(1)
	if(imgExt.includes(ext)) return '/img/icons/img.png'
	if(mediaExt.includes(ext)) return '/img/icons/video.png'
	if(docExt.includes(ext)) return '/img/icons/doc.png'
	if(zipExt.includes(ext)) return '/img/icons/zip.png'
	return ''
}

const isImg = file => imgExt.includes(path.extname(file).substr(1)) ? true : false

const alert = (msg, loc = '/') => {
	return `<script>
		alert('${msg}');
		location.href = '${loc}';
	</script>`
}

module.exports = { 
	location, 
	cutTail, 
	chgStatus, 
	exts, 
	relPath, 
	absPath, 
	getIcon, 
	isImg, 
	moveFile, 
	alert 
}