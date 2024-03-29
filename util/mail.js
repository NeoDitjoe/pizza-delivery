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
    html: `Hi ${username}, 

      You have recently signed up at pizza4real.
      please verify your email to continue
      <br/>
      Code: <h3>${verificationCode}</h3> 
      Click <a href='https://pizza4real.vercel.app/auth/verify-email-address'>here</a> To verify your email address
      <h5 style={{ color: red }}>Code expires in 10 minutes, you will have to sign up again in order to receive new code</h5>
      `,
  });

}

export async function sendCodeToEmail(email, code) {
  const info = await transporter.sendMail({
    from: '"Pizza4Real 🍕" no-reply@gmail.com',
    to: email,
    subject: "Reset your password",
    text: "Pizza4Real",
    html: `
      Reset password code: <h3>${code}</h3> 
      Click <a href='https://pizza4real.vercel.app/auth/reset-password/create-new-password'>here</a> to reset your password
      `,
  });

}

export async function runningOutOfProduct(qty, productName, category) {
  await transporter.sendMail({
    from: '"Pizza4Real 🍕" no-reply@gmail.com',
    to: 'ditjoeneo@gmail.com',
    subject: "Running out of Products",
    text: "Pizza4Real",
    html: `
      <div style=background: green>
        <p>You have less than ${qty} ${productName} ${category} left</p>

        <p>
          Open <a href='https://pizza4real.vercel.app/dashboard'>Dashboard</a>
        </p>
      </div>
      `,
  });

}
