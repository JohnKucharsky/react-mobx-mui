import { action, observable } from 'mobx'
import { Order, SortKeys } from '@/features/users/data/types.ts'

export class OrderStore {
  @observable accessor order: Order = 'asc'
  @observable accessor orderBy: SortKeys = 'name'

  @action
  requestSort(property: SortKeys) {
    const isAsc = this.orderBy === property && this.order === 'asc'
    this.order = isAsc ? 'desc' : 'asc'
    this.orderBy = property
  }
}
