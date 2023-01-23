import bcrypt from "bcryptjs";
import CryptoJS from "crypto-js";
import { client } from "../../../sanity";
import sendEmail from "../../../utils/email";

export default async function register(req, res) {
    console.log(req.body);
    const existUser = await client.fetch(
        `*[_type == "user" && email == $email][0]`,
        {
            email: req.body.email,
        }
    );
    if (existUser) {
        return res
            .status(400)
            .json({ message: "user with this email already exist" });
    } else {
        const encPass = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.CRYPTO_SECRET
        ).toString();
        console.log(encPass);
        await sendEmail({
            email: req.body.email,
            subject: "User verification link",
            message: `${process.env.SITE_URL}/api/users/verifyUser?name=${req.body.name}&email=${req.body.email}&password=${encPass}`,
        });
        res.status(200).json({ status: "success" });
    }
}
