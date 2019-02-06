let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/hackathon";


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


module.exports = {
    saveProcess: function(jsonObject) {
        MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
            if (err) throw err;
            let dbo = db.db("dockerci");

            dbo.collection("executions").insertOne(jsonObject, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
            });
        });
    },

    addExecution: function(jsonObject, obj) {
        MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
            if (err) throw err;
            let dbo = db.db("dockerci");
            let executionObj = { $push : { "executions":  jsonObject}  };

            dbo.collection("executions").updateOne( obj , executionObj, function(err, res) {
                if (err) throw err;
                console.log("execution save in db");
                db.close();
            });
        });
    },

    getRepoByOwnerAndProjectName: async function (jsonObject) {
        const db = await MongoClient.connect(url, { useNewUrlParser: true });
        let dbo = db.db("dockerci");
        const res = await dbo.collection("repos").findOne(jsonObject);
        console.log(res);
        db.close();
        return res;
    },

    findPluginById: async function (pluginId) {
        const db = await MongoClient.connect(url, { useNewUrlParser: true });
        let dbo = db.db("dockerci");
        const res = await dbo.collection("plugins").findOne({ "id": parseInt(pluginId)});
        db.close();
        return  res;
    }
};
