// בס"ד
import React, { useState, useEffect } from "react";
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Grid, 
  Button, 
  TextField, 
  Chip,
  IconButton,
  Divider,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import TimerIcon from '@mui/icons-material/Timer';
import SaveIcon from '@mui/icons-material/Save';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CloseIcon from '@mui/icons-material/Close';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import MicIcon from '@mui/icons-material/Mic';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
    

// סטיילינג מותאם אישית
const TreatmentPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '16px',
  boxShadow: '0 8px 24px rgba(0, 77, 0, 0.12)',
  height: '100%',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    boxShadow: '0 12px 28px rgba(0, 77, 0, 0.15)',
  }
}));

const ActionButton = styled(Button)(({ theme }) => ({
  padding: '10px 24px',
  borderRadius: '30px',
  fontWeight: 'bold',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 14px rgba(46, 125, 50, 0.2)',
  }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    '&:hover fieldset': {
      borderColor: '#2E7D32',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#2E7D32',
    },
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#2E7D32',
  },
}));

const TreatmentChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  borderRadius: '16px',
  fontWeight: 'bold',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  '&:hover': {
    boxShadow: '0 3px 8px rgba(0,0,0,0.15)',
  }
}));

const TimerDisplay = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  borderRadius: '12px',
  backgroundColor: 'rgba(46, 125, 50, 0.1)',
  color: '#1B5E20',
  fontWeight: 'bold',
  fontSize: '1.5rem',
  marginBottom: theme.spacing(3),
}));

// קומפוננטת הטיפול הנוכחי
const CurrentTreatment = () => {
  // סטייטים לניהול הטיפול
  const [activeStep, setActiveStep] = useState(0);
  const [patientDetails, setPatientDetails] = useState({
    name: "ישראל ישראלי",
    id: "123456789",
    age: 35,
    lastVisit: "12/05/2023"
  });
  const [treatmentTime, setTreatmentTime] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [treatmentNotes, setTreatmentNotes] = useState("");
  const [selectedTreatments, setSelectedTreatments] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  // רשימת טיפולים אפשריים
  const availableTreatments = [
    { id: 1, name: "רפלקסולוגיה", color: "#4CAF50" },
    { id: 2, name: "שיאצו", color: "#8BC34A" },
    { id: 3, name: "דיקור סיני", color: "#CDDC39" },
    { id: 4, name: "עיסוי שוודי", color: "#FFC107" },
    { id: 5, name: "ארומתרפיה", color: "#FF9800" },
    { id: 6, name: "פרחי באך", color: "#FF5722" },
  ];

  // שלבי הטיפול
  const steps = [
    'פרטי מטופל',
    'בחירת טיפולים',
    'ביצוע הטיפול',
    'סיכום'
  ];

  // טיימר לזמן הטיפול
  useEffect(() => {
    let interval = null;
    if (isTimerActive) {
      interval = setInterval(() => {
        setTreatmentTime(seconds => seconds + 1);
      }, 1000);
    } else if (!isTimerActive && treatmentTime !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, treatmentTime]);

  // פונקציות לניהול הטיפול
  const handleNext = () => {
    if (activeStep === 1 && selectedTreatments.length === 0) {
      setOpenSnackbar(true);
      return;
    }
    
    if (activeStep === 2 && !isTimerActive) {
      setIsTimerActive(true);
    }
    
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    
    if (activeStep === 2) {
      setIsTimerActive(false);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleToggleTimer = () => {
    setIsTimerActive(!isTimerActive);
  };

  const handleAddTreatment = (treatment) => {
    if (!selectedTreatments.some(t => t.id === treatment.id)) {
      setSelectedTreatments([...selectedTreatments, treatment]);
    }
  };

  const handleDeleteTreatment = (treatmentId) => {
    setSelectedTreatments(selectedTreatments.filter(t => t.id !== treatmentId));
  };

  const handleSaveTreatment = () => {
    // כאן יש להוסיף לוגיקה לשמירת הטיפול במסד הנתונים
    setOpenDialog(true);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    // כאן יש להוסיף לוגיקה להקלטת הערות קוליות
  };

  const handleTakePhoto = () => {
    // כאן יש להוסיף לוגיקה לצילום תמונות
    setOpenSnackbar(true);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ 
        textAlign: 'center', 
        mb: 4, 
        color: '#052505',
        fontWeight: 'bold',
        position: 'relative',
        '&:after': {
          content: '""',
          position: 'absolute',
          bottom: '-15px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80px',
          height: '4px',
          background: 'linear-gradient(90deg, #4CAF50, #81C784)',
          borderRadius: '2px'
        }
      }}>
        תיעוד טיפול נוכחי
      </Typography>

      <Box sx={{ width: '100%', mb: 4 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <TreatmentPaper>
            {activeStep === 0 && (
              <Box>
                <Typography variant="h5" sx={{ mb: 3, color: '#1B5E20', fontWeight: 'bold' }}>
                  פרטי המטופל
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      fullWidth
                      label="שם מלא"
                      variant="outlined"
                      value={patientDetails.name}
                      onChange={(e) => setPatientDetails({...patientDetails, name: e.target.value})}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      fullWidth
                      label="תעודת זהות"
                      variant="outlined"
                      value={patientDetails.id}
                      onChange={(e) => setPatientDetails({...patientDetails, id: e.target.value})}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      fullWidth
                      label="גיל"
                      variant="outlined"
                      type="number"
                      value={patientDetails.age}
                      onChange={(e) => setPatientDetails({...patientDetails, age: e.target.value})}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      fullWidth
                      label="ביקור אחרון"
                      variant="outlined"
                      value={patientDetails.lastVisit}
                      onChange={(e) => setPatientDetails({...patientDetails, lastVisit: e.target.value})}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="treatment-reason-label">סיבת הטיפול</InputLabel>
                      <Select
                        labelId="treatment-reason-label"
                        label="סיבת הטיפול"
                        sx={{ borderRadius: '12px' }}
                      >
                        <MenuItem value="pain">כאבים</MenuItem>
                        <MenuItem value="stress">מתח ולחץ</MenuItem>
                        <MenuItem value="sleep">בעיות שינה</MenuItem>
                        <MenuItem value="energy">חוסר אנרגיה</MenuItem>
                        <MenuItem value="other">אחר</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            )}

            {activeStep === 1 && (
              <Box>
                <Typography variant="h5" sx={{ mb: 3, color: '#1B5E20', fontWeight: 'bold' }}>
                  בחירת טיפולים
                </Typography>
                
                <Box sx={{ mb: 4 }}>
                  <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    טיפולים נבחרים:
                  </Typography>
                  <Paper 
                    variant="outlined" 
                    sx={{ 
                      p: 2, 
                      borderRadius: '12px', 
                      minHeight: '100px',
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'flex-start',
                      alignContent: 'flex-start'
                    }}
                  >
                    {selectedTreatments.length > 0 ? (
                      selectedTreatments.map((treatment) => (
                        <TreatmentChip
                          key={treatment.id}
                          label={treatment.name}
                          onDelete={() => handleDeleteTreatment(treatment.id)}
                          sx={{ 
                            backgroundColor: treatment.color,
                            color: 'white'
                          }}
                        />
                      ))
                    ) : (
                      <Typography variant="body2" sx={{ color: 'text.secondary', alignSelf: 'center', width: '100%', textAlign: 'center' }}>
                        לא נבחרו טיפולים עדיין
                      </Typography>
                    )}
                  </Paper>
                </Box>
                
                <Divider sx={{ my: 3 }} />
                
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  בחר מתוך רשימת הטיפולים:
                </Typography>
                <Grid container spacing={2}>
                  {availableTreatments.map((treatment) => (
                    <Grid item xs={6} sm={4} md={4} key={treatment.id}>
                      <Card 
                        sx={{ 
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: '0 8px 16px',
                            transform: 'translateY(-5px)',
                            boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                          },
                          borderRadius: '12px',
                          border: selectedTreatments.some(t => t.id === treatment.id) 
                            ? `2px solid ${treatment.color}` 
                            : '1px solid rgba(0,0,0,0.12)'
                        }}
                        onClick={() => handleAddTreatment(treatment)}
                      >
                        <CardContent sx={{ 
                          textAlign: 'center',
                          backgroundColor: selectedTreatments.some(t => t.id === treatment.id) 
                            ? `${treatment.color}20` 
                            : 'transparent'
                        }}>
                          <LocalHospitalIcon sx={{ fontSize: 40, color: treatment.color, mb: 1 }} />
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            {treatment.name}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {activeStep === 2 && (
              <Box>
                <Typography variant="h5" sx={{ mb: 3, color: '#1B5E20', fontWeight: 'bold' }}>
                  ביצוע הטיפול
                </Typography>
                
                <TimerDisplay>
                  <TimerIcon sx={{ mr: 1 }} />
                  {formatTime(treatmentTime)}
                  <IconButton 
                    onClick={handleToggleTimer} 
                    sx={{ ml: 2, backgroundColor: 'rgba(46, 125, 50, 0.1)' }}
                  >
                    {isTimerActive ? <PauseIcon /> : <PlayArrowIcon />}
                  </IconButton>
                </TimerDisplay>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    טיפולים נבחרים:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    {selectedTreatments.map((treatment) => (
                      <TreatmentChip
                        key={treatment.id}
                        label={treatment.name}
                        sx={{ 
                          backgroundColor: treatment.color,
                          color: 'white'
                        }}
                      />
                    ))}
                  </Box>
                </Box>
                
                <Divider sx={{ my: 3 }} />
                
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  הערות טיפול:
                </Typography>
                <StyledTextField
                  fullWidth
                  multiline
                  rows={6}
                  variant="outlined"
                  placeholder="הוסף הערות לגבי הטיפול הנוכחי..."
                  value={treatmentNotes}
                  onChange={(e) => setTreatmentNotes(e.target.value)}
                />
                
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<MicIcon />}
                    onClick={handleToggleRecording}
                    sx={{ 
                      borderRadius: '20px',
                      backgroundColor: isRecording ? '#f44336' : '#2E7D32',
                      '&:hover': {
                        backgroundColor: isRecording ? '#d32f2f' : '#1B5E20',
                      }
                    }}
                  >
                    {isRecording ? 'הפסק הקלטה' : 'הקלט הערות'}
                  </Button>
                  
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<PhotoCameraIcon />}
                    onClick={handleTakePhoto}
                    sx={{ 
                      borderRadius: '20px',
                      backgroundColor: '#2E7D32',
                      '&:hover': {
                        backgroundColor: '#1B5E20',
                      }
                    }}
                  >
                    צלם תמונה
                  </Button>
                </Box>
              </Box>
            )}

            {activeStep === 3 && (
              <Box>
                <Typography variant="h5" sx={{ mb: 3, color: '#1B5E20', fontWeight: 'bold' }}>
                  סיכום הטיפול
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Paper sx={{ p: 2, borderRadius: '12px', height: '100%' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                        פרטי מטופל
                      </Typography>
                      <Typography variant="body1">שם: {patientDetails.name}</Typography>
                      <Typography variant="body1">ת.ז: {patientDetails.id}</Typography>
                      <Typography variant="body1">גיל: {patientDetails.age}</Typography>
                    </Paper>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Paper sx={{ p: 2, borderRadius: '12px', height: '100%' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                        פרטי טיפול
                      </Typography>
                      <Typography variant="body1">משך הטיפול: {formatTime(treatmentTime)}</Typography>
                      <Typography variant="body1">תאריך: {new Date().toLocaleDateString('he-IL')}</Typography>
                      <Typography variant="body1">שעה: {new Date().toLocaleTimeString('he-IL')}</Typography>
                    </Paper>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Paper sx={{ p: 2, borderRadius: '12px' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                        טיפולים שבוצעו
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        {selectedTreatments.map((treatment) => (
                          <TreatmentChip
                            key={treatment.id}
                            label={treatment.name}
                            sx={{ 
                              backgroundColor: treatment.color,
                              color: 'white'
                            }}
                          />
                        ))}
                      </Box>
                    </Paper>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Paper sx={{ p: 2, borderRadius: '12px' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                        הערות טיפול
                      </Typography>
                      <Typography variant="body1">
                        {treatmentNotes || "לא הוזנו הערות"}
                      </Typography>
                    </Paper>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                      <ActionButton
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                        onClick={handleSaveTreatment}
                        sx={{ 
                          backgroundColor: '#2E7D32',
                          '&:hover': {
                            backgroundColor: '#1B5E20',
                          }
                        }}
                      >
                        שמור טיפול
                      </ActionButton>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}
          </TreatmentPaper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Grid container spacing={3} direction="column">
            <Grid item>
              <TreatmentPaper>
                <Typography variant="h6" sx={{ mb: 2, color: '#1B5E20', fontWeight: 'bold' }}>
                  פרטי מטופל
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  p: 2, 
                  borderRadius: '12px',
                  backgroundColor: 'rgba(46, 125, 50, 0.05)',
                  mb: 2
                }}>
                  <Box sx={{ 
                    width: 50, 
                    height: 50, 
                    borderRadius: '50%', 
                    backgroundColor: '#E8F5E9', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    mr: 2,
                    color: '#2E7D32',
                    fontWeight: 'bold',
                    fontSize: '18px'
                  }}>
                    {patientDetails.name.substring(0, 2)}
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {patientDetails.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      ת.ז: {patientDetails.id}
                    </Typography>
                  </Box>
                </Box>
                
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>גיל:</strong> {patientDetails.age}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>ביקור אחרון:</strong> {patientDetails.lastVisit}
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="subtitle2" sx={{ mb: 1, color: '#1B5E20' }}>
                  היסטוריית טיפולים
                </Typography>
                <Box sx={{ 
                  maxHeight: '200px', 
                  overflowY: 'auto', 
                  pr: 1,
                  '&::-webkit-scrollbar': {
                    width: '6px',
                  },
                  '&::-webkit-scrollbar-track': {
                    backgroundColor: '#f1f1f1',
                    borderRadius: '10px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#2E7D32',
                    borderRadius: '10px',
                  },
                }}>
                  {[1, 2, 3].map((item) => (
                    <Box 
                      key={item}
                      sx={{ 
                        p: 1.5, 
                        borderRadius: '8px', 
                        mb: 1,
                        backgroundColor: 'rgba(46, 125, 50, 0.05)',
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: 'rgba(46, 125, 50, 0.1)',
                        }
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {`${10 - item}/05/2023`}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        {item === 1 && "רפלקסולוגיה, שיאצו"}
                        {item === 2 && "דיקור סיני"}
                        {item === 3 && "ארומתרפיה, פרחי באך"}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </TreatmentPaper>
            </Grid>
            
            <Grid item>
              <TreatmentPaper>
                <Typography variant="h6" sx={{ mb: 2, color: '#1B5E20', fontWeight: 'bold' }}>
                  פעולות נוספות
                </Typography>
                
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<NoteAddIcon />}
                  sx={{ 
                    mb: 2,
                    borderRadius: '12px',
                    borderColor: '#2E7D32',
                    color: '#2E7D32',
                    p: 1.5,
                    justifyContent: 'flex-start',
                    '&:hover': {
                      borderColor: '#1B5E20',
                      backgroundColor: 'rgba(46, 125, 50, 0.05)',
                    }
                  }}
                >
                  הוסף מסמך רפואי
                </Button>
                
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<AddIcon />}
                  sx={{ 
                    mb: 2,
                    borderRadius: '12px',
                    borderColor: '#2E7D32',
                    color: '#2E7D32',
                    p: 1.5,
                    justifyContent: 'flex-start',
                    '&:hover': {
                      borderColor: '#1B5E20',
                      backgroundColor: 'rgba(46, 125, 50, 0.05)',
                    }
                  }}
                >
                  הוסף תרופות/תוספים
                </Button>
                
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<EventAvailableIcon />}
                  sx={{ 
                    borderRadius: '12px',
                    borderColor: '#2E7D32',
                    color: '#2E7D32',
                    p: 1.5,
                    justifyContent: 'flex-start',
                    '&:hover': {
                      borderColor: '#1B5E20',
                      backgroundColor: 'rgba(46, 125, 50, 0.05)',
                    }
                  }}
                >
                  קבע תור המשך
                </Button>
              </TreatmentPaper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ 
            borderRadius: '30px',
            px: 3
          }}
        >
          חזור
        </Button>
        
        <ActionButton
          variant={activeStep === steps.length - 1 ? "contained" : "contained"}
          onClick={activeStep === steps.length - 1 ? handleSaveTreatment : handleNext}
          sx={{ 
            backgroundColor: activeStep === steps.length - 1 ? '#2E7D32' : '#2E7D32',
            color: 'white',
            '&:hover': {
                backgroundColor: activeStep === steps.length - 1 ? '#2E7D32' : '#2E7D32',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#1B5E20',
                }
              }}}
              startIcon={activeStep === steps.length - 1 ? <SaveIcon /> : null}
              endIcon={activeStep !== steps.length - 1 ? <ArrowBackIcon /> : null}
            >
              {activeStep === steps.length - 1 ? 'סיים טיפול' : 'הבא'}
            </ActionButton>
          </Box>
    
          {/* דיאלוג אישור סיום טיפול */}
          <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            PaperProps={{
              sx: {
                borderRadius: '16px',
                padding: '8px',
              }
            }}
          >
            <DialogTitle sx={{ textAlign: 'center', color: '#1B5E20', fontWeight: 'bold' }}>
              סיום טיפול
            </DialogTitle>
            <DialogContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <CheckCircleIcon sx={{ fontSize: 60, color: '#4CAF50' }} />
              </Box>
              <Typography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>
                הטיפול נשמר בהצלחה!
              </Typography>
              <Typography variant="body1" sx={{ textAlign: 'center' }}>
                האם ברצונך לקבוע תור המשך למטופל?
              </Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
              <Button 
                variant="outlined" 
                onClick={() => setOpenDialog(false)}
                sx={{ 
                  borderRadius: '20px',
                  borderColor: '#2E7D32',
                  color: '#2E7D32',
                  mr: 1
                }}
              >
                לא תודה
              </Button>
              <Button 
                variant="contained" 
                onClick={() => setOpenDialog(false)}
                sx={{ 
                  borderRadius: '20px',
                  backgroundColor: '#2E7D32',
                  '&:hover': {
                    backgroundColor: '#1B5E20',
                  }
                }}
              >
                קבע תור המשך
              </Button>
            </DialogActions>
          </Dialog>
    
          {/* סנאקבר להודעות */}
          <Snackbar 
            open={openSnackbar} 
            autoHideDuration={6000} 
            onClose={() => setOpenSnackbar(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert 
              onClose={() => setOpenSnackbar(false)} 
              severity="warning" 
              sx={{ width: '100%', borderRadius: '12px' }}
            >
              {activeStep === 1 ? 'יש לבחור לפחות טיפול אחד להמשך' : 'הפעולה בוצעה בהצלחה'}
            </Alert>
          </Snackbar>
        </Container>
      );
    };
    
    // קומפוננטת PlayArrowIcon שחסרה בייבוא
    const PlayArrowIcon = () => {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" fill="currentColor"/>
        </svg>
      );
    };
    
    // ייבוא EventAvailableIcon שחסר בייבוא למעלה
    
    export default CurrentTreatment;
    