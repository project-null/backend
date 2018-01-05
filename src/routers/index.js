const usersController = require('../controllers/users');
const favoritesFolderController = require('../controllers/favoritesFolder');

module.exports = (app) => {
    app.use(usersController.routes());
    app.use(favoritesFolderController.routes());
};