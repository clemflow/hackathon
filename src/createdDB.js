let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/hackathon";

// <$ description="init mongo" tags="test;javascript;mongodb"

MongoClient.connect(url,  { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
});

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("hackathon");
    dbo.createCollection("codes", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
});

// $>
