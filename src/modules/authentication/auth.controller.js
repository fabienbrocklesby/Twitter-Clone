import authService from './auth.service.js';

export default async (request, response, next) => {
  try {
    const token = await authService(request.body);
    if (token) {
      return response
        .cookie('access_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        })
        .status(200)
        .json({ message: 'Logged in successfully 😊👌' });
    }
  } catch (error) {
    next(error);
  }
};
