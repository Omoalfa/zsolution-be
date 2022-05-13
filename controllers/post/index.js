import cloudinary from "../../helpers/cloudinary";
import Post from "../../models/Post";

export const createPost = async (req, res) => {
    const { name, brand, type, model, description, price } = req.body;
    let img = [];
    const user = req.user;

    try {
        for (const file in req.files) {
            const { secure_url } = await cloudinary.uploader.upload(
                req.files[file].tempFilePath,
                {
                    public_id: name + brand + file,
                    overwrite: true,
                    folder: 'Licences'
                }
            )

            img.push(secure_url)
        }

        const post = new Post({
            img, name, brand, type, model, description, price, seller: user._id
        })

        await post.save();

        return res.status(201).json({
            message: 'Your car was posted successfully',
            success: true
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'something went wrong',
            success: false
        })
    }
}
