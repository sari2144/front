// בס"ד

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Box, 
  Typography, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Avatar,
  Divider,
  useMediaQuery,
  useTheme,
  Fade,
  alpha,
  styled
} from '@mui/material'
import { 
  Menu as MenuIcon, 
  CalendarMonth as CalendarIcon, 
  Search as SearchIcon, 
  PersonAdd as PersonAddIcon, 
  Settings as SettingsIcon, 
  Notifications as NotificationsIcon,
  Home as HomeIcon,
  ExitToApp as LogoutIcon
} from '@mui/icons-material'
import './menue.css'

// פלטת צבעים - ירוק קיווי ואדום פטל
const colors = {
// Base colors
background: '#f5f8f0',    // רקע בגוון ירקרק-שמנת בהיר
card: '#ffffff',          // לבן
primary: '#8bc34a',       // ירוק קיווי בהיר
secondary: '#e91e63',     // אדום-פטל בהיר
tertiary: '#f1f8e9',      // ירוק-לבן בהיר מאוד
  
// Text colors
textDark: '#33691e',      // ירוק כהה לטקסט
textMedium: '#558b2f',    // ירוק בינוני לטקסט
textLight: '#7cb342',     // ירוק בהיר לטקסט
textRaspberry: '#ad1457', // אדום-פטל כהה לטקסט
  
// Gradients
gradientGreen: 'linear-gradient(135deg, #aed581 0%, #689f38 100%)',  // גרדיאנט ירוק קיווי
gradientRaspberry: 'linear-gradient(135deg, #f06292 0%, #ad1457 100%)',  // גרדיאנט אדום-פטל
gradientMix: 'linear-gradient(135deg, #aed581 0%, #ad1457 100%)',   // גרדיאנט מעורב ירוק-אדום
}

// Styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: colors.card,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
}))

const NavButton = styled(Button)(({ theme, active }) => ({
  borderRadius: 30,
  padding: '8px 16px',
  margin: '0 4px',
  textTransform: 'none',
  fontWeight: 600,
  color: active ? colors.textRaspberry : colors.textDark,
  backgroundColor: active ? alpha(colors.secondary, 0.1) : 'transparent',
  '&:hover': {
      backgroundColor: active ? alpha(colors.secondary, 0.15) : alpha(colors.primary, 0.1),
      transform: 'translateY(-2px)',
  },
  transition: 'all 0.3s ease',
}))

const MobileNavItem = styled(ListItem)(({ theme, active }) => ({
  borderRadius: 12,
  margin: '8px 16px',
  backgroundColor: active ? alpha(colors.secondary, 0.1) : 'transparent',
  '&:hover': {
      backgroundColor: active ? alpha(colors.secondary, 0.15) : alpha(colors.primary, 0.1),
  },
}))

const Logo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
}))

const LogoText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  background: '-webkit-linear-gradient(45deg, #33691e 30%, #ad1457 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  letterSpacing: 1,
}))

export const Menue = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeItem, setActiveItem] = useState('/ccc')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const currentPatient = useSelector(state => state.PatientSlice.currentPatient)
    
  useEffect(() => {
      // Set active item based on current path
      const path = window.location.pathname
      setActiveItem(path)
  }, [])
    
  const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen)
  }
    
  const handleNavClick = (path) => {
      setActiveItem(path)
      if (isMobile) {
          setMobileOpen(false)
      }
  }
    
  const menuItems = [
      { text: 'לוח שנה', path: '/ccc', icon: <CalendarIcon /> },
      { text: 'חיפוש תורים', path: '/search', icon: <SearchIcon /> },
      { text: 'הוספת לקוחות', path: '/login', icon: <PersonAddIcon /> },
      { text: 'ניהול', path: '/manager', icon: <SettingsIcon /> },
      { text: 'תיזכורות', path: '/remind', icon: <NotificationsIcon /> },
  ]
    
  const drawer = (
      <Box sx={{ width: 280, height: '100%', backgroundColor: colors.card }}>
          <Box sx={{ 
              p: 3, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              background: `linear-gradient(135deg, ${alpha(colors.primary, 0.1)} 0%, ${alpha(colors.secondary, 0.1)} 100%)`,
          }}>
              <Avatar 
                  sx={{ 
                      width: 80, 
                      height: 80, 
                      mb: 2,
                      background: colors.gradientMix,
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  }}
              >
                  {currentPatient?.firstName ? currentPatient.firstName.charAt(0) : 'C'}
              </Avatar>
                
              <Typography variant="h6" sx={{ fontWeight: 600, color: colors.textDark }}>
                  {currentPatient?.firstName ? `${currentPatient.firstName} ${currentPatient.lastName}` : 'ברוכים הבאים'}
              </Typography>
                
              <Typography variant="body2" sx={{ color: colors.textMedium, mt: 0.5 }}>
                  {currentPatient?.phone || 'קליניקת חני רוזנצוויג'}
              </Typography>
          </Box>
            
          <Divider />
            
          <List sx={{ pt: 2 }}>
              {menuItems.map((item) => (
                  <MobileNavItem 
                      button 
                      key={item.path}
                      active={activeItem === item.path}
                      onClick={() => handleNavClick(item.path)}
                      component={Link}
                      to={item.path}
                  >
                      <ListItemIcon sx={{ 
                          color: activeItem === item.path ? colors.textRaspberry : colors.textMedium,
                          minWidth: 40,
                      }}>
                          {item.icon}
                      </ListItemIcon>
                      <ListItemText 
                          primary={item.text} 
                          primaryTypographyProps={{ 
                              fontWeight: activeItem === item.path ? 600 : 500,
                              color: activeItem === item.path ? colors.textRaspberry : colors.textDark,
                          }}
                      />
                  </MobileNavItem>
              ))}
          </List>
            
          <Divider sx={{ mt: 'auto' }} />
            
          <List>
              <MobileNavItem button>
                  <ListItemIcon sx={{ color: colors.textMedium, minWidth: 40 }}>
                      <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText 
                      primary="התנתקות" 
                      primaryTypographyProps={{ 
                          fontWeight: 500,
                          color: colors.textDark,
                      }}
                  />
              </MobileNavItem>
          </List>
      </Box>
  )

  return (
      <Box sx={{ flexGrow: 1 }}>
          <StyledAppBar>
              <Toolbar>
                  {isMobile && (
                      <IconButton
                          color="inherit"
                          aria-label="open drawer"
                          edge="start"
                          onClick={handleDrawerToggle}
                          sx={{ mr: 2, color: colors.textDark }}
                      >
                          <MenuIcon />
                      </IconButton>
                  )}
                    
                  <Logo>
                      <Avatar sx={{ 
                          background: colors.gradientMix,
                          width: 40,
                          height: 40,
                      }}>
                          CR
                      </Avatar>
                      <LogoText variant="h6">
                          חני רוזנצוויג
                      </LogoText>
                  </Logo>
                    
                  <Box sx={{ flexGrow: 1 }} />
                    
                  {!isMobile && (
                      <Box sx={{ display: 'flex' }}>
                          {menuItems.map((item) => (
                              <NavButton
                                  key={item.path}
                                  active={activeItem === item.path}
                                  startIcon={item.icon}
                                  onClick={() => handleNavClick(item.path)}
                                  component={Link}
                                  to={item.path}
                              >
                                  {item.text}
                              </NavButton>
                          ))}
                      </Box>
                  )}
                    
                  {currentPatient?.firstName && (
                      <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
                          <Avatar 
                              sx={{ 
                                  width: 36, 
                                  height: 36,
                                  background: colors.gradientRaspberry,
                                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                              }}
                          >
                              {currentPatient.firstName.charAt(0)}
                          </Avatar>
                      </Box>
                  )}
              </Toolbar>
          </StyledAppBar>
            
          <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                  keepMounted: true, // Better open performance on mobile
              }}
              sx={{
                  display: { xs: 'block', md: 'none' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
              }}
          >
              {drawer}
          </Drawer>
      </Box>
  )
}