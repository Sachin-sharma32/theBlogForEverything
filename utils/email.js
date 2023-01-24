const nodemailer = require("nodemailer");
import ejs from "ejs";

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
            user: "sachin2sharma001@gmail.com",
            pass: "fqjxppcdhntarlfa",
        },
    });
    console.log(options.url);
    const data = await ejs.renderFile("email.ejs", {
        name: options.name,
        url: options.url,
    });
    const mailOptions = {
        from: "sachin sharma <sachin2sharma001@gmail.com>",
        to: options.email,
        subject: options.subject,
        html: data,
    };
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
