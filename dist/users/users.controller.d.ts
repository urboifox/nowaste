import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponse } from './entities/user-response.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<UserResponse>;
    findAll(): Promise<UserResponse[]>;
    findOne(id: string): Promise<UserResponse>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<UserResponse>;
    remove(id: string): Promise<UserResponse>;
}
