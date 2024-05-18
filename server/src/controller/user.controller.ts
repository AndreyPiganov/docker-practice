import type { Request, Response } from 'express';
import { Router } from 'express';
import { UserService } from '../service/user.service';
import UserDto from '../types/dto/user.dto';
import UpdateUserPasswordDto from '../types/dto/update-user.dto';
import UpdateUserNameDto from '../types/dto/update-user-name.dto';
import { idValidator, nameValidator, passwordValidator, userUidParamValidator, userUidValidator } from '../validators/user.validator';

const userService = new UserService();
const userController: Router = Router();

userController.post('/registration', [passwordValidator, nameValidator] ,async (req: Request, res: Response) => {
    try {
        const dto : UserDto = req.body;
        const result = await userService.createUser(dto);
        res.status(201).json(result);
    } catch (e) {
        console.error('Error in user controller: ' + e);
        res.status(500).send('Ошибка регистрации');
    }
});

userController.get('/', async (_: Request, res: Response) => {
    try{
        const result = await userService.getAllUsers();
        res.status(200).json(result);
    } catch (e) {
        console.error('Error in user controller' + e);
        res.status(500).send('Ошибка получения пользователей');
    }
})

userController.get('/:user_uid', [userUidParamValidator] , async (req: Request, res: Response) => {
    try{
        const {user_uid} = req.params;
        const result = await userService.getUserByUserUid(user_uid as string);
        res.status(200).json(result);
    } catch (e) {
        console.error('Error in user controller' + e);
        res.status(500).send('Ошибка получения пользователя по user_uid');
    }
})

userController.put('/password/user_uid', [userUidValidator, passwordValidator] ,async (req: Request, res: Response) => {
    try{
        const dto : UpdateUserPasswordDto = req.body;
        const result = await userService.updateUserPasswordByUserUid(dto);
        res.json(result);
    } catch (e) {
        console.error('Error in user controller' + e);
        res.status(500).send('Ошибка при изменении пароля');
    }
})

userController.put('/password/id', [passwordValidator, idValidator] ,async (req: Request, res: Response) => {
    try{
        const dto : UpdateUserPasswordDto = req.body;
        const result = await userService.updateUserPassword(dto);
        res.json(result);
    } catch (e) {
        console.error('Error in user controller' + e);
        res.status(500).send('Ошибка при изменении пароля')
    }
})

userController.put('/name/user_uid', [nameValidator, userUidValidator] ,async (req: Request, res: Response) => {
    try{
        const dto : UpdateUserNameDto = req.body;
        const result = await userService.updateUserNameByUserUid(dto);
        res.json(result);
    } catch (e) {
        console.error('Error in user controller' + e);
        res.status(500).send('Ошибка при изменении имени');
    }
})

userController.put('/name/id', [idValidator, nameValidator] , async (req: Request, res: Response) => {
    try{
        const dto : UpdateUserNameDto = req.body;
        const result = await userService.updateUserName(dto);
        res.json(result);
    } catch (e) {
        console.error('Error in user controller' + e);
        res.status(500).send('Ошибка при изменении имени');
    }
})

userController.delete('/user_uid', [userUidValidator] ,async (req: Request, res: Response) => {
    try{
        const {user_uid} = req.body;
        const result = await userService.deleteUserByUserUid(user_uid);
        res.json(result);
    } catch (e) {
        console.error('Error in user controller' + e);
        res.status(500).send('Ошибка при удалении пользователя');
    }
})

userController.delete('/id', [idValidator] , async (req: Request, res: Response) => {
    try{
        const {id} = req.body;
        const result = await userService.deleteUser(parseInt(id, 10));
        res.json(result);
    } catch (e) {
        console.error('Error in user controller' + e);
        res.status(500).send('Ошибка при удалении пользователя');
    }
})

export default userController;
