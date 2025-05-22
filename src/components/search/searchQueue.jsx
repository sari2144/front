// בס"ד

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { SearchAvialableQueuesThunk } from '../../redux/slices/queueSlice/SearchAvialableQueuesThunk'
import { getAllDoctorThunk } from '../../redux/slices/doctorSlice/getAllDoctorsThunk'
import { getAllClinicThunk } from '../../redux/slices/clinicSlice/getAllClinicsThunk'
import { useNavigate } from 'react-router-dom'
import { QueuesSlice } from '../../redux/slices/queueSlice/queueSlice'
import { 
    Box, 
    Container, 
    TextField, 
    MenuItem, 
    Button, 
    Typography, 
    Paper, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow,
    FormControlLabel,
    Switch,
    Grid,
    Chip,
    Fade,
    Zoom,
    IconButton,
    InputAdornment,
    Tooltip,
    CircularProgress,
    Divider,
    Avatar
} from '@mui/material';
import { 
    Search as SearchIcon, 
    Person as PersonIcon, 
    CalendarMonth as CalendarIcon, 
    AccessTime as TimeIcon, 
    LocationOn as LocationIcon, 
    Check as CheckIcon,
    FilterAlt as FilterIcon,
    Clear as ClearIcon,
    ArrowDownward as ArrowDownwardIcon,
    EventAvailable as EventAvailableIcon,
    EventBusy as EventBusyIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { styled, alpha } from '@mui/material/styles';
import './searchQueue.css';

// פלטת צבעים מתואמת עם קומפוננטת login - ירוק קיווי ואדום פטל
// עם דגש על שילוב מאוזן של אדום פטל
const colors = {
  // Base colors
  background: '#f5f8f0',    // רקע בגוון ירקרק-שמנת בהיר
  card: '#ffffff',          // לבן
  primary: '#8bc34a',       // ירוק קיווי בהיר
  secondary: '#ad1457',     // אדום-פטל בינוני - הועלה לגוון בהיר יותר
  tertiary: '#f1f8e9',      // ירוק-לבן בהיר מאוד
  
  // Text colors
  textDark: '#33691e',      // ירוק כהה לטקסט
  textMedium: '#558b2f',    // ירוק בינוני לטקסט
  textLight: '#7cb342',     // ירוק בהיר לטקסט
  textRaspberry: '#880e4f', // אדום-פטל כהה לטקסט
  
  // Accent colors
  accent1: '#aed581',       // ירוק קיווי בהיר
  accent2: '#e91e63',       // אדום-פטל בהיר
  accent3: '#c5e1a5',       // ירוק-שמנת בהיר
  
  // Gradients
  gradientGreen: 'linear-gradient(135deg, #aed581 0%, #689f38 100%)',  // גרדיאנט ירוק קיווי
  gradientRaspberry: 'linear-gradient(135deg, #e91e63 0%, #880e4f 100%)',  // גרדיאנט אדום-פטל
  gradientMix: 'linear-gradient(135deg, #aed581 0%, #ad1457 100%)',   // גרדיאנט מעורב ירוק-אדום
  
  // Shadows
  shadow: 'rgba(104, 159, 56, 0.15)',
  shadowHeavy: 'rgba(104, 159, 56, 0.25)',
  shadowRaspberry: 'rgba(173, 20, 87, 0.15)',
  shadowRaspberryHeavy: 'rgba(173, 20, 87, 0.25)',
};

// Styled components מעודכנים עם שילוב מאוזן של אדום פטל
const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 1)',
      boxShadow: `0 4px 20px ${colors.shadow}`,
    },
    '&.Mui-focused': {
      backgroundColor: 'rgba(255, 255, 255, 1)',
      boxShadow: `0 8px 25px ${colors.shadowRaspberry}`,
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: colors.secondary,
        borderWidth: 2,
      },
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(104, 159, 56, 0.3)',
    },
  },
  '& .MuiInputLabel-root': {
    color: colors.textMedium,
    fontWeight: 500,
    '&.Mui-focused': {
      color: colors.secondary,
    },
  },
  '& .MuiInputBase-input': {
    padding: '16px 14px',
  },
  marginBottom: 24,
}));

const SearchButton = styled(Button)(({ theme }) => ({
  borderRadius: 30,
  padding: '12px 28px',
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1rem',
  background: colors.gradientRaspberry,
  boxShadow: `0 8px 25px ${colors.shadowRaspberry}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: `0 12px 30px ${colors.shadowRaspberryHeavy}`,
    transform: 'translateY(-3px)',
  },
  '&:active': {
    boxShadow: `0 5px 15px ${colors.shadowRaspberry}`,
    transform: 'translateY(-1px)',
  },
}));

const ResetButton = styled(Button)(({ theme }) => ({
  borderRadius: 30,
  padding: '10px 24px',
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.95rem',
  color: colors.textMedium,
  border: `2px solid ${alpha(colors.primary, 0.3)}`,
  backgroundColor: 'transparent',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: alpha(colors.primary, 0.05),
    borderColor: colors.primary,
    transform: 'translateY(-2px)',
  },
}));

const BookButton = styled(IconButton)(({ theme }) => ({
  color: 'white',
  backgroundColor: colors.secondary,
  transition: 'all 0.3s ease',
  boxShadow: `0 4px 12px ${alpha(colors.secondary, 0.3)}`,
  '&:hover': {
    backgroundColor: colors.secondary,
    transform: 'translateY(-2px) scale(1.05)',
    boxShadow: `0 6px 16px ${alpha(colors.secondary, 0.4)}`,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 600,
  textAlign: 'center',
  color: colors.textDark,
  padding: '16px 8px',
  borderBottom: `1px solid ${alpha(colors.primary, 0.1)}`,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: alpha(colors.tertiary, 0.5),
  },
  '&:hover': {
    backgroundColor: alpha(colors.accent2, 0.05),
    cursor: 'pointer',
  },
  transition: 'all 0.3s ease',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: 16,
  overflow: 'hidden',
  background: alpha(colors.card, 0.9),
  boxShadow: '0 20px 80px rgba(0, 0, 0, 0.07), 0 10px 30px rgba(0, 0, 0, 0.05)',
  border: `1px solid ${alpha(colors.primary, 0.1)}`,
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: colors.gradientMix,
  }
}));

const CustomSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: colors.secondary,
    '&:hover': {
      backgroundColor: alpha(colors.secondary, 0.1),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: colors.secondary,
  },
}));

// כרטיסיית תכונה מעוצבת עם אדום פטל
const FeatureCard = styled(Box)(({ theme }) => ({
  borderRadius: 16,
  padding: '24px 16px',
  textAlign: 'center',
  backgroundColor: alpha(colors.card, 0.9),
  border: `1px solid ${alpha(colors.secondary, 0.1)}`,
  boxShadow: `0 10px 30px -10px ${colors.shadowRaspberry}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: `0 15px 40px -10px ${colors.shadowRaspberryHeavy}`,
    backgroundColor: alpha(colors.card, 1),
  }
}));

export const SearchQueue = () => {
    const currentPatient = useSelector(state => state.PatientSlice.currentPatient)
    const arrSearch = useSelector(state => state.QueuesSlice.listOfSearchedQueues)
    const doctorsList = useSelector(state => state.DoctorSlice.doctorsList)
    const clinicsList = useSelector(state => state.ClinicSlice.listOfClinics)
    const [searchDetails, setSearchDetails] = useState({ 
        id: currentPatient.id, 
        dayWeek: ' ', 
        doctorName: ' ', 
        city: ' ', 
        minHour: -1, 
        maxHour: -1, 
        date: '2020-1-1', 
        isDouble: false 
    })
    const [isSearching, setIsSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [showTips, setShowTips] = useState(true);
    const dispatch = useDispatch()
    const navi = useNavigate()

    const daysAtHebrew = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי']

    useEffect(() => {
        // Trigger animations after component mount
        const timer = setTimeout(() => {
          setShowContent(true);
        }, 300);
        
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if(!doctorsList.length)
            dispatch(getAllDoctorThunk())
    }, [])
    
    useEffect(() => {
        if(!clinicsList.length)
            dispatch(getAllClinicThunk())
    }, [doctorsList])
    
    const res = () => {
        setIsSearching(true);
        setShowResults(false);
        setShowTips(false);
        
        // Simulate loading for better UX
        setTimeout(() => {
            dispatch(SearchAvialableQueuesThunk(searchDetails));
            setIsSearching(false);
            setShowResults(true);
        }, 800);
    }

    const determineQ = (q) => {
        var qType = 'o'
        if(searchDetails.isDouble)
            qType = 'd'
        else if(currentPatient.gender == 'female')
            qType = 'w'
        dispatch(QueuesSlice.actions.setCurrentQueue(q))
        navi('/addQueue/' + qType)
    }
    
    const resetSearch = () => {
        setSearchDetails({ 
            id: currentPatient.id, 
            dayWeek: ' ', 
            doctorName: ' ', 
            city: ' ', 
            minHour: -1, 
            maxHour: -1, 
            date: '2020-1-1', 
            isDouble: false 
        });
    }

    // טיפים לחיפוש יעיל - עם צבעי אדום פטל
    const searchTips = [
        {
            icon: <CalendarIcon sx={{ fontSize: 36, color: 'white' }} />,
            title: "בחר תאריך גמיש",
            description: "הגדרת טווח תאריכים רחב יותר תגדיל את הסיכוי למצוא תורים פנויים",
            color: colors.secondary
        },
        {
            icon: <PersonIcon sx={{ fontSize: 36, color: 'white' }} />,
            title: "בחר מטפל ספציפי",
            description: "אם יש לך העדפה למטפל מסוים, ציין את שמו בשדה החיפוש",
            color: colors.primary
        }
    ];

    // Decorative elements
    const DecorativeShape = ({ position, size = 'medium', color = 'primary' }) => (
        <Box sx={{
            position: 'absolute',
            width: size === 'large' ? 300 : size === 'medium' ? 200 : 100,
            height: size === 'large' ? 300 : size === 'medium' ? 200 : 100,
            borderRadius: '50%',
            background: color === 'primary' 
                ? `radial-gradient(circle, ${alpha(colors.accent1, 0.3)} 0%, ${alpha(colors.accent1, 0.05)} 70%)`
                : `radial-gradient(circle, ${alpha(colors.accent2, 0.2)} 0%, ${alpha(colors.accent2, 0.03)} 70%)`,
            zIndex: 0,
            opacity: 0.7,
            ...(position === 'top-right' ? {
                top: '-5%',
                right: '-5%',
            } : position === 'bottom-left' ? {
                bottom: '-5%',
                left: '-5%',
            } : position === 'center-right' ? {
                top: '40%',
                right: '-10%',
            } : {}),
        }} />
    );

    return (
        <Box sx={{
            minHeight: '100vh',
            background: `linear-gradient(135deg, ${colors.background} 0%, ${alpha(colors.tertiary, 0.7)} 100%)`,
            position: 'relative',
            overflow: 'hidden',
            padding: { xs: '20px', md: '40px' },
        }}>
            {/* Decorative shapes */}
            <DecorativeShape position="top-right" size="large" color="primary" />
            <DecorativeShape position="bottom-left" size="medium" color="secondary" />
            <DecorativeShape position="center-right" size="small" color="secondary" />
            
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Fade in={showContent} timeout={800}>
                    <Box>
                        {/* Header */}
                        <Box sx={{ 
                            textAlign: 'center', 
                            mb: { xs: 4, md: 5 }
                        }}>
                            <Typography variant="h3" component="h1" sx={{
                                fontWeight: 700,
                                color: colors.textDark,
                                mb: 2,
                                fontSize: { xs: '2rem', md: '2.5rem' },
                                position: 'relative',
                                display: 'inline-block',
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    bottom: -8,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '80px',
                                    height: '4px',
                                    background: colors.gradientRaspberry,
                                    borderRadius: '2px'
                                }
                            }}>
                                חיפוש תורים זמינים
                            </Typography>
                            
                            <Typography variant="h6" sx={{
                                color: colors.textMedium,
                                fontWeight: 400,
                                maxWidth: '700px',
                                mx: 'auto',
                                lineHeight: 1.6
                            }}>
                                מצא את התור המושלם עבורך בקליניקה שלנו בקלות ובמהירות
                            </Typography>
                        </Box>
                        
                        {/* Tips Section - visible when not showing results */}
                        {showTips && !showResults && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7 }}
                            >
                                <Box sx={{ mb: 5 }}>
                                    <Grid container spacing={3}>
                                        {searchTips.map((tip, index) => (
                                            <Grid item xs={12} sm={6} md={3} key={index}>
                                                <FeatureCard>
                                                    <Avatar sx={{
                                                        width: 70,
                                                        height: 70,
                                                        backgroundColor: tip.color,
                                                        mx: 'auto',
                                                        mb: 2,
                                                        boxShadow: tip.color === colors.secondary 
                                                            ? `0 8px 20px ${colors.shadowRaspberry}` 
                                                            : `0 8px 20px ${colors.shadow}`
                                                    }}>
                                                        {tip.icon}
                                                    </Avatar>
                                                    <Typography variant="h6" sx={{
                                                        fontWeight: 700,
                                                        color: tip.color === colors.secondary 
                                                            ? colors.textRaspberry 
                                                            : colors.textDark,
                                                        mb: 1
                                                    }}>
                                                        {tip.title}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{
                                                        color: colors.textMedium,
                                                        lineHeight: 1.6
                                                    }}>
                                                        {tip.description}
                                                    </Typography>
                                                </FeatureCard>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Box>
                            </motion.div>
                        )}
                        
                        {/* Search Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: showTips ? 0.2 : 0 }}
                        >
                            <StyledPaper elevation={0} sx={{ mb: 4 }}>
                                <Box sx={{ 
                                    p: { xs: 3, md: 4 },
                                    borderBottom: `1px solid ${alpha(colors.primary, 0.1)}`,
                                }}>
                                    <Typography variant="h5" sx={{
                                        fontWeight: 700,
                                        color: colors.textRaspberry,
                                        mb: 3,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1.5
                                    }}>
                                        <SearchIcon sx={{ color: colors.secondary }} />
                                        חיפוש מתקדם
                                    </Typography>
                                    
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={4}>
                                            <StyledTextField
                                                fullWidth
                                                label="מטפל"
                                                variant="outlined"
                                                className="search-input"
                                                value={searchDetails.doctorName !== ' ' ? searchDetails.doctorName : ''}
                                                onChange={e => setSearchDetails({ ...searchDetails, doctorName: e.target.value })}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonIcon sx={{ color: colors.secondary }} />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        
                                        <Grid item xs={12} md={4}>
                                            <StyledTextField
                                                select
                                                fullWidth
                                                label="יום בשבוע"
                                                variant="outlined"
                                                className="search-input"
                                                value={searchDetails.dayWeek}
                                                onChange={e => setSearchDetails({...searchDetails, dayWeek: e.target.value})}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <CalendarIcon sx={{ color: colors.primary }} />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            >
                                                <MenuItem value=" ">כל הימים</MenuItem>
                                                <MenuItem value="Sunday">ראשון</MenuItem>
                                                <MenuItem value="Monday">שני</MenuItem>
                                                <MenuItem value="Tuesday">שלישי</MenuItem>
                                                <MenuItem value="Wednesday">רביעי</MenuItem>
                                                <MenuItem value="Thursday">חמישי</MenuItem>
                                                <MenuItem value="Friday">שישי</MenuItem>
                                            </StyledTextField>
                                        </Grid>
                                        
                                        <Grid item xs={12} md={4}>
                                            <StyledTextField
                                                type="date"
                                                fullWidth
                                                label="החל מתאריך"
                                                variant="outlined"
                                                className="search-input"
                                                value={searchDetails.date !== '2020-1-1' ? searchDetails.date : ''}
                                                onChange={(e) => setSearchDetails({ ...searchDetails, date: e.target.value })}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <CalendarIcon sx={{ color: colors.secondary }} />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                InputLabelProps={{ shrink: true }}
                                            />
                                        </Grid>
                                        
                                        <Grid item xs={12} md={4}>
                                            <StyledTextField
                                                type="number"
                                                fullWidth
                                                label="החל משעה"
                                                variant="outlined"
                                                className="search-input"
                                                value={searchDetails.minHour !== -1 ? searchDetails.minHour : ''}
                                                onChange={e => setSearchDetails({ ...searchDetails, minHour: e.target.value })}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <TimeIcon sx={{ color: colors.primary }} />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        
                                        <Grid item xs={12} md={4}>
                                            <StyledTextField
                                                type="number"
                                                fullWidth
                                                label="עד שעה"
                                                variant="outlined"
                                                className="search-input"
                                                value={searchDetails.maxHour !== -1 ? searchDetails.maxHour : ''}
                                                onChange={e => setSearchDetails({ ...searchDetails, maxHour: e.target.value })}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <TimeIcon sx={{ color: colors.secondary }} />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        
                                        <Grid item xs={12} md={4}>
                                            <StyledTextField
                                                select
                                                fullWidth
                                                label="עיר"
                                                variant="outlined"
                                                className="search-input"
                                                value={searchDetails.city}
                                                onChange={e => setSearchDetails({ ...searchDetails, city: e.target.value })}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <LocationIcon sx={{ color: colors.primary }} />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            >
                                                <MenuItem value=" ">כל הערים</MenuItem>
                                                <MenuItem value="Ashdod">אשדוד</MenuItem>
                                                <MenuItem value="Jerusalem">ירושלים</MenuItem>
                                            </StyledTextField>
                                        </Grid>
                                        
                                        <Grid item xs={12}>
                                            <Box sx={{ 
                                                p: 2, 
                                                borderRadius: 4,
                                                backgroundColor: alpha(colors.accent2, 0.05),
                                                border: `1px solid ${alpha(colors.secondary, 0.1)}`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between'
                                            }}>
                                                <Typography variant="subtitle1" sx={{
                                                    fontWeight: 600,
                                                    color: colors.textRaspberry
                                                }}>
                                                    תור כפול
                                                </Typography>
                                                
                                                <FormControlLabel
                                                    control={
                                                        <CustomSwitch
                                                            checked={searchDetails.isDouble}
                                                            onChange={e => setSearchDetails({ ...searchDetails, isDouble: e.target.checked })}
                                                            color="primary"
                                                        />
                                                    }
                                                    label=""
                                                />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    
                                    <Box sx={{ 
                                        display: 'flex', 
                                        justifyContent: 'center',
                                        gap: 2,
                                        mt: 4,
                                        flexWrap: 'wrap'
                                    }}>
                                        <ResetButton
                                            variant="outlined"
                                            onClick={resetSearch}
                                            startIcon={<ClearIcon />}
                                        >
                                            נקה חיפוש
                                        </ResetButton>
                                        
                                        <SearchButton
                                            variant="contained"
                                            onClick={res}
                                            disabled={isSearching}
                                            startIcon={isSearching ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
                                        >
                                            {isSearching ? 'מחפש...' : 'חפש תורים'}
                                        </SearchButton>
                                    </Box>
                                </Box>
                            </StyledPaper>
                        </motion.div>
                      
                        {/* Search Results */}
                        <Fade in={showResults} timeout={800}>
                            <Box sx={{ display: showResults ? 'block' : 'none' }}>
                                {arrSearch.length > 0 ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <StyledPaper elevation={0} sx={{ mb: 4 }}>
                                            <Box sx={{ 
                                                p: { xs: 3, md: 4 },
                                                borderBottom: `1px solid ${alpha(colors.secondary, 0.1)}`,
                                                background: `linear-gradient(to right, ${alpha(colors.accent2, 0.05)}, transparent)`,
                                            }}>
                                                <Typography variant="h5" sx={{
                                                    fontWeight: 700,
                                                    color: colors.textRaspberry,
                                                    mb: 2,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1.5
                                                }}>
                                                    <EventAvailableIcon sx={{ color: colors.secondary }} />
                                                    תוצאות החיפוש
                                                    <Chip 
                                                        label={`${arrSearch.length} תורים נמצאו`} 
                                                        size="small"
                                                        sx={{ 
                                                            ml: 2,
                                                            backgroundColor: alpha(colors.secondary, 0.1),
                                                            color: colors.textRaspberry,
                                                            fontWeight: 600,
                                                            borderRadius: 8
                                                        }} 
                                                    />
                                                </Typography>
                                            </Box>
                                            
                                            <TableContainer sx={{ p: { xs: 2, md: 3 } }}>
                                                <Table aria-label="טבלת תורים זמינים">
                                                    <TableHead>
                                                        <TableRow sx={{ 
                                                            backgroundColor: alpha(colors.secondary, 0.05),
                                                            '& th': {
                                                                borderBottom: `2px solid ${alpha(colors.secondary, 0.2)}`
                                                            }
                                                        }}>
                                                            <StyledTableCell>קוד</StyledTableCell>
                                                            <StyledTableCell>מטפל</StyledTableCell>
                                                            <StyledTableCell>תאריך</StyledTableCell>
                                                            <StyledTableCell>יום</StyledTableCell>
                                                            <StyledTableCell>שעה</StyledTableCell>
                                                            <StyledTableCell>קליניקה</StyledTableCell>
                                                            <StyledTableCell>פעולות</StyledTableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {arrSearch.map((s, index) => (
                                                            <StyledTableRow key={s.id} className="table-row">
                                                                <TableCell align="center">{s.id}</TableCell>
                                                                <TableCell align="center">
                                                                    {doctorsList.find(d => d.id == s.idDoctor)?.firstName} {doctorsList.find(d => d.id == s.idDoctor)?.lastName}
                                                                </TableCell>
                                                                <TableCell align="center">{new Date(s.date).toLocaleDateString()}</TableCell>
                                                                <TableCell align="center">{daysAtHebrew[new Date(s.date).getDay()]}</TableCell>
                                                                <TableCell align="center">{s.hour}:{s.minute == 0 ? '00' : s.minute}</TableCell>
                                                                <TableCell align="center">{clinicsList.find(c => c.id == s.idClinic)?.city}</TableCell>
                                                                <TableCell align="center">
                                                                    <Tooltip title="קבע תור">
                                                                        <BookButton onClick={() => determineQ(s)} size="small">
                                                                            <ArrowDownwardIcon fontSize="small" />
                                                                        </BookButton>
                                                                    </Tooltip>
                                                                </TableCell>
                                                            </StyledTableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                            
                                            {/* פעולות נוספות */}
                                            <Box sx={{ 
                                                p: 3, 
                                                display: 'flex', 
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                borderTop: `1px solid ${alpha(colors.primary, 0.1)}`,
                                                backgroundColor: alpha(colors.tertiary, 0.5)
                                            }}>
                                                <Typography variant="body2" sx={{ 
                                                    color: colors.textMedium,
                                                    fontStyle: 'italic'
                                                }}>
                                                    * לחץ על כפתור החץ כדי לקבוע תור
                                                </Typography>
                                                
                                                <Button 
                                                    variant="text" 
                                                    color="primary"
                                                    onClick={() => {
                                                        setShowResults(false);
                                                        setShowTips(true);
                                                    }}
                                                    sx={{ 
                                                        color: colors.secondary,
                                                        fontWeight: 600
                                                    }}
                                                >
                                                    חיפוש חדש
                                                </Button>
                                            </Box>
                                        </StyledPaper>
                                    </motion.div>
                                ) : showResults && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <StyledPaper elevation={0} sx={{ 
                                            p: 4, 
                                            textAlign: 'center',
                                            border: `1px solid ${alpha(colors.secondary, 0.1)}`,
                                        }}>
                                            <Box sx={{ 
                                                width: 80, 
                                                height: 80, 
                                                borderRadius: '50%',
                                                backgroundColor: alpha(colors.secondary, 0.1),
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                mx: 'auto',
                                                mb: 3,
                                                boxShadow: `0 8px 20px ${colors.shadowRaspberry}`
                                            }}>
                                                <EventBusyIcon sx={{ fontSize: 40, color: colors.secondary }} />
                                            </Box>
                                            
                                            <Typography variant="h6" sx={{ 
                                                fontWeight: 700,
                                                color: colors.textRaspberry,
                                                mb: 2
                                            }}>
                                                אין תורים זמינים בתנאים שביקשת
                                            </Typography>
                                            
                                            <Typography variant="body2" sx={{ 
                                                color: colors.textMedium,
                                                mb: 3,
                                                maxWidth: 500,
                                                mx: 'auto'
                                            }}>
                                                נסה לשנות את פרמטרי החיפוש או לבחור תאריכים אחרים
                                            </Typography>
                                            
                                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                                                <ResetButton
                                                    variant="outlined"
                                                    onClick={resetSearch}
                                                    startIcon={<ClearIcon />}
                                                    sx={{ mt: 2 }}
                                                >
                                                    נקה חיפוש
                                                </ResetButton>
                                                
                                                <Button
                                                    variant="contained"
                                                    onClick={() => {
                                                        setShowResults(false);
                                                        setShowTips(true);
                                                    }}
                                                    sx={{ 
                                                        mt: 2,
                                                        backgroundColor: colors.secondary,
                                                        color: 'white',
                                                        '&:hover': {
                                                            backgroundColor: alpha(colors.secondary, 0.9)
                                                        }
                                                    }}
                                                >
                                                    חזור לטיפים
                                                </Button>
                                            </Box>
                                        </StyledPaper>
                                    </motion.div>
                                )}
                            </Box>
                        </Fade>
                        
                        {/* Footer */}
                        <Box sx={{ 
                            mt: 6, 
                            textAlign: 'center',
                            opacity: 0.7
                        }}>
                            <Typography variant="body2" sx={{ color: colors.textMedium }}>
                                © {new Date().getFullYear()} קליניקת חני רוזנצוויג | מערכת חיפוש תורים
                            </Typography>
                        </Box>
                    </Box>
                </Fade>
            </Container>
            
            {/* Loading Backdrop */}
            <Box sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                display: isSearching ? 'flex' : 'none',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
                backdropFilter: 'blur(4px)',
            }}>
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    gap: 2
                }}>
                    <CircularProgress size={60} sx={{ color: colors.secondary }} />
                    <Typography variant="h6" sx={{ 
                        color: colors.textRaspberry,
                        fontWeight: 600
                    }}>
                        מחפש תורים זמינים...
                    </Typography>
                </Box>
            </Box>
            
            {/* Global styles for animations */}
            <style jsx global>{`
                @keyframes pulse {
                    0%, 100% {
                        transform: scale(1);
                        opacity: 0.7;
                    }
                    50% {
                        transform: scale(1.05);
                        opacity: 0.9;
                    }
                }
                
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }
            `}</style>
        </Box>
    );
}