import { client } from "../../../sanity";

export default async function getPost(req, res) {
    console.log(req.body);
    if (req.method === "GET") {
        const { postId } = req.body;
      
        return res.status(200).json({ status: "success", post });
    }
}
