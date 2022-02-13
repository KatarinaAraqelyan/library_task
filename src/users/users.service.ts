import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/user_update.dto';
import { createQueryBuilder } from 'typeorm';
import { Users } from '../db/entities';
import { UsersRepository } from './repository/users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async create_user(user: CreateUserDto) {
    const isExist = await this.usersRepository.findOne({
      where: {
        email: user.email,
      },
    });
    if (isExist) {
      throw new HttpException(
        'User with this name already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.usersRepository.save(user);
    return this.usersRepository.create(user);
  }

  async delete_user(id: number) {
    const result = await this.usersRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    } else {
      throw new HttpException('Success deleted', HttpStatus.OK);
    }
  }

  async subscription(id: number) {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    if (user.subscription) {
      throw new HttpException(
        'you already have an active subscription',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      user.subscription = true;
      await user.save();
      return user;
    }
  }

  async get_users() {
    return this.usersRepository.find();
  }

  async update_user(update: UpdateUserDto) {
    const user = await this.usersRepository.findOne(update.id);
    if (!user) {
      throw new NotFoundException(`User with ID "${update.id}" not found`);
    }
    if (update.update_item !== 'name' && update.update_item !== 'surname') {
      throw new HttpException(
        `user doesn't field like ${update.update_item}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (update.update_item === 'name') {
      user.name = update.data;
      await user.save();
      return user;
    } else if (update.update_item === 'surname') {
      user.surname = update.data;
      await user.save();
      return user;
    }
  }

  async get_user(id: number) {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    if (user.books_count === 0) {
      return user;
    } else {
      const query = createQueryBuilder('users', 'u')
        .innerJoinAndSelect('u.books', 'b')
        .where('u.id = :id', { id: id });
      return await query.getMany();
    }
  }
}
