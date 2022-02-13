import { EntityRepository, Repository } from 'typeorm';
import { Books } from '../../db/entities';

@EntityRepository(Books)
export class BooksRepository extends Repository<Books> {}
