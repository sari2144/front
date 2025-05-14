//bsd"

import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { getPatientByIdThunk } from '../../redux/slices/patientSlice/getPatientByIdThunk'
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Container, 
  Paper, 
  Grid, 
  InputAdornment,
  CircularProgress,
  Fade,
  Grow,
  Slide,
  Zoom,
  useMediaQuery,
  useTheme,
  Avatar,
  Divider,
  IconButton,
  Link,
  Snackbar,
  Alert,
  SwipeableDrawer,
  Backdrop,
  Card,
  CardContent
} from '@mui/material'
import { styled, alpha } from '@mui/material/styles'
import PersonIcon from '@mui/icons-material/Person'
import LockIcon from '@mui/icons-material/Lock'
import SpaIcon from '@mui/icons-material/Spa'
import FavoriteIcon from '@mui/icons-material/Favorite'
import LocalFloristIcon from '@mui/icons-material/LocalFlorist'
import WaterDropIcon from '@mui/icons-material/WaterDrop'
import HealingIcon from '@mui/icons-material/Healing'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CloseIcon from '@mui/icons-material/Close'
import './login.css'

// פלטת צבעים מעודכנת - שילוב ירוק-קיווי ואדום-פטל כהה
const colors = {
  // Base colors
  background: '#f5f8f0',    // רקע בגוון ירקרק-שמנת בהיר
  card: '#ffffff',          // לבן
  primary: '#8bc34a',       // ירוק קיווי בהיר
  secondary: '#880e4f',     // אדום-פטל כהה
  tertiary: '#f1f8e9',      // ירוק-לבן בהיר מאוד
  
  // Text colors
  textDark: '#33691e',      // ירוק כהה לטקסט
  textMedium: '#558b2f',    // ירוק בינוני לטקסט
  textLight: '#7cb342',     // ירוק בהיר לטקסט
  
  // Accent colors
  accent1: '#aed581',       // ירוק קיווי בהיר
  accent2: '#ad1457',       // אדום-פטל בינוני
  accent3: '#c5e1a5',       // ירוק-שמנת בהיר
  
  // Gradients
  gradientGreen: 'linear-gradient(135deg, #aed581 0%, #689f38 100%)',  // גרדיאנט ירוק קיווי
  gradientRaspberry: 'linear-gradient(135deg, #c2185b 0%, #880e4f 100%)',  // גרדיאנט אדום-פטל
  gradientMix: 'linear-gradient(135deg, #689f38 0%, #ad1457 100%)',   // גרדיאנט ירוק-אדום
  gradientOverlay: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 100%)',
  
  // Shadows
  shadow: 'rgba(104, 159, 56, 0.15)',
  shadowHeavy: 'rgba(104, 159, 56, 0.25)',
  shadowRaspberry: 'rgba(136, 14, 79, 0.15)',
};

// Innovative styled components
const FloatingInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 16,
    backgroundColor: 'transparent',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    border: `1px solid ${alpha(colors.primary, 0.2)}`,
    overflow: 'hidden',
    '&:before': {
      content: '""',
      position: 'absolute',
      left: 0,
      bottom: 0,
      height: '2px',
      width: '0%',
      background: colors.gradientGreen,
      transition: 'width 0.4s ease',
      zIndex: 0,
    },
    '&:hover': {
      backgroundColor: alpha(colors.accent1, 0.05),
      '&:before': {
        width: '30%',
      },
    },
    '&.Mui-focused': {
      backgroundColor: alpha(colors.accent1, 0.08),
      boxShadow: `0 8px 20px -8px ${colors.shadow}`,
      '&:before': {
        width: '100%',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent',
      },
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'transparent',
    },
  },
  '& .MuiInputLabel-root': {
    color: colors.textMedium,
    fontWeight: 500,
    '&.Mui-focused': {
      color: colors.primary,
    },
  },
  '& .MuiInputBase-input': {
    padding: '20px 16px',
    fontSize: '1rem',
    fontWeight: 500,
  },
  marginBottom: 24,
}));

const AnimatedButton = styled(Button)(({ theme }) => ({
  borderRadius: 30,
  padding: '14px 32px',
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1rem',
  background: colors.gradientGreen,
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
    transition: 'all 0.6s ease',
  },
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: `0 10px 25px -5px ${colors.shadowHeavy}`,
    '&:before': {
      left: '100%',
    },
  },
  '&:active': {
    transform: 'translateY(-1px)',
    boxShadow: `0 5px 15px -5px ${colors.shadowHeavy}`,
  },
}));

// Modern, minimalist logo
const ModernLogo = () => (
  <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
  }}>
    <Box sx={{
      position: 'relative',
      width: 80,
      height: 80,
    }}>
      {/* Main circle */}
      <Box sx={{
        position: 'absolute',
        width: 80,
        height: 80,
        borderRadius: '50%',
        background: colors.gradientMix,
        boxShadow: `0 10px 30px -5px ${alpha(colors.primary, 0.3)}`,
      }} />
      
      {/* Overlapping circle */}
      <Box sx={{
        position: 'absolute',
        width: 40,
        height: 40,
        borderRadius: '50%',
        background: colors.card,
        top: 20,
        left: 20,
        boxShadow: `0 5px 15px -5px ${colors.shadow}`,
      }} />
      
      {/* Decorative line */}
      <Box sx={{
        position: 'absolute',
        width: 60,
        height: 2,
        background: colors.card,
        top: 40,
        left: 10,
        transform: 'rotate(45deg)',
        transformOrigin: 'center',
      }} />
    </Box>
    
    <Typography variant="h5" sx={{
      fontWeight: 700,
      color: colors.textDark,
      letterSpacing: 1,
      fontFamily: '"Heebo", "Rubik", sans-serif',
    }}>
      חני רוזנצוויג
    </Typography>
    
    <Typography variant="body2" sx={{
      color: colors.textMedium,
      fontWeight: 500,
      textAlign: 'center',
      maxWidth: 200,
      fontSize: '0.85rem',
      lineHeight: 1.5,
    }}>
      ניהול קליניקות לטיפולים טבעיים
    </Typography>
  </Box>
);

// Main Login Component with innovative design
export const Login = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [loginMode, setLoginMode] = useState(false)
  const dispatch = useDispatch()
  const navi = useNavigate()
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    // Trigger animations after component mount
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const login = async () => {
    if (!password) {
      setError('חובה להזין תעודת זהות')
      setShowSnackbar(true)
      return
    }
  
    setIsLoading(true)
    setError('')
    try {
      let res = await dispatch(getPatientByIdThunk(password))
      console.log(res)
    
      if(res.payload !== undefined){
        navi('/ccc')
      } else {
        navi('/registration/' + name + '/' + password)
      }
    } catch (error) {
      console.error("Login error:", error)
      setError('אירעה שגיאה בהתחברות')
      setShowSnackbar(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if(e.key === 'Enter') login()
  }

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  const toggleLoginMode = () => {
    setLoginMode(!loginMode);
  };

  // Innovative service cards
  const serviceCards = [
    { 
      icon: <SpaIcon sx={{ fontSize: 36 }} />, 
      title: 'רפואה משלימה', 
      description: 'טיפולים טבעיים המשלימים את הרפואה הקונבנציונלית',
      color: colors.primary
    },
    { 
      icon: <HealingIcon sx={{ fontSize: 36 }} />, 
      title: 'טיפולים טבעיים', 
      description: 'שיטות טיפול מבוססות על חומרים טבעיים וצמחי מרפא',
      color: colors.secondary
    },
    { 
      icon: <LocalFloristIcon sx={{ fontSize: 36 }} />, 
      title: 'צמחי מרפא', 
      description: 'שימוש בצמחים ותמציות טבעיות לטיפול במגוון בעיות',
      color: colors.accent1
    },
    { 
      icon: <FavoriteIcon sx={{ fontSize: 36 }} />, 
      title: 'איזון גוף-נפש', 
      description: 'טיפולים הוליסטיים המשלבים את הגוף והנפש כמכלול אחד',
      color: colors.accent2
    }
  ];

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: `linear-gradient(135deg, ${colors.background} 0%, ${alpha(colors.tertiary, 0.7)} 100%)`,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative background elements */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.4,
        background: `radial-gradient(circle at 20% 30%, ${alpha(colors.accent1, 0.4)} 0%, transparent 50%), 
                     radial-gradient(circle at 80% 70%, ${alpha(colors.accent2, 0.3)} 0%, transparent 50%)`,
      }} />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 5 }}>
        <Fade in={showContent} timeout={1000}>
          <Box>
            {/* Header with logo */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center',
              mb: 6
            }}>
              <ModernLogo />
            </Box>
            
            {/* Main content */}
            <Grid container spacing={4} justifyContent="center">
              {/* Service cards - visible when not in login mode */}
              {!loginMode && (
                <Fade in={!loginMode} timeout={800}>
                  <Grid item xs={12}>
                    <Typography variant="h4" align="center" sx={{
                      fontWeight: 700,
                      color: colors.textDark,
                      mb: 5,
                      fontFamily: '"Heebo", "Rubik", sans-serif',
                    }}>
                      הקליניקה</Typography>
                    
                    <Grid container spacing={3} justifyContent="center">
                      {serviceCards.map((card, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                          <Zoom in={showContent} style={{ transitionDelay: `${200 + index * 150}ms` }}>
                            <Card sx={{
                              height: '100%',
                              borderRadius: 4,
                              boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)',
                              transition: 'all 0.3s ease',
                              overflow: 'hidden',
                              position: 'relative',
                              '&:hover': {
                                transform: 'translateY(-8px)',
                                boxShadow: '0 20px 40px -15px rgba(0,0,0,0.2)',
                                '& .card-overlay': {
                                  opacity: 0.9,
                                }
                              }
                            }}>
                              <Box sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: `linear-gradient(135deg, ${alpha(card.color, 0.3)} 0%, ${alpha(card.color, 0.1)} 100%)`,
                                opacity: 0.7,
                                transition: 'opacity 0.3s ease',
                                zIndex: 0,
                              }} />
                              
                              <CardContent sx={{
                                position: 'relative',
                                zIndex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                padding: '30px 20px',
                                height: '100%',
                              }}>
                                <Box sx={{
                                  width: 70,
                                  height: 70,
                                  borderRadius: '50%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  background: colors.card,
                                  boxShadow: `0 8px 20px -8px ${colors.shadow}`,
                                  mb: 2,
                                  color: card.color,
                                }}>
                                  {card.icon}
                                </Box>
                                
                                <Typography variant="h6" sx={{
                                  fontWeight: 600,
                                  color: colors.textDark,
                                  mb: 1.5,
                                }}>
                                  {card.title}
                                </Typography>
                                
                                <Typography variant="body2" sx={{
                                  color: colors.textMedium,
                                  lineHeight: 1.6,
                                  fontSize: '0.9rem',
                                }}>
                                  {card.description}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Zoom>
                        </Grid>
                      ))}
                    </Grid>
                    
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'center',
                      mt: 6
                    }}>
                      <AnimatedButton
                        variant="contained"
                        onClick={toggleLoginMode}
                        sx={{ px: 4, py: 1.5 }}
                      >
                        התחברות למערכת
                      </AnimatedButton>
                    </Box>
                  </Grid>
                </Fade>
              )}
              
              {/* Login form - visible when in login mode */}
              {loginMode && (
                <Grid item xs={12} sm={10} md={8} lg={6}>
                  <Fade in={loginMode} timeout={800}>
                    <Paper elevation={0} sx={{
                      borderRadius: 4,
                      overflow: 'hidden',
                      background: colors.card,
                      boxShadow: '0 20px 60px -20px rgba(0,0,0,0.15), 0 10px 30px -10px rgba(0,0,0,0.1)',
                      position: 'relative',
                    }}>
                      {/* Close button */}
                      <IconButton 
                        onClick={toggleLoginMode}
                        sx={{
                          position: 'absolute',
                          top: 16,
                          right: 16,
                          color: colors.textLight,
                          zIndex: 10,
                          '&:hover': {
                            background: alpha(colors.accent1, 0.1),
                            color: colors.textDark,
                          }
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                      
                      <Box sx={{
                        p: { xs: 3, sm: 5 },
                        position: 'relative',
                        zIndex: 1,
                      }}>
                        <Typography variant="h4" align="center" sx={{
                          fontWeight: 700,
                          color: colors.textDark,
                          mb: 1,
                          fontFamily: '"Heebo", "Rubik", sans-serif',
                        }}>
                          ברוכים הבאים
                        </Typography>
                        
                        <Typography variant="body1" align="center" sx={{
                          color: colors.textMedium,
                          mb: 4,
                          maxWidth: 400,
                          mx: 'auto',
                        }}>
                          אנו שמחים לראותך בקליניקה שלנו. התחבר/י כדי לצפות בתורים ולנהל את הטיפולים שלך.
                        </Typography>
                        
                        <Box component="form" noValidate sx={{ mt: 3 }}>
                          <FloatingInput
                            fullWidth
                            label="שם מלא"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onKeyPress={handleKeyPress}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PersonIcon sx={{ color: colors.primary }} />
                                </InputAdornment>
                              ),
                            }}
                          />
                          
                          <FloatingInput
                            fullWidth
                            label="תעודת זהות"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyPress={handleKeyPress}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <LockIcon sx={{ color: colors.secondary }} />
                                </InputAdornment>
                              ),
                            }}
                          />
                          
                          <Box sx={{ mt: 3, mb: 2 }}>
                            <AnimatedButton
                              fullWidth
                              variant="contained"
                              onClick={login}
                              disabled={isLoading}
                              endIcon={!isLoading && <ArrowForwardIcon />}
                              sx={{
                                background: colors.gradientGreen,
                                '&:hover': {
                                  background: colors.gradientGreen,
                                }
                              }}
                            >
                              {isLoading ? (
                                <CircularProgress size={24} sx={{ color: 'white' }} />
                              ) : (
                                'התחברות'
                              )}
                            </AnimatedButton>
                          </Box>
                          
                          <Typography variant="body2" align="center" sx={{
                            color: colors.textMedium,
                            mt: 3,
                          }}>
                            אין לך חשבון עדיין?{' '}
                            <Link href="#" underline="none" sx={{
                              color: colors.secondary,
                              fontWeight: 600,
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                color: alpha(colors.secondary, 0.7),
                                textDecoration: 'underline',
                              }
                            }}>
                              התחבר ותירשם אוטומטית
                            </Link>
                          </Typography>
                        </Box>
                      </Box>
                      
                      {/* Decorative elements */}
                      <Box sx={{
                        position: 'absolute',
                        bottom: -30,
                        right: -30,
                        width: 150,
                        height: 150,
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${alpha(colors.accent1, 0.3)} 0%, ${alpha(colors.accent1, 0.05)} 100%)`,
                        zIndex: 0,
                      }} />
                      
                      <Box sx={{
                        position: 'absolute',
                        top: -40,
                        left: -40,
                        width: 180,
                        height: 180,
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${alpha(colors.accent2, 0.2)} 0%, ${alpha(colors.accent2, 0.05)} 100%)`,
                        zIndex: 0,
                      }} />
                    </Paper>
                  </Fade>
                </Grid>
              )}
            </Grid>
            
            {/* Footer */}
            <Box sx={{
              mt: 6,
              textAlign: 'center',
            }}>
              <Typography variant="body2" sx={{
                color: colors.textLight,
                fontSize: '0.75rem',
              }}>
                © {new Date().getFullYear()} קליניקת חני רוזנצוויג | כל הזכויות שמורות
              </Typography>
            </Box>
          </Box>
        </Fade>
      </Container>
      
      {/* Error Snackbar */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{
            width: '100%',
            borderRadius: 4,
            boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)',
            backgroundColor: alpha('#f8d7da', 0.95),
            color: '#721c24',
            backdropFilter: 'blur(8px)',
            '& .MuiAlert-icon': {
              color: '#721c24'
            }
          }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

// Export the ChaniLogo component for backward compatibility
export const ChaniLogo = ModernLogo;
