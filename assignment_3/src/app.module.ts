import { Module } from '@nestjs/common';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SubscribeModule } from './subscribe/subscribe.module';
import { RequestguardsModule } from './requestguards/requestGuards.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactModule } from './contact-us/contactus.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';





@Module({
  imports: [
    ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public'), // Path to your public folder
    
  }),
  ConfigModule.forRoot({
    isGlobal:true,
  }),
  MongooseModule.forRoot('mongodb://localhost:27017'),
  ContactModule,
  SubscribeModule,
  RequestguardsModule,
  AdminModule,
  AuthModule,
],
  controllers: [],
  providers: [],
})
export class AppModule {}
