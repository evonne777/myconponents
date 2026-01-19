export function constantEscape(value, list, key, label) {
  if (!Array.isArray(list)) {
    return ''
  }
  const res = list.find(item => item[key] === value)
  return res ? res[label] : ''
}
