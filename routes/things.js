
module.exports = function(app) {
	var thingsController = require('../controllers/things');


	// These are the routes
	app.get('/services/v1/things', thingsController.findAll);
	app.get('/services/v1/things/:id', thingsController.findById);
	app.post('/services/v1/things', thingsController.add);
	//app.put('/services/v1/things/:id', thingsController.update;
	//app.delete('/services/v1/things/:id', thingsController.delete);

	thingsController.setDBConnectionsFromApp(app);
}