// בס"ד
import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { Box, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Container, Paper, InputAdornment, Grid } from '@mui/material';
import { addPatientThunk } from "../../redux/slices/patientSlice/addPatientThunk";
import { getPatientByIdThunk } from "../../redux/slices/patientSlice/getPatientByIdThunk";
import './registration.css'


export const ChaniLogo = () => (
  <Box className="chani-logo" sx={{ 
    textAlign: 'center', 
    padding: '10px',
    borderRadius: '10px',
    margin: '0 auto'
  }}>
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center' 
    }}>
      <Box className="logo-icon" sx={{
        width: '100px',
        height: '100px',
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
          fontSize: '36px',
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
      
      <Typography variant="h5" className="logo-title" sx={{
        fontWeight: 'bold',
        fontSize: '1.8rem',
        color: '#052505',
        marginBottom: '5px',
        fontFamily: 'Rubik, Arial, sans-serif',
        textShadow: '1px 1px 2px rgba(255,255,255,0.8)'
      }}>
        חני רוזנצוויג
      </Typography>
      
      <Typography variant="subtitle1" className="logo-subtitle" sx={{
        color: '#1B5E20',
        fontSize: '1rem',
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
);

export const Registration = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navi = useNavigate();
  const [patient, setPatient] = useState({
    Id: params.password,
    gender: '',
    firstName: params.username?.split(' ')[0] || '',
    lastName: params.username?.split(' ')[1] || '',
    birthDate: '',
    phone: '',
    city: '',
    street: '',
    streetNumber: ''
  });
   
  const regist = async () => {
    let res = await dispatch(addPatientThunk(patient));
    console.log(res);
    dispatch(getPatientByIdThunk(patient.Id));
    navi('/ccc');
  };

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
  };

  // Custom styles for select fields
  const selectStyles = {
    ...inputStyles,
    '& .MuiSelect-select': {
      padding: '16px 14px',
    },
  };

  return (
    <Container maxWidth="lg" className="registration-container" sx={{ 
      direction: 'rtl', // Ensure RTL direction for Hebrew
      marginTop: '30px',
      marginBottom: '30px'
    }}>
      <Paper elevation={3} className="registration-paper" sx={{ 
        overflow: 'hidden', 
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0, 77, 0, 0.15)'
      }}>
        <Grid container>
          {/* Logo Section - Right side */}
          <Grid item xs={12} md={4} className="logo-section" sx={{
            backgroundImage: 'url("/images/trees.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay',
            backgroundColor: 'rgba(220, 255, 220, 0.85)',
            borderRadius: { xs: '16px 16px 0 0', md: '0 16px 16px 0' }, // שינוי הפינות המעוגלות בהתאם לגודל המסך
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            order: { xs: 1, md: 1 }, // שמירה על הסדר - לוגו בצד ימין גם במובייל
            minHeight: { xs: '300px', md: '600px' } // גובה מינימלי מותאם לגודל המסך
          }}>
            <Box className="logo-content" sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              width: '100%',
              padding: '20px',
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0, 77, 0, 0.1)'
            }}>
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
                textShadow: '1px 1px 1px rgba(255,255,255,0.6)',
                fontSize: '0.95rem',
                lineHeight: 1.6
              }}>
                אנו שמחים שבחרתם להצטרף אלינו. מלאו את הפרטים כדי להשלים את תהליך ההרשמה ולהתחיל את המסע שלכם לבריאות טבעית.
              </Typography>
            </Box>
          </Grid>
          
          {/* Form Section - Left side */}
          <Grid item xs={12} md={8} className="form-section" sx={{ 
            padding: '40px 30px',
            backgroundColor: '#f9fff9',
            order: { xs: 2, md: 2 } // שמירה על הסדר - טופס בצד שמאל גם במובייל
          }}>
            <Typography variant="h5" className="form-title" sx={{ 
              marginBottom: '30px', 
              fontWeight: 'bold',
              position: 'relative',
              color: '#1B5E20',
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
              הרשמה
            </Typography>
            
            <Box className="form-fields">
              <TextField
                label="תעודת זהות"
                value={patient.Id}
                disabled
                className="input-field"
                fullWidth
                sx={inputStyles}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box sx={{ 
                        width: '10px', 
                        height: '10px', 
                        borderRadius: '50%', 
                        backgroundColor: '#4CAF50',
                        marginRight: '8px'
                      }}/>
                    </InputAdornment>
                  ),
                }}
              />
              
              <FormControl className="input-field" fullWidth sx={selectStyles}>
                <InputLabel id="gender-label">מין</InputLabel>
                <Select
                  labelId="gender-label"
                  value={patient.gender}
                  label="מין"
                  onChange={e => setPatient({...patient, gender: e.target.value})}
                >
                  <MenuItem value="female">נקבה</MenuItem>
                  <MenuItem value="male">זכר</MenuItem>
                </Select>
              </FormControl>
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="שם פרטי"
                    value={patient.firstName}
                    onChange={e => setPatient({...patient, firstName: e.target.value})}
                    fullWidth
                    className="input-field"
                    sx={inputStyles}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="שם משפחה"
                    value={patient.lastName}
                    onChange={e => setPatient({...patient, lastName: e.target.value})}
                    fullWidth
                    className="input-field"
                    sx={inputStyles}
                  />
                </Grid>
              </Grid>
              
              <TextField
                label="תאריך לידה"
                type="date"
                value={patient.birthDate}
                onChange={e => setPatient({...patient, birthDate: e.target.value})}
                InputLabelProps={{ shrink: true }}
                className="input-field"
                fullWidth
                sx={inputStyles}
              />
              
              <TextField
                label="פלאפון"
                value={patient.phone}
                onChange={e => setPatient({...patient, phone: e.target.value})}
                className="input-field"
                fullWidth
                sx={inputStyles}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>+972</span>
                    </InputAdornment>
                  ),
                }}
              />
              
              <TextField
                label="עיר"
                value={patient.city}
                onChange={e => setPatient({...patient, city: e.target.value})}
                className="input-field"
                fullWidth
                sx={inputStyles}
              />
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={8}>
                  <TextField
                    label="רחוב"
                    value={patient.street}
                    onChange={e => setPatient({...patient, street: e.target.value})}
                    fullWidth
                    className="input-field"
                    sx={inputStyles}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="מספר בית"
                    value={patient.streetNumber}
                    onChange={e => setPatient({...patient, streetNumber: e.target.value})}
                    fullWidth
                    className="input-field"
                    sx={inputStyles}
                  />
                </Grid>
              </Grid>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                <Button 
                  variant="contained" 
                  onClick={regist}
                  className="submit-button"
                  sx={{
                    padding: '12px 50px',
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
                  הרשם
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

