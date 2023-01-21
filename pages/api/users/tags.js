import { client } from "../../../sanity";

export default async function tags(req, res) {
    const query = `*[_type == 'tag']`;
    const data = await client.fetch(query);
    res.status(200).json(data);
}
