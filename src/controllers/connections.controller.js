import { Connection } from "../models/connections.model.js";
import asynchandler from "../middlewares/asynchandler.middleware";
import APIError from "../utils/apiError.js";
import { validateId } from "../utils/validations/mongooseid.validation.js";
import APIResponse from "../utils/apiResponse.js";

// Add Follower
// Example Scenario:
// User A (authenticated user) wants to follow User B.
// User B’s followers list will be updated to include User A, and User B’s followers count increases by one.

const addFollower = asynchandler(async (req, res) => {
  const _id = req.users._id; // The user who is following
  const { follower_id } = req.query; // The user to be followed
  const isValid = await validateId(follower_id);
  if (!isValid) throw new APIError("Invalid user ID", 400);

  const userConnections = await Connection.findOne({ relatedto: follower_id });
  if (!userConnections) {
    // If no connections exist for the user, create a new one
    await Connection.create({ followers: [_id], relatedto: follower_id });
  } else {
    // If already following, throw an error
    if (userConnections.followers.includes(_id)) {
      throw new APIError("Already following", 400);
    }
    // Add the follower
    await Connection.findByIdAndUpdate(userConnections._id, {
      $push: { followers: _id },
    });
  }

  res.status(200).json(new APIResponse(200, "Follower added successfully"));
});

// Remove Follower
// Example Scenario:
// User A (authenticated user) wants to unfollow User B.
// User B’s followers list will be updated to remove User A, and User B’s followers count decreases by one.
const removeFollower = asynchandler(async (req, res) => {
  const _id = req.users._id; // The user who is unfollowing
  const { follower_id } = req.query; // The user to be unfollowed
  const isValid = await validateId(follower_id);
  if (!isValid) throw new APIError("Invalid user ID", 400);

  const userConnections = await Connection.findOne({ relatedto: follower_id });
  if (!userConnections || !userConnections.followers.includes(_id)) {
    throw new APIError("Not following this user", 400);
  }

  // Remove the follower
  await Connection.findByIdAndUpdate(userConnections._id, {
    $pull: { followers: _id },
  });

  res.status(200).json(new APIResponse(200, "Follower removed successfully"));
});

// Add Following
// Example Scenario:
// User A (authenticated user) wants to follow User B.
// User A’s "following" list will be updated to include User B, and User A’s "following" count increases by one.
const addFollowing = asynchandler(async (req, res) => {
  const _id = req.users._id; // The user who is following
  const { following_id } = req.query; // The user to follow
  const isValid = await validateId(following_id);
  if (!isValid) throw new APIError("Invalid user ID", 400);

  const userConnections = await Connection.findOne({ relatedto: _id });
  if (!userConnections) {
    // If no connections exist, create a new entry
    await Connection.create({ following: [following_id], relatedto: _id });
  } else {
    // Check if already following
    if (userConnections.following.includes(following_id)) {
      throw new APIError("Already following", 400);
    }
    // Add the following
    await Connection.findByIdAndUpdate(userConnections._id, {
      $push: { following: following_id },
    });
  }

  res.status(200).json(new APIResponse(200, "Following added successfully"));
});

// Remove Following
// Example Scenario:
// User A (authenticated user) wants to stop following User B.
// User A’s "following" list will be updated to remove User B, and User A’s "following" count decreases by one.
const removeFollowing = asynchandler(async (req, res) => {
  const _id = req.users._id; // The user who is unfollowing
  const { following_id } = req.query; // The user to unfollow
  const isValid = await validateId(following_id);
  if (!isValid) throw new APIError("Invalid user ID", 400);

  const userConnections = await Connection.findOne({ relatedto: _id });
  if (!userConnections || !userConnections.following.includes(following_id)) {
    throw new APIError("Not following this user", 400);
  }

  // Remove the following
  await Connection.findByIdAndUpdate(userConnections._id, {
    $pull: { following: following_id },
  });

  res.status(200).json(new APIResponse(200, "Following removed successfully"));
});

// Get Followers of a User
const getFollowers = asynchandler(async (req, res) => {
  const { user_id } = req.query;

  const isValid = await validateId(user_id);
  if (!isValid) throw new APIError("Invalid user ID", 400);

  const userConnections = await Connection.findOne({
    relatedto: user_id,
  });

  if (!userConnections || userConnections.followers.length === 0) {
    return res.status(200).json(new APIResponse(200, "No followers found", []));
  }

  res
    .status(200)
    .json(
      new APIResponse(
        200,
        "Followers retrieved successfully",
        userConnections.followers
      )
    );
});

// Get Following of a User
const getFollowing = asynchandler(async (req, res) => {
  const { user_id } = req.query;

  const isValid = await validateId(user_id);
  if (!isValid) throw new APIError("Invalid user ID", 400);

  const userConnections = await Connection.findOne({
    relatedto: user_id,
  });

  if (!userConnections || userConnections.following.length === 0) {
    return res.status(200).json(new APIResponse(200, "No following found", []));
  }

  res
    .status(200)
    .json(
      new APIResponse(
        200,
        "Following retrieved successfully",
        userConnections.following
      )
    );
});

export {
  addFollower,
  addFollowing,
  removeFollower,
  removeFollowing,
  getFollowers,
  getFollowing,
};
