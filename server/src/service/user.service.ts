import { PrismaClient } from '@prisma/client';
import UserDto from '../types/dto/user.dto';
import sha256 from 'sha256';
import UpdateUserPasswordDto from '../types/dto/update-user.dto';
import UpdateUserNameDto from '../types/dto/update-user-name.dto';
export class UserService {
    private readonly prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getAllUsers() {
        try {
            return await this.prisma.users.findMany();
        } catch (e) {
            console.error('Error in user service: ' + e);
            throw e;
        }
    }
    async createUser(dto: UserDto) {
        try {
            const userUid = sha256(dto.name + dto.password + 'secret');
            return await this.prisma.users.create({ data: { ...dto, user_uid: userUid } });
        } catch (e) {
            console.error('Error in user service' + e);
            throw e;
        }
    }
    async updateUserPasswordByUserUid(dto: UpdateUserPasswordDto) {
        try {
            return await this.prisma.users.update({
                where: { user_uid: dto.userUid },
                data: { password: dto.password }
            });
        } catch (e) {
            console.error('Error in user service' + e);
            throw e;
        }
    }
    async updateUserPassword(dto: UpdateUserPasswordDto) {
        try {
            return await this.prisma.users.update({ where: { id: dto.id }, data: { password: dto.password } });
        } catch (e) {
            console.error('Error in user service', e);
            throw e;
        }
    }
    async updateUserNameByUserUid(dto: UpdateUserNameDto) {
        try {
            return await this.prisma.users.update({ where: { user_uid: dto.userUid }, data: { name: dto.name } });
        } catch (e) {
            console.error('Error in user service' + e);
            throw e;
        }
    }
    async updateUserName(dto: UpdateUserNameDto) {
        try {
            return await this.prisma.users.update({ where: { id: dto.id }, data: { name: dto.name } });
        } catch (e) {
            console.error('Error in user service' + e);
            throw e;
        }
    }
    async deleteUserByUserUid(user_uid: string) {
        try {
            return await this.prisma.users.delete({ where: { user_uid } });
        } catch (e) {
            console.error('Error in user service' + e);
            throw e;
        }
    }
    async deleteUser(id: number) {
        try {
            return await this.prisma.users.delete({ where: { id } });
        } catch (e) {
            console.error('Error in user service' + e);
            throw e;
        }
    }
    async getUserByUserUid(user_uid: string) {
        try {
            return await this.prisma.users.findFirst({ where: { user_uid } });
        } catch (e) {
            console.error('Error in user service' + e);
            throw e;
        }
    }
}
