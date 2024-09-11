import {
  ConflictException,
  Injectable,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { FilterQuery, Model } from 'mongoose';
import { CreateUserRequest } from './dto/create-user.request';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(data: CreateUserRequest) {
    try {
      const newUser = new this.userModel({
        ...data,
        password: await hash(data.password, 10),
      });
      return await newUser.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('User already exists');
      }
      throw new Error('Failed to create user');
    }
  }

  async getUser(query: FilterQuery<User>) {
    const user = (await this.userModel.findOne(query)).toObject();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async addFavorite(userId: string, movieId: number): Promise<User> {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.favorites.includes(movieId)) {
      user.favorites.push(movieId);
      return user.save();
    }
    return user;
  }

  async getAllFavorites(userId: string): Promise<number[]> {
    const user = await this.userModel.findById(userId).select('favorites');
    if (!user) throw new NotFoundException(' No user found');
    return user.favorites;
  }
}
