import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { GetAllUsersInput } from './dtos/inputs/get-all-users.input';
import { GetAllUsersRequest } from './dtos/ports/get-all-users.request';
import { User } from './entities/user.entity';
import {
  IUserService,
  UserServiceToken,
} from './interfaces/user-service.interface';
import { CreateUserRequest as CreateUpdateUserRequest } from './dtos/ports/create-user.request';

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
  async createUser(@Body() request: CreateUpdateUserRequest): Promise<User> {
    const user = await this.userService.createUser({
      name: request.name,
      email: request.email,
    });

    return HttpStatus.CREATED, user;
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    type: Number,
  })
  async updateUser(
    @Body() request: CreateUpdateUserRequest,
    @Param('id') id: string,
  ): Promise<User> {
    const user = await this.userService.updateUser({
      where: { id: Number(id) },
      data: {
        name: request.name,
        email: request.email,
      },
    });

    return user;
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: Number,
  })
  async deleteUser(@Param('id') id: string): Promise<User> {
    const user = await this.userService.deleteUser(Number(id));
    return user;
  }
}
