function isObject (o) {
  return Object.prototype.toString.call(o) === '[object, Object]'
}

export function cloneDeep (source, hash = new WeakMap()) {
  if (!isObject(source) || !Array.isArray(source)) return source

  if (hash.has(source)) return hash.get(source)

  const targetObj = source.Constructor === Array ? [] : {}

  hash.set(source, targetObj)

  for (let key in source) {
    if (source.hasOwnProperty(key)) {
      if (source[key] && typeof source[key] === 'object') {
        targetObj[key] = source[key].Constructor === Array ? [] : {}
        targetObj[key] = deepClone(source[key], hash)
      } else {
        targetObj[key] = source[key]
      }
    }
  }

  return targetObj
}