import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';

import { FormControlLabel, Grid, MenuItem, Radio, Select, TextField } from '@mui/material';

import { Button } from '@mui/material';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';


function EnhancedTableToolbar(props) {
    const { numSelected } = props;

    return (
        <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 }, ...(numSelected > 0 && { bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity), }), }}>

            <Typography sx={{ flex: '1 1 100%' }} variant="h5" id="tableTitle" component="div" >
                Dataset Summary
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


export default function DataSummaryTable({ rows }) {

    console.log("ROSE",rows);

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


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
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        
                                        tabIndex={-1}
                                        key={row.name+'_summary'}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        {(row.Count) && (<TableCell key={row.name+'$'+row.count} align="center" sx={{ color: '#055089' }}><Typography variant="h5"><b>Count: {row.Count}</b></Typography></TableCell>)}
                                        {(row.name) && (<TableCell key={row.name+'$'+row.name} align="center" sx={{ color: '#055089' }}>{row.name}</TableCell>)}
                                        {(row.min) && (<TableCell key={row.name+'$min'} align="left" ><b>Min:</b> {row.min}</TableCell>)}
                                        {(row.max) && (<TableCell key={row.name+'$max'} align="left" ><b>Max:</b> {row.max}</TableCell>)}
                                        
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
                    <Button variant="outlined" color="secondary" endIcon={<PublishedWithChangesIcon />} >Click 'Next' to Proceed</Button>
                    <Box sx={{ m: 2 }} />
                </Grid>

            </Paper>

        </Box>
    );
}