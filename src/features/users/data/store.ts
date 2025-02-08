import { action, computed, observable, runInAction } from 'mobx'
import { z } from 'zod'
import {
  Order,
  SortKeys,
  type User,
  PartialUser,
  UserSchema,
} from '@/features/users/data/types'
import { axiosInstance } from '@/utils/axios'
import { apiRoutes } from '@/utils/constants'
import { logZodError } from '@/utils/loggers'

export class UsersStore {
  @observable accessor users: User[] | null = null
  @observable accessor usersLoading: boolean = false
  @observable accessor selectedItems: Set<number> = new Set()
  @observable accessor confirmDeleteOpened: boolean = false
  @observable accessor idToDelete: number | null = null
  @observable accessor order: Order = 'asc'
  @observable accessor orderBy: SortKeys = 'name'

  @action
  async fetchUsers(id?: string) {
    this.usersLoading = true
    try {
      const res = await axiosInstance.get<User[]>(apiRoutes['/users'], {
        params: { id: id || undefined },
      })

      runInAction(() => {
        z.array(UserSchema).parse(res.data)
        this.users = res.data
      })
    } catch (e) {
      logZodError(e, apiRoutes['/users'])
    } finally {
      runInAction(() => {
        this.usersLoading = false
        this.clearSelectedItems()
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
        this.clearSelectedItems()
        this.usersLoading = false
      })
    }
  }

  @action
  async deleteManyUsers() {
    this.usersLoading = true
    try {
      for (const id of this.selectedItems) {
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
        this.clearSelectedItems()
      })
    }
  }

  @action
  selectAll(select: boolean) {
    if (this.users) {
      this.selectedItems = select
        ? new Set(this.users.map((item) => item.id))
        : new Set()
    }
  }

  @action
  toggleSelectOne(id: number) {
    if (this.selectedItems.has(id)) {
      this.selectedItems.delete(id)
    } else {
      this.selectedItems.add(id)
    }
  }

  @action
  clearSelectedItems() {
    this.selectedItems.clear()
  }

  @computed
  get hasSelectedItems() {
    return this.selectedItems.size > 0
  }

  @computed
  get selectedSome() {
    return (
      this.users &&
      this.selectedItems.size > 0 &&
      this.selectedItems.size < this.users.length
    )
  }

  @computed
  get selectedAll() {
    return (
      this.users &&
      this.users.length &&
      this.selectedItems.size === this.users.length
    )
  }

  // Confirm delete
  @action
  openConfirmDelete(id: number | null) {
    this.confirmDeleteOpened = true
    this.idToDelete = id
  }

  @action
  closeConfirmDelete() {
    this.confirmDeleteOpened = false
    this.idToDelete = null
  }

  // Sorting
  @action
  requestSort(property: SortKeys) {
    const isAsc = this.orderBy === property && this.order === 'asc'
    this.order = isAsc ? 'desc' : 'asc'
    this.orderBy = property
  }
}

export const usersStore = new UsersStore()
