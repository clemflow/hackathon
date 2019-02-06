const express = require('express');
const app = express();

let GithubWebHook = require('express-github-webhook');
let webhookHandler = GithubWebHook({ path: '/', secret: 'azerty' });
let bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(webhookHandler);

webhookHandler.on('push', function (repo, data) {
    //console.log(data);
    console.log("push triggered !!");
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
