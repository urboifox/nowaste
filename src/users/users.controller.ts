import {
    Controller,
    Post,
    Body,
    Get,
    Query,
    Param,
    ParseIntPipe,
    Patch,
    Delete,
    ValidationPipe,
    UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseUtil } from 'src/common/utils/response.util';

@ApiTags('users')
@Controller('users')
@UsePipes(new ValidationPipe({ transform: true }))
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'User created', type: UserResponseDto })
    async create(@Body() createUserDto: CreateUserDto) {
        const response = await this.usersService.create(createUserDto);
        return ResponseUtil.transform(response, UserResponseDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
    @ApiResponse({ status: 200, description: 'List of users', type: [UserResponseDto] })
    async findAll(@Query() pagination: PaginationDto) {
        const response = await this.usersService.findAll(pagination);
        return ResponseUtil.transform(response, UserResponseDto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a user by ID' })
    @ApiResponse({ status: 200, description: 'User details', type: UserResponseDto })
    @ApiResponse({ status: 404, description: 'User not found' })
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const response = await this.usersService.findOne(id);
        return ResponseUtil.transform(response, UserResponseDto);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a user by ID' })
    @ApiResponse({ status: 200, description: 'User updated', type: UserResponseDto })
    @ApiResponse({ status: 404, description: 'User not found' })
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        const response = await this.usersService.update(id, updateUserDto);
        return ResponseUtil.transform(response, UserResponseDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a user by ID' })
    @ApiResponse({ status: 204, description: 'User deleted' })
    @ApiResponse({ status: 404, description: 'User not found' })
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.usersService.remove(id);
    }
}
