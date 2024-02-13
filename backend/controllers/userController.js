import User from "../models/User.js";
import bcrypt from "bcryptjs";
import asyncHandler from "../middlewares/asyncHandler.js";
import createToken from "../utils/createToken.js";

const createUser = asyncHandler(async (req, res) => {
  // getting new user email and password from the post req
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new Error("Please fill all the fields");
  }

  //can't sign in (create user) with email that is already present in db, can login with that email tho
  const userExists = await User.findOne({ email });
  if (userExists) res.status(400).send("User already exists");

  // Hash the user password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // making the new user by the schema defined by default isadmin is false and we are passing the hashed password as the password (security measures)
  const newUser = new User({ username, email, password: hashedPassword });

  // storing the user in database
  try {
    await newUser.save();
    // creating the token for the user
    createToken(res, newUser._id);

    // showing a status message for successfully creating  a new user
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // finding username on the basis of email using mongoose findone query
  const existingUser = await User.findOne({ email });

  // if email is present in db, then we compare the password present in the db and the one provided by the user in req body
  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    // if password is correct we create a new jwt token and pass a confirmation status message
    if (isPasswordValid) {
      createToken(res, existingUser._id);

      res.status(201).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      });
    } else {
      // incorrect password
      res.status(401).json({ message: "Invalid Password" });
    }
  } else {
    res.status(401).json({ message: "User not found" });
  }
  //   console.log(existingUser);
});

export { createUser, loginUser };
