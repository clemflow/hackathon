let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://mongodb:27017/hackathon";

module.exports = {
    createDB: function () {
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
    },

    saveCode: function(jsonObject) {
        MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
            if (err) throw err;
            let dbo = db.db("hackathon");

            dbo.collection("codes").insertOne(jsonObject, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
            });
        });
    },

    findCodeById: async function (pluginId) {
        const db = await MongoClient.connect(url, { useNewUrlParser: true });
        let dbo = db.db("codes");
        const res = await dbo.collection("plugins").findOne({ "id": parseInt(pluginId)});
        db.close();
        return  res;
    }
};
