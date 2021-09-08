import { Redirect } from 'umi'
import { getToken } from '@/utils/cache/cacheAuth'

export default (props) => {
  const token = getToken()
  if (props.location.pathname === '/errorPages' || props.location.pathname === '/login') {
    return <>{ props.children }</>;
  }

  if (token) {
    return <>{ props.children }</>;
  } else {
    return <Redirect to="/login" />;
  }
}
