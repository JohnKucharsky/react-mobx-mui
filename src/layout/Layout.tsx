import { ReactElement, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import SettingsIcon from '@mui/icons-material/Settings'
import { Link, Slide, useScrollTrigger } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router'
import ColorPicker from '@/components/ColorPicker.tsx'
import DarkModePicker from '@/components/DarkModePicker.tsx'

const drawerWidth = 240
const navItems = [
  {
    title: 'GITHUB',
    href: 'https://github.com/JohnKucharsky/react-effector-mui',
  },
  { title: 'TELEGRAM', href: 'https://t.me/johnkucharsky' },
  {
    title: 'HH.RU',
    href: 'https://hh.ru/resume/d9f27928ff0e3ac9b20039ed1f4648646e454a',
  },
]

export default function Layout() {
  return (
    <>
      <HideOnScroll>
        <AppBar component="nav">
          <Toolbar
            sx={{
              justifyContent: 'space-between',
              maxWidth: 'xl',
              mx: 'auto',
              width: '100%',
            }}
          >
            <LeftDrawer />

            <Typography
              variant="h6"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              Kucharsky
            </Typography>
            <Box
              textAlign={'center'}
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              {navItems.map((item) => (
                <Button
                  component={Link}
                  key={item.title}
                  href={item.href}
                  color={'inherit'}
                >
                  {item.title}
                </Button>
              ))}
            </Box>
            <RightDrawer />
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      <Box component="main" width={'100%'} maxWidth={'xl'} mx={'auto'}>
        <Toolbar />

        <Box pt={1}>
          <Outlet />
        </Box>
      </Box>
    </>
  )
}

const HideOnScroll = ({ children }: { children: ReactElement }) => {
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

const LeftDrawer = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }
  return (
    <>
      <IconButton
        color="inherit"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { sm: 'none' } }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        <Box onClick={handleDrawerToggle}>
          <Typography textAlign={'center'} variant="h6" sx={{ my: 1.5 }}>
            Kucharsky
          </Typography>
          <Divider />
          <List>
            {navItems.map((item) => (
              <ListItem key={item.title} disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <ListItemText
                    primary={<Link href={item.href}>{item.title}</Link>}
                    sx={{ cursor: 'pointer' }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  )
}

const RightDrawer = () => {
  const [drawerOpened, setDrawerOpened] = useState(false)

  const { t } = useTranslation()

  const handleDrawerToggle = () => {
    setDrawerOpened((prevState) => !prevState)
  }
  return (
    <>
      <IconButton
        color="inherit"
        edge="end"
        onClick={handleDrawerToggle}
        sx={{ ml: 2 }}
      >
        <SettingsIcon />
      </IconButton>

      <Drawer
        anchor={'right'}
        open={drawerOpened}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Typography textAlign={'center'} variant="h6" sx={{ my: 1.5 }}>
          {t('Settings')}
        </Typography>
        <Divider />
        <DarkModePicker />

        <ColorPicker />
      </Drawer>
    </>
  )
}
