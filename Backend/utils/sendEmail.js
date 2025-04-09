const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,     // your_email@gmail.com
        pass: process.env.EMAIL_PASS      // your app password from Gmail
    }
});

async function sendMoneyNotificationEmail(receiverEmail, receiverName, senderName, amount) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: receiverEmail,
        subject: 'You Received a Payment 🎉',
        text: `Hi ${receiverName},\n\nYou have received ₹${amount} from ${senderName}.\n\nThanks for using our app!`
    };

    await transporter.sendMail(mailOptions);
}

module.exports = { sendMoneyNotificationEmail };
