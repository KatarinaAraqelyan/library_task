import {
  Body,
  Controller,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { BooksService } from './books.service';
import { CreateBookDto } from './dto/book.dto';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post('add')
  @UsePipes(ValidationPipe)
  create_book(@Body() book: CreateBookDto) {
    return this.booksService.create_book(book);
  }

  @Patch('take')
  take_book(@Body() obj) {
    return this.booksService.take_book(obj.book_id, obj.user_id);
  }

  @Patch('return')
  return_book(@Body() obj) {
    return this.booksService.return_book(obj.book_id, obj.user_id);
  }
}
