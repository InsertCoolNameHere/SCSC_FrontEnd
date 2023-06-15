import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { ChangeEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { Checkbox, FormControlLabel, InputLabel, MenuItem, Select } from '@mui/material';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import MetadataExtractor from '../../../utils/MetadataExtractor';
import DatasetReview from '../../../utils/DatasetReview';

export default function FilesUpload({dataName, handleInternalChange_upload}) {

  const MAX_COUNT = 2;
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [uploadedImages, setUploadedImages] = useState([])
  const [fileLimit, setFileLimit] = useState(false);
  const [logoLimit, setLogoLimit] = useState(false);

  const [metadata, setMetadata] = useState({});
  const [rowData, setRowData] = useState([]);
  const [validMetadata, setValidMetadata] = useState(false)
  const [validUpload, setValidUpload] = useState(false);

  const [spatial, setSpatial] = React.useState('latlon');

  const [hasTime, setHasTime] = React.useState('none');

  const handleHasTime = (event) => {
    setHasTime(event.target.value);
  };


  // READS UPLOADED FILES
  let reader;

  const handleSpatialChange = (event) => {
    setSpatial(event.target.value);
  };

  const handleFileRead = (e) => {
    const content = reader.result;
    
    let {metadata_map, rowData1} = MetadataExtractor(content);

    //console.log("CONTENTXX",rowData1);
    setRowData(prevRowData => ([...rowData1]));
    setMetadata(prevMetadata => (metadata_map));
    setValidMetadata(true);
  };


  // HANDLE CLICKING OF THE FILE UPLOAD BUTTON
  const handleUploadFiles = files => {
    const uploaded = [...uploadedFiles];
    let limitExceeded = false;

    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        if (uploaded.length === MAX_COUNT) 
          setFileLimit(true);
        if (uploaded.length > MAX_COUNT) {
          alert(`You can only add a maximum of ${MAX_COUNT} files`);
          setFileLimit(false);
          setUploadedFiles([]);
          limitExceeded = true;
          return true;
        }
      }
    })

    if (!limitExceeded) {

      setUploadedFiles(prev_uploaded => ([...uploaded]));

      reader = new FileReader();
      reader.onloadend = handleFileRead;
      reader.readAsText(files[0]);

      setValidUpload(true);
    }

    console.log(uploadedFiles);
  }

  // Handler for Image Logo upload ======================================================================
  const handleUploadLogo = files => {
    const uploaded = [...uploadedImages];
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
      setUploadedImages(uploaded);

  }

  // Handler for IMAGE FILE upload ======================================================================
  const handleImageEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files)
    handleUploadLogo(chosenFiles);
  }


  // Handler for DATA FILE upload ======================================================================
  const handleFileEvent = (e) => {
    // READ FILE(S) AND EXTRACT METADATA
    const chosenFiles = Array.prototype.slice.call(e.target.files)

    // CHECKING IF LOAD LIMIT HAS REACHED
    console.log("UPLOADED FILES", chosenFiles);
    handleUploadFiles(chosenFiles);
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
          <InputLabel required id="spatial_label">Spatial Information Type</InputLabel>
        </Grid>

        <Grid item xs={12} md={6}>
          <Select labelId="spatial_type" id="demo-simple-select" value={spatial} onChange={handleSpatialChange}>
            <MenuItem value={'latlon'}>Latitude-Longitude</MenuItem>
            <MenuItem value={'hash'}>Spatial Location Identifier</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} md={6}>
          <InputLabel id="spatial_type">Data has temporal field?</InputLabel>
        </Grid>
        <Grid item xs={12} md={6}>
            {/*<FormControlLabel control={<Checkbox color="secondary" onChange={handleHasTime} name="has_time" checked={hasTime}/>}/>*/}
            <Select labelId="temporal_type" id="demo-simple-select" value={hasTime} onChange={handleHasTime}>
              <MenuItem value={'none'}>No Timestamp</MenuItem>
              <MenuItem value={'epoch'}>Epoch</MenuItem>
              <MenuItem value={'milli'}>Milleseconds</MenuItem>
            </Select>
        </Grid>


        
        <Grid item xs={12} md={6}>
            <InputLabel required id="dataLogo" name="dataLogo" color="primary" variant="standard">Dataset Logo</InputLabel>
        </Grid>
        <Grid item xs={12} md={6}>
          {/*<Button variant="text" component="label" fullWidth>*/}
            <input id='logoUpload' type='file' accept={accepted_imageypes} onChange={handleImageEvent} disabled={logoLimit} />
          {/*</Button>*/}
        </Grid>

        <Grid item xs={12} md={12}>
          {uploadedImages.map(file => (
            <Div key={file.name}>
              {file.name}
            </Div>
          ))}
        </Grid>

        <Grid item xs={12} md={6}>
          <InputLabel required id="dataFiles" name="dataFiles" variant="standard">Data Files</InputLabel>
        </Grid>
        <Grid item xs={12} md={6}>
          {/*<Button variant="text" component="label" fullWidth>*/}
            <input id='fileUpload' type='file' multiple accept={accepted_filetypes} onChange={handleFileEvent} disabled={validUpload && validMetadata} />
          {/*</Button>*/}
        </Grid>

        <Grid item xs={12} md={12}>

          {uploadedFiles.map(file => (
            <Div key={file.name}>
              {file.name}
            </Div>
          ))}

        </Grid>
        
        
      </Grid>
      {((validUpload && validMetadata && logoLimit) ? <DatasetReview handleInternalChange_upload={handleInternalChange_upload} imagefile={URL.createObjectURL(uploadedImages[0])} metadata={metadata} dataName={dataName} hasTime={hasTime} rowData={rowData} spatial={spatial}/> : <></> )}

    </React.Fragment>
  );
}