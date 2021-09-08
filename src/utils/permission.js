import { getRoute } from '@/api/resources'
import { generateField } from './routeHelper'

export function getAsyncRoute () {
  return getRoute()
    .then(async res => {
      return {
        routes: generateField(res.result),
        error: false
      }
    })
    .catch(err => {
      console.error(err)
      return {
        routes: [],
        error: true
      }
    })
}
