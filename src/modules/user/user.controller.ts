import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { GetAllUsersInput } from './dtos/inputs/getAllUsers.input';
import { GetAllUsersRequest } from './dtos/ports/getAllUsers.request';
import { User } from './entities/user';
import { IUserService, UserServiceToken } from './interfaces/IUserService';

@Controller('users')
export class UserController {
  constructor(
    @Inject(UserServiceToken)
    private userService: IUserService,
  ) {}

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: Number,
  })
  async getUserById(@Param('id') id: string): Promise<User | null> {
    return await this.userService.getById(Number(id));
  }

  @Get()
  async getAllUsers(@Query() request: GetAllUsersRequest): Promise<User[]> {
    const input: GetAllUsersInput = {
      params: {
        skip: request.skip,
        take: request.take,
        cursor: request.cursor,
        where: request.where,
        orderBy: request.orderBy,
      },
    };

    return await this.userService.getAll(input);
  }
}
