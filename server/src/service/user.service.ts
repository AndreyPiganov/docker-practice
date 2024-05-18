import { PrismaClient } from '@prisma/client';

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
    async createUser() {
        try{
            return
        } catch (e) {
            console.error('Error in user service' + e);
            throw e;
        }
    }
}