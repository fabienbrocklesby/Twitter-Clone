import * as userController from './modules/users/user.controller.js';
import authController from './modules/authentication/auth.controller.js';
import * as friendController from './modules/friends/friend.controller.js';

import authMiddleware from './middleware/auth.middleware.js';
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

  // Authentication Routes
  route.post('/auth', authController);

  // Friend Routes
  route.post('/friends/send', authMiddleware, friendController.sendRequest);
  route.get('/friends/requests', authMiddleware, friendController.getRequests);
  route.put('/friends/accept', authMiddleware, friendController.acceptRequest);

  // Error Routes
  route.use(errorController.notFound);
  route.use(errorController.errorHandler);
};
