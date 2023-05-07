/*
Title: Uptime Monitor
Description: This app check link is up or down.
Author: Md. Zahid Hossain (AZ Web Care)
Date: 03/05/2023
*/


//Dependencies

const http = require('http');
const { handleReqRes } = require('./helpers/handleReqRes');
const environment = require('./helpers/environments');

//App object - Module Scaffolding

const app = {};


//Create Server
app.createServer = () => {

    const server =  http.createServer(app.handleRequest);

    server.listen(environment.port, environment.host, () => {
        console.log(`Server running at http://${environment.host}:${environment.port}`);
    })
}

app.handleRequest = handleReqRes;


app.createServer();