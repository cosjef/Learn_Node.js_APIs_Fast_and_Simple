var dbConnection;
var ObjectID = require('mongodb').ObjectID;

exports.setDBConnectionsFromApp = function(app) {

  console.log("things controller setDBConnectionFromApp Started");
  dbConnection = app.get("dbConnection");
}

exports.findAll = function(req, res) {

 // console.log("things controller findAll Started");

  var collection = dbConnection.collection("Things");
  var items = collection.find({}, function(err, docsCursor) {
    res.type('application/json');
    if (err) {
      res.status(500);
      res.send({success:false, msg:"database error"});
      return;
    }

    var itemList = [];
    docsCursor.each(function(err, item) {
        if (item != null) {
            var newItem = {};
            newItem.id = item._id;
            newItem.name = item.name;
            newItem.location = item.location;
 
           itemList.push(newItem);
         }
         else {
            res.status(200);
            res.json({ items : itemList});
         }
      });
  });
}