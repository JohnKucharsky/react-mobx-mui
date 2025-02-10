import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import UserDetails from '@/features/user-details/UserDetails.tsx'
import Users from '@/features/users/Users'
import './i18n/i18n'
import Layout from '@/layout/Layout.tsx'
import ThemeWrapper from '@/layout/ThemeWrapper.tsx'
import { RootStore, RootStoreVal } from '@/stores/RootStore.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootStoreVal.Provider value={new RootStore()}>
      <ThemeWrapper>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Users />} />
              <Route path={'/user/:userId'} element={<UserDetails />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeWrapper>
    </RootStoreVal.Provider>
  </StrictMode>,
)
