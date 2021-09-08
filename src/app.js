import { getToken } from '@/utils/cache/cacheAuth'
import { getAsyncRoute } from '@/utils/permission'

let asyncRoutes = []

export async function getInitialState() {
  return { asyncRoutes }
}

export function patchRoutes ({ routes }, newRoutes = asyncRoutes) {

  if (newRoutes.length === 0) return

  const layout = routes.find(item => item.path === '/')

  newRoutes.forEach(route => {
    route.routes.forEach(i => {
      if (!layout.routes.some(item => item.path === i.path)) {
        layout.routes.unshift(...route.routes)
      }
    })
  })
}

export async function onRouteChange({ matchedRoutes }) {
  if (matchedRoutes.length) {
    document.title = matchedRoutes[matchedRoutes.length - 1].route.title || '';
  }
}

export async function render (oldRender) {
  // 刷新获取路由
  if (getToken()) {
   const { routes } = await getAsyncRoute()

   asyncRoutes = routes
  }

  oldRender()
}
