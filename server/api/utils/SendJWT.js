const sendJWT = (user, statusCode, res, status) => {
  const token = user.jwtSign();

  res.status(statusCode).json({
    status,
    user: user,
    token,
  });
};

export default sendJWT;
