/** 
* 1. 요청이 들어온다. 
*   가. req.cookies 의 존재 여부 확인
*      - !존재
          = DB에서 origin과 apikey의 일치 여부 확인
            +  일치
              . token을 발행(jwt.sign()) - data: { userid, apikey, origin }
              . res.cookie에 token을 저장
              . next()
            + !일치
              . next(createError(401, 'Authorization Fail'))
*      -  존재
          = req.cookies에서 token을 확인하고 `jwt.verify(token, salt): 내용리턴`
*         = 리턴된 내용에서 전달 받은 origin과 apikey의 일치 여부 확인
            +  일치
              . next()
            + !일치
              . next(createError(401, 'Authorization Fail'))
*
*/

const jwt = require('jsonwebtoken')

const isApiUser = async (req, res, next) => {
  try {

  }
  catch (err) {

  }
}

module.export = { isApiUser }