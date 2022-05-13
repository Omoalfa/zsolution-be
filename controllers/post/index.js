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

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({})

        return res.status(200).json({
            messge: 'Posts fetched successfully',
            data: posts,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Somthing went wrong',
            success: false
        })
    }
}

export const getPostDetails = async (req, res) => {
    const { _id } = req.params;

    try {
        const post = await Post.findOne({ _id }).populate('seller');

        if (!post) return res.status(400).json({
            message: 'Post not found',
            success: false
        })

        return res.status(200).json({
            message: 'Post details fetched successfully',
            data: post,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Somthing went wrong',
            success: false
        })
    }
}

export const deletePost = async (req, res) => {
    const { _id } = req.params;
    const user = req.user;

    try {
        const post = await Post.find({ _id, seller: user._id });

        if (!post) res.status(400).json({
            message: 'Post either does not exist or not yours',
            success: false
        })

        await Post.deleteOne(post);

        return res.status(200).json({
            message: 'Post deleted successfully',
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Somthing went wrong',
            success: false
        })
    }
}
