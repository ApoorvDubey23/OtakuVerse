import nodemailer from 'nodemailer';
import User from "@/models/UserModel";
import bcrypt from 'bcrypt';


export const sendEmail = async({email, emailType, userId}:any) => {
    console.log(email,emailType,userId);
    
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, 
                {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        } else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userId, 
                {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
        }

        var transport = nodemailer.createTransport({
            host: "live.smtp.mailtrap.io",
            port: 587,
            auth: {
              user: "api",
              pass: process.env.MAILTRAP_PASSWORD,
            }
          });


        const mailOptions = {
            from: "demomailtrap.com",
            to: `${email}`,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailresponse = await transport.sendMail(mailOptions);

        console.log(mailresponse);
        
        return mailresponse;

    } catch (error:any) {
        throw new Error(error.message);
    }
}