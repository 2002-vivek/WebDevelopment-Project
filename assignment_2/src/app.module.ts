import { Module } from '@nestjs/common';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SubscribeModule } from './subscribe/subscribe.module';
import { RequestguardsModule } from './requestguards/requestGuards.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactModule } from './contact-us/contactus.module';
import { AdminModule } from './admin/admin.module';




@Module({
  imports: [
    ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public'), 
  }),
  MongooseModule.forRoot('mongodb://localhost'),
  ContactModule,
  SubscribeModule,
  RequestguardsModule,
  AdminModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
