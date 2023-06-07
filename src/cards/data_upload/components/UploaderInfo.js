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

export default function UploaderInfo({handleInternalChange_pg2}) {
  const [access, setAccess] = React.useState('');

  const handleChange = (event) => {
    setAccess(event.target.value);
    event.target.id = "group_access";
    handleInternalChange_pg2(event);
  };

  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Data Source
      </Typography>
      <Grid container spacing={3} onChange={handleInternalChange_pg2}>
        <Grid item xs={12} md={6}>
          <TextField required id="uploaderOrg" name="uploaderOrg" label="Organization" fullWidth variant="standard" />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Group Access Restriction</InputLabel>
            <Select labelId="demo-simple-select-label" id="groupLevel" value={access} label="groupLevel" onChange={handleChange}>
              <MenuItem value={1}>Public</MenuItem>
              <MenuItem value={2}>Group</MenuItem>
              <MenuItem value={3}>Admin</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12}>
          <FormControlLabel control={<Checkbox color="secondary" name="saveAddress" value="yes" />} label="Some form of checkbox" />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}