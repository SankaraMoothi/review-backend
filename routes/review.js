import express from "express";
import { verifyToken } from "./verifyToken.js";
import review from "../models/Review.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const newreview = await review.find();
    res.status(200).json(newreview);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", verifyToken, async (req, res) => {
  const newreview = new review(req.body);
  try {
    const savedreview = await newreview.save();
    res.status(200).json(savedreview);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedreview = await review.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedreview);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await review.findByIdAndDelete(req.params.id);
    res.status(200).json("review Has Been Deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
