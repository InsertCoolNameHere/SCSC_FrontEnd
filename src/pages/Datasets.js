import React from 'react';
import CreateNEditDatasetPane from '../cards/CreateNEditDatasetPane';
import DataCard from '../cards/DataCard';
import Box from '@mui/material/Box'
import { Typography } from '@mui/material';
import InfoCard from '../cards/InfoCard'
import '../index.css';

function Datasets() {
    return (
        <div>
                <h1>Datasets</h1>

                <div class="row">
                        <div class="col-md-3 p-0">
                                <div class="col md-2 p-3">
                                                <Box sx={{
                                                width: "95%",
                                                
                                                
                                                }}>
                                                <Typography sx={{ fontSize: 24, mb: 1.5 }} color="#0000b3" align="center">Top Datasets</Typography>
                                                
                                                <InfoCard ago="3" data_info="Sample data info1" uploader_name="Uploader X" user_score="9.9" />
                                                <InfoCard ago="1" data_info="Sample data info2" uploader_name="Uploader Y" user_score="7.9" />
                                                <InfoCard ago="11" data_info="Sample data info3" uploader_name="Uploader Z" user_score="4" />
                                                </Box>
                                </div>

                        </div>

                        
                        <div class="col-md-8">
                                <CreateNEditDatasetPane />
                                <div class="input-group mb-3 pt-2 pb-0">
                                <span class="input-group-text" id="basic-addon1"><i class="fa d-inline fa-search"></i></span>
                                <input type="email" name="datasrch" class="form-control" placeholder="Search datasets by name" />
                                </div>
                                <div class="row my-2 justify-content-center bg-light">
                                        <DataCard data_name="Dataset 1" uploader_name="Uploader 1" num_files="11" type_string="CSV" total_size="100 MB" img_path='globe.png' />
                                        <DataCard data_name="Dataset 2" uploader_name="Uploader 2" num_files="2" type_string="JSON" total_size="12 MB" img_path="car.png" />
                                        <DataCard data_name="Dataset 3" uploader_name="Uploader 3" num_files="2" type_string="CSV" total_size="112 MB" img_path="social-media.png" />
                                        <DataCard data_name="Dataset 4" uploader_name="Uploader 2" num_files="2" type_string="CSV" total_size="1.2 MB" img_path="atom.png" />
                                        <DataCard data_name="Dataset 5" uploader_name="Uploader 4" num_files="2" type_string="JSON" total_size="22 MB" img_path="signal-satellite.png" />
                                        <DataCard data_name="Dataset 6" uploader_name="Uploader 2" num_files="2" type_string="CSV" total_size="9 MB" img_path="biology.png" />
                                        <DataCard data_name="Dataset 7" uploader_name="Uploader 4" num_files="2" type_string="JSON" total_size="22 MB" img_path="car.png" />
                                        <DataCard data_name="Dataset 8" uploader_name="Uploader 2" num_files="2" type_string="CSV" total_size="9 MB" img_path="global-warming.png" />

                                </div>
                        </div>

                </div>


        </div>
        
    );
}

export default Datasets;
// import React from 'react';

// function Datasets() {
//     return (
//             <div>
//                 <div class="col-md-9">
//                 <h1>Home</h1>    
//                 </div>
//             </div>
//     );
// }

// export default Datasets;