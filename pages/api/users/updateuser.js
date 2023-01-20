import { client } from "../../../sanity";

export default async function updateuser(req, res) {
    const { values, userId, image } = req.body;
    const projectId = "k0me7ccv";
    const dataset = "production";
    const token =
        "skxNaTIwDAiFA5wLMvqVHGfrsbtDRdisWCiabALb0kE0mxXGy90z5Q6SGk7RouKmnEoLGb4zH9gGRkPSESJ62jFCvm49a57yCZk4UrofCWXKfzXb6M8Z5dZbKKBKSXHxT6kkluommgcXlSDBsJhGPPiheF5RYEmN2ioRidoYlI8RE242404Y";
    const mutations = [
        {
            patch: {
                id: userId,
                set: {
                    name: values.name,
                    image,
                    bio: values.bio,
                    location: values.location,
                    work: values.work,
                    education: values.education,
                },
            },
        },
    ];
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
            res.status(200).json({ data: req.body });
        })
        .catch((error) => {
            res.status(404).json({
                status: "Error",
                message: "something went wrong",
            });
        });
}
