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
import { ChangeEvent, useState } from 'react';

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

function DataUploadPopup({ header, handleClose, open }) {

  const MAX_COUNT = 5;
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [fileLimit, setFileLimit] = useState(false);


  // Handler for Data File upload
  const handleUploadFiles = files => {
    const uploaded = [...uploadedFiles];
    let limitExceeded = false;

    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        if (uploaded.length === MAX_COUNT) setFileLimit(true);
        if (uploaded.length > MAX_COUNT) {
          alert(`You can only add a maximum of ${MAX_COUNT} files`);
          setFileLimit(false);
          limitExceeded = true;
          return true;
        }
      }
    })
    if (!limitExceeded)
      setUploadedFiles(uploaded)

  }

  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files)
    handleUploadFiles(chosenFiles);
  }


  // ACTUAL HTML CONTENTS
  return (
    <div>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {header}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Upload your dataset (Fields with asterisk are mandatory.)<br/>
            Try to include useful information regarding the datasets for an improved usability scores.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>





        <input id='fileUpload' type='file' multiple
          accept='application/pdf, image/png'
          onChange={handleFileEvent}
          disabled={fileLimit}
        />

        <label htmlFor='fileUpload'>
          <a className={`btn btn-primary ${!fileLimit ? '' : 'disabled'} `}>Upload Files</a>
        </label>

        <div className="uploaded-files-list">
          {uploadedFiles.map(file => (
            <div >
              {file.name}
            </div>
          ))}
        </div>

      </BootstrapDialog>
    </div>
  );
}

export default DataUploadPopup;