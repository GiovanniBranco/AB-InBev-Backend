import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'infrastructure/postgresql/config/prismaService';
import { Prisma } from '@prisma/client';
import { User } from './entities/user';
import { IUserService } from './interfaces/IUserService';
import { GetAllUsersInput } from './dtos/inputs/getAllUsers.input';

@Injectable()
export class UserService implements IUserService {
  constructor(private prisma: PrismaService) {}

  async getUserById(id: number): Promise<User | null> {
    if (id <= 0) {
      throw new BadRequestException('ID is required');
    }

    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async getAllUsers(input: GetAllUsersInput): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = input.params;
    return await this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return await this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return await this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(id: number): Promise<User> {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
