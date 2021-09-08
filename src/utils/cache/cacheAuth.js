const accountToken = 'accountToken'

export function setToken (token, key = accountToken) {
  sessionStorage.setItem(key, token)
}

export function getToken (key = accountToken) {
  return sessionStorage.getItem(key)
}

export function removeToken (key = accountToken) {
  sessionStorage.removeItem(key)
}
