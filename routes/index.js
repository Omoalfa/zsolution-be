import { Router } from 'express'
import postRoutes from './post';
import userRoutes from './user';

const routes = Router()

routes.use('/user', userRoutes);
routes.use('/post', postRoutes);

export default routes;
