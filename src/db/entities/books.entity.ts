import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class Books extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  author: string;

  @Column()
  description: string;

  @Column({ default: null })
  userId: number;

  @ManyToOne(() => Users, (user) => user.books)
  @JoinColumn({ referencedColumnName: 'id', name: 'userId' })
  user: number;
}
