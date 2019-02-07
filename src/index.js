const express = require('express');
const app = express();

let GithubWebHook = require('express-github-webhook');
let webhookHandler = GithubWebHook({ path: '/', secret: 'azerty' });
let bodyParser = require('body-parser');
let _ = require('lodash');
let splitter = require("./splitManager.js");
let mongoManager = require("./mongoManager.js");

const axios = require('axios');

app.use(bodyParser.json());
app.use(webhookHandler);

webhookHandler.on('push', async function (repo, data) {
    //console.log(data.head_commit.committer.name);
    let allTrigeredFile = _.concat(data.head_commit.modified, data.head_commit.added);
    console.log(allTrigeredFile);

    console.log("push triggered !!");
    let codeToSave = [];
    let config = {
        headers: {
            accept:  'application/vnd.github.VERSION.raw',
        }
    };
    let re = /(?:\.([^.]+))?$/;
    console.log("ext : " + re.exec(filePath)[1]);
    for (const filePath of allTrigeredFile) {
        let response = await axios.get('https://api.github.com/repos/'+ data.repository.full_name +'/contents/' + filePath, config);
        codeToSave = _.concat(codeToSave, [splitter.getFromBetween.get(response.data, "<$","$>"), re.exec(filePath)[1]]);
    }

    splitter.getTags(codeToSave, data.head_commit.committer.name, "test");
});

webhookHandler.on('*', function (event, repo, data) {
    // console.log("event on repo");
});

webhookHandler.on('error', function (err, req, res) {
    console.log(err)
});

app.get('/test', function(req, res) {
    res.send('hello world');
    let myobj = { tag: ['c#', 'mongo'], description: "some description.",
    author: "Jules Cesar", code: "function () { \n console.log('hello') \n}",
        type: "code", language: "js" };
    mongoManager.saveCode(myobj)
});

app.get('/all', async function(req, res) {
    let result = await mongoManager.findAll();
    res.send(result);
});

app.post('/add', async function(req, res) {
    console.log(req.body);
    let result = await mongoManager.saveCode(req.body);
    res.send("ok");
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
    mongoManager.createDB();
});

