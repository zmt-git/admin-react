const collapsedKey = 'collapsed'

export function setCollapsedCache (value) {
  localStorage.setItem(collapsedKey, value)
}

export function getCollapsed () {
  const collapsed = localStorage.getItem(collapsedKey)
  return collapsed === 'true' ? true: false
}

export function removeCollapsed () {
  localStorage.removeItem(collapsedKey)
}
