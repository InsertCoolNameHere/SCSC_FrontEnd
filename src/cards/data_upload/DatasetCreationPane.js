import * as React from 'react';
import { useState } from 'react';
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
import UploaderInfo from './components/UploaderInfo';
import FilesUpload from './components/FilesUpload';
import AccessControl from './components/AccessControl';
import ThankYou from './components/ThankYou';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';

const steps = ['Data Description', 'Source', 'Access Control', 'File(s) Upload'];


const isEmptyString = (val) => {
  var v1 = String(val).trim();
  if (v1.length == 0)
    return true;
  return false;
} 

const validate_pg1 = (info) => {
  const required_fields = ['accessLevel', 'dataDescription', 'dataName', 'doc'];

  let isValid = true;
  for (var i = 0; i < required_fields.length; i++) {
    var fd = required_fields[i];
    if (info[fd] === undefined || isEmptyString(info[fd])) {
      //console.log(">",fd,info[fd]);
      isValid = false;
      break;
    }
  }

  return isValid;
}


const validate_pg2 = (info) => {
  const required_fields = ['group_access', 'uploaderOrg'];

  let isValid = true;
  for (var i = 0; i < required_fields.length; i++) {
    var fd = required_fields[i];
    if (info[fd] === undefined || isEmptyString(info[fd])) {
      //console.log(">",fd,info[fd]);
      isValid = false;
      break;
    }
  }

  return isValid;
}


const validate_pg3 = (info) => {
  return true;
}

const validate_pg4 = (info) => {
  const required_fields = ['accessLevel', 'dataDescription', 'dataName', 'doc'];

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

const defaultTheme = createTheme();

export default function DatasetCreationPane() {
  // FOR ALERT MESSAGES
  const [open, setOpen] = React.useState(false);
  const [alertMsg, setAlertMsg] = React.useState("No Error");


  const pageids = ['page1', 'page2', 'page3', 'page4'];
  const [formData, setFormData] = useState([{}, {}, {}, {}]);
  const [activeStep, setActiveStep] = React.useState(0);

  // Handles change in input to one of the pages and saves it to the corresponging dictionary inside formData
  const handleInternalChange_pg1 = (event) => {
    //console.log("D1",event);
    var this_page_info = formData[0];

    if (event.target.id === "doc") {
      var target_id = event.target.id;
      var date_value = event.target.value;
      this_page_info[target_id] = date_value.$D + '-' + (date_value.$M + 1) + '-' + date_value.$y;

    } else {
      var target = event.target;
      var target_id = event.target.id;

      this_page_info[target_id] = target.value;
      /* if ("dataName" === target_id) {
        this_page_info['groupName'] = target.value;
      } else if ("accessLevel" === target_id) {
        this_page_info['accessLevel'] = target.value;
      } else if ("dataDescription" === target_id) {
        this_page_info['dataDescription'] = target.value;
      } */
    }
    console.log(formData);
  };

  const handleInternalChange_pg2 = (event) => {
    //console.log("D1",event);
    var this_page_info = formData[1];

    if (event.target.id === "doc") {
      var target_id = event.target.id;
      var date_value = event.target.value;
      this_page_info[target_id] = date_value.$D + '-' + (date_value.$M + 1) + '-' + date_value.$y;

    } else {
      var target = event.target;
      var target_id = event.target.id;

      this_page_info[target_id] = target.value;
      /* if ("dataName" === target_id) {
        this_page_info['groupName'] = target.value;
      } else if ("accessLevel" === target_id) {
        this_page_info['accessLevel'] = target.value;
      } else if ("dataDescription" === target_id) {
        this_page_info['dataDescription'] = target.value;
      } */
    }
    console.log(formData);
  };

  const handleInternalChange_pg3 = (event) => {
    console.log("D3",event);
    /*var this_page_info = formData[1];

    if (event.target.id === "doc") {
      var target_id = event.target.id;
      var date_value = event.target.value;
      this_page_info[target_id] = date_value.$D + '-' + (date_value.$M + 1) + '-' + date_value.$y;

    } else {
      var target = event.target;
      var target_id = event.target.id;

      this_page_info[target_id] = target.value;
      
    }
    console.log(formData);*/
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <DataMetadata handleInternalChange_pg1={handleInternalChange_pg1} />;
      case 1:
        return <UploaderInfo handleInternalChange_pg2={handleInternalChange_pg2}/>;
      case 2:
        return <AccessControl handleInternalChange_pg3={handleInternalChange_pg3}/>;
      case 3:
        return <FilesUpload />;
      default:
        throw new Error('Unknown step');
    }
  }



  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  const handleNext = () => {
    var retval = false;
    if (activeStep == 0) {
      retval = validate_pg1(formData[activeStep]);
    } else if (activeStep == 1) {
      retval = validate_pg2(formData[activeStep]);
    } else if (activeStep == 2) {
      retval = validate_pg3(formData[activeStep]);
    } else if (activeStep == 3) {
      retval = validate_pg4(formData[activeStep]);
    }


    console.log(">>",retval);
    if (retval)
      setActiveStep(activeStep + 1);
    else {
      setAlertMsg("Missing Elements: Fill-out required fields to proceed.");
      setOpen(true);
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
            Dataset Info
          </Typography>

          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === steps.length ? (
            <ThankYou />
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
                  {activeStep === steps.length - 1 ? 'Create Dataset' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
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