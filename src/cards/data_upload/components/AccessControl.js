import * as React from 'react';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import GroupAdd from '@mui/icons-material/GroupAdd';
import GroupRemove from '@mui/icons-material/GroupRemove';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { Info } from '@mui/icons-material';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const accessLevelsDefault = {"VMetadata": false, "Visualization": false, "Download": false, "Upload": false, "EMetadata": false};
const accessLevelsList = ["VMetadata", "Visualization", "Download", "Upload", "EMetadata"];
const accesibilityOptions = [{"key":"VMetadata", "name":"View Metadata", "desc": "Allows users' to view dataset's metadata."},
                             {"key":"Visualization", "name":"Visualization", "desc": "Allows visualization over dataset."},
                             {"key":"Download", "name":"Download", "desc": "Allow download of dataset files."},
                             {"key":"Upload", "name":"Upload Data", "desc": "Allows upload of new version of the dataset."},
                             {"key":"EMetadata", "name":"Edit Metadata", "desc": "Allows users' to update dataset's metadata."}]
          
// HANDLES TOOLTIP
function MyToolTip({id}) {

  const NoMaxWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip key={"net"+id} {...props} classes={{ popper: className }} />
    ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 'none',
    },
  });


  return (
    <>
      <NoMaxWidthTooltip key={"net"+id} title={
        <React.Fragment key={"rf"+id}>
          <Typography key={"typo"+id} color="inherit">Accessibility</Typography>
          {accesibilityOptions.map((x, i) => {
            return(<React.Fragment key={ x["key"]+i+"-"+id }>
                      <Typography key={ x["key"]+i+"-"+id } variant="string"><b>{x["name"]}</b>: {x["desc"]}</Typography><br/>
                   </React.Fragment>);
          })}
        </React.Fragment>
      }>
        
        <Info key={"in"+id}/>
      </NoMaxWidthTooltip>
    </>
  );
}



// ACTUAL HANDLING OF THE ACCESS CONTROL TAB
export default function AccessControl({handleInternalChange_AC}) {

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const [groupsList, setGroupsList] = React.useState([]);
  const [accessNum, setAccessNum] = React.useState(0);

  const [dialogVals, setDialogVals] = useState(accessLevelsDefault);

  // HANDLES THE DROPDOWN OF VARIOUS  ACCESSIBILITY LEVELS
  function AccessibilityOptions({ op1, op2, op3, op4, op5, groups, group_item, indx}) {

    var optionsList = [op1, op2, op3, op4, op5];


    const handleAccessibilityChange = (event) => {

      //console.log(event.target);
      console.log("CHANGED ACCESSIBILITY", group_item)
      if (event.target.type === "checkbox"){
        var clickedOption = event.target.value;
        //console.log("CC", clickedOption, group_item[clickedOption]);
        if (group_item[clickedOption] === null)
          group_item[clickedOption] = true;
        else
          group_item[clickedOption] = !(group_item[clickedOption]);
      }
      
      setGroupsList(prevGroups => ([...groups]));
      handleInternalChange_AC(groupsList);

    };

    return (
      <>
        <Grid item xs={12} md={5}>
          <FormGroup onChange={handleAccessibilityChange}>
          {accesibilityOptions.map((x, i) => {
            return(
              <FormControlLabel key={x["key"]} control={<Checkbox checked={optionsList[i]} value={x["key"]} />} label={x["name"]} />
            );
          })}

            
          </FormGroup>
        </Grid>
      </>
    );
  }


  // HANDLES THE DROPDOWN OF VARIOUS  ACCESSIBILITY LEVELS
  function AccessibilityOptionsDialog({ dialogVals }) {

    //var optionsList = [op1, op2, op3, op4, op5];

    return (
      <>
        <Grid item xs={12} md={5}>
          <FormGroup>
          {accesibilityOptions.map((x, i) => {
            return(
              <FormControlLabel key={x["key"]} control={<Checkbox checked={dialogVals[i]} value={x["key"]} />} label={x["name"]} />
            );
          })}

            
          </FormGroup>
        </Grid>
      </>
    );
  }


  const handleDialogOpen = (num) => {
    console.log("YOU PRESSED", num);
    setDialogOpen(true);
  };

  // CLOSING DIALOG WITHOUT ADDING
  const handleDialogClose = () => {
    setDialogVals(accessLevelsDefault);
    setDialogOpen(false);
  };

  const handleDialogChange = (event) => {
    if ("dgroup_name" === event.target.id) {
      dialogVals['groupName'] = event.target.value
    } else if (event.target.type === "checkbox"){
      var optname = event.target.value;
      if (dialogVals[optname] === null)
        dialogVals[optname] = true;
      else
        dialogVals[optname] = !(dialogVals[optname]);
    }

  };

  // CLICKING ON ADD GROUP
  const handleDialogAdd = (event) => {
    setDialogOpen(false);
    setGroupsList([...groupsList, dialogVals]);
    setDialogVals(accessLevelsDefault);

  };

  

  const initial_select_members_info = [{ groupName: "MYGROUP", "VMetadata": true, "Visualization": true, "Download": true, "Upload": true, "EMetadata": true}, 
                               { groupName: "ab", "VMetadata": true}, 
                               { groupName: "ac", "VMetadata": true}];
  const initial_groups_info = [{ groupName: "MYGROUP", "VMetadata": true, "Visualization": true, "Download": true, "Upload": true, "EMetadata": true}];
  const public_groups_info = [{ groupName: "PUBLIC", "VMetadata": true, "Visualization": true, "Download": true, "Upload": false, "EMetadata": false}];
  const private_groups_info = [{ groupName: "PRIVATE", "VMetadata": true, "Visualization": true, "Download": true, "Upload": true, "EMetadata": true}];


  const handleChange = (event) => {
    console.log("FFF",event);
    setAccessNum(event.target.value);
    if (event.target.value === 4)
      setGroupsList([...public_groups_info]);
    else if (event.target.value === 3)
      setGroupsList([...initial_select_members_info]);
    else if (event.target.value === 2)
      setGroupsList([...initial_groups_info]);
    else
      setGroupsList([...private_groups_info]);
    
      handleInternalChange_AC(groupsList);
  };

  const handleSaveState = (event) => {
    handleInternalChange_AC(groupsList);
  };

  const handleRemoveElementOnClick = (num) => {
    groupsList.splice(num, 1);
    setGroupsList([...groupsList]);
    console.log(num);
  }

  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Access Information
      </Typography>
      <Grid container spacing={3}>

        <Grid item xs={12} md={12}>
          <FormControl fullWidth required>
            <InputLabel id="demo-simple-select-label">Access Level</InputLabel>
            <Select labelId="demo-simple-select-label" id="groupLevel" value={accessNum} label="groupLevel" onChange={handleChange}>
              <MenuItem value={1}>Owner Only</MenuItem>
              <MenuItem value={3}>Select Members</MenuItem>
              <MenuItem value={4}>All Members</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {groupsList.map((x, i) => {
          //console.log(">>",x, x[""+accessLevelsList[0]])
          //console.log(">> REGENERATING!!")
          // FINAL GROUP WITH THE REMOVE AND ADD BUTTON
          if (groupsList.length === 1) {
            if (accessNum === 1 || accessNum === 4) {
              return (

                <React.Fragment key={i}>
                  <Grid item xs={12} md={2}>
                    <Button variant="text">{x.groupName}</Button>
                  </Grid>
                  <AccessibilityOptions op1={x[accessLevelsList[0]]} op2={x[accessLevelsList[1]]} op3={x[accessLevelsList[2]]} 
                  op4={x[accessLevelsList[3]]} op5={x[accessLevelsList[4]]} groups={groupsList} group_item={groupsList[i]} indx={i}/>
                  <Grid item xs={12} md={1}>
                    <MyToolTip id={i}/>
                  </Grid>
                  
                </React.Fragment>
              );
            } else {
              return (

                <React.Fragment key={i}>
                  <Grid item xs={12} md={2}>
                    <Button variant="text">{x.groupName}</Button>
                  </Grid>
                  <AccessibilityOptions op1={x[accessLevelsList[0]]} op2={x[accessLevelsList[1]]} op3={x[accessLevelsList[2]]} 
                  op4={x[accessLevelsList[3]]} op5={x[accessLevelsList[4]]} groups={groupsList} group_item={groupsList[i]} indx={i}/>
                  <Grid item xs={12} md={1}>
                    <MyToolTip id={i}/>
                  </Grid>
                  
                  <Grid item xs={12} md={3}>
                    <Button variant="contained" key={i} value={i} onClick={() => handleDialogOpen(i)}><GroupAdd /></Button>
                  </Grid>
                </React.Fragment>
              );
            }
          } else {
            if (i === groupsList.length - 1) {
              return (

                <React.Fragment key={i}>
                  <Grid item xs={12} md={2}>
                    <Button variant="text">{x.groupName}</Button>
                  </Grid>
                  <AccessibilityOptions op1={x[accessLevelsList[0]]} op2={x[accessLevelsList[1]]} op3={x[accessLevelsList[2]]} 
                  op4={x[accessLevelsList[3]]} op5={x[accessLevelsList[4]]} groups={groupsList} group_item={groupsList[i]} indx={i}/>
                  <Grid item xs={12} md={1}>
                    <MyToolTip id={i}/>
                  </Grid>
                  <Grid item xs={12} md={1}>
                    <Button variant="outlined" key={i} value={i} color="error" onClick={() => handleRemoveElementOnClick(i)}><GroupRemove /></Button>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Button variant="contained" key={i} value={i} onClick={() => handleDialogOpen(i)}><GroupAdd /></Button>
                  </Grid>
                </React.Fragment>
              );
            } else {
              // ALL OTHER GROUPS WITH JUST THE REMOVE BUTTON
              console.log("EE",x);
              return (

                <React.Fragment key={i}>
                  <Grid item xs={12} md={2}>
                    <Button variant="text">{x.groupName}</Button>
                  </Grid>
                  <AccessibilityOptions key={i} op1={x[accessLevelsList[0]]} op2={x[accessLevelsList[1]]} op3={x[accessLevelsList[2]]}
                    op4={x[accessLevelsList[3]]} op5={x[accessLevelsList[4]]} groups={groupsList} group_item={groupsList[i]} indx={i}/>
                  <Grid item xs={12} md={1}>
                    <MyToolTip id={i}/>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Button variant="outlined" key={i} value={i} color="error" onClick={() => handleRemoveElementOnClick(i)}><GroupRemove /></Button>
                  </Grid>
                </React.Fragment>
              );

            }
          }
        })}
      </Grid>


      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Grant Group Access</DialogTitle>
        <DialogContent onChange={handleDialogChange}>
          <DialogContentText>
            Enter the name of the group you want to grant permission(s).
          </DialogContentText>


          <Grid item xs={12} md={6}>
            <TextField required margin="dense" id="dgroup_name" label="Group Name" type="dgroup_name" />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputLabel id="dialogSelectAccessLevel">Access Level&nbsp;
              <MyToolTip id={"dialogue"}/>
            </InputLabel>

            <AccessibilityOptionsDialog dialogVals={dialogVals}/>

          </Grid>


        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleDialogAdd}>Add</Button>
        </DialogActions>
      </Dialog>





      <Grid item xs={12}>
        <FormControlLabel control={<Checkbox color="secondary" name="saveAddress" value="yes" />} label="Some form of checkbox" />
      </Grid>
    </React.Fragment>
  );
}