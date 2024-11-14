import { Module } from '@nestjs/common';
import { requestGuardsService } from './requestGuards.service';
import { RequestguardsController } from './requestGuards.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestGuardsSchema, requestingGuards } from './schemas/requestGuards.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    MongooseModule.forFeature([{name:requestingGuards.name, schema: RequestGuardsSchema}]),
    AuthModule,
  ],
  controllers: [RequestguardsController],
  providers: [requestGuardsService],
})
export class RequestguardsModule {}
