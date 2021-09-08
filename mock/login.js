export default {
  'POST /api/system/login': (req, res) => {
    // 添加跨域请求头
    res.send({
      msg: 'success',
      result: '1223333333333'
    })
    res.end()
  },

  'GET /api/system/getName': (req, res) => {
    // 添加跨域请求头
    res.send({
      msg: 'success',
      result: '123'
    })
    res.end()
  },
}
