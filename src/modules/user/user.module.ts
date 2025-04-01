import { Module } from '@nestjs/common';
import { InfrastructureModule } from 'infrastructure/infrastructure.module';
import { UserServiceToken } from './interfaces/user-service.interface';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [InfrastructureModule],
  controllers: [UserController],
  providers: [
    {
      provide: UserServiceToken,
      useClass: UserService,
    },
  ],
  exports: [UserServiceToken],
})
export class UserModule {}
