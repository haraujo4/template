import{Router} from 'express'
import { createUserController, userDeleteController, userListController, userListOneController, userLoginController, userUpdatePasswordController } from './controllers/userController';
import { authUser } from './middlewares/authorizationMiddeware';

const routes = Router();

routes.post('/users', createUserController )
routes.get('/users', authUser ,userListController)
routes.post('/users/login', userLoginController)
routes.get('/users/me', authUser,userListOneController)
routes.delete('/users/me', authUser, userDeleteController)
routes.patch('/users/me/updatepassword', authUser, userUpdatePasswordController)



export default routes