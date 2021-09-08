import { cloneDeep } from './deepClone'

export function generateField (extraRoutes) {
  const routes = cloneDeep(extraRoutes)
  return setField(routes)
}

function setField (routes, isChildren = false) {
  const list = isChildren ? routes.routes : routes

  for (let route of list) {
    if (route.component.toLowerCase() !== 'layout') {
      route.path = routes.path + '/' + route.path
      route.component = require(`@/pages${route.path}`).default
    }

    route.routes = route.children

    delete routes.children

    if (route.routes.length > 0) {
      route.routes = setField(route, isChildren = true)
    }
  }

  return list
}
