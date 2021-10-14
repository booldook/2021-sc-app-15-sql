const { pool } = require('../../modules/mysql-init')

const findApiUser = async (domain, apikey) => {
  try {
    const sql = " SELECT * FROM users_api WHERE domain=? AND apikey=? "
    const [rs] = await pool.execute(sql, [domain, apikey])
  }
  catch (err) {
    throw new Error(err)
  }
}

module.exports = { findApiUser }