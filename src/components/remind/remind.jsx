// בס"ד
import { useSelector } from 'react-redux'
import { RemindOffQueue } from '../remindOffQueue/remindOffQueue'
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Grid, 
  Fade, 
  Grow,
  Divider,
  Card,
  CardContent,
  Avatar,
  Chip,
  Tooltip,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { styled, alpha } from '@mui/material/styles'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import EventNoteIcon from '@mui/icons-material/EventNote'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import '../remind/remind.css'

// פלטת צבעים מודרנית ואלגנטית
const colors = {
  // Base colors
  background: '#f5f0e8',
  card: '#ffffff',
  primary: '#9c7c38',       // Gold accent
  secondary: '#78866b',     // Sage green
  tertiary: '#d8c3a5',      // Warm beige
  
  // Text colors
  textDark: '#2c3639',
  textMedium: '#4f5d75',
  textLight: '#8d99ae',
  
  // Accent colors
  accent1: '#e8d4b9',       // Light gold
  accent2: '#c6b497',       // Taupe
  accent3: '#a6a397',       // Warm gray
  
  // Gradients
  gradientWarm: 'linear-gradient(135deg, #e8d4b9 0%, #9c7c38 100%)',
  gradientCool: 'linear-gradient(135deg, #e8eaed 0%, #a6a397 100%)',
  
  // Shadows
  shadow: 'rgba(44, 54, 57, 0.15)',
  shadowHeavy: 'rgba(44, 54, 57, 0.25)',
}

// כרטיס תזכורת מעוצב
const ReminderCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  overflow: 'hidden',
  boxShadow: `0 10px 30px -10px ${colors.shadow}`,
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  position: 'relative',
  marginBottom: 20,
  border: `1px solid ${alpha(colors.accent1, 0.3)}`,
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: `0 15px 35px -10px ${colors.shadowHeavy}`,
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '6px',
    height: '100%',
    background: colors.gradientWarm,
  },
}))

// כותרת מעוצבת עם אייקון
const HeaderWithIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(5),
  position: 'relative',
}))

// אייקון מעוצב בתוך עיגול
const IconCircle = styled(Box)(({ theme }) => ({
  width: 70,
  height: 70,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: colors.gradientWarm,
  boxShadow: `0 10px 25px -5px ${alpha(colors.primary, 0.4)}`,
  marginRight: theme.spacing(2),
}))

// אלמנט דקורטיבי - עיגול רקע
const DecorativeCircle = styled(Box)(({ theme, position }) => ({
  position: 'absolute',
  width: position === 'large' ? 200 : 150,
  height: position === 'large' ? 200 : 150,
  borderRadius: '50%',
  background: position === 'large' 
    ? `radial-gradient(circle, ${alpha(colors.accent1, 0.3)} 0%, ${alpha(colors.accent1, 0.05)} 70%)`
    : `radial-gradient(circle, ${alpha(colors.accent2, 0.2)} 0%, ${alpha(colors.accent2, 0.03)} 70%)`,
  zIndex: 0,
  ...(position === 'large' ? {
    top: '10%',
    right: '5%',
  } : {
    bottom: '15%',
    left: '8%',
  }),
}))

// הודעת אין תזכורות מעוצבת
const EmptyStateCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  borderRadius: 16,
  backgroundColor: alpha(colors.card, 0.8),
  backdropFilter: 'blur(8px)',
  boxShadow: `0 10px 30px -10px ${colors.shadow}`,
  border: `1px solid ${alpha(colors.accent1, 0.2)}`,
}))

// מידע על מספר תזכורות
const CounterBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(4),
  padding: theme.spacing(2),
  borderRadius: 16,
  backgroundColor: alpha(colors.accent1, 0.2),
  border: `1px solid ${alpha(colors.accent1, 0.3)}`,
}))

export const Remind = () => {
  const [showContent, setShowContent] = useState(false)
  const fixedQ = useSelector(state => state.QueuesSlice.listOfQueues)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  
  useEffect(() => {
    // אנימציה בטעינה
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [])

  // פילטור התזכורות שצריך להציג
  const remindersToShow = fixedQ ? fixedQ.filter(q => q.isReminded === 0) : []
  
  return (
    <Box sx={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${colors.background} 0%, ${alpha(colors.tertiary, 0.5)} 100%)`,
      padding: { xs: '20px', md: '40px' },
      position: 'relative',
    }}>
      {/* אלמנטים דקורטיביים */}
      <DecorativeCircle position="large" />
      <DecorativeCircle position="small" />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Fade in={showContent} timeout={800}>
          <Box>
            {/* כותרת עם אייקון */}
            <HeaderWithIcon>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <IconCircle>
                  <NotificationsActiveIcon sx={{ fontSize: 32, color: 'white' }} />
                </IconCircle>
              </motion.div>
              
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Typography variant="h4" sx={{
                  fontWeight: 700,
                  color: colors.textDark,
                  fontFamily: '"Heebo", "Rubik", sans-serif',
                }}>
                  תיזכורות לימים הקרובים
                </Typography>
              </motion.div>
            </HeaderWithIcon>
            
            <Divider sx={{ 
              margin: '0 auto 40px auto',
              width: '60%',
              '&::before, &::after': {
                borderColor: alpha(colors.primary, 0.3),
              }
            }} />
            
            {/* מידע כשאין תזכורות */}
            {(!fixedQ || remindersToShow.length === 0) && (
              <Fade in={showContent} timeout={1000}>
                <EmptyStateCard>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <EventNoteIcon sx={{ 
                      fontSize: 60, 
                      color: alpha(colors.textMedium, 0.5),
                      marginBottom: 2
                    }} />
                    <Typography variant="h6" sx={{ color: colors.textMedium, fontWeight: 600 }}>
                      אין תזכורות לימים הקרובים
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: colors.textLight, 
                      marginTop: 1,
                      maxWidth: 400,
                      mx: 'auto'
                    }}>
                      כל התזכורות טופלו או שלא נקבעו תזכורות חדשות. תוכל לראות כאן תזכורות עתידיות כשיתווספו.
                    </Typography>
                  </motion.div>
                </EmptyStateCard>
              </Fade>
            )}
            
            {/* רשימת התזכורות */}
            <Grid container spacing={3}>
              {fixedQ && fixedQ.map((q, index) => {
                if (q.isReminded === 0) {
                  return (
                    <Grid item xs={12} key={index}>
                      <Grow 
                        in={showContent} 
                        style={{ transformOrigin: 'center top' }}
                        timeout={800 + (index * 150)}
                      >
                        <ReminderCard>
                          <CardContent sx={{ 
                            padding: 3,
                            '&:last-child': { paddingBottom: 3 }
                          }}>
                            <Box sx={{ position: 'relative' }}>
                              <Box sx={{ 
                                position: 'absolute', 
                                top: -8, 
                                right: -8, 
                                zIndex: 1 
                              }}>
                                <Tooltip title="תזכורת פעילה" arrow>
                                  <Chip
                                    icon={<AccessTimeIcon sx={{ fontSize: '1rem !important' }} />}
                                    label={new Date(q.date).toLocaleDateString('he-IL', { day: 'numeric', month: 'long' })}
                                    sx={{
                                      backgroundColor: alpha(colors.primary, 0.1),
                                      color: colors.primary,
                                      fontWeight: 600,
                                      '& .MuiChip-icon': {
                                        color: colors.primary,
                                      }
                                    }}
                                  />
                                </Tooltip>
                              </Box>
                              <RemindOffQueue queueToRemind={q} setFlagOpen={null} />
                            </Box>
                          </CardContent>
                        </ReminderCard>
                      </Grow>
                    </Grid>
                  )
                }
                return null
              })}
            </Grid>
            
            {/* מידע על מספר התזכורות */}
            {fixedQ && remindersToShow.length > 0 && (
              <Fade in={showContent} timeout={1200}>
                <CounterBox>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}>
                    <Avatar sx={{
                      width: 36,
                      height: 36,
                      backgroundColor: alpha(colors.primary, 0.1),
                      color: colors.primary
                    }}>
                      <CalendarTodayIcon fontSize="small" />
                    </Avatar>
                    <Typography variant="body1" sx={{ 
                      color: colors.textDark,
                      fontWeight: 600
                    }}>
                      סה"כ {remindersToShow.length} תזכורות לטיפול
                    </Typography>
                  </Box>
                </CounterBox>
              </Fade>
            )}
          </Box>
        </Fade>
      </Container>
    </Box>
  )
}