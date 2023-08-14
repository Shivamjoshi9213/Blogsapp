import userModel from "../models/userModels.js";
import bcrypt from "bcrypt";

// get all user

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    if (users) {
      return res.status(200).send({
        userCount: users.length,
        message: "all users data",
        success: true,
        users,
      });
    } else {
      return res.status(500).send({
        message: " user not found",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while fetching all user",
      success: false,
      error,
    });
  }
};

// register user

export const registerController = async (req, res) => {
  try {
    const { password, username, email } = req.body;
    // validation
    if (!username || !email || !password) {
      return res.status(400).send({
        message: "Please fill all details",
        success: false,
      });
    }
    // existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(401).send({
        message: "user alreay exists",
        success: false,
      });
    }
    // hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save new user
    const user = new userModel({ username, email, password: hashedPassword });
    await user.save();
    return res.status(201).send({
      message: "New user created",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while register user",
      success: false,
      error,
    });
  }
};
// login user

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(401).send({
        message: "Email and password is required",
        success: false,
      });
    }
    // check register user or not
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).send({
        message: "email is not registerd ",
        success: false,
      });
    }
    // password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        message: "Invalid username or password  ",
        success: false,
      });
    }
    return res.status(200).send({
      message: "Login successfully  ",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while login user",
      success: false,
      error,
    });
  }
};
