//בס"ד

import { useState } from 'react'
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
  CircularProgress
} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import LockIcon from '@mui/icons-material/Lock'
import './login.css'

export const ChaniLogo = () => (
  <Box className="chani-logo" sx={{
    textAlign: 'center',
    padding: '20px',
    borderRadius: '10px',
    margin: '20px auto'
  }}>
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Box className="logo-icon" sx={{
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, #f8fff8 0%, #e0f2e0 5%, #c1e3c1 15%, #a3d4a3 25%, #85c685 35%, #67b867 45%, #4caf50 55%, #3d9c3d 65%, #2e8b2e 75%, #1f7a1f 85%, #105d10 95%, #003300 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '15px',
        boxShadow: '0 8px 24px rgba(0, 77, 0, 0.6)',
        position: 'relative',
        overflow: 'visible',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '5%',
          left: '5%',
          width: '90%',
          height: '90%',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 60%)',
          zIndex: 1
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: 'linear-gradient(45deg, transparent 40%, rgba(200, 255, 200, 0.4) 70%, rgba(255, 255, 255, 0.5) 100%)',
          zIndex: 1
        }
      }}>
        <Typography className="logo-initials" sx={{
          color: 'white',
          fontSize: '42px',
          fontWeight: 'bold',
          fontFamily: '"Segoe UI", Arial, sans-serif',
          lineHeight: 1,
          zIndex: 2,
          textShadow: '2px 2px 4px rgba(0,0,0,0.4)',
          letterSpacing: '1px'
        }}>
          CR
        </Typography>
      </Box>
      
      <Typography variant="h4" className="logo-title" sx={{
        fontWeight: 'bold',
        fontSize: '2.2rem',
        color: '#052505', // צבע ירוק כהה מאוד לשם המנהלת
        marginBottom: '5px',
        fontFamily: 'Rubik, Arial, sans-serif',
        textShadow: '1px 1px 2px rgba(255,255,255,0.8)'
      }}>
        חני רוזנצוויג
      </Typography>
      
      <Typography variant="subtitle1" className="logo-subtitle" sx={{
        color: '#1B5E20',
        fontSize: '1.1rem',
        position: 'relative',
        paddingBottom: '15px',
        fontFamily: 'Rubik, Arial, sans-serif',
        textShadow: '1px 1px 1px rgba(255,255,255,0.6)',
        '&:after': {
          content: '""',
          position: 'absolute',
          bottom: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60px',
          height: '3px',
          background: 'linear-gradient(90deg, #052505 0%, #1B5E20 30%, #4CAF50 70%, #81C784 100%)',
          borderRadius: '2px'
        }
      }}>
        ניהול קליניקות לטיפולים טבעיים
      </Typography>
    </Box>
  </Box>
)

export const Login = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navi = useNavigate()

  // Custom styles for input fields
  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      transition: 'transform 0.3s, box-shadow 0.3s',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      '&:hover': {
        boxShadow: '0 4px 10px rgba(76, 175, 80, 0.2)',
        transform: 'translateY(-2px)',
      },
      '&.Mui-focused': {
        boxShadow: '0 6px 12px rgba(76, 175, 80, 0.3)',
        transform: 'translateY(-3px)',
        '& fieldset': {
          borderColor: '#4CAF50',
          borderWidth: '2px',
        },
      },
    },
    '& .MuiInputLabel-root': {
      fontSize: '1.05rem',
      fontWeight: 500,
      color: '#2E7D32',
      '&.Mui-focused': {
        color: '#1B5E20',
      },
    },
    '& .MuiInputBase-input': {
      padding: '16px 14px',
    },
    marginBottom: '24px',
  }

  const login = async () => {
    if (!name.trim() || !password) {
      setError('יש למלא את כל השדות')
      return
    }
  
    setIsLoading(true)
    setError('')
    try {
      let res = await dispatch(getPatientByIdThunk(password))
      console.log(res)
    debugger
      if(res.payload !== undefined){
        navi('/ccc')
      } else {
        navi('/registration/' + name + '/' + password)
      }
    } catch (error) {
      console.error("Login error:", error)
      setError('אירעה שגיאה בהתחברות')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if(e.key === 'Enter') login()
  }

  return (
    <Container maxWidth="lg" className="login-container" sx={{ 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      overflow: 'hidden'
    }}>
<Paper elevation={3} className="login-paper" sx={{ 
  overflow: 'hidden', 
  borderRadius: '16px',
  width: '100%',
  maxWidth: '1000px',
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row-reverse' }
}}>
 
<Grid container sx={{ height: '100%' }}>

          {/* Form Section */}
          <Grid item xs={12} md={7} className="form-section" sx={{ 
  padding: '40px 30px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  order: { xs: 2, md: 1 } // שינוי כאן - במקום md: 1 שמנו md: 2
}}>


<Typography variant="h5" className="form-title" sx={{
  marginBottom: '30px',
  fontWeight: 'bold',
  textAlign: 'right', // הוספה - יישור לימין
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: '-10px',
    right: '0',
    width: '80px',
    height: '4px',
    background: 'linear-gradient(90deg, #4CAF50, #81C784)',
    borderRadius: '2px'
  }
}}>

              התחברות למערכת
            </Typography>
            
            {error && (
              <Typography 
                className="error-message" 
                color="error" 
                sx={{ 
                  marginBottom: '20px',
                  backgroundColor: 'rgba(211, 47, 47, 0.1)',
                  padding: '10px 15px',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}
              >
                {error}
              </Typography>
            )}
            
            <Box className="form-fields">
              <TextField
                label="שם מלא"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={handleKeyPress}
                fullWidth
                className="input-field"
                sx={inputStyles}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: '#4CAF50' }} />
                    </InputAdornment>
                  ),
                }}
              />
              
              <TextField
                label="תעודת זהות"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                fullWidth
                className="input-field"
                sx={inputStyles}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: '#4CAF50' }} />
                    </InputAdornment>
                  ),
                }}
              />
              
              <Button
                variant="contained"
                onClick={login}
                disabled={isLoading}
                className="login-button"
                sx={{
                  marginTop: '20px',
                  padding: '12px 30px',
                  borderRadius: '30px',
                  backgroundColor: '#2E7D32',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 12px rgba(46, 125, 50, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#1B5E20',
                    boxShadow: '0 6px 14px rgba(46, 125, 50, 0.4)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                {isLoading ? (
                  <CircularProgress size={24} sx={{ color: 'white' }} />
                ) : (
                  'התחבר'
                )}
              </Button>
              
              <Typography variant="body2" sx={{ 
                marginTop: '20px', 
                textAlign: 'center',
                color: '#555'
              }}>
                אין לך חשבון? התחבר ותירשם אוטומטית
              </Typography>
            </Box>
          </Grid>
          
          {/* Image Section */}
          
          <Grid item xs={12} md={5} className="image-section" sx={{
  backgroundImage: 'url("/images/trees.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundBlendMode: 'overlay',
  backgroundColor: 'rgba(220, 255, 220, 0.85)',
  borderRadius: { xs: '0 0 16px 16px', md: '16px 0 0 16px' }, // שינוי כאן - התאמת הפינות המעוגלות לצד שמאל
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
  minHeight: { xs: '300px', md: 'auto' },
  order: { xs: 1, md: 2 } // שינוי כאן - מ-md: 1 ל-md: 2
}}>




            <Box className="image-content">
              <ChaniLogo />
              <Typography variant="h5" className="welcome-title" sx={{
                color: '#1B5E20',
                textAlign: 'center',
                marginTop: '20px',
                fontWeight: 'bold',
                textShadow: '1px 1px 2px rgba(255,255,255,0.8)'
              }}>
                ברוכים הבאים
              </Typography>
              <Typography className="welcome-text" sx={{
                color: '#1B5E20',
                textAlign: 'center',
                marginTop: '10px',
                textShadow: '1px 1px 1px rgba(255,255,255,0.6)'
              }}>
                אנו שמחים לראות אתכם שוב. התחברו למערכת כדי לצפות בתורים שלכם ולנהל את הטיפולים הטבעיים שלכם.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}
