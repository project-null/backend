const usersController = require('../controllers/users');

module.exports = (app) => {
    app.use(usersController.routes());    
};