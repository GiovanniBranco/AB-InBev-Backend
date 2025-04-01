import { Prisma } from '@prisma/client';
import { GetAllUsersInput } from '../dtos/inputs/getAllUsers.input';
import { User } from '../entities/user';

export const UserServiceToken = Symbol('UserService');
export interface IUserService {
  getAllUsers(input: GetAllUsersInput): Promise<User[]>;
  getUserById(id: number): Promise<User | null>;
  createUser(data: Prisma.UserCreateInput): Promise<User>;
}
