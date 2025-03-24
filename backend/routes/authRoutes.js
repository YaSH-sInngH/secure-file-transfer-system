import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../model/user.js';
import speakeasy from "speakeasy";
import qrcode from "qrcode";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "User not found" });
  
      const isMatch = await user.comparePassword(password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
      if (user.mfaEnabled) {
        return res.json({ message: "MFA required", mfaRequired: true, userId: user._id });
      }
  
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
  
      res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });  

router.post('/enable-mfa', async(req, res)=>{
    const {userId} = req.body;
    try{
        const user = await User.findById(userId);
        if(!user) return res.status(404).json({message:'User not found'});

        const secret = speakeasy.generateSecret({length:20});
        user.mfaSecret = secret.base32;
        user.mfaEnabled = true;
        await user.save();

        qrcode.toDataURL(secret.otpauth_url, (err, qrCode) => {
            if(err) return res.status(500).json({message: 'QR Code generation failed'});
            res.json({qrCode, secret: secret.base32});
        });

    }catch(error){
        res.status(500).json({ message: error.message });
    }
});

router.post("/verify-mfa", async (req, res) => {
    const { userId, token } = req.body;
    try {
      const user = await User.findById(userId);
      if (!user || !user.mfaSecret) return res.status(400).json({ message: "MFA not set up" });
  
      const verified = speakeasy.totp.verify({
        secret: user.mfaSecret,
        encoding: "base32",
        token,
        window: 1, // Allows +/- 1 token step
      });
  
      if (!verified) return res.status(400).json({ message: "Invalid OTP" });
  
      res.json({ message: "MFA verified" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

export default router;
