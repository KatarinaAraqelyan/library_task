import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateBookDto } from './dto/book.dto';
import { BooksRepository } from './repository/books.repository';
import { UsersRepository } from '../users/repository/users.repository';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BooksRepository)
    private readonly booksRepository: BooksRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async create_book(book: CreateBookDto) {
    const isExist = await this.booksRepository.findOne({
      where: {
        name: book.name,
      },
    });
    if (isExist) {
      throw new HttpException(
        `Book with name - ${book.name} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.booksRepository.save(book);
    return this.booksRepository.create(book);
  }

  async take_book(book_id: number, user_id: number) {
    const book = await this.booksRepository.findOne(book_id);
    const user = await this.usersRepository.findOne(user_id);

    if (!book || !user) {
      throw new NotFoundException('book or user does not exist');
    }
    if (book.userId !== null) {
      throw new HttpException(
        'the book is already taken',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (user.books_count >= 5) {
      throw new HttpException(
        'you have already taken 5 books',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (user.subscription === false) {
      throw new HttpException(
        'you do not have subscription',
        HttpStatus.BAD_REQUEST,
      );
    }
    book.userId = user_id;
    await book.save();
    user.books_count++;
    await user.save();
    return book;
  }

  async return_book(book_id: number, user_id: number) {
    const book = await this.booksRepository.findOne(book_id);
    const user = await this.usersRepository.findOne(user_id);
    if (!book || !user) {
      throw new NotFoundException('book or user does not exist');
    }
    if (book.userId !== user_id) {
      throw new HttpException(
        'this book does not exist in your book list',
        HttpStatus.BAD_REQUEST,
      );
    }

    book.userId = null;
    await book.save();
    user.books_count--;
    await user.save();
    return book;
  }
}
