const cookieToken = async (user, res) => {
  const token = user.createJWT();

  user.refreshToken = token;
  await user.save();

  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_TIME * 60 * 60 * 1000),
    httpOnly: true,
  };

  user.password = undefined;
  res
    .status(201)
    .cookie("token", user.refreshToken, options)
    .json({ user, success: true, token });
};

export default cookieToken;
