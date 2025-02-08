export const omit = <T extends object, K extends keyof T>(
  obj: T,
  keys: K | K[],
): Omit<T, K> => {
  const result = { ...obj }

  if (!Array.isArray(keys)) {
    delete result[keys]
    return result
  }

  for (const key of keys) {
    delete result[key]
  }

  return result
}

export const groupBy = <T, K extends string | number | symbol>(
  arr: T[],
  callback: (item: T) => K,
): Record<K, T[]> => {
  return arr.reduce(
    (acc: Record<K, T[]>, item: T) => {
      const key = callback(item)
      if (!acc[key]) {
        acc[key] = [] // Ensure the key exists in the accumulator
      }
      acc[key].push(item)

      return acc
    },
    {} as Record<K, T[]>,
  )
}

export const orderByFunc = <T, K extends keyof T>(
  orderBy: K,
  order: 'asc' | 'desc' = 'asc',
  array?: T[],
) => {
  const multiplier = order === 'asc' ? 1 : -1
  const shallowCopiedArray = array?.slice()

  return shallowCopiedArray?.sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return -1 * multiplier
    if (a[orderBy] > b[orderBy]) return 1 * multiplier
    return 0
  })
}
