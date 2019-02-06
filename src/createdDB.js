let MongoClient = require('mongodb').MongoClient;
let url = ;

// <$ description="tests exemple" tags="test;javascript;enjoy"
MongoClient.connect("mongodb://localhost:27017/", { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    console.log("Database created!");

    var dbo = db.db("hackathon");
    dbo.createCollection("codes", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
    });
    db.close();
});
// $>
