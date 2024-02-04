export default function buildQueryString<T extends string>(
  key: string,
  value: T | T[]
): string {
  if (Array.isArray(value)) {
    if (value.length === 0) return ''
    return `${key}=${value.join(',')}`
  }
  return `${key}=${value}`
}
