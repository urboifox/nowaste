import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse } from '@nestjs/swagger';
import { UserResponse } from './entities/user-response.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @ApiResponse({ status: 201, type: UserResponse })
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @ApiResponse({ status: 200, type: [UserResponse] })
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @ApiResponse({ status: 200, type: UserResponse })
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Patch(':id')
    @ApiResponse({ status: 200, type: UserResponse })
    update(@Param('id', ParseIntPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete(':id')
    @ApiResponse({ status: 200, type: UserResponse })
    remove(@Param('id', ParseIntPipe) id: string) {
        return this.usersService.remove(+id);
    }
}
