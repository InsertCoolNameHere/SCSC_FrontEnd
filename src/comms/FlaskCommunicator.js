import React, { useState } from "react";
import axios from "axios";
/*const body = {
    'method': 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "Hi": "hello" })
}

const flaskIp = process.env.FLASK_SERVER_IP;
const flaskPort = process.env.FLASK_SERVER_PORT;
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


const FlaskCommnicator = async (files, metadata, setRsp) => {

    const flaskIp = process.env.REACT_APP_FLASK_SERVER_IP;
    const flaskPort = process.env.REACT_APP_FLASK_SERVER_PORT;
    const url = `https://${flaskIp}:${flaskPort}/`;

    const data = new FormData();

    //console.log("URL:", url);
    data.append("metadata", JSON.stringify(metadata));
    for (let i = 0; i < files.length; i++) {
        data.append("filez", files[i], files[i].name);
    }

    try {
        const endpoint = url + 'upload';
        //console.log("ENDPOINT:", endpoint);
        const response = await axios.post(
            endpoint,
            data,
            //JSON.stringify(metadata)
        );
        const body = response.data;
        console.log(body);
        
        if (response.status === 200) {
            console.log("FILE WAS RECEIVED BY FLASK SUCCESSFULLY");
            setRsp(body)
            return body;
        }
    } catch (error) {
        console.error(error);
        
    }
};

export default FlaskCommnicator;