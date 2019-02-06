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
    let config = {
        headers: {
            accept:  'application/vnd.github.VERSION.raw',
        }
    };
    axios.get('https://api.github.com/repos/'+ data.repository.full_name +'/contents/src/index.js', config)
        .then(response => {
            //console.log(response.data.explanation);
            let contents = base64.decode(response.content);
            console.log(response.content);
            console.log(contents);
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
