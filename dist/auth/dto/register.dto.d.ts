import { Prisma } from '@prisma/client';
export declare class RegisterDto implements Prisma.UserCreateInput {
    name: string;
    email: string;
    password: string;
}
