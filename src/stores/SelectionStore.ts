import { action, computed, observable } from 'mobx'

export class SelectionStore {
  @observable accessor selectedItems: Set<number> = new Set()

  @action
  selectAll(ids: number[], select: boolean) {
    this.selectedItems = select ? new Set(ids) : new Set()
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
  get selectedIds() {
    return Array.from(this.selectedItems)
  }
}
