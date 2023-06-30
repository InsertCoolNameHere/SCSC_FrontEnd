import * as React from 'react';
import { useState,useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DataMetadata from './components/DataMetadata';
import FinalReview from './components/FinalReview';
import FilesUpload from './components/FilesUpload';
import AccessControl from './components/AccessControl';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import FlaskCommnicator from '../../comms/FlaskCommunicator'
import ThankYou from './components/ThankYou'
import UserProfileExtractor from '../../utils/UserProfileExtractor';

const steps = ['Description', 'File(s) Upload', 'Share', 'Review' ];


const isEmptyString = (val) => {
  var v1 = String(val).trim();
  if (v1.length == 0)
    return true;
  return false;
} 

// VALIDATE THE FIRST PAGE OF DATASET CREATION
const validate_dataset_desc = (info) => {
  const required_fields = ['dataDescription', 'dataName'];

  let isValid = true;
  let errormsg = "";
  for (var i = 0; i < required_fields.length; i++) {
    var fd = required_fields[i];
    if (info[fd] === undefined || isEmptyString(info[fd])) {
      return false;
    }
  }

  if (info['doc2'] !== undefined || !isEmptyString(info[fd])) {
    if (info['doc'] === undefined || isEmptyString(info['doc'])) {
      return ['Start Date Cannot be Empty.',false];
    } else {
      const date1 = Date.parse(info['doc']);
      const date2 = Date.parse(info['doc2']);
      const diffTime = date2 - date1;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));   
      
      //console.log(">>",info['doc'], info['doc2']);
      if (diffDays < 0) {
        return ['Start Date Cannot be after End date.',false];
      }
    }
  }
  return [errormsg, isValid];
}


// VALIDATE THE SECOND PAGE OF DATASET CREATION
const validate_upload_files = (info) => {
  const required_fields = ['valsuccess'];

  let isValid = true;
  for (var i = 0; i < required_fields.length; i++) {
    var fd = required_fields[i];
    if (info[fd] === undefined) {
      //console.log(">",fd,info[fd]);
      isValid = false;
      break;
    }
  }
  return isValid;
}


// VALIDATE THE THIRD PAGE OF DATASET CREATION
const validate_AccessControl = (info) => {
  const required_fields = ['groupslist'];

  let isValid = true;
  for (var i = 0; i < required_fields.length; i++) {
    var fd = required_fields[i];
    if (info[fd] === undefined) {
      //console.log(">",fd,info[fd]);
      isValid = false;
      break;
    }
  }

  return isValid;
}


// VALIDATE THE FINAL PAGE OF DATASET CREATION
const validate_FinalReview = (info) => {

  let isValid = true;
  return isValid;
}

const defaultTheme = createTheme();

export default function DatasetCreationPane() {
  // FOR ALERT MESSAGES
  const [open, setOpen] = React.useState(false);
  const [alertMsg, setAlertMsg] = React.useState("No Error");
  const [rsp, setRsp] = React.useState({});
  const { name, picture, email } = UserProfileExtractor();
  const username = "dummy";

  console.log("USERXXX", name);

  const [formData, setFormData] = useState([{}, {"spatial_field":'latlon', "temporal_field":'none'}, 
  {'groupslist': [{ groupName: "PRIVATE", "VMetadata": true, "Visualization": true, "Download": true, "Upload": true, "EMetadata": true}]}, {}]);
  const [activeStep, setActiveStep] = React.useState(0);

  // KEEPS TRACK OF CHANGES IN PAGE 1 AND saves it to the corresponging dictionary inside formData
  const handleInternalChange_pg1 = (event) => {
    //console.log("D1",event);
    var this_page_info = formData[0];

    if (event.target.id === "doc" || event.target.id === "doc2") {
      var target_id = event.target.id;
      var date_value = event.target.value;
      this_page_info[target_id] = (date_value.$M+1) + '-' + (date_value.$D) + '-' + date_value.$y;

    } else {
      var target = event.target;
      var target_id = event.target.id;

      this_page_info[target_id] = target.value;
    }
    //console.log(formData);
  };

  // KEEPS TRACK OF CHANGES IN PAGE 2 AND saves it to the corresponging dictionary inside formData
  const handleInternalChange_upload = (event) => {
    console.log("F1",event);
    var this_page_info = formData[1];
    
    if (event.target.id === "valsuccess") {
      var target_id = event.target.id;
      var val = event.target.value;
      var summary = event.target.summary;
      this_page_info[target_id] = val;
      this_page_info['summary'] = summary; 


    } else if(event.target.id === "files") {
      this_page_info["files"] = event.target.value;
    } else {
      this_page_info[event.target.id] = event.target.value;
    }
    //console.log(formData);
  };

  // KEEPS TRACK OF CHANGES IN PAGE 3 AND saves it to the corresponging dictionary inside formData
  const handleInternalChange_AC = (event) => {
    console.log("D3",event);
    var this_page_info = formData[2];

    if (event.length > 0) {
      this_page_info['groupslist'] = event;
    }

    //console.log(formData);
  };

  // KEEPS TRACK OF CHANGES IN PAGE 4 AND saves it to the corresponging dictionary inside formData
  const handleInternalChange_review = (event) => {
    //console.log("D1",event);
    var this_page_info = formData[4];
    //console.log(formData);
  };


  // LOADING THE PAGE AFTER YOU HIT NEXT
  function getStepContent(step) {
    console.log("STEP NUM:", step);
    switch (step) {
      case 0:
        return <DataMetadata handleInternalChange_pg1={handleInternalChange_pg1} />;
      case 1:
        //console.log("YO",activeStep, formData[activeStep-1]);
        return <FilesUpload handleInternalChange_upload={handleInternalChange_upload} dataName={formData[activeStep-1]['dataName']}/>;
      case 2:
        return <AccessControl handleInternalChange_AC={handleInternalChange_AC}/>;
      case 3:
        return <FinalReview handleInternalChange_pg4={handleInternalChange_review} dataName={formData[activeStep-3]['dataName']}/>;
      case 4:
        return <ThankYou rsp={rsp} username={username}/>;
      default:
        throw new Error('Unknown step');
    }
  }

  // SENDING DATA CREATION REQUEST TO THE FLASK SERVER
  function getFlaskRsp() {
    //console.log(formData);

    var full_metadata = {"username": username};
    for (var i =0; i< formData.length; i++) {
      const page_i_metadata = formData[i];
      //console.log("SEE", page_i_metadata, typeof(page_i_metadata));
      for (const [key, value] of Object.entries(page_i_metadata)) {
        if (key !== 'files') {
          full_metadata[key] = value;
        }
      }
    }
    console.log("COMBINED METADATA IN REQUEST:", full_metadata);
    FlaskCommnicator(formData[1]["files"], full_metadata, setRsp);
    
    
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (rsp.name != null) {
        //return <ThankYou rsp={rsp}/>;
        console.log("FLASK SAYS: ",rsp);
        var dName = formData[0]['dataName']
        if (rsp.name != null && rsp.name === dName) {
          console.log("UPDATED THE STEP COUNT");
          setActiveStep(activeStep + 1);
        }
    }
}, [rsp]);


  // CLICKING OF THE NEXT BUTTON AT EVERY PAGE
  const handleNext = () => {
    var retval = false;
    var errormsg = "";
    if (activeStep === 0) {
      var rets = validate_dataset_desc(formData[activeStep]);
      errormsg = rets[0];
      retval = rets[1];
    } else if (activeStep === 1) {
      retval = validate_upload_files(formData[activeStep]);
    } else if (activeStep === 2) {
      retval = validate_AccessControl(formData[activeStep]);
    } else if (activeStep === 3) {
      validate_FinalReview(formData[activeStep]);
      console.log("ENTERED HANDLE NEXT!!!!!", activeStep);
      getFlaskRsp();
      
      retval = false;
    }
 
    console.log(">>",retval);
    if (retval)
      setActiveStep(activeStep + 1);
    else {
      if(activeStep !== 3) {
        setAlertMsg("Missing Elements: Fill-out required fields to proceed."+errormsg);
        setOpen(true);
      }
    }
  };

  const handleBack = () => {
    formData[activeStep-1] = {};
    setActiveStep(activeStep - 1);
    console.log(activeStep+1, formData);
  };

  return (
    <ThemeProvider theme={defaultTheme} >
      <CssBaseline />
      <AppBar position="absolute" style={{ background: '#767CA3' }} elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Scientific Dataset Creation Pane
          </Typography>
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Dataset Registration
          </Typography>

          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          
          <React.Fragment>
            {getStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              {(activeStep !== 0 && activeStep < steps.length) && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              )}

              {(activeStep < steps.length) && (
              <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
                {activeStep === steps.length - 1 ? 'Create Dataset' : 'Next'}
              </Button>
              )}

            </Box>
          </React.Fragment>
          
        </Paper>



        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert severity='warning' variant='filled'
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {alertMsg}
            </Alert>
          </Snackbar>




















      </Container>
    </ThemeProvider>
  );
}