import { action, observable } from 'mobx'

export class ConfirmDeleteStore {
  @observable accessor confirmDeleteOpened: boolean = false
  @observable accessor idToDelete: number | null = null

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
}
