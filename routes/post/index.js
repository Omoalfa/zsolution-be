import { Router } from "express";
import { createPost } from "../../controllers/post";
import isAuth from "../../middlewares/auth";
import { PostCarValidation } from "../../validators/post";

const postRoutes = Router()

postRoutes.post('/', isAuth, PostCarValidation, createPost);

export default postRoutes;
