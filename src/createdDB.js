// <$
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
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
