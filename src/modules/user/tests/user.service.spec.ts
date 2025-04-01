import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { PrismaService } from 'infrastructure/postgresql/config/prisma.service';
import { BadRequestException } from '@nestjs/common';

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              findMany: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('getUserById', () => {
    it('should throw BadRequestException if id is less than or equal to 0', async () => {
      await expect(userService.getUserById(0)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should return a user if id is valid', async () => {
      const mockUser = { id: 1, email: 'test@example.com', name: 'Test User' };
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

      const result = await userService.getUserById(1);
      expect(result).toEqual(mockUser);
    });
  });

  describe('getUserByEmail', () => {
    it('should return null if email is not provided', async () => {
      const result = await userService.getUserByEmail('');
      expect(result).toBeNull();
    });

    it('should return a user if email exists', async () => {
      const mockUser = { id: 1, email: 'test@example.com', name: 'Test User' };
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

      const result = await userService.getUserByEmail('test@example.com');
      expect(result).toEqual(mockUser);
    });
  });

  describe('createUser', () => {
    it('should throw BadRequestException if user already exists', async () => {
      const mockUser = { id: 1, email: 'test@example.com', name: 'Test User' };
      jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(mockUser);

      const data = { email: 'test@example.com', name: 'Test User' };
      await expect(userService.createUser(data)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should create a new user if email does not exist', async () => {
      jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(null);
      const mockUser = { id: 1, email: 'test@example.com', name: 'Test User' };
      jest.spyOn(prismaService.user, 'create').mockResolvedValue(mockUser);

      const data = { email: 'test@example.com', name: 'Test User' };
      const result = await userService.createUser(data);
      expect(result).toEqual(mockUser);
    });
  });

  describe('updateUser', () => {
    it('should throw BadRequestException if email is already used by another user', async () => {
      const mockUser = { id: 2, email: 'test@example.com', name: 'Test User' };
      jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(mockUser);

      const params = {
        where: { id: 1, email: 'test@example.com' },
        data: { name: 'Updated Name' },
      };

      await expect(userService.updateUser(params)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should update the user if email is not used by another user', async () => {
      jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(null);
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        name: 'Updated Name',
      };
      jest.spyOn(prismaService.user, 'update').mockResolvedValue(mockUser);

      const params = {
        where: { id: 1, email: 'test@example.com' },
        data: { name: 'Updated Name' },
      };

      const result = await userService.updateUser(params);
      expect(result).toEqual(mockUser);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user by id', async () => {
      const mockUser = { id: 1, email: 'test@example.com', name: 'Test User' };
      jest.spyOn(prismaService.user, 'delete').mockResolvedValue(mockUser);

      const result = await userService.deleteUser(1);
      expect(result).toEqual(mockUser);
    });
  });
});
