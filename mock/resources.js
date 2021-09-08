export default {
  'GET /api/resourceManager/getRoute': (req, res) => {
    // 添加跨域请求头
    if (req.headers.token && req.headers.token === '1223333333333') {
      res.send({
        msg: 'success',
        result: [
          {
            component: 'layout',
            path: '/device',
            meta: {
              title: '设备管理'
            },
            children: [
            {
                component: 'device/manage',
                path: 'manage',
                meta: {
                  title: '设备管理'
                },
                children: []
              },
              {
                component: 'device/index',
                path: 'index',
                meta: {
                  title: '设备管理2'
                },
                children: []
              }
            ]
          },
          {
            component: 'layout',
            path: '/user',
            meta: {
              title: '用户管理'
            },
            children: [
            {
                component: 'user/manage',
                path: 'manage',
                meta: {
                  title: '用户管理'
                },
                children: []
              },
              {
                component: 'user/index',
                path: 'index',
                meta: {
                  title: '评论'
                },
                children: []
              }
            ]
          }
        ]
      }).end()
    } else {
      res.sendStatus(401)
    }
  },
}
