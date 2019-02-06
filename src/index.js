const express = require('express');
const app = express();

let GithubWebHook = require('express-github-webhook');
let webhookHandler = GithubWebHook({ path: '/', secret: 'azerty' });
let bodyParser = require('body-parser');
let _ = require('lodash');

const axios = require('axios');


app.use(bodyParser.json());
app.use(webhookHandler);

webhookHandler.on('push', function (repo, data) {
    //console.log(data);
    //console.log(data.head_commit);
    //console.log(data.head_commit.modified);
    //console.log(data.head_commit.added);
    let allTrigeeredFile = _.concat(data.head_commit.modified, data.head_commit.added);
    console.log(allTrigeeredFile);

    console.log("push triggered !!");

    allTrigeeredFile.forEach( function(element) {
        console.log(element);
    });

    let config = {
        headers: {
            accept:  'application/vnd.github.VERSION.raw',
        }
    };

    // axios.get('https://api.github.com/repos/'+ data.repository.full_name +'/contents/src/index.js', config)
    //     .then(response => {
    //         console.log(response.data);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });

});

webhookHandler.on('*', function (event, repo, data) {
    // console.log("event on repo");
});

webhookHandler.on('error', function (err, req, res) {
    console.log(err)
});

app.get('/test', function(req, res) {
    res.send('hello world');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});


/*
*
* dedededede
*
* */
