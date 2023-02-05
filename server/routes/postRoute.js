import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";
import express from "express";

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.route("/").post(async (req, res) => {
  //console.log(req.body);
  try {
    const { image } = req.body;
    //console.log(req.body);
    const imageUrl = await cloudinary.uploader.upload(image, {
      folder: "DevChallenges/",
    });
    res.status(201).json({ success: true, url: imageUrl.url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
