import bcrypt from "bcryptjs";
import CryptoJS from "crypto-js";
import { client } from "../../../sanity";

export default async function register(req, res) {
    const projectId = process.env.SANITY_PROJECT_ID;
    const dataset = process.env.SANITY_DATASET;
    const token = process.env.SANITY_TOKEN;
    const mutations = [
        {
            create: {
                _type: "user",
                name: req.body.name,
                email: req.body.email,
                password: CryptoJS.AES.encrypt(
                    req.body.password,
                    "sachin1234"
                ).toString(),
                isAdmin: false,
            },
        },
    ];
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
        fetch(
            `https://${projectId}.api.sanity.io/v2021-06-07/data/mutate/${dataset}`,
            {
                method: "post",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ mutations }),
            }
        )
            .then((response) => {
                res.status(200).json({
                    status: "success",
                    data: response,
                });
            })
            .catch((error) => {
                res.status(404).json({
                    status: "Error",
                    message: "something went wrong",
                });
            });
    }
}
