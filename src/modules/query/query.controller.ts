import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { QueryService } from './query.service';
import { CreateQueryDto } from './dto/create-query.dto';
import { UpdateQueryDto } from './dto/update-query.dto';
import { ApiTags } from '@nestjs/swagger';

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
