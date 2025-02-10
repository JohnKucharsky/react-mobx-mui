import { createContext, useContext } from 'react'
import { UserDetailsStore } from '@/features/user-details/data/store.ts'
import { UsersStore } from '@/features/users/data/store.ts'
import { ThemeStore } from '@/layout/store.ts'

export class RootStore {
  public readonly usersStore = new UsersStore()
  public readonly userDetailsStore = new UserDetailsStore()
  public readonly themeStore = new ThemeStore()
}

export const RootStoreVal = createContext<RootStore | null>(null)

export const useRootStore = (): RootStore => {
  const context = useContext(RootStoreVal)
  if (!context) {
    throw new Error('useRootStore must be used within a RootStoreVal.Provider')
  }
  return context
}
