import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Books, Users } from '../db/entities';
import { UsersRepository } from '../users/repository/users.repository';
import { BooksRepository } from './repository/books.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository, BooksRepository])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
