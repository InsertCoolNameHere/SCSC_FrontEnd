import * as React from 'react';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

export default function DataMetadata({ handleInternalChange_pg1 }) {
  
  const tomorrow = dayjs().add(1, 'day');
  const [value, setValue] = React.useState(tomorrow);
  const [endValue, setEndValue] = React.useState(tomorrow);

  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Dataset Information
      </Typography>
      <Grid container spacing={3} onChange={handleInternalChange_pg1}>
        <Grid item xs={12} sm={6}>
          <TextField required id="dataName" name="dataName" label="Dataset Name" fullWidth autoComplete="given-name" variant="standard" />
        </Grid>
        {/*<Grid item xs={12} sm={6}>
          <TextField type="number"  required id="accessLevel" name="accessLevel" label="Access Level" fullWidth variant="standard" />
        </Grid>*/}
        <Grid item xs={12}>
          <TextField required id="dataDescription" name="dataDescription" label="Data Description" fullWidth variant="standard" />
        </Grid>

        <Grid item xs={12} sm={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker disableFuture defaultValue={tomorrow} id="doc" label="Start Date of Collection" value={value} onChange={(newValue) => {
                setValue(newValue);

                console.log("DD",newValue);
                var date_event = {"target": {"id": "doc", 'value': newValue}};
                
                handleInternalChange_pg1(date_event);
                //console.log("AA",event, value);
              }}/>

              <DatePicker disableFuture defaultValue={tomorrow} id="doc2" label="End Date of Collection" value={endValue} onChange={(newValue) => {
                setEndValue(newValue);

                console.log("DD",newValue);
                var date_event = {"target": {"id": "doc2", 'value': newValue}};
                
                handleInternalChange_pg1(date_event);
                //console.log("AA",event, value);
              }}/>
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <TextField id="dataSources" name="dataSources" label="DOI of sources (comma separated)" fullWidth variant="standard" />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}