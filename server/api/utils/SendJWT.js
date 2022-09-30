const sendJWT = (user, statusCode, res, status) => {
  const token = user.jwtSign();

  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + 5 * 1000), // 5 seconds
    secure: true,
    sameSite: "none",
  };
  res.status(statusCode).cookie("token", token, options).json({
    status,
    user: user,
    token,
  });
};

export default sendJWT;
