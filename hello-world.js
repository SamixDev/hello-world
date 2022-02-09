const express = require('express');
require('dotenv').config()
const port = process.env.PORT || 2500;
const app = express();
const path = require('path');
const apiResponse = require("./Service/apiResponse");
const routes = require("./Service/routes");
const cors = require('cors');

//applying cors only on localhost
const allowedDomains = ['http://localhost:2500', 'http://localhost:3000', 'http://www.helloworld.social/', 'https://www.helloworld.social/'];
app.use(cors({
    origin: function (origin, callback) {
        // bypass the requests with no origin (like curl requests, mobile apps, etc )
        if (!origin) return callback(null, true);

        if (allowedDomains.indexOf(origin) === -1) {
            const msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

// routing APIs
app.use('/api', routes);

//serving webpage files
app.use(express.json());
app.use(express.static('Client/build'));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/Client/build/', 'index.html'), function (err) {
        if (err) {
            apiResponse.notFoundResponse(res, "404 Page not found")
        }
    });
});

// throw 404 if URL not found
app.all("*", function (req, res) {
    return apiResponse.notFoundResponse(res, "404 Page not found");
});

// start server listen and port number
app.listen(port, () => {
    console.log('Server started! At http://localhost:' + port);
});

// init Moralis server
const { initMoralis } = require("./Service/moralis_init");
initMoralis();