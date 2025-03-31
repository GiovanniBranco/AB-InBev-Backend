import { GetAllUsersInput } from '../dtos/inputs/getAllUsers.input';
import { User } from '../entities/user';

export const UserServiceToken = Symbol('UserService');
export interface IUserService {
  getAll(input: GetAllUsersInput): Promise<User[]>;
  getById(id: number): Promise<User | null>;
}
