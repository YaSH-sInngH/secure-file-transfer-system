import express from "express";
import { upload, s3 } from "../db/s3.js";
import { encryptFile } from "../utils/encryption.js";
import fs from "fs";
import { decryptFile } from "../utils/encryption.js";

const router = express.Router();

// Upload file
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const fileBuffer = fs.readFileSync(req.file.path);
    const { encryptedFile, encryptedKey, iv } = encryptFile(fileBuffer);

    // Upload encrypted file to S3
    const s3Response = await s3.upload({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `encrypted/${req.file.filename}`,
      Body: encryptedFile,
    }).promise();

    res.json({
      message: "File uploaded successfully",
      fileUrl: s3Response.Location,
      encryptedKey: encryptedKey.toString("base64"),
      iv: iv.toString("base64"),
    });
  } catch (error) {
    res.status(500).json({ message: "File upload failed", error: error.message });
  }
});

router.get("/download", async (req, res) => {
    try {
      const { fileKey, encryptedKey, iv } = req.query;
      const encryptedKeyBuffer = Buffer.from(encryptedKey, "base64");
      const ivBuffer = Buffer.from(iv, "base64");
  
      // Get file from S3
      const s3Response = await s3.getObject({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `encrypted/${fileKey}`,
      }).promise();
  
      // Decrypt file
      const decryptedFile = decryptFile(s3Response.Body, encryptedKeyBuffer, ivBuffer);
  
      res.setHeader("Content-Disposition", `attachment; filename=${fileKey}`);
      res.send(decryptedFile);
    } catch (error) {
      res.status(500).json({ message: "Download failed", error: error.message });
    }
  });  

export default router;