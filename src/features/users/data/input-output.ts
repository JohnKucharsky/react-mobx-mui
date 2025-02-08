import { User } from '@/features/users/data/types'

export interface UserFields {
  name: string
  userName: string
  email: string
  phone: string
  website: string
  street: string
  suite: string
  city: string
  zipcode: string
  companyName: string
}

const emptyInitialValues = {
  name: '',
  userName: '',
  email: '',
  phone: '',
  website: '',
  street: '',
  suite: '',
  city: '',
  zipcode: '',
  companyName: '',
  submit: null as unknown,
}

const getInitialValues = (initialValues: User): typeof emptyInitialValues => ({
  name: initialValues.name,
  userName: initialValues.username,
  email: initialValues.email,
  phone: initialValues.phone,
  website: initialValues.website,
  street: initialValues.address.street,
  suite: initialValues.address.suite,
  city: initialValues.address.city,
  zipcode: initialValues.address.zipcode,
  companyName: initialValues.company.name,
  submit: null,
})

const formatValues = (inputValues: UserFields): Omit<User, 'id'> => ({
  name: inputValues.name,
  username: inputValues.userName,
  email: inputValues.email,
  phone: inputValues.phone,
  website: inputValues.website,
  address: {
    street: inputValues.street,
    suite: inputValues.suite,
    city: inputValues.city,
    zipcode: inputValues.zipcode,
  },
  company: { name: inputValues.companyName },
})

export const userInputOutput = {
  emptyInitialValues,
  getInitialValues,
  formatValues,
}
