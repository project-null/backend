const usersController = require('../controllers/users');
const favoritesFolderController = require('../controllers/favoritesFolder');
const favoritesController = require('../controllers/favorites');

module.exports = (app) => {
    app.use(usersController.routes());
    app.use(favoritesFolderController.routes());
    app.use(favoritesController.routes());
};