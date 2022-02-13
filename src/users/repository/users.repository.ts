import { EntityRepository, Repository } from 'typeorm';
import { Users } from '../../db/entities';

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {}
