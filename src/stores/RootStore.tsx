import { createContext, useContext } from 'react'
import { UserDetailsStore } from '@/features/user-details/data/store.ts'
import { UsersStore } from '@/features/users/data/store.ts'
import { ThemeStore } from '@/layout/store.ts'

export class RootStore {
  usersStore: UsersStore
  userDetailsStore: UserDetailsStore
  themeStore: ThemeStore

  constructor() {
    this.usersStore = new UsersStore()
    this.userDetailsStore = new UserDetailsStore()
    this.themeStore = new ThemeStore()
  }
}

export const RootStoreVal = createContext<RootStore | null>(null)

export const useRootStore = (): RootStore => {
  const context = useContext(RootStoreVal)

  return context as RootStore
}
