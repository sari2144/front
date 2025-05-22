// // בס"ד

// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { 
//   Box, 
//   Container, 
//   Typography, 
//   Button, 
//   Grid, 
//   Paper, 
//   Card, 
//   CardContent, 
//   CardActions,
//   Avatar,
//   Divider,
//   IconButton,
//   Fade,
//   Grow,
//   Zoom,
//   alpha,
//   styled
// } from '@mui/material';
// import { 
//   CalendarMonth as CalendarIcon, 
//   Search as SearchIcon, 
//   Notifications as NotificationsIcon,
//   ArrowForward as ArrowForwardIcon,
//   AccessTime as AccessTimeIcon,
//   EventAvailable as EventAvailableIcon,
//   Person as PersonIcon,
//   LocationOn as LocationIcon
// } from '@mui/icons-material';
// import { motion } from 'framer-motion';

// // פלטת צבעים - ירוק קיווי ואדום פטל
// const colors = {
// // Base colors
// background: '#f5f8f0',    // רקע בגוון ירקרק-שמנת בהיר
// card: '#ffffff',          // לבן
// primary: '#8bc34a',       // ירוק קיווי בהיר
// secondary: '#e91e63',     // אדום-פטל בהיר
// tertiary: '#f1f8e9',      // ירוק-לבן בהיר מאוד
  
// // Text colors
// textDark: '#33691e',      // ירוק כהה לטקסט
// textMedium: '#558b2f',    // ירוק בינוני לטקסט
// textLight: '#7cb342',     // ירוק בהיר לטקסט
// textRaspberry: '#ad1457', // אדום-פטל כהה לטקסט
  
// // Gradients
// gradientGreen: 'linear-gradient(135deg, #aed581 0%, #689f38 100%)',  // גרדיאנט ירוק קיווי
// gradientRaspberry: 'linear-gradient(135deg, #f06292 0%, #ad1457 100%)',  // גרדיאנט אדום-פטל
// gradientMix: 'linear-gradient(135deg, #aed581 0%, #ad1457 100%)',   // גרדיאנט מעורב ירוק-אדום
  
// // Shadows
// shadow: 'rgba(104, 159, 56, 0.15)',
// shadowHeavy: 'rgba(104, 159, 56, 0.25)',
// shadowRaspberry: 'rgba(173, 20, 87, 0.15)',
// shadowRaspberryHeavy: 'rgba(173, 20, 87, 0.25)',
// };

// // Styled components
// const ActionButton = styled(Button)(({ theme, color }) => ({
//   borderRadius: 30,
//   padding: '12px 24px',
//   textTransform: 'none',
//   fontWeight: 600,
//   fontSize: '1rem',
//   background: color === 'primary' ? colors.gradientGreen : colors.gradientRaspberry,
//   boxShadow: `0 8px 20px -5px ${color === 'primary' ? colors.shadow : colors.shadowRaspberry}`,
//   transition: 'all 0.3s ease',
//   '&:hover': {
//       boxShadow: `0 12px 28px -5px ${color === 'primary' ? colors.shadowHeavy : colors.shadowRaspberryHeavy}`,
//       transform: 'translateY(-3px)',
//   },
// }));

// const FeatureCard = styled(Card)(({ theme }) => ({
//   borderRadius: 16,
//   overflow: 'hidden',
//   height: '100%',
//   boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)',
//   transition: 'all 0.3s ease',
//   position: 'relative',
//   '&:hover': {
//       transform: 'translateY(-8px)',
//       boxShadow: '0 20px 40px -15px rgba(0,0,0,0.2)',
//   },
// }));

// const AppointmentCard = styled(Paper)(({ theme }) => ({
//   borderRadius: 16,
//   padding: 20,
//   marginBottom: 16,
//   boxShadow: '0 8px 25px -15px rgba(0,0,0,0.1)',
//   border: `1px solid ${alpha(colors.primary, 0.1)}`,
//   transition: 'all 0.3s ease',
//   '&:hover': {
//       boxShadow: '0 12px 30px -15px rgba(0,0,0,0.15)',
//       borderColor: alpha(colors.primary, 0.2),
//   },
// }));

// const Home = () => {
//   const [showContent, setShowContent] = useState(false);
//   const currentPatient = useSelector(state => state.PatientSlice.currentPatient);
//   const queues = useSelector(state => state.QueuesSlice.listOfQueues);
//   const doctors = useSelector(state => state.DoctorSlice.doctorsList);
//   const clinics = useSelector(state => state.ClinicSlice.listOfClinics);
//   const navigate = useNavigate();
    
//   useEffect(() => {
//       // Trigger animations after component mount
//       const timer = setTimeout(() => {
//           setShowContent(true);
//       }, 300);
        
//       return () => clearTimeout(timer);
//   }, []);
    
//   // Get upcoming appointments for the current patient
//   const getUpcomingAppointments = () => {
//       if (!queues || !currentPatient) return [];
        
//       const patientAppointments = queues.filter(queue => 
//           queue.idPatient === currentPatient.id && 
//           new Date(queue.date) >= new Date()
//       );
        
//       // Sort by date
//       patientAppointments.sort((a, b) => new Date(a.date) - new Date(b.date));
        
//       return patientAppointments.slice(0, 3);
//   };
    
//   const upcomingAppointments = getUpcomingAppointments();
    
//   // Format date to Hebrew format
//   const formatDate = (dateString) => {
//       const date = new Date(dateString);
//       return date.toLocaleDateString('he-IL', { 
//           weekday: 'long', 
//           year: 'numeric', 
//           month: 'long', 
//           day: 'numeric' 
//       });
//   };
    
//   // Format time
//   const formatTime = (hour, minute) => {
//       return `${hour}:${minute === 0 ? '00' : minute}`;
//   };
    
//   // Get doctor name
//   const getDoctorName = (doctorId) => {
//       if (!doctors) return 'לא צוין';
        
//       const doctor = doctors.find(d => d.id === doctorId);
//       return doctor ? `${doctor.firstName} ${doctor.lastName}` : 'לא צוין';
//   };
    
//   // Get clinic name
//   const getClinicName = (clinicId) => {
//       if (!clinics) return 'לא צוין';
        
//       const clinic = clinics.find(c => c.id === clinicId);
//       return clinic ? clinic.city : 'לא צוין';
//   };
    
//   // Features data
//   const features = [
//       {
//           title: 'לוח שנה',
//           description: 'צפייה בכל התורים שלך בתצוגת לוח שנה נוחה',
//           icon: <CalendarIcon sx={{ fontSize: 40 }} />,
//           color: colors.primary,
//           path: '/ccc'
//       },
//       {
//           title: 'חיפוש תורים',
//           description: 'חיפוש מתקדם של תורים פנויים לפי תאריך, שעה ומטפל',
//           icon: <SearchIcon sx={{ fontSize: 40 }} />,
//           color: colors.secondary,
//           path: '/search'
//       },
//       {
//           title: 'תזכורות',
//           description: 'קבלת תזכורות לתורים הקרובים שלך',
//           icon: <NotificationsIcon sx={{ fontSize: 40 }} />,
//           color: colors.primary,
//           path: '/remind'
//       }
//   ];

//   return (
//       <Box sx={{
//           minHeight: '100vh',
//           background: `linear-gradient(135deg, ${colors.background} 0%, ${alpha(colors.tertiary, 0.7)} 100%)`,
//           pt: 10,
//           pb: 8,
//       }}>
//           <Container maxWidth="lg">
//               {/* Welcome section */}
//               <Fade in={showContent} timeout={1000}>
//                   <Box sx={{ textAlign: 'center', mb: 8 }}>
//                       <Typography variant="h3" sx={{
//                           fontWeight: 700,
//                           color: colors.textDark,
//                           mb: 2,
//                       }}>
//                           שלום {currentPatient?.firstName || 'אורח'}, ברוכים הבאים
//                       </Typography>
                        
//                       <Typography variant="h6" sx={{
//                           color: colors.textMedium,
//                           mb: 4,
//                           maxWidth: 700,
//                           mx: 'auto',
//                       }}>
//                           ברוכים הבאים למערכת ניהול התורים של קליניקת חני רוזנצוויג לטיפולים טבעיים
//                       </Typography>
                        
//                       <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
//                           <ActionButton 
//                               color="primary"
//                               startIcon={<CalendarIcon />}
//                               onClick={() => navigate('/ccc')}
//                           >
//                               צפייה בלוח השנה
//                           </ActionButton>
                            
//                           <ActionButton 
//                               color="secondary"
//                               startIcon={<SearchIcon />}
//                               onClick={() => navigate('/search')}
//                           >
//                               חיפוש תורים
//                           </ActionButton>
//                       </Box>
//                   </Box>
//               </Fade>
                
//               {/* Upcoming appointments */}
//               <Box sx={{ mb: 8 }}>
//                   <Typography variant="h5" sx={{
//                       fontWeight: 600,
//                       color: colors.textDark,
//                       mb: 3,
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: 1,
//                   }}>
//                       <AccessTimeIcon sx={{ color: colors.primary }} />
//                       התורים הקרובים שלך
//                   </Typography>
                    
//                   {upcomingAppointments.length > 0 ? (
//                       <Grid container spacing={3}>
//                           {upcomingAppointments.map((appointment, index) => (
//                               <Grid item xs={12} md={4} key={appointment.id}>
//                                   <Grow 
//                                       in={showContent} 
//                                       timeout={1000 + (index * 200)}
//                                       style={{ transformOrigin: 'center top' }}
//                                   >
//                                       <AppointmentCard>
//                                           <Box sx={{ 
//                                               display: 'flex', 
//                                               justifyContent: 'space-between',
//                                               alignItems: 'flex-start',
//                                               mb: 2,
//                                           }}>
//                                               <Box sx={{
//                                                   display: 'flex',
//                                                   alignItems: 'center',
//                                                   gap: 1,
//                                               }}>
//                                                   <Avatar sx={{ 
//                                                       bgcolor: alpha(colors.primary, 0.1),
//                                                       color: colors.primary,
//                                                   }}>
//                                                       <EventAvailableIcon />
//                                                   </Avatar>
//                                                   <Typography variant="h6" sx={{ 
//                                                       fontWeight: 600,
//                                                       color: colors.textDark,
//                                                   }}>
//                                                       {formatTime(appointment.hour, appointment.minute)}
//                                                   </Typography>
//                                               </Box>
                                                
//                                               <Typography variant="body2" sx={{
//                                                   color: colors.textMedium,
//                                                   fontWeight: 500,
//                                               }}>
//                                                   {formatDate(appointment.date)}
//                                               </Typography>
//                                           </Box>
                                            
//                                           <Divider sx={{ mb: 2 }} />
                                            
//                                           <Box sx={{ mb: 2 }}>
//                                               <Box sx={{ 
//                                                   display: 'flex', 
//                                                   alignItems: 'center',
//                                                   gap: 1,
//                                                   mb: 1,
//                                               }}>
//                                                   <PersonIcon sx={{ color: colors.primary, fontSize: 20 }} />
//                                                   <Typography variant="body2" sx={{ color: colors.textMedium }}>
//                                                       מטפל:
//                                                   </Typography>
//                                               </Box>
//                                               <Typography variant="body1" sx={{ 
//                                                   fontWeight: 600,
//                                                   color: colors.textDark,
//                                                   pl: 3.5,
//                                               }}>
//                                                   {getDoctorName(appointment.idDoctor)}
//                                               </Typography>
//                                           </Box>
                                            
//                                           <Box>
//                                               <Box sx={{ 
//                                                   display: 'flex', 
//                                                   alignItems: 'center',
//                                                   gap: 1,
//                                                   mb: 1,
//                                               }}>
//                                                   <LocationIcon sx={{ color: colors.primary, fontSize: 20 }} />
//                                                   <Typography variant="body2" sx={{ color: colors.textMedium }}>
//                                                       קליניקה:
//                                                   </Typography>
//                                               </Box>
//                                               <Typography variant="body1" sx={{ 
//                                                   fontWeight: 600,
//                                                   color: colors.textDark,
//                                                   pl: 3.5,
//                                               }}>
//                                                   {getClinicName(appointment.idClinic)}
//                                               </Typography>
//                                           </Box>
                                            
//                                           <Box sx={{ mt: 3, textAlign: 'center' }}>
//                                               <Button 
//                                                   variant="outlined"
//                                                   color="primary"
//                                                   size="small"
//                                                   endIcon={<ArrowForwardIcon />}
//                                                   onClick={() => navigate('/ccc')}
//                                                   sx={{
//                                                       borderRadius: 30,
//                                                       textTransform: 'none',
//                                                       borderColor: alpha(colors.primary, 0.5),
//                                                       '&:hover': {
//                                                           borderColor: colors.primary,
//                                                           backgroundColor: alpha(colors.primary, 0.05),
//                                                       }
//                                                   }}
//                                               >
//                                                   פרטים נוספים
//                                               </Button>
//                                           </Box>
//                                       </AppointmentCard>
//                                   </Grow>
//                               </Grid>
//                           ))}
//                       </Grid>
//                   ) : (
//                       <Fade in={showContent} timeout={1000}>
//                           <Paper sx={{
//                               p: 4,
//                               textAlign: 'center',
//                               borderRadius: 4,
//                               backgroundColor: alpha(colors.card, 0.8),
//                               backdropFilter: 'blur(8px)',
//                               boxShadow: `0 10px 30px -10px ${colors.shadow}`,
//                               border: `1px solid ${alpha(colors.accent1, 0.2)}`,
//                           }}>
//                               <AccessTimeIcon sx={{ 
//                                   fontSize: 60, 
//                                   color: alpha(colors.textMedium, 0.5),
//                                   mb: 2
//                               }} />
//                               <Typography variant="h6" sx={{ color: colors.textMedium }}>
//                                   אין תורים קרובים
//                               </Typography>
//                               <Typography variant="body2" sx={{ color: colors.textLight, mt: 1 }}>
//                                   לא נמצאו תורים עתידיים במערכת
//                               </Typography>
//                               <Button 
//                                   variant="contained"
//                                   color="primary"
//                                   sx={{ 
//                                       mt: 3,
//                                       borderRadius: 30,
//                                       textTransform: 'none',
//                                       fontWeight: 600,
//                                       background: colors.gradientGreen,
//                                       boxShadow: `0 8px 20px -5px ${colors.shadow}`,
//                                       '&:hover': {
//                                           boxShadow: `0 12px 28px -5px ${colors.shadowHeavy}`,
//                                           background: colors.gradientGreen,
//                                       }
//                                   }}
//                                   onClick={() => navigate('/search')}
//                               >
//                                   חיפוש תורים חדשים
//                               </Button>
//                           </Paper>
//                       </Fade>
//                   )}
//               </Box>
                
//               {/* Features */}
//               <Box>
//                   <Typography variant="h5" sx={{
//                       fontWeight: 600,
//                       color: colors.textDark,
//                       mb: 3,
//                   }}>
//                       שירותים זמינו
//                   </Typography>
                    
//                   <Grid container spacing={3}>
//                       {features.map((feature, index) => (
//                           <Grid item xs={12} md={4} key={index}>
//                               <Zoom in={showContent} timeout={1000 + (index * 200)}>
//                                   <FeatureCard>
//                                       <Box sx={{
//                                           position: 'absolute',
//                                           top: 0,
//                                           left: 0,
//                                           width: '100%',
//                                           height: '100%',
//                                           background: `linear-gradient(135deg, ${alpha(feature.color, 0.2)} 0%, ${alpha(feature.color, 0.05)} 100%)`,
//                                           opacity: 0.7,
//                                           transition: 'opacity 0.3s ease',
//                                           zIndex: 0,
//                                       }} />
                                        
//                                       <CardContent sx={{
//                                           position: 'relative',
//                                           zIndex: 1,
//                                           display: 'flex',
//                                           flexDirection: 'column',
//                                           alignItems: 'center',
//                                           textAlign: 'center',
//                                           padding: '30px 20px',
//                                       }}>
//                                           <Box sx={{
//                                               width: 80,
//                                               height: 80,
//                                               borderRadius: '50%',
//                                               display: 'flex',
//                                               alignItems: 'center',
//                                               justifyContent: 'center',
//                                               background: alpha(feature.color, 0.1),
//                                               color: feature.color,
//                                               boxShadow: `0 8px 20px -8px ${alpha(feature.color, 0.3)}`,
//                                               mb: 3,
//                                           }}>
//                                               {feature.icon}
//                                           </Box>
                                          
//                                           <Typography variant="h5" sx={{
//                                               fontWeight: 600,
//                                               color: colors.textDark,
//                                               mb: 2,
//                                           }}>
//                                               {feature.title}
//                                           </Typography>
                                          
//                                           <Typography variant="body1" sx={{
//                                               color: colors.textMedium,
//                                               mb: 3,
//                                           }}>
//                                               {feature.description}
//                                           </Typography>
//                                       </CardContent>
                                      
//                                       <CardActions sx={{ 
//                                           justifyContent: 'center',
//                                           pb: 3,
//                                           position: 'relative',
//                                           zIndex: 1,
//                                       }}>
//                                           <Button 
//                                               variant="outlined"
//                                               onClick={() => navigate(feature.path)}
//                                               endIcon={<ArrowForwardIcon />}
//                                               sx={{
//                                                   borderRadius: 30,
//                                                   textTransform: 'none',
//                                                   borderColor: alpha(feature.color, 0.5),
//                                                   color: feature.color === colors.primary ? colors.textDark : colors.textRaspberry,
//                                                   '&:hover': {
//                                                       borderColor: feature.color,
//                                                       backgroundColor: alpha(feature.color, 0.05),
//                                                   }
//                                               }}
//                                           >
//                                               מעבר לעמוד
//                                           </Button>
//                                       </CardActions>
//                                   </FeatureCard>
//                               </Zoom>
//                           </Grid>
//                       ))}
//                   </Grid>
//               </Box>
//           </Container>
//       </Box>
//   );
// };

// export const HomePage = home;
// export default home;
