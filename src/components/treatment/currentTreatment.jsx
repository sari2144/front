// בס"ד

import React, { useState, useRef, useEffect } from "react";
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Grid, 
  Button, 
  TextField, 
  IconButton,
  Chip,
  Divider,
  Card,
  CardContent,
  LinearProgress,
  Alert,
  Snackbar
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import SaveIcon from '@mui/icons-material/Save';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import './currentTreatment.css';

const CurrentTreatment = () => {
  // State for treatment details
  const [patientName, setPatientName] = useState("");
  const [treatmentType, setTreatmentType] = useState("");
  const [notes, setNotes] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const [newSymptom, setNewSymptom] = useState("");
  const [treatmentDate, setTreatmentDate] = useState(new Date().toISOString().split('T')[0]);
  
  // State for audio recording
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  // Refs
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const audioPlayerRef = useRef(null);

  // Handle adding a new symptom
  const handleAddSymptom = () => {
    if (newSymptom.trim() !== "" && !symptoms.includes(newSymptom.trim())) {
      setSymptoms([...symptoms, newSymptom.trim()]);
      setNewSymptom("");
    }
  };

  // Handle removing a symptom
  const handleRemoveSymptom = (symptomToRemove) => {
    setSymptoms(symptoms.filter(symptom => symptom !== symptomToRemove));
  };

  // Start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioBlob(audioBlob);
        setAudioUrl(audioUrl);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prevTime => prevTime + 1);
      }, 1000);
      
      showNotification("ההקלטה החלה", "info");
    } catch (error) {
      console.error("Error accessing microphone:", error);
      showNotification("שגיאה בגישה למיקרופון", "error");
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      clearInterval(timerRef.current);
      setIsRecording(false);
      showNotification("ההקלטה הסתיימה", "success");
      
      // Stop all audio tracks
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  // Play/pause recorded audio
  const togglePlayback = () => {
    if (audioPlayerRef.current) {
      if (isPlaying) {
        audioPlayerRef.current.pause();
      } else {
        audioPlayerRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Format seconds to MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Save treatment record
  const saveTreatment = async () => {
    if (!patientName || !treatmentType) {
      showNotification("נא למלא את שם המטופל וסוג הטיפול", "error");
      return;
    }

    try {
      // Create a unique filename based on patient name and date
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const fileName = `${patientName.replace(/\s+/g, '_')}_${timestamp}.wav`;
      
      if (audioBlob) {
        // In a real app, you would send this to your server
        // For now, we'll simulate saving by triggering a download
        const a = document.createElement('a');
        a.href = audioUrl;
        a.download = fileName;
        a.click();
        
        // Create treatment record object
        const treatmentRecord = {
          patientName,
          treatmentType,
          notes,
          symptoms,
          date: treatmentDate,
          audioFileName: fileName,
          recordingDuration: recordingTime
        };
        
        // In a real app, you would save this to your database
        console.log("Treatment record:", treatmentRecord);
        
        showNotification("הטיפול נשמר בהצלחה", "success");
        
        // Reset form after successful save
        resetForm();
      } else {
        showNotification("אין הקלטה לשמירה", "warning");
      }
    } catch (error) {
      console.error("Error saving treatment:", error);
      showNotification("שגיאה בשמירת הטיפול", "error");
    }
  };

  // Reset form
  const resetForm = () => {
    setPatientName("");
    setTreatmentType("");
    setNotes("");
    setSymptoms([]);
    setNewSymptom("");
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingTime(0);
    setIsRecording(false);
    setIsPlaying(false);
  };

  // Show notification
  const showNotification = (message, severity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setShowAlert(true);
  };

  // Handle audio player events
  useEffect(() => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.onended = () => {
        setIsPlaying(false);
      };
    }
  }, [audioUrl]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  return (
    <Box className="current-treatment-page" sx={{ 
      backgroundColor: 'rgba(220, 255, 220, 0.3)',
      minHeight: '100vh',
      py: 4
    }}>
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ 
          p: 4, 
          borderRadius: '16px',
          boxShadow: '0 8px 24px rgba(0, 77, 0, 0.15)'
        }}>
          <Typography variant="h4" sx={{ 
            mb: 4, 
            color: '#052505',
            fontWeight: 'bold',
            textAlign: 'center',
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

          <Grid container spacing={4}>
            {/* Patient Information */}
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                height: '100%',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 77, 0, 0.1)'
              }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, color: '#1B5E20', fontWeight: 'bold' }}>
                    פרטי מטופל וטיפול
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="שם המטופל"
                        variant="outlined"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="סוג הטיפול"
                        variant="outlined"
                        value={treatmentType}
                        onChange={(e) => setTreatmentType(e.target.value)}
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="תאריך"
                        type="date"
                        variant="outlined"
                        value={treatmentDate}
                        onChange={(e) => setTreatmentDate(e.target.value)}
                        sx={{ mb: 2 }}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" sx={{ mb: 1, color: '#1B5E20' }}>
                        תסמינים
                      </Typography>
                      
                      <Box sx={{ display: 'flex', mb: 2 }}>
                        <TextField
                          fullWidth
                          label="הוסף תסמין"
                          variant="outlined"
                          size="small"
                          value={newSymptom}
                          onChange={(e) => setNewSymptom(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleAddSymptom();
                              e.preventDefault();
                            }
                          }}
                        />
                        <IconButton 
                          color="primary" 
                          onClick={handleAddSymptom}
                          sx={{ 
                            ml: 1, 
                            backgroundColor: '#E8F5E9',
                            '&:hover': { backgroundColor: '#C8E6C9' }
                          }}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                      
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                        {symptoms.map((symptom, index) => (
                          <Chip
                            key={index}
                            label={symptom}
                            onDelete={() => handleRemoveSymptom(symptom)}
                            color="primary"
                            sx={{ 
                              backgroundColor: '#81C784',
                              '& .MuiChip-deleteIcon': {
                                color: '#1B5E20'
                              }
                            }}
                          />
                        ))}
                        {symptoms.length === 0 && (
                          <Typography variant="body2" sx={{ color: '#666', fontStyle: 'italic' }}>
                            לא נוספו תסמינים
                          </Typography>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            
            {/* Recording Section */}
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                height: '100%',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 77, 0, 0.1)'
              }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, color: '#1B5E20', fontWeight: 'bold' }}>
                    הקלטת הטיפול
                  </Typography>
                  
                  <Box sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                    p: 3,
                    backgroundColor: isRecording ? 'rgba(255, 0, 0, 0.05)' : 'rgba(76, 175, 80, 0.05)',
                    borderRadius: '12px',
                    border: isRecording ? '1px dashed #f44336' : '1px dashed #4CAF50'
                  }}>
                    <Box sx={{ 
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: isRecording ? '#ffebee' : '#E8F5E9',
                      mb: 2,
                      transition: 'all 0.3s ease',
                      animation: isRecording ? 'pulse 1.5s infinite' : 'none'
                    }}>
                      {isRecording ? (
                        <StopIcon 
                          sx={{ 
                            fontSize: 48, 
                            color: '#f44336',
                            cursor: 'pointer'
                          }}
                          onClick={stopRecording}
                        />
                      ) : (
                        <MicIcon 
                          sx={{ 
                            fontSize: 48, 
                            color: '#4CAF50',
                            cursor: 'pointer'
                          }}
                          onClick={startRecording}
                        />
                      )}
                    </Box>
                    
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: isRecording ? '#f44336' : '#1B5E20' }}>
                      {isRecording ? 'מקליט...' : 'לחץ להתחלת הקלטה'}
                    </Typography>
                    
                    {isRecording && (
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        {formatTime(recordingTime)}
                      </Typography>
                    )}
                  </Box>
                  
                  {audioUrl && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" sx={{ mb: 1, color: '#1B5E20' }}>
                        הקלטה אחרונה
                      </Typography>
                      
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        p: 2,
                        backgroundColor: '#f5f5f5',
                        borderRadius: '8px'
                      }}>
                        <IconButton 
                          onClick={togglePlayback}
                          sx={{ 
                            mr: 1,
                            backgroundColor: '#E8F5E9',
                            '&:hover': { backgroundColor: '#C8E6C9' }
                          }}
                        >
                          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                        </IconButton>
                        
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="body2" sx={{ mb: 0.5 }}>
                            הקלטה ({formatTime(recordingTime)})
                          </Typography>
                          <audio ref={audioPlayerRef} src={audioUrl} style={{ display: 'none' }} />
                          <LinearProgress 
                            variant="determinate" 
                            value={0} // This would be updated during playback in a full implementation
                            sx={{ height: 8, borderRadius: 4 }}
                          />
                        </Box>
                        
                        <IconButton 
                          onClick={() => {
                            setAudioBlob(null);
                            setAudioUrl(null);
                            setRecordingTime(0);
                          }}
                          sx={{ 
                            ml: 1,
                            color: '#f44336',
                            '&:hover': { backgroundColor: '#ffebee' }
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
            
            {/* Notes Section */}
            <Grid item xs={12}>
              <Card sx={{ 
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 77, 0, 0.1)'
              }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, color: '#1B5E20', fontWeight: 'bold' }}>
                    הערות ומסקנות
                  </Typography>
                  
                  <TextField
                    fullWidth
                    multiline
                    rows={6}
                    label="הערות לגבי הטיפול"
                    variant="outlined"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="תעד כאן את מהלך הטיפול, תצפיות, והמלצות להמשך..."
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            mt: 4,
            gap: 2
          }}>
            <Button 
              variant="contained" 
              startIcon={<SaveIcon />}
              onClick={saveTreatment}
              sx={{
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
              שמור טיפול
            </Button>
            
            <Button 
              variant="outlined" 
              onClick={resetForm}
              sx={{
                padding: '12px 30px',
                borderRadius: '30px',
                borderColor: '#2E7D32',
                color: '#2E7D32',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                borderWidth: '2px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: '#1B5E20',
                  backgroundColor: 'rgba(46, 125, 50, 0.1)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              נקה טופס
            </Button>
          </Box>
        </Paper>
      </Container>
      
      {/* Alert/Notification */}
      <Snackbar 
        open={showAlert} 
        autoHideDuration={6000} 
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowAlert(false)} 
          severity={alertSeverity} 
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CurrentTreatment;