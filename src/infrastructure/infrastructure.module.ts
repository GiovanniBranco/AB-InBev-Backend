import { Module } from '@nestjs/common';
import { PrismaService } from './postgresql/config/prismaService';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class InfrastructureModule {}
