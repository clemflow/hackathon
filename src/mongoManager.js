let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/hackathon";

// <$
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    console.log("Database created!");

    var dbo = db.db("DockerCI");
    dbo.createCollection("Users", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
    });
    db.close();
});

// $>
