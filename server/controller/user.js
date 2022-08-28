import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userRepository } from "../models/user.js";

export const signup = async (req, res) => {
  const { firstName, lastName, email, confirmPassword } = req.body;
  const existingUser = await userRepository.search().where("email").is.equalTo(email).return.first();
  //check if user already registered with the email
  if (existingUser) {
    return res.status(400).json({ message: "A user already registered with the email." });
  }
  if (req.body.password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords don't match." });
  }

  //hash password
  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  const user = await userRepository.createAndSave({ name: `${firstName} ${lastName}`, email, password: hashedPassword });

  const token = jwt.sign({ email: user.email, id: user.entityId }, process.env.JWT_TOKEN_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  const { entityId, password, ...rest } = user.toJSON();
  const data = { id: user.entityId, ...rest };
  res.status(200).json({ result: data, token });
};

export const signin = async (req, res) => {
  const { email } = req.body;
  const existingUser = await userRepository.search().where("email").is.equalTo(email).return.first();
  //check if user exists
  if (!existingUser) {
    return res.status(404).json({ message: "User not found." });
  }
  //check for correct password
  const isPasswordCorrect = await bcrypt.compare(req.body.password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(404).json({ message: "invalid Credentials" });
  }
  //create auth token
  const token = jwt.sign({ email: existingUser.email, id: existingUser.entityId }, process.env.JWT_TOKEN_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  const { entityId, password, ...rest } = existingUser.toJSON();
  const data = { id: existingUser.entityId, ...rest };
  res.status(200).json({ result: data, token });
};
