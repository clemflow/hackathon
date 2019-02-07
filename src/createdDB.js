let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/hackathon";

// <$ description="init mongo" tag="test;javascript;mongodb" $$
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



//  use hackathon;
//  db.codes.find().pretty()
