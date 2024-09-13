import { HttpService } from '@nestjs/axios';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { HttpInterceptor } from 'interceptor/http';

@Controller('lunar-eclipse')
@UseInterceptors(HttpInterceptor)
export class LunarEclipseController {
  constructor(private readonly httpService: HttpService) {}

  @Get(':body')
  async lunarEclipse() {
    return this.httpService.get('');
  }
}
