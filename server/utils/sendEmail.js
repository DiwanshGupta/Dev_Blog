import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import env from "dotenv"
import { fileURLToPath } from "url";

env.config()

const user_Gmail=process.env.Email_address;
const gmail_passkey=process.env.Email_password;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const sendEmail = async (name,email,subject,token) => {
  const transporter= nodemailer.createTransport({
    // service: process.env.SMTP_SERVICE,
    service:"gmail",
    auth: {
      user: user_Gmail,
      pass: gmail_passkey,
    },
  });
  
  // Path of email template file
  const templatePath = path.join(__dirname, "../mails/verifyemail.ejs");

  try {
    // Render Email template
    const html = await ejs.renderFile(templatePath,{name,token,email});
    console.log("data",email,subject)
    const mailOptions = {
      from: user_Gmail,
      to: email,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
    
    } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
    }
};