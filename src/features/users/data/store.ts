import { action, computed, observable, runInAction } from 'mobx'
import { z } from 'zod'
import { type User, PartialUser, UserSchema } from '@/features/users/data/types'
import { ConfirmDeleteStore } from '@/stores/ConfirmDeleteStore.ts'
import { OrderStore } from '@/stores/OrderStore.ts'
import { SelectionStore } from '@/stores/SelectionStore.ts'
import { axiosInstance } from '@/utils/axios'
import { apiRoutes } from '@/utils/constants'
import { logZodError } from '@/utils/loggers'

export class UsersStore {
  @observable accessor users: User[] | null = null
  @observable accessor usersLoading: boolean = false
  selectionStore: SelectionStore
  orderStore: OrderStore
  confirmDeleteStore: ConfirmDeleteStore

  constructor() {
    this.selectionStore = new SelectionStore()
    this.orderStore = new OrderStore()
    this.confirmDeleteStore = new ConfirmDeleteStore()
  }

  @action
  async fetchUsers(id?: string) {
    this.usersLoading = true
    try {
      const res = await axiosInstance.get<User[]>(apiRoutes['/users'], {
        params: { id: id || undefined },
      })
      z.array(UserSchema).parse(res.data)

      runInAction(() => {
        this.users = res.data
      })
    } catch (e) {
      logZodError(e, apiRoutes['/users'])
    } finally {
      runInAction(() => {
        this.usersLoading = false
        this.selectionStore.clearSelectedItems()
      })
    }
  }

  @action
  async addUser(data: PartialUser) {
    const res = await axiosInstance.post<User>(apiRoutes['/users'], data)
    runInAction(() => {
      this.users = this.users ? [res.data, ...this.users] : [res.data]
    })
  }

  @action
  async editUser(data: PartialUser, id: number) {
    const res = await axiosInstance.put<User>(
      `${apiRoutes['/users']}/${id}`,
      data,
    )
    runInAction(() => {
      if (this.users) {
        this.users = this.users.map((item) =>
          item.id === id ? res.data : item,
        )
      }
    })
  }

  @action
  async deleteUser(id: number) {
    this.usersLoading = true
    try {
      await axiosInstance.delete(`${apiRoutes['/users']}/${id}`)
      runInAction(() => {
        if (this.users) {
          this.users = this.users.filter((item) => item.id !== id)
        }
      })
    } catch (e) {
      logZodError(e, apiRoutes['/users'])
    } finally {
      runInAction(() => {
        this.selectionStore.clearSelectedItems()
        this.usersLoading = false
      })
    }
  }

  @action
  async deleteManyUsers() {
    this.usersLoading = true
    try {
      for (const id of this.selectionStore.selectedIds) {
        await axiosInstance.delete(`${apiRoutes['/users']}/${id}`)
        runInAction(() => {
          if (this.users) {
            this.users = this.users.filter((item) => item.id !== id)
          }
        })
      }
    } catch (e) {
      logZodError(e, apiRoutes['/users'])
    } finally {
      runInAction(() => {
        this.usersLoading = false
        this.selectionStore.clearSelectedItems()
      })
    }
  }

  @computed
  get selectedSome() {
    return (
      this.users &&
      this.selectionStore.selectedItems.size > 0 &&
      this.selectionStore.selectedItems.size < this.users.length
    )
  }

  @computed
  get selectedAll() {
    return (
      this.users &&
      this.users.length &&
      this.selectionStore.selectedItems.size === this.users.length
    )
  }
}
