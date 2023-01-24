import { client } from "../../../sanity";
import sendEmail from "../../../utils/email";

export default async function register(req, res) {
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
        await sendEmail({
            email: req.body.email,
            name: req.body.name,
            subject: "User verification link",
            url: `${process.env.SITE_URL}/api/users/verifyUser?name=${req.body.name}&email=${req.body.email}&password=${req.body.password}`,
            message: `${process.env.SITE_URL}/api/users/verifyUser?name=${req.body.name}&email=${req.body.email}&password=${req.body.password}`,
        })
            .then((data) => {
                console.log("data");
            })
            .catch((error) => {
                res.status(400).json({ data: error });
            });
        res.status(200).json({ status: "success" });
    }
}
