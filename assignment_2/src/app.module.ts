import { Module } from '@nestjs/common';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SubscribeModule } from './subscribe/subscribe.module';
import { RequestguardsModule } from './requestguards/requestGuards.module';
import { MongooseModule } from '@nestjs/mongoose';




@Module({
  imports: [
    ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public'), 
  }),
  MongooseModule.forRoot('mongodb://localhost'),
  SubscribeModule,
  RequestguardsModule,
],
  controllers: [],
  providers: [],
})
export class AppModule {}
