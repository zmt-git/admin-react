export default {
  'POST /api/device/list': (req, res) => {
    // 添加跨域请求头
    setTimeout(() => {
      res.send({
        msg: 'success',
        result: {
          condition: {},
          current: req.body.data.current,
          hitCount: false,
          orders: [{column: "create_time", asc: false}, {column: "id", asc: false}],
          pages: 9,
          records: [
            {devCode: "NX_TEST_0001", conType: "tlv", visNum: 1, leadNum: 5, location: "实验", createTime: new Date().getTime()},
            {devCode: "NX_TEST_0002", conType: "tlv", visNum: 1, leadNum: 5, location: "实验2", createTime: new Date().getTime()},
            {devCode: "NX_TEST_0003", conType: "tlv", visNum: 1, leadNum: 5, location: "实验3", createTime: new Date().getTime()},
            {devCode: "NX_TEST_0004", conType: "tlv", visNum: 1, leadNum: 5, location: "实验3", createTime: new Date().getTime()},
            {devCode: "NX_TEST_0005", conType: "tlv", visNum: 1, leadNum: 5, location: "实验3", createTime: new Date().getTime()},
            {devCode: "NX_TEST_0006", conType: "tlv", visNum: 1, leadNum: 5, location: "实验3", createTime: new Date().getTime()},
            {devCode: "NX_TEST_0007", conType: "tlv", visNum: 1, leadNum: 5, location: "实验3", createTime: new Date().getTime()},
            {devCode: "NX_TEST_0008", conType: "tlv", visNum: 1, leadNum: 5, location: "实验3", createTime: new Date().getTime()},
            {devCode: "NX_TEST_0009", conType: "tlv", visNum: 1, leadNum: 5, location: "实验3", createTime: new Date().getTime()},
            {devCode: "NX_TEST_00010", conType: "tlv", visNum: 1, leadNum: 5, location: "实验3", createTime: new Date().getTime()}
          ],
          searchCount: true,
          size: req.body.data.size,
          total: 200
        }
      })
      res.end()
    }, 200)
  },

  'POST /api/device/update': (req, res) => {
    setTimeout(() => {
      res.send({
        msg:'success',
        result: null
      })
      res.end()

    }, 3000)
  },

  'GET /api/device/numTypes': (req, res) => {
    res.send({
      msg: 'success',
      result: [
        {label: '一', value: 1 },
        {label: '二', value: 2 },
        {label: '三', value: 3 },
        {label: '四', value: 4 }
      ]
    })
    res.end()
  }
}
