import { indigo } from '@mui/material/colors'
import { createEvent, createStore } from 'effector'

export const $primaryColor = createStore<string>(indigo['500'])
export const $themeName = createStore<'light' | 'dark'>('light')

export const handleChangePrimaryColorEv = createEvent<string>()
export const handleChangeThemeNameEv = createEvent<'light' | 'dark'>()

$primaryColor.on(handleChangePrimaryColorEv, (_, payload) => payload)
$themeName.on(handleChangeThemeNameEv, (_, payload) => payload)
