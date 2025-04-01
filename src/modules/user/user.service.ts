import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'infrastructure/postgresql/config/prisma.service';
import { Prisma } from '@prisma/client';
import { User } from './entities/user.entity';
import { IUserService } from './interfaces/user-service.interface';
import { GetAllUsersInput } from './dtos/inputs/get-all-users.input';

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

  async getUserByEmail(email: string): Promise<User | null> {
    if (email)
      return await this.prisma.user.findUnique({
        where: { email },
      });

    return null;
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
    const userExists = await this.getUserByEmail(data.email);
    if (userExists) throw new BadRequestException('User already exists');

    return await this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;

    const userExists = await this.getUserByEmail(where.email || '');

    if (userExists && userExists.id !== where.id)
      throw new BadRequestException('Email already used');

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
