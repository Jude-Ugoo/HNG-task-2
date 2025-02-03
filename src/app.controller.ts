import { Controller, Get, Query, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { NumberClassificationDto } from './dto/number-classification.dto';

@Controller()
@UseFilters(HttpExceptionFilter)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api/classify-number')
  async classifyNumber(@Query() { number }: NumberClassificationDto) {
    const num = parseInt(number, 10);
    return this.appService.classifyNumber(num);
  }
}
