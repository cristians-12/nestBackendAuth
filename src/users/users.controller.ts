import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.request';
import { UsersService } from './users.service';
import { User } from './schema/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async createUser(@Body() request: CreateUserRequest) {
    await this.usersService.createUser(request);
    return { message: 'User created successfully!', success: true };
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    const query = { _id: id };
    return this.usersService.getUser(query);
  }

  @Post(':userId/favorites')
  async addFavorite(
    @Param('userId') userId: string,
    @Body('movieId') movieId: number,
  ) {
    if (!movieId) {
      throw new NotFoundException('You must provide an id for the movie');
    }

    const updatedUser = await this.usersService.addFavorite(userId, movieId);
    return updatedUser;
  }

  @Get(':userId/favorites')
  async getAllFavorites(@Param('userId') userId: string): Promise<number[]> {
    return this.usersService.getAllFavorites(userId);
  }
}
