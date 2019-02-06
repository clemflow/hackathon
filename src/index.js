const express = require('express');
const app = express();

let GithubWebHook = require('express-github-webhook');
let webhookHandler = GithubWebHook({ path: '/', secret: 'azerty' });
let bodyParser = require('body-parser');
let _ = require('lodash');
let splitter = require("./splitManager.js");

const axios = require('axios');


app.use(bodyParser.json());
app.use(webhookHandler);

webhookHandler.on('push', function (repo, data) {
    //console.log(data);
    //console.log(data.head_commit);
    //console.log(data.head_commit.modified);
    //console.log(data.head_commit.committer.name);
    let allTrigeeredFile = _.concat(data.head_commit.modified, data.head_commit.added);
    console.log(allTrigeeredFile);

    console.log("push triggered !!");
    let codeToSave = [];
    let config = {
        headers: {
            accept:  'application/vnd.github.VERSION.raw',
        }
    };

    allTrigeeredFile.forEach( async function(filePath) {
        console.log("check for file: " + filePath);
        await axios.get('https://api.github.com/repos/'+ data.repository.full_name +'/contents/' + filePath, config)
            .then(response => {
                //console.log(response.data);
                console.log(data.head_commit.committer.name);
                splitter.getFromBetween.get(response.data, "<$","$>");
                codeToSave = _.concat(codeToSave, response.data.split(/[<$$>]/));
//                console.log(codeToSave);

            })
            .catch(error => {
                console.log(error);
            });
    });
    console.log(codeToSave);

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
