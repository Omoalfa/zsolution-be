import { Router } from "express";
import { createPost, deletePost, getPostDetails, getPosts } from "../../controllers/post";
import isAuth from "../../middlewares/auth";
import { PostCarValidation } from "../../validators/post";

const postRoutes = Router()

postRoutes.post('/', isAuth, PostCarValidation, createPost);
postRoutes.get('/', getPosts);
postRoutes.get('/:_id', getPostDetails);
postRoutes.delete('/:_id', isAuth, deletePost)

export default postRoutes;
