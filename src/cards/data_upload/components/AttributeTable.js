import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';

import { FormControlLabel, Grid, MenuItem, Radio, Select, TextField } from '@mui/material';

import { Button } from '@mui/material';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import DataSummaryTable from './DataSummaryTable';

function EnhancedTableHead(props) {
    const { headCells, onSelectAllClick, order, orderBy, numSelected, rowCount } =
        props;


    return (
        <TableHead>
            <TableRow>

                {headCells.map((headCell) => (
                    <TableCell key={headCell.id} align='center' padding='normal' >

                        <b>{headCell.label}</b>

                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}



function EnhancedTableToolbar(props) {
    const { numSelected } = props;

    return (
        <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 }, ...(numSelected > 0 && { bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity), }), }}>

            <Typography sx={{ flex: '1 1 100%' }} variant="h5" id="tableTitle" component="div" >
                Attribute Metadata
            </Typography>

            <Tooltip title="Filter list">
                <IconButton>
                    <FilterListIcon />
                </IconButton>
            </Tooltip>

        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};


export default function EnhancedTable({ handleInternalChange_upload, rows, headCells, spatial, hasTime, rowData, metadata }) {

    //console.log("ROWS", rows);
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [alertMsg, setAlertMsg] = React.useState("");
    const [metadataState, setMetadataState ] = React.useState(metadata);

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertOpen(false);
    };


    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);

    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    // LAT RADIO SELECT HANDLING ================================================================================================================
    const [latField, setLatField] = React.useState(null);
    const amITheLatitude = (rowname) => {
        if (rowname === latField) {
            return true;
        }

        return false;
    };
    const onLatRadioClick = (event) => {
        if (event.target.value) {
            setLatField(event.target.value);
        }
    };

    // LON RADIO SELECT HANDLING ================================================================================================================
    const [lonField, setLonField] = React.useState(null);
    const amITheLongitude = (rowname) => {
        if (rowname === lonField) {
            return true;
        }

        return false;
    };
    const onLonRadioClick = (event) => {
        if (event.target.value) {
            setLonField(event.target.value);
        }
    };

    // FIPS RADIO SELECT HANDLING ================================================================================================================
    const [fipsField, setFipsField] = React.useState(null);
    const amITheFips = (rowname) => {
        if (rowname === fipsField) {
            return true;
        }

        return false;
    };
    const onFipsRadioClick = (event) => {
        if (event.target.value) {
            setFipsField(event.target.value);
        }
    };


    // TIMESTAMP RADIO SELECT HANDLING ================================================================================================================
    const [timeField, setTimeField] = React.useState(null);
    const amITheTime = (rowname) => {
        if (rowname === timeField) {
            return true;
        }

        return false;
    };
    const onTimeRadioClick = (event) => {
        if (event.target.value) {
            setTimeField(event.target.value);
        }
    };

    
    // KEEP TRACK OF UPDATES TO THE METADATA TABLE ****************************************************************************************************************
    const handleMetadataUpdate = (event) => {
        //console.log("D1",event.target.id, event.target.value);
        var tokens = event.target.id.split("$");
        var attribute_name = tokens[0];
        var column_name = tokens[1];
        var data_type = event.target.value;

        console.log(attribute_name, Object.keys(metadataState))
        if (column_name === 'latitude' || column_name === 'longitude' || column_name === 'temporal' ) {
            var allkeys = Object.keys(metadataState);
            for(var key_indx in allkeys) {
                var key = allkeys[key_indx];
                if (key != attribute_name) {
                    //console.log("CHECK", attribute_name, key);
                    if (metadataState[key][column_name]) {
                        metadataState[key][column_name] = false;
                    }
                }
            }
            metadataState[attribute_name][column_name] = true;
        } else
            metadataState[attribute_name][column_name] = data_type;

        setMetadataState(metadataState);

        //console.log("m1",metadataState);

        
        /*var this_page_info = formData[0];
    
        if (event.target.id === "doc" || event.target.id === "doc2") {
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



    const [showSummary, setShowSummary] = React.useState(false);
    const [summaryData, setSummaryData] = React.useState([]);

    // HANDLE 'VALIDATE DATA' BUTTON CLICK *********************************************************************************************************************
    const validateData = () => {
        var isValid = true;
        var errormsg = "";
        if ('latlon' === spatial) {
            if (latField === null || lonField === null) {
                errormsg += "Lat/Lon Field canot be null;";
                isValid = false;
            }
        } else {
            if (latField === null) {
                errormsg += "Spatial Field canot be null;";
                isValid = false;
            }
        }

        if (hasTime != 'none') {
            if (timeField === null) {
                errormsg += "Temporal Field canot be null;";
                isValid = false;
            }
        }

        if (isValid) {
            if (hasTime != 'none') {
                if (latField === lonField || latField === timeField || timeField === lonField) {
                    errormsg += "Selected Spatial / Temporal Fields must be distinct;";
                    isValid = false;
                }
            } else {
                if (latField === lonField) {
                    errormsg += "Selected Spatial Fields must be distinct;";
                    isValid = false;
                }
            }
        }

        if (!isValid) {
            console.log("ERROR!!! " + errormsg);
            setAlertOpen(true);
            setAlertMsg("ERROR!!! " + errormsg);
            return;
            
        }
        
        var summary_temp = [];
        summary_temp.push({'Count':rowData.length});
        var summary_attributewise = {}

        var metadata_keys = Object.keys(metadataState);
        console.log("CC", metadata_keys)

        for(var i = 0; i< metadata_keys.length; i++) {
            var summ = {'name':metadata_keys[i],'min':'N/A', 'max':'N/A'};
            summary_temp.push(summ);
        }

        
        var eror_msg = "";
        //console.log("FF",rowData);
        for (var i=1; i< rowData.length; i++) {
            var current_row = rowData[i];
            var tokens = current_row.split(',');
            //console.log("TOKENS", tokens);
            for (var j=0; j<tokens.length; j++) {
                
                var metadata_column = metadataState[metadata_keys[j]];
                
                if(metadata_column['type'] != 'string') {
                    var currval = tokens[j];
                    //console.log(currval);
                    var minval = summary_temp[j+1]['min'];
                    if(minval === 'N/A' || minval > currval) {
                        summary_temp[j+1]['min'] = currval;
                    }

                    var maxval = summary_temp[j+1]['max'];
                    if(minval === 'N/A' || maxval < currval) {
                        summary_temp[j+1]['max'] = currval;
                    }
                }
            }
            

        }
        
        console.log("SUMMARIES",summary_temp);

        var type_change_event = {"target": {"id": 'valsuccess', 'value': true}};
        handleInternalChange_upload(type_change_event);
        setShowSummary(true);
        setSummaryData(summary_temp);
    };


















    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            rows.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage],
    );

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2, border: 1 }}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size='small' >
                        <EnhancedTableHead headCells={headCells} numSelected={selected.length} order={order} orderBy={orderBy} rowCount={rows.length} />
                        <TableBody onChange={handleMetadataUpdate}>
                            {visibleRows.map((row, index) => {
                                const isItemSelected = isSelected(row.name);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.name)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.name}
                                        
                                        sx={{ cursor: 'pointer' }}
                                    >

                                        <TableCell align="center" sx={{ color: '#055089' }}>{row.name}</TableCell>
                                        
                                        <TableCell align="center">
                                            <Select labelId="demo-simple-select-label" id={row.name+'$type'} value={metadataState[row.name]['type']} onChange={(newValue) => {
                                                
                                                var type_change_event = {"target": {"id": row.name+'$type', 'value': newValue.target.value}};
                                                
                                                handleMetadataUpdate(type_change_event);
                                                //console.log("AA",event, value);
                                            }}>
                                                <MenuItem value={'string'}>String</MenuItem>
                                                <MenuItem value={'int'}>Integer</MenuItem>
                                                <MenuItem value={'float'}>Float</MenuItem>
                                            </Select>
                                        </TableCell>
                                        
                                        <TableCell align="center">
                                            <Grid align="center" item xs={12}>
                                                <TextField type="number" id={row.name+'$min'} label="N/A" variant="outlined" fullWidth>{row.min}</TextField>
                                            </Grid>
                                        </TableCell>
                                        {/*<TableCell align="center">{row.min}</TableCell>*/}
                                        <TableCell align="center">
                                            <Grid align="center" item xs={12}>
                                                <TextField type="number" id={row.name+'$max'} label="N/A" variant="outlined" fullWidth>{row.max}</TextField>
                                            </Grid>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Grid align="center" item xs={12}>
                                                <TextField type="string" id={row.name+'$nv'} label="N/A" variant="outlined" fullWidth>{row.missing}</TextField>
                                            </Grid>
                                        </TableCell>

                                        {(spatial != 'latlon') && (
                                            <TableCell align="center">
                                                <FormControlLabel id={row.name+'$fips'} value={row.name} control={<Radio checked={amITheFips(row.name)} />} label="" onChange={onFipsRadioClick} />
                                            </TableCell>

                                        )}

                                        {(spatial === 'latlon') && (
                                            <>
                                                <TableCell align="center">
                                                    <FormControlLabel value={row.name} control={<Radio id={row.name+'$latitude'} checked={amITheLatitude(row.name)} />} label="" onChange={onLatRadioClick} />
                                                </TableCell>
                                                <TableCell align="center">
                                                    <FormControlLabel value={row.name} control={<Radio id={row.name+'$longitude'} checked={amITheLongitude(row.name)} />} label="" onChange={onLonRadioClick} />
                                                </TableCell>
                                            </>
                                        )}

                                        {(hasTime != 'none') && (
                                            <TableCell align="center">
                                                <FormControlLabel value={row.name} control={<Radio id={row.name+'$temporal'} checked={amITheTime(row.name)} />} label="" onChange={onTimeRadioClick} />
                                            </TableCell>

                                        )}
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 33 * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

                <Grid item xs={12} md={12} align='center'>
                    <Button variant="outlined" endIcon={<PublishedWithChangesIcon />} onClick={validateData}>Validate Your Dataset</Button>
                </Grid>
                
                {(showSummary) && (
                    <>
                    <Grid item xs={12} md={12}>
                        <DataSummaryTable rows = {summaryData}/>
                    </Grid>
                </>
                )}

                <Snackbar open={alertOpen} autoHideDuration={3000} onClose={handleAlertClose}>
                    <Alert severity='warning' variant='filled'
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setAlertOpen(false);
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
            </Paper>

        </Box>
    );
}