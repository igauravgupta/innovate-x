import asynchandler from "../middlewares/asynchandler.middleware.js";
import { User } from "../models/user.model.js";
import { UserName } from "../models/userName.model.js";
import APIError from "../utils/apiError.js";
import APIResponse from "../utils/apiResponse.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import {
  userValidate,
  loginValidate,
} from "../utils/validations/user.validations.js";

const register = asynchandler(async (req, res) => {
  const { emailId, name, password, role } = req.body;

  const existedUser = await User.findOne({ emailId });

  if (existedUser) {
    throw new APIError("User Alraedy Exists", 502);
  }

  const { error, value } = await userValidate({
    emailId,
    name,
    password,
    role,
  });

  if (error) throw new APIError(error.message, 400);

  await User.create(value).then(async (obj) => {
    const user = await User.findById(obj._id);
    res.json(new APIResponse(201, "user Registered", user));
  });
});
const login = asynchandler(async (req, res, next) => {
  const { emailId, password } = req.body;

  const { value, error } = await loginValidate({ emailId, password });
  if (error) return next(new APIError(error.message, 400));

  const user = await User.findOne({ emailId });
  if (!user) return next(new APIError("Invalid emailId", 404));

  const isValid = await user.isPasswordCorrect(password);

  if (!isValid) return next(new APIError("Invalid password", 401));

  // Generate tokens
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  // Store the refresh token in the user document
  user.refreshToken = refreshToken;
  await user.save();

  // Respond with the access token
  res.status(200).json(new APIResponse(200, "Login successful", accessToken));
});

const updateUsername = asynchandler(async (req, res) => {
  const _id = req.users._id;
  const { username } = req.query;
  const exists = await UserName.findOne({ username });
  if (exists) throw new APIError("username already exists", 403);
  const usernameDetails = await UserName.findOne({ ownedBy: _id });
  if (usernameDetails) {
    await UserName.findByIdAndUpdate(_id, {
      username,
    });
  } else {
    await UserName.create({
      username,
      ownedBy: _id,
    });
  }
  res.status(201).json(new APIResponse(200, "userName is updated", username));
});

const getUsername = asynchandler(async (req, res) => {
  const _id = req.users._id;
  const usernameDetails = await UserName.findOne({ ownedBy: _id });
  if (!usernameDetails) throw new APIError("username is not updated", 400);
  res
    .status(201)
    .json(new APIResponse(200, "userName is updated", usernameDetails));
});

const updateUserDeatils = asynchandler(async (req, res) => {
  const { mobile, gender, about } = req.query;
  const _id = req.users._id;
  const uploadedImg = await uploadCloudinary(req.file.path);
  await User.findByIdAndUpdate(_id, {
    $set: {
      gender,
      about,
      profilePicture: uploadedImg.url,
    },
  });
  res.status(200).json(new APIResponse(200, "details Updated"));
});

const verification = asynchandler(async (req, res) => {
  // approach 1
  // send mail by nodemailer > html file > open > verified
  // approach 2
  // send otp by using otp services
});

const getUserDeatils = asynchandler(async (req, res) => {
  const _id = req.users._id;
  const user = await User.findById(_id);
  if (!user) {
    throw new APIError(400, "user not exists");
  }
  res.status(200).json(200, "user details", user);
});

const deleteUser = asynchandler(async (req, res) => {
  const _id = req.users._id;
  await User.findByIdAndUpdate(_id, { isDeleted: true });
  res.status(200).json(200, "user deleted temporary");
});

const deleteUserPermanent = asynchandler(async (req, res) => {
  const _id = req.users._id;
  await User.findByIdAndDelete(_id);
  res.status(200).json(200, "user deleted");
});

export {
  register,
  login,
  updateUsername,
  updateUserDeatils,
  verification,
  getUserDeatils,
  deleteUser,
  getUsername,
  deleteUserPermanent,
};
