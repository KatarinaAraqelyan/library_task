import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/user_update.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('add')
  @UsePipes(ValidationPipe)
  create_user(@Body() user: CreateUserDto) {
    return this.usersService.create_user(user);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: number) {
    return this.usersService.delete_user(id);
  }

  @Patch('subscription/:id')
  subscription(@Param('id') id: number) {
    return this.usersService.subscription(id);
  }

  @Get()
  get_users() {
    return this.usersService.get_users();
  }

  @Patch('update')
  update_user(@Body() update: UpdateUserDto) {
    return this.usersService.update_user(update);
  }

  @Get(':id')
  get_user(@Param('id') id: number) {
    return this.usersService.get_user(id);
  }
}
