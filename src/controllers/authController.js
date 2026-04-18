import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Group from "../models/Group.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: "Error creating user" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, user: {
      id: user._id,
      name: user.name,
      email: user.email,
    } });
  } catch (err) {
    res.status(500).json({ message: "Error logging in user" });
  }
};

export const logout = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Not logged in" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Not logged in" });
      }

      res.clearCookie("token");
      res.status(200).json({ message: "Logged out successfully" });
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging out user" });
  }
};

export const getUserGroups = async (req, res) => {
  const { id } = req.user;

  try {
    const groups = await Group.find({ users: id });

    res.status(200).json(groups);
  } catch (err) {
    res.status(500).json({ message: "Error getting user groups" });
  }
};
