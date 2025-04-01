/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserRequest } from '../dtos/ports/create-user.request';
import { User } from '../entities/user.entity';
import {
  IUserService,
  UserServiceToken,
} from '../interfaces/user-service.interface';
import { UserController } from '../user.controller';

describe('UserController', () => {
  let userController: UserController;
  let userService: jest.Mocked<IUserService>;

  beforeEach(async () => {
    const mockUserService: jest.Mocked<IUserService> = {
      getUserById: jest.fn(),
      getAllUsers: jest.fn(),
      createUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserServiceToken,
          useValue: mockUserService,
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<IUserService>(
      UserServiceToken,
    ) as jest.Mocked<IUserService>;
  });

  describe('getUserById', () => {
    it('should return a user by ID', async () => {
      const mockUser: User = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      };
      userService.getUserById.mockResolvedValue(mockUser);

      const result = await userController.getUserById('1');
      expect(result).toEqual(mockUser);
      expect(userService.getUserById).toHaveBeenCalledWith(1);
    });
  });

  describe('getAllUsers', () => {
    it('should return a list of users', async () => {
      const mockUsers: User[] = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
      ];
      userService.getAllUsers.mockResolvedValue(mockUsers);

      const request = {
        skip: 0,
        take: 10,
        cursor: undefined,
        where: undefined,
        orderBy: undefined,
      };

      const result = await userController.getAllUsers(request);
      expect(result).toEqual(mockUsers);
      expect(userService.getAllUsers).toHaveBeenCalledWith({
        params: {
          skip: request.skip,
          take: request.take,
          cursor: request.cursor,
          where: request.where,
          orderBy: request.orderBy,
        },
      });
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const mockUser: User = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      };
      userService.createUser.mockResolvedValue(mockUser);

      const request: CreateUserRequest = {
        name: 'John Doe',
        email: 'john@example.com',
      };

      const result = await userController.createUser(request);
      expect(result).toEqual(mockUser);
      expect(userService.createUser).toHaveBeenCalledWith({
        name: request.name,
        email: request.email,
      });
    });
  });

  describe('updateUser', () => {
    it('should update an existing user', async () => {
      const mockUser: User = {
        id: 1,
        name: 'Updated Name',
        email: 'updated@example.com',
      };
      userService.updateUser.mockResolvedValue(mockUser);

      const request: CreateUserRequest = {
        name: 'Updated Name',
        email: 'updated@example.com',
      };

      const result = await userController.updateUser(request, '1');
      expect(result).toEqual(mockUser);
      expect(userService.updateUser).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          name: request.name,
          email: request.email,
        },
      });
    });
  });

  describe('deleteUser', () => {
    it('should delete a user by ID', async () => {
      const mockUser: User = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      };
      userService.deleteUser.mockResolvedValue(mockUser);

      const result = await userController.deleteUser('1');
      expect(result).toEqual(mockUser);
      expect(userService.deleteUser).toHaveBeenCalledWith(1);
    });
  });
});
