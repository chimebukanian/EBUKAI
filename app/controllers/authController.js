const userModel = require("../models/userModel");
const errorResponse = require("../utils/errorResponse");

// JWT TOKEN
const sendToken = (user, statusCode, res, message, customResponse = {}) => {
  const { accessToken, refreshToken } = user.getSignedToken(res); // Get both tokens
  res.status(statusCode).json({
    message,
    success: true,
    accessToken,
    refreshToken, // Include refreshToken in the response
    ...customResponse, // Include any additional custom response data
  });
};



// LOGIN
exports.loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return next(
        new errorResponse(
          "Please provide an email and password.",
          res,
          false,
          400
        )
      );
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return next(
        new errorResponse("Invalid credentials. User not found.", res, false, 401)
      );
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return next(
        new errorResponse("Invalid credentials. Password incorrect.", res, false, 401)
      );
    }

    // AI Response with Welcome Message
    const aiMessage = `
      Welcome, ${user.username}! `

    // Send response with tokens and AI message
    sendToken(user, 200, res, "User logged in successfully", { aiMessage });
  } catch (error) {
    console.error(error);
    return next(
      new errorResponse(error, res, false, 500)
    );
  }
};


//REGISTER
exports.registerController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return next(new errorResponse("All fields are required", res, false, 400));
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return next(new errorResponse("Email is already registered", res, false, 409));
    }

    const user = await userModel.create({ username, email, password });

    sendToken(user, 201, res, "User signed up successfully");
  } catch (error) {
    console.error(error);
    next(new errorResponse("Registration failed, please try again", res, false, 500));
  }
};


exports.tokenController = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  try {
    const decoded = JWT.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);

    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = JWT.sign(
      { id: user._id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: process.env.JWT_ACCESS_EXPIREIN }
    );

    res.json({ success: true, accessToken: newAccessToken });
  } catch (error) {
    console.error(error);
    res.status(403).json({ message: "Refresh token validation failed" });
  }
};


//LOGOUT
exports.logoutController = async (req, res) => {
    res.clearCookie("refreshToken");
  return res.status(200).json({
    success: true,
    message: "Logout Succesfully",
  });
};
