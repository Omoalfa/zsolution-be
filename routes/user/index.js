import { Router } from "express";
import { createUser, LoginUser } from "../../controllers/user";
import { createUserValidation, userLoginValidation } from "../../validators/user";

const userRoutes = Router()

userRoutes.post('/', createUserValidation, createUser);
userRoutes.post('/login', userLoginValidation, LoginUser);

export default userRoutes;
