import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { ChangeEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { InputLabel } from '@mui/material';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';

export default function FilesUpload() {


  const MAX_COUNT = 2;
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [uploadedImages, setUploadedImages] = useState([])
  const [fileLimit, setFileLimit] = useState(false);
  const [logoLimit, setLogoLimit] = useState(false);


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
          setUploadedFiles(null);
          limitExceeded = true;
          return true;
        }
      }
    })
    if (!limitExceeded)
      setUploadedFiles(uploaded)
  }

  // Handler for Image Logo upload
  const handleUploadLogo = files => {
    const uploaded = [...uploadedFiles];
    let limitExceeded = false;

    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        if (uploaded.length === 1) setLogoLimit(true);
        if (uploaded.length > 1) {
          alert(`You can only add 1 logo image`);
          setLogoLimit(false);
          limitExceeded = true;
          setUploadedImages(null);
          return true;
        }
      }
    })
    if (!limitExceeded)
    setUploadedImages(uploaded)

  }

  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files)
    handleUploadFiles(chosenFiles);
  }

  const handleImageEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files)
    handleUploadLogo(chosenFiles);
  }


  const accepted_filetypes = 'application/vnd.ms-excel, text/csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/json'

  const accepted_imageypes = 'image/png, image/jpeg'

  const Div = styled('div')(({ theme }) => ({
    ...theme.typography.body2,
    color: 'green',
    backgroundColor: theme.palette.success,
    padding: theme.spacing(1),
  }));

  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Data Files Upload
      </Typography>
      <br/>
      <Grid container spacing={3}>
        
        <Grid item xs={12} md={6}>
            <InputLabel required id="dataLogo" name="dataLogo" fullWidth color="primary" variant="info">Dataset Logo</InputLabel>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button variant="text" component="label" fullWidth>
            <input id='logoUpload' type='file' multiple accept={accepted_imageypes} onChange={handleImageEvent} disabled={logoLimit} />
          </Button>
        </Grid>

        <Grid item xs={12} md={12}>
          {uploadedImages.map(file => (
            <Div>
              {file.name}
            </Div>
          ))}
        </Grid>

        <Grid item xs={12} md={6}>
          <InputLabel required id="dataFiles" name="dataFiles" fullWidth variant="standard">Data Files</InputLabel>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button variant="text" component="label" fullWidth>
            <input id='fileUpload' type='file' multiple accept={accepted_filetypes} onChange={handleFileEvent} disabled={fileLimit} />
          </Button>
        </Grid>

        <Grid item xs={12} md={12}>

          {uploadedFiles.map(file => (
            <Div>
              {file.name}
            </Div>
          ))}

        </Grid>
      </Grid>
    </React.Fragment>
  );
}