import express from "express";
import {
  createGroup,
  getUserGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
} from "../controllers/groupController.js";

const router = express.Router();

router.post("/", createGroup);
router.get("/:id", getUserGroups);
router.put("/:id", updateGroup);
router.delete("/:id", deleteGroup);

router.get("/test", (req, res) => {
  res.json({ message: "Teste de rota" });
});

export default router;