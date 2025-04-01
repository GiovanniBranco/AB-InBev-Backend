import { Module } from '@nestjs/common';
import { PrismaService } from './postgresql/config/prisma.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class InfrastructureModule {}
