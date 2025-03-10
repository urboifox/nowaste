import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserResponseDto {
    @ApiProperty({ example: 1, description: 'The ID of the user' })
    @Expose()
    id: number;

    @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
    @Expose()
    name: string;

    @ApiProperty({ example: 'johndoe', description: 'The username of the user' })
    @Expose()
    username: string;

    @ApiProperty({ example: 'johndoe@email.com', description: 'The email of the user' })
    @Expose()
    email: string;

    @ApiProperty({ example: '2025-03-09T12:00:00Z', description: 'The creation date' })
    @Expose()
    createdAt: Date;

    @ApiProperty({ example: '2025-03-09T12:00:00Z', description: 'The update date' })
    @Expose()
    updatedAt: Date;
}
