const express = require('express');
const app = express();
app.use(express.json());

const { authMiddleware } = require('../middleware');
const { Account, User } = require('../db');  // ✅ Add User model
const { sendMoneyNotificationEmail } = require('../utils/sendEmail'); // ✅ Import email util
const { default: mongoose } = require('mongoose');

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({ userId: req.userId });
    res.json({ balance: account.balance });
});

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const { amount, to } = req.body;
    const numericAmount = Number(amount);

    try {
        const account = await Account.findOne({ userId: req.userId }).session(session);
        if (!account || account.balance < numericAmount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Insufficient balance" });
        }

        const toAccount = await Account.findOne({ userId: to }).session(session);
        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Invalid account" });
        }

        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -numericAmount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: numericAmount } }).session(session);

        await session.commitTransaction();
        res.json({ message: "Transfer successful" });

        // ✅ Optional email after success
        const sender = await User.findById(req.userId);
        const receiver = await User.findById(to);
        sendMoneyNotificationEmail(receiver.email, receiver.firstName, sender.firstName, numericAmount)
            .catch((err) => console.error("Email send failed:", err.message));

    } catch (err) {
        await session.abortTransaction();
        return res.status(500).json({ message: "Something went wrong", error: err.message });
    } finally {
        session.endSession();
    }
});

module.exports = router;
