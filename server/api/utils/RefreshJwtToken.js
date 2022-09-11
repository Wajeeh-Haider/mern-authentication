const refreshJwtToken = async (
  user,
  statusCode,
  res,
  statusMessage,
  newToken
) => {
  const token = newToken;
  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000), // 60 seconds
    secure: true,
    sameSite: "none",
  };

  res.status(statusCode).cookie("token", token, options).json({
    statusMessage,
    user: user.userData,
  });
};

export default refreshJwtToken;
