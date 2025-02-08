import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { userDetailsStore } from '@/features/user-details/data/api.ts'
import UserDetails from '@/features/user-details/UserDetails.tsx'
import { usersStore } from '@/features/users/data/store.ts'
import Users from '@/features/users/Users'
import './i18n/i18n'
import Layout from '@/layout/Layout.tsx'
import { themeStore } from '@/layout/store.ts'
import ThemeWrapper from '@/layout/ThemeWrapper.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeWrapper themeStore={themeStore}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Users usersStore={usersStore} />} />
            <Route
              path={'/user/:userId'}
              element={<UserDetails userDetailsStore={userDetailsStore} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeWrapper>
  </StrictMode>,
)
