import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports:[
    ConfigModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions:{expiresIn: configService.get('JWT_EXPIRATION')}
      }),
      
    }),
    AdminModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, ConfigService,JwtStrategy],
  exports:[AuthService, JwtModule],
})
export class AuthModule {}
