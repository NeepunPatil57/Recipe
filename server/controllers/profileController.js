const User = require("../models/user");
const getProfile = async (req, res) => {
  const id = req.user.userId;
  try {
    const userProfile = await User.findById(id);

    if (!userProfile) {
      return res.status(404).json({ error: "User profile not found" });
    }

    res.json(userProfile);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



const updateProfile = async (req, res) => {
  const { username, email, bio, pfp } = req.body;
  const id = req.user.userId;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.username = username;
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }
      user.email = email;
    }
    user.bio = bio;
    user.pfp = pfp;
    await user.save();
    res.status(200).json({ message: "Profile Updated successfully" });
    res.json(user);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteProfile = async (req, res) => {
  const id = req.user.userId;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "Profile Deleted successfully" });
  } catch (error) {
    console.error("Error deleting user profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getProfile, updateProfile, deleteProfile};