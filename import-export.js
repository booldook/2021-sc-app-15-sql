// Common JS - 익명
// a.js - 내보낼때
module.export = () => {

}
// 받을때
const 아무이름 = require('a')

// ES6 - 익명
// a.js - 내보낼때
export default () => {

}
// 받을때
import 아무이름 from 'a'




// Common JS - 객체
// a.js - 내보낼때
module.export = { a, b }
// 받을때
const { a, b } = require('a')
const { a: aa, b: bb } = require('a')

// ES6 - 객체
// a.js - 내보낼때
export { a, b }
// 받을때
import { a, b } from 'a'
import { a as aa, b as bb } from 'a'

