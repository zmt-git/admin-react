export default {
  'POST /api/user/list': (req, res) => {
    // 添加跨域请求头
    res.send({
      msg: 'success',
      result: [
        {title: 'mock1', content: 'mock content1'},
        {title: 'mock2', content: 'mock content2'},
        {title: 'mock3', content: 'mock content3'},
        {title: 'mock4', content: 'mock content4'},
        {title: 'mock5', content: 'mock content5'},
        {title: 'mock6', content: 'mock content6'},
        {title: 'mock7', content: 'mock content7'},
      ]
    })
    res.end()
  }
}
