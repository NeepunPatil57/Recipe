const { register,login,me,logout} = require("../controllers/userController");
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Post = require("../models/post");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const mongoose = require('mongoose');
const multer  = require('multer');
const JWT_SECRET = 'abcd';


//user routes
router.post("/register", register);
router.post("/login", login);
router.get("/logout", auth, logout);
router.get("/me", auth, me);


router.get("/save-recipe/:id",auth,async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const user=await User.findById(req.user.userId);
    console.log(user);
    if(user.saved.includes(id)){
      return res.status(201).json({message:"Recipe already saved"});
    }
    user.saved.push(id);
    await user.save();
    res.status(200).json({message:"Recipe saved successfully"});
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  };
});

module.exports = router;
