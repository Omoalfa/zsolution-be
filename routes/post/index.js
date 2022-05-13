import { Router } from "express";
import { createPost, getPostDetails, getPosts } from "../../controllers/post";
import isAuth from "../../middlewares/auth";
import { PostCarValidation } from "../../validators/post";

const postRoutes = Router()

postRoutes.post('/', isAuth, PostCarValidation, createPost);
postRoutes.get('/', getPosts);
postRoutes.get('/:_id', getPostDetails);

export default postRoutes;
