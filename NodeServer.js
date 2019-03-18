const express = require('express');
const app = express();
const port = 3000;

const https = require('https');

app.get('/', function (req, res) {

    requestData();
    res.send('<b>My</b> first express http server');
});

app.use(function (req, res, next) { res.status(404).send("Sorry,that route doesn't exist. Have a nice day :)") });

app.listen(port, () => console.log('Listening on port ' + port));

function requestData() {
    https.get('https://www.googleapis.com/blogger/v3/blogs/blogID?key=API_Key', (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log(JSON.parse(data));
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}