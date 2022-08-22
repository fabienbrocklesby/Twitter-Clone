import * as errorController from './modules/errors/error.controller.js';

export default (route) => {
  // Error Routes
  route.use(errorController.notFound);
  route.use(errorController.errorHandler);
};
