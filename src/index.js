const express = require('express');
const app = express();

let GithubWebHook = require('express-github-webhook');
let webhookHandler = GithubWebHook({ path: '/', secret: 'azerty' });
let bodyParser = require('body-parser');
let base64 = require('js-base64').Base64;

const axios = require('axios');


app.use(bodyParser.json());
app.use(webhookHandler);

webhookHandler.on('push', function (repo, data) {
    //console.log(data);
    //console.log(data.head_commit);
    //console.log(data.head_commit.modified);
    console.log("push triggered !!");

    axios.get('https://api.github.com/repos/clemflow/hackathon/contents/src/index.js')
        .then(response => {
            console.log(response.data);
            //console.log(response.data.explanation);
            var contents = base64.decode(response.content);

        })
        .catch(error => {
            console.log(error);
        });

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
