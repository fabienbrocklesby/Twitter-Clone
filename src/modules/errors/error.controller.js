export const notFound = (request, response, next) => {
  response.status(404).json({
    error: {
      status: 404,
      name: 'notFound',
      message: 'Not Found',
    },
  });
  next();
};

export const errorHandler = (error, request, response, next) => {
  const codes = {
    badRequest: 400,
    notFound: 404,
    validationError: 400,
    ValidationError: 400,
    authError: 401,
  };
  const status = codes[error.name] || error.status || 500;

  if (process.env.NODE_ENV === 'development') { console.error(error); }

  response
    .status(status)
    .json({
      error: {
        status,
        name: error.name || 'error',
        message: error.message || 'error',
      },
    });
  next();
};
