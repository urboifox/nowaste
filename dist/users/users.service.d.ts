import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserResponse } from './entities/user-response.entity';
import { User } from './entities/user.entity';
export declare class UsersService {
    private db;
    constructor(db: PrismaService);
    private notFound;
    create(createUserDto: CreateUserDto): Promise<UserResponse>;
    findAll(): Promise<UserResponse[]>;
    findOne(id: number): Promise<UserResponse>;
    findOneByEmail(email: string): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<UserResponse>;
    remove(id: number): Promise<UserResponse>;
}
