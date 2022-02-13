import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { Books } from './books.entity';
@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({ default: false })
  subscription: boolean;

  @Column({ default: 0 })
  books_count: number;

  @OneToMany(() => Books, (book) => book.user)
  books: Books[];
}
