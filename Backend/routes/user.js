const express = require('express');
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User, Account } = require("../db");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

// Schemas
const signupBody = zod.object({
  email: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string().min(6)
});

const signinBody = zod.object({
  email: zod.string().email(),
  password: zod.string()
});

// GET /me
router.get("/me", authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName
  });
});

// POST /signup
router.post("/signup", async (req, res) => {
  try {
    const parsed = signupBody.safeParse(req.body);
    if (!parsed.success) {
      return res.status(411).json({ 
        message: "Invalid input format",
        errors: parsed.error.errors 
      });
    }

    const { email, password, firstName, lastName } = parsed.data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName
    });

    // Create account with initial balance
    await Account.create({
      userId: newUser._id,
      balance: Math.floor(1 + Math.random() * 10000)
    });

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET);

    res.json({
      message: "User created successfully",
      token
    });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
});

// POST /signin
router.post("/signin", async (req, res) => {
  try {
    const parsed = signinBody.safeParse(req.body);
    if (!parsed.success) {
      return res.status(411).json({ 
        message: "Invalid email or password format",
        errors: parsed.error.errors
      });
    }

    const { email, password } = parsed.data;
    console.log("Login attempt for:", email); // Debug log

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({ message: "Invalid email or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    res.json({
      message: "Sign in successful",
      token
    });
  } catch (err) {
    console.error("Signin Error:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
});

// PUT / - Update user profile
const updateBody = zod.object({
  password: zod.string().min(6).optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional()
});

router.put("/", authMiddleware, async (req, res) => {
  const parsed = updateBody.safeParse(req.body);
  if (!parsed.success) {
    return res.status(411).json({ message: "Error while updating information" });
  }

  const updateData = { ...parsed.data };

  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }

  await User.updateOne({ _id: req.userId }, updateData);

  res.json({ message: "Updated successfully" });
});

// GET /bulk?filter=
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape all regex meta characters
}

router.get("/bulk", async (req, res) => {
  const rawFilter = req.query.filter || "";
  const filter = escapeRegex(rawFilter);

  const users = await User.find({
    $or: [
      { firstName: { $regex: filter, $options: 'i' } },
      { lastName: { $regex: filter, $options: 'i' } }
    ]
  });

  res.json({
    user: users.map(user => ({
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    }))
  });
});
module.exports = router;
