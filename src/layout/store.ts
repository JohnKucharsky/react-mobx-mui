import { indigo } from '@mui/material/colors'
import { action, observable } from 'mobx'

export class ThemeStore {
  @observable accessor themeName: 'light' | 'dark' = 'light'
  @observable accessor primaryColor: string = indigo['500']

  constructor() {}

  @action
  handleChangeThemeName(name: 'light' | 'dark') {
    this.themeName = name
  }

  @action
  handleChangePrimaryColor(color: string) {
    this.primaryColor = color
  }
}

export const themeStore = new ThemeStore()
