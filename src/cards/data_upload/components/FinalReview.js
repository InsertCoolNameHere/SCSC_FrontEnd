import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function FinalReview({handleInternalChange_review, dataName}) {
  const [access, setAccess] = React.useState('');

  const handleChange = (event) => {
    setAccess(event.target.value);
    event.target.id = "group_access";
    handleInternalChange_review(event);
  };

  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Review
      </Typography>
      <Grid container spacing={3} onChange={handleInternalChange_review}>
        <Grid item xs={12} md={6}>
          <InputLabel focused id="spatial_label"><b>Name:</b> {dataName}</InputLabel>
        </Grid>
        
        
        
      </Grid>
    </React.Fragment>
  );
}