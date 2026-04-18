import Group from "../models/Group.js";

import User from "../models/User.js";

// Cria o grupo e vincula o usuário a lista de usuários
export const createGroup = async (req, res) => {
  const { name, userId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const group = await Group.create({ name, createdBy: user._id, users: [user._id] });

    res.status(201).json(group, user);
  } catch (err) {
    res.status(500).json({ message: "Error creating group" });
    console.log(err);
  }
};

export const getUserGroups = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    const groups = await Group.find({ users: user._id });

    res.status(200).json(groups);
  } catch (err) {
    res.status(500).json({ message: "Error getting user groups", err });
    console.log(err);
  }
};

export const getGroupById = async (req, res) => {
  const { id } = req.params;

  try {
    const group = await Group.findById(id);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.status(200).json(group);
  } catch (err) {
    res.status(500).json({ message: "Error getting group", err });
  }
};

export const updateGroup = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const group = await Group.findByIdAndUpdate(id, { name });

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.status(200).json(group);
  } catch (err) {
    res.status(500).json({ message: "Error updating group" });
  }
};

export const deleteGroup = async (req, res) => {
  const { id } = req.params;

  try {
    const group = await Group.findByIdAndDelete(id);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.status(200).json({ message: "Group deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting group" });
  }
};
