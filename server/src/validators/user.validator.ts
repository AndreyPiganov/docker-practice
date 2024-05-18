import { body, param } from 'express-validator';

export const nameValidator = body('name')
    .trim()
    .notEmpty()
    .withMessage((_, { path }) => `Поле ${path} обязательно для заполнения`)
    .isString()
    .withMessage((value, { path }) => `Значение '${value}', поля '${path}' должно соответствовать типу string`);

export const passwordValidator = body('password')
    .trim()
    .notEmpty()
    .withMessage((_, { path }) => `Поле ${path} обязательно для заполнения`)
    .isString()
    .withMessage((value, { path }) => `Значение '${value}', поля '${path}' должно соответствовать типу string`);

export const userUidValidator = body('user_uid')
    .trim()
    .notEmpty()
    .withMessage((_, { path }) => `Поле ${path} обязательно для заполнения`)
    .isString()
    .withMessage((value, { path }) => `Значение '${value}', поля '${path}' должно соответствовать типу string`);

export const userUidParamValidator = param('user_uid')
    .trim()
    .notEmpty()
    .withMessage((_, { path }) => `Поле ${path} обязательно для заполнения`)
    .isString()
    .withMessage((value, { path }) => `Значение '${value}', поля '${path}' должно соответствовать типу string`);

export const idValidator = body('id')
    .trim()
    .notEmpty()
    .withMessage((_, { path }) => `Поле ${path} обязательно для заполнения`)
    .isInt()
    .withMessage((value, { path }) => `Значение '${value}', поля '${path}' должно соответствовать типу integer`);
