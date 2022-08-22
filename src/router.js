import * as userController from './modules/users/user.controller.js';

import * as errorController from './modules/errors/error.controller.js';

export default (route) => {
  // User Routes
  route.get('/users', userController.indexUsers);
  route.get('/users/:userId', userController.findUserById);
  route.post('/users/email', userController.findUserByEmail);
  route.post('/users/register', userController.registerUser);
  route.put('/users/verify', userController.verifyUser);
  route.put('/users/update/email', userController.updateUserEmail);
  route.put('/users/update/password', userController.updateUserPassword);

  // Error Routes
  route.use(errorController.notFound);
  route.use(errorController.errorHandler);
};
