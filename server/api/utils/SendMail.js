import nodemailer from "nodemailer";

const sendMail = (makeUser) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", 
      port: 25,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: makeUser.email,
      subject: "Verify Your Email",
      text: "Please Verify Your Email",
      html: `<p>Hello click here to verify your email  http://127.0.0.1:5173/verify/${makeUser._id} </p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export default sendMail;
