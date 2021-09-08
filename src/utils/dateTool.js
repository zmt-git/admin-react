export function formatTime(timestamp) {
  if (!timestamp) timestamp = new Date().getTime()
  if (timestamp.toString().length === 10) {
    timestamp = timestamp * 1000
  }

  const time = new Date(timestamp)

  const yyyy = time.getFullYear()
  const MM = (time.getMonth() + 1).toString().padStart(2, '0')
  const dd = time.getDate().toString().padStart(2, '0')
  const hh = time.getHours().toString().padStart(2, '0')
  const mm = time.getMinutes().toString().padStart(2, '0')
  const ss = time.getSeconds().toString().padStart(2, '0')

  return `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`
}
