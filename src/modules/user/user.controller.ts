import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { GetAllUsersInput } from './dtos/inputs/getAllUsers.input';
import { GetAllUsersRequest } from './dtos/ports/getAllUsers.request';
import { User } from './entities/user';
import { IUserService, UserServiceToken } from './interfaces/IUserService';
import { CreateUserRequest } from './dtos/ports/createUser.request';

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
    return await this.userService.getUserById(Number(id));
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

    const users = await this.userService.getAllUsers(input);

    return users;
  }

  @Post()
  async createUser(@Body() request: CreateUserRequest): Promise<User> {
    console.log('cheguei no controller', request);
    const user = await this.userService.createUser({
      name: request.name,
      email: request.email,
    });

    return HttpStatus.CREATED, user;
  }
}
