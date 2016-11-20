var dbConnection;
var ObjectID = require('mongodb').ObjectID;

exports.setDBConnectionsFromApp = function(app) {

  console.log("users controller setDBConnectionFromApp Started");
  dbConnection = app.get("dbConnection");
}

exports.findAll = function(req, res) {

 // console.log("things controller findAll Started");

  var collection = dbConnection.collection("users");
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
            newItem.emailAddress = item.emailAddress;
            newItem.cityState = item.cityState;
            newItem.lat = item.loc[1];
            newItem.lon = item.loc[0];


 
           itemList.push(newItem);
         }
         else {
            res.status(200);
            res.json({ items : itemList});
         }
      });
  });
}


exports.findById = function(req, res) {

  var collection = dbConnection.collection("users");

  // check for valid Object(ID)
  var objID;
  try {
    objID = ObjectID(req.params.id);
  } catch(e) {
    res.status(500);
    res.send({success:false, msg:"invalid object id"});
    return;
  }

  var items = collection.findOne({"_id": objID}, function(err, item) {
    res.type('application/json');

    if (item != null) {
        var newItem = {};
        newItem.id = item._id;
        newItem.name = item.name;
        newItem.emailAddress = item.emailAddress;
        newItem.cityState = item.cityState;
        newItem.lat = item.loc[1];
        newItem.lon = item.loc[0];
        res.status(200);
        res.json(newItem);
     }
     else {
        console.log('Item not found: ' + req.params.id);
        res.status(400);
        res.json({success:false, msg:"item not found"});
     }
  });
}


exports.findNearMe = function(req, res) {

  var lon = req.params.lon
  var lat = req.params.lat

  var collection = dbConnection.collection("users");
  var items = collection.find({"loc":{$near:[parseFloat(lon), parseFloat(lat)]}}, function(err, docsCursor) {
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
            newItem.emailAddress = item.emailAddress;
            newItem.cityState = item.cityState;
            newItem.lat = item.loc[1];
            newItem.lon = item.loc[0];


 
           itemList.push(newItem);
         }
         else {
            res.status(200);
            res.json({ items : itemList});
         }
      });
  });
}