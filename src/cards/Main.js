import React from 'react';
import Top_Menubar from './Top_Menubar';
import './wireframe.css';
import DataCard from './DataCard';
import SideBar from './SideBar'
import CreateNEditDatasetPane from './CreateNEditDatasetPane';


function Main() {
    /*const body = {
        'method': 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "Hi": "hello" })
    }

    const flaskIp = 'kiwis.cs.colostate.edu';
    const flaskPort = '5007';
    const url = `http://${flaskIp}:${flaskPort}/`;

    const endpoint = url + 'greet';
    
    useEffect(() => {
        // Using fetch to fetch the api from 
        // flask server it will be redirected to proxy
        fetch(endpoint, body).then((res) =>
            res.json().then((data) => {
                // Setting a data from api
                console.log(data);
            })
        );
    }, []);*/

    return (
        <>
            <Top_Menubar />

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" type="text/css" />
            <div class="py-2" />
            <div class="py-5">
                <div class="container">
                    <div class="row">
                        <div class="col-md-3 p-0">
                            <SideBar />
                        </div>
                        <div class="col-md-9">
                            <CreateNEditDatasetPane />
                            <div class="input-group mb-3 pt-2 pb-0">
                                <span class="input-group-text" id="basic-addon1"><i class="fa d-inline fa-search"></i></span>
                                <input type="email" name="datasrch" class="form-control" placeholder="Search Datasets" />
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
            </div>


        </>
    );
}
export default Main;