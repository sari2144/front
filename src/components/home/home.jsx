// בס"ד

// בס"ד
import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Grid, 
  Button, 
  Card, 
  CardContent, 
  CardMedia,
  Divider
} from '@mui/material';
import { ChaniLogo } from "../registration/registration";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import NatureIcon from '@mui/icons-material/Nature';
import './home.css';

export const HomePage = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/login');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <Box className="home-page">
      {/* Hero Section */}
      <Box className="hero-section" sx={{
        backgroundImage: 'url("/images/trees.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(220, 255, 220, 0.85)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '40px 20px'
      }}>
        <Container maxWidth="lg">
          <ChaniLogo />
          
          <Typography variant="h3" sx={{
            color: '#052505',
            fontWeight: 'bold',
            marginTop: '30px',
            marginBottom: '20px',
            textShadow: '1px 1px 2px rgba(255,255,255,0.8)'
          }}>
            ברוכים הבאים לקליניקה לטיפולים טבעיים
          </Typography>
          
          <Typography variant="h5" sx={{
            color: '#1B5E20',
            maxWidth: '800px',
            margin: '0 auto 40px',
            textShadow: '1px 1px 1px rgba(255,255,255,0.6)'
          }}>
            המקום שלך לבריאות טבעית, איזון גוף-נפש וטיפולים מותאמים אישית
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            gap: 3, 
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Button 
              variant="contained" 
              onClick={handleRegisterClick}
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
              הרשמה
            </Button>
            
            <Button 
              variant="outlined" 
              onClick={handleLoginClick}
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
              כניסה
            </Button>
          </Box>
          
          <Box sx={{ 
            marginTop: '60px',
            animation: 'bounce 2s infinite'
          }}>
            <Typography variant="body1" sx={{ color: '#1B5E20', marginBottom: '10px' }}>
              גלה עוד
            </Typography>
            <Box sx={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              border: '2px solid #2E7D32',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '0 auto',
              cursor: 'pointer'
            }}>
              <Box sx={{ 
                width: '10px', 
                height: '10px', 
                borderRight: '2px solid #2E7D32',
                borderBottom: '2px solid #2E7D32',
                transform: 'rotate(45deg)',
                marginTop: '-5px'
              }} />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Services Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" sx={{ 
          textAlign: 'center', 
          mb: 6, 
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
          השירותים שלנו
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              borderRadius: '16px',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-10px)',
                boxShadow: '0 12px 20px rgba(0, 77, 0, 0.2)'
              }
            }}>
              <Box sx={{ 
                p: 3, 
                display: 'flex', 
                justifyContent: 'center',
                backgroundColor: 'rgba(76, 175, 80, 0.1)'
              }}>
                <NatureIcon sx={{ fontSize: 80, color: '#2E7D32' }} />
              </Box>
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'bold', color: '#1B5E20' }}>
                  טיפולים טבעיים
                </Typography>
                <Typography>
                  אנו מציעים מגוון רחב של טיפולים טבעיים המותאמים אישית לצרכים הייחודיים שלך, כולל רפלקסולוגיה, צמחי מרפא, ארומתרפיה ועוד.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              borderRadius: '16px',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-10px)',
                boxShadow: '0 12px 20px rgba(0, 77, 0, 0.2)'
              }
            }}>
              <Box sx={{ 
                p: 3, 
                display: 'flex', 
                justifyContent: 'center',
                backgroundColor: 'rgba(76, 175, 80, 0.1)'
              }}>
                <LocalHospitalIcon sx={{ fontSize: 80, color: '#2E7D32' }} />
              </Box>
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'bold', color: '#1B5E20' }}>
                  ייעוץ בריאותי
                </Typography>
                <Typography>
                  קבלו ייעוץ מקצועי מהמומחים שלנו בנושאי תזונה, אורח חיים בריא, ושילוב של שיטות טיפול טבעיות בשגרה היומיומית שלכם.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              borderRadius: '16px',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-10px)',
                boxShadow: '0 12px 20px rgba(0, 77, 0, 0.2)'
              }
            }}>
              <Box sx={{ 
                p: 3, 
                display: 'flex', 
                justifyContent: 'center',
                backgroundColor: 'rgba(76, 175, 80, 0.1)'
              }}>
                <EventAvailableIcon sx={{ fontSize: 80, color: '#2E7D32' }} />
              </Box>
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'bold', color: '#1B5E20' }}>
                  תיאום תורים
                </Typography>
                <Typography>
                  מערכת תיאום תורים נוחה המאפשרת לכם לקבוע, לשנות או לבטל תורים בקלות. אנו מכבדים את זמנכם ומתחייבים לשירות יעיל ומקצועי.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* About Section */}
      <Box sx={{ 
        backgroundColor: 'rgba(220, 255, 220, 0.5)',
        py: 8
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 12px 24px rgba(0, 77, 0, 0.2)',
                height: '400px'
              }}>
                <img 
                  src="/images/natural-health-background.jpg" 
                  alt="טיפולים טבעיים" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover' 
                  }} 
                />
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ 
                mb: 3, 
                color: '#052505',
                fontWeight: 'bold',
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-15px',
                  right: '0',
                  width: '80px',
                  height: '4px',
                  background: 'linear-gradient(90deg, #4CAF50, #81C784)',
                  borderRadius: '2px'
                }
              }}>
                אודות הקליניקה
              </Typography>
              
              <Box sx={{ mb: 3, mt: 4 }}>
                <Typography variant="body1" paragraph>
                  הקליניקה של חני רוזנצוויג מציעה גישה הוליסטית לבריאות וריפוי. אנו מאמינים שכל אדם הוא ייחודי ודורש תשומת לב אישית וטיפול מותאם.
                </Typography>
                
                <Typography variant="body1" paragraph>
                  הצוות המקצועי שלנו מורכב ממטפלים מנוסים בעלי הכשרה מקיפה בשיטות טיפול טבעיות מגוונות. אנו מחויבים לספק לכם את הטיפול האיכותי ביותר בסביבה תומכת ומרגיעה.
                </Typography>
                
                <Typography variant="body1">
                  בין אם אתם מחפשים הקלה מכאבים, שיפור באיכות החיים, או פשוט רוצים לשמור על בריאות אופטימלית - אנחנו כאן בשבילכם.
                </Typography>
              </Box>
              
              <Button 
                variant="outlined" 
                sx={{
                  mt: 2,
                  padding: '10px 24px',
                  borderRadius: '30px',
                  borderColor: '#2E7D32',
                  color: '#2E7D32',
                  fontWeight: 'bold',
                  borderWidth: '2px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#1B5E20',
                    backgroundColor: 'rgba(46, 125, 50, 0.1)',
                  }
                }}
              >
                קרא עוד
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" sx={{ 
          textAlign: 'center', 
          mb: 6, 
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
          חוות דעת מלקוחות
        </Typography>
        
        <Grid container spacing={4}>
          {[1, 2, 3].map((item) => (
            <Grid item xs={12} md={4} key={item}>
              <Paper sx={{ 
                p: 4, 
                height: '100%',
                borderRadius: '16px',
                boxShadow: '0 6px 16px rgba(0, 77, 0, 0.1)',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 10px 20px rgba(0, 77, 0, 0.15)'
                }
              }}>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Box 
                      key={star}
                      sx={{ 
                        color: '#4CAF50', 
                        mr: 0.5, 
                        fontSize: '24px',
                        lineHeight: 1
                      }}
                    >
                      ★
                    </Box>
                  ))}
                </Box>
                
                <Typography variant="body1" paragraph sx={{ fontStyle: 'italic' }}>
                  {item === 1 && "הטיפולים בקליניקה של חני שינו את חיי לחלוטין. הגעתי עם כאבי גב כרוניים שהפריעו לי בתפקוד היומיומי, ולאחר סדרת טיפולים אני מרגישה אדם חדש."}
                  {item === 2 && "הגישה המקצועית והאישית של הצוות מרשימה ביותר. מרגישים שבאמת אכפת להם מהבריאות שלך ומהתקדמות הטיפול. ממליץ בחום!"}
                  {item === 3 && "הייעוץ התזונתי שקיבלתי עזר לי לשנות הרגלים של שנים. התוצאות לא איחרו לבוא - ירדתי במשקל, רמות האנרגיה שלי השתפרו, ואני מרגישה נהדר."}
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                    {item === 1 && 'רח'}
                    {item === 2 && 'דג'}
                    {item === 3 && 'מש'}
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {item === 1 && 'רחל כהן'}
                      {item === 2 && 'דני גולן'}
                      {item === 3 && 'מיכל שרון'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      {item === 1 && 'מטופלת קבועה, 3 שנים'}
                      {item === 2 && 'מטופל חדש, 4 חודשים'}
                      {item === 3 && 'מטופלת, שנה וחצי'}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action Section */}
      <Box sx={{ 
        backgroundColor: '#2E7D32',
        py: 8,
        color: 'white',
        textAlign: 'center'
      }}>
        <Container maxWidth="md">
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
            מוכנים להתחיל את המסע לבריאות טובה יותר?
          </Typography>
          
          <Typography variant="h6" sx={{ mb: 4, fontWeight: 'normal', opacity: 0.9 }}>
            הצטרפו אלינו עוד היום וגלו את הדרך הטבעית לאיזון, בריאות ורווחה
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            gap: 3, 
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Button 
              variant="contained" 
              onClick={handleRegisterClick}
              sx={{
                padding: '12px 30px',
                borderRadius: '30px',
                backgroundColor: 'white',
                color: '#2E7D32',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                  boxShadow: '0 6px 14px rgba(0, 0, 0, 0.3)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              הרשמה עכשיו
            </Button>
            
            <Button 
              variant="outlined" 
              sx={{
                padding: '12px 30px',
                borderRadius: '30px',
                borderColor: 'white',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                borderWidth: '2px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              צור קשר
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ 
        backgroundColor: '#052505',
        color: 'white',
        py: 6
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                קליניקת חני רוזנצוויג
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
                המקום שלך לטיפולים טבעיים ואיכותיים בגישה הוליסטית ואישית.
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                gap: 2, 
                mt: 3 
              }}>
                {/* Social Media Icons */}
                {['facebook', 'instagram', 'whatsapp'].map((social) => (
                  <Box 
                    key={social}
                    sx={{ 
                      width: 36, 
                      height: 36, 
                      borderRadius: '50%', 
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.3)',
                        transform: 'scale(1.1)'
                      }
                    }}
                  >
                    {/* Placeholder for social icons */}
                    <Typography variant="body2" sx={{ fontSize: '12px' }}>
                      {social.charAt(0).toUpperCase()}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                שעות פעילות
              </Typography>
              <Box sx={{ mb: 1 }}>
                <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>ראשון - חמישי:</span>
                  <span>9:00 - 20:00</span>
                </Typography>
              </Box>
              <Box sx={{ mb: 1 }}>
                <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>שישי:</span>
                  <span>9:00 - 14:00</span>
                </Typography>
              </Box>
              <Box sx={{ mb: 1 }}>
                <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>שבת:</span>
                  <span>סגור</span>
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                צור קשר
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  כתובת: רחוב הבריאות 123, תל אביב
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  טלפון: 03-1234567
                </Typography>
                <Typography variant="body2">
                  אימייל: info@chani-clinic.co.il
                </Typography>
              </Box>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 4, backgroundColor: 'rgba(255,255,255,0.1)' }} />
          
          <Typography variant="body2" sx={{ textAlign: 'center', opacity: 0.7 }}>
            © {new Date().getFullYear()} כל הזכויות שמורות לקליניקת חני רוזנצוויג
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
