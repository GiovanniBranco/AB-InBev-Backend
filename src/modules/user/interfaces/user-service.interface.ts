import { Prisma } from '@prisma/client';
import { GetAllUsersInput } from '../dtos/inputs/get-all-users.input';
import { User } from '../entities/user.entity';

export const UserServiceToken = Symbol('UserService');
export interface IUserService {
  getAllUsers(input: GetAllUsersInput): Promise<User[]>;
  getUserById(id: number): Promise<User | null>;
  createUser(data: Prisma.UserCreateInput): Promise<User>;
  updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User>;
  deleteUser(id: number): Promise<User>;
}
