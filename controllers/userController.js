import userModel from "../models/userModel.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userSignup = async (req, res) => {
  //Code is here
  try {
    const { firstName, email, password } = req.body;
    let existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ msg: "User Already Exists" });
    }

    //Create a new user
    const newUser = new userModel({
      firstName,
      email,
      password, //"password": "1234"
    });
    //hash the password for the new user in order to save to DB
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();
    //res.status(200).json(newUser);
    const payload = {
      id: newUser._id, //newUser.id is an ID of the new user
      name: newUser.firstName,
    };

    jwt.sign(
      payload,
      "randomString",
      {
        expiresIn: "1h",
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token,
        });
      },
    );
  } catch (error) {
    res.send(error);
  }
};
