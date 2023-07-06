import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function DataDescriptionPopup({ data_name, handleClickOpen, handleClose, open }) {

  return (
    <div>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {data_name}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Here we will put data summarised description.
          </Typography>
          <Typography gutterBottom>
            This will be fetched dynamically from the backend on Click.
          </Typography>
          <Typography gutterBottom>
            The 2 options below either takes us to a data descriotion or visualization page.
          </Typography>
          <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
              <Button variant="outlined" onClick={handleClose}>
                Lookup Data Specifications
              </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
              <Button variant="contained" autoFocus onClick={handleClose}>
                Visualize Data Collection
              </Button>
          </Grid>
        </Grid>
        </DialogContent>

        

      </BootstrapDialog>
    </div>
  );
}

export default DataDescriptionPopup;