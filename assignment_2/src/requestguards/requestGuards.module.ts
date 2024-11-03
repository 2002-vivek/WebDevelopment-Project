import { Module } from '@nestjs/common';
import { requestGuardsService } from './requestGuards.service';
import { RequestguardsController } from './requestGuards.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestGuardsSchema, requestingGuards } from './schemas/requestGuards.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name:requestingGuards.name, schema: RequestGuardsSchema}]),
  ],
  controllers: [RequestguardsController],
  providers: [requestGuardsService],
})
export class RequestguardsModule {}
