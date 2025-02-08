import { useTranslation } from 'react-i18next'
import { string } from 'yup'
import { Address, Order, User } from '@/features/users/data/types.ts'

export const useYupSchemaUsers = () => {
  const { t } = useTranslation()

  return {
    name: string().min(3).max(64).required(t('fieldRequired')),
    userName: string().min(3).max(64).required(t('fieldRequired')),
    email: string().max(64, t('max64')),
    phone: string(),
    website: string().max(64, t('max64')),
    street: string().max(64, t('max64')),
    suite: string().max(64, t('max64')),
    city: string().max(64, t('max64')),
    zipcode: string().max(64, t('max64')),
    companyName: string().max(64, t('max64')),
  }
}

export const formatAddress = (address: Address): string => {
  const { street, suite, city } = address

  const parts = [street, suite, city].filter(Boolean)

  return parts.join(', ')
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (typeof b[orderBy] === 'string' && typeof a[orderBy] === 'string') {
    if (b[orderBy].toLowerCase() < a[orderBy].toLowerCase()) {
      return -1
    }
    if (b[orderBy].toLowerCase() > a[orderBy].toLowerCase()) {
      return 1
    }
  }

  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

export function getComparator<Key extends keyof User>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: string | number | undefined },
  b: { [key in Key]: string | number | undefined },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}
