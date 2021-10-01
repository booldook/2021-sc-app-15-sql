const morgan = require('morgan');
const path = require('path');
const rfs = require('rotating-file-stream');

const stream = rfs.createStream('access.log', {
	interval: '1d',
	path: path.join(__dirname, '../log')
});

const logger = morgan('combined', { stream });
module.exports = logger;