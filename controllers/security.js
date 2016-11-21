// authorization controller

// store these in the database
var apiKey = "112233";

var validate = function (key) {
    if (key == apiKey) {
        return true;
    }
    return false;
}


exports.authorization = function(req, res, next) {
    console.log("In authorization");

    var appKeyParam = req.headers.apikey;

    console.log("appKeyParam value is:  " +appKeyParam);

    // get authorization inbound header info
    if (appKeyParam != null) {
        if (validate(appKeyParam)) {
            next();
            return;
        }
     }
    // if we fail, we call next route
     next('route');

    res.status(401);
    res.type('applicatin/json');
    res.json( {success:false, msg:"Not Authorized"});
    return;
};