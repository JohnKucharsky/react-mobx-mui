import { ReactElement } from 'react'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useRootStore } from '@/stores/RootStore.tsx'

const ThemeWrapper = observer(function ThemeWrapper({
  children,
}: {
  children: ReactElement
}) {
  const { themeStore } = useRootStore()

  const theme = createTheme({
    palette: {
      mode: themeStore.themeName,
      primary: {
        main: themeStore.primaryColor,
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
})

export default ThemeWrapper
