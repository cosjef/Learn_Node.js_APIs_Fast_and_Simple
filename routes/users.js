
module.exports = function(app) {
	var usersController = require('../controllers/users');


	// These are the routes for things
	app.get('/services/v1/users', usersController.findAll);
	app.get('/services/v1/users/:id', usersController.findById);
	app.get('/services/v1/users/nearme/:lon/:lat', usersController.findNearMe);
	// app.post('/services/v1/users', usersController.add);
	// app.put('/services/v1/users/:id', usersController.update);
	// app.delete('/services/v1/users/:id', usersController.delete);

	usersController.setDBConnectionsFromApp(app);
}