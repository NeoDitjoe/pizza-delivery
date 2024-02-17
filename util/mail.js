const nodemailer = require("nodemailer");

const password = process.env.PASSWORD
const user = process.env.USER

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: user,
    pass: password,
  },
});

export default async function main(userEmail, username, verificationCode) {
  const info = await transporter.sendMail({
    from: '"Pizza4Real 🍕" no-reply@gmail.com',
    to: userEmail,
    subject: "Email Verification", 
    text: "Pizza4Real",
    html: `Hi ${username}, <br/><p>Code:<p> <h3>${verificationCode}</h3> Click <a href='http://localhost:3000/verify-email-address'>here</a> To verify your email address`, 
  });

}
