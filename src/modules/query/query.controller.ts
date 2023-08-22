import { Body, Controller, Delete, Get, Param, Patch, Post, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateQueryDto } from './dto/create-query.dto';
import { UpdateQueryDto } from './dto/update-query.dto';
import { QueryService } from './query.service';

@ApiTags('Query')
@Controller('query')
export class QueryController {
  constructor(private readonly queryService: QueryService) {}

  @Get('database')
  async findOne() {
    return await this.queryService.findDatabase();
  }

  @Post('query')
  async processQuery(@Request() req: any) {
    // console.log(req)
    return await this.queryService.processQuery(req.body);
  }
}
