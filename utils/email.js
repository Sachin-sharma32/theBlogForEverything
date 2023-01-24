const nodemailer = require("nodemailer");
const path = require("path");
// var hbs = require("nodemailer-express-handlebars");
import ejs from "ejs";

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
            user: "sachin2sharma001@gmail.com",
            pass: "fqjxppcdhntarlfa",
        },
    });
    // const handlebarOptions = {
    //     viewEngine: {
    //         extName: ".handlebars",
    //         partialsDir: path.resolve("./views"),
    //         defaultLayout: false,
    //     },
    //     viewPath: path.resolve("./views"),
    //     extName: ".handlebars",
    // };
    // transporter.use("compile", hbs(handlebarOptions));
    // const templatePath = path.join(__dirname, "./views/email.ejs");
    console.log(options.url);
    const data = await ejs.renderFile("./views/email.ejs", {
        name: options.name,
        url: options.url,
    });
    const mailOptions = {
        from: "sachin sharma <sachin2sharma001@gmail.com>",
        to: options.email,
        subject: options.subject,
        template: "email",
        // text: options.message,
        html: data,
        // context: {
        //     name: `${options.name}`,
        //     url: `${options.url}`,
        //     email: `${options.email}`,
        // },
    };
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
