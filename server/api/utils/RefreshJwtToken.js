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
    expires: new Date(Date.now() + 60 * 30 * 1000), // 30 minutes
    secure: true,
    sameSite: "none",
  };

  res.status(statusCode).cookie("token", token, options).json({
    status: statusMessage,
    user: user.userData,
  });
};

export default refreshJwtToken;
