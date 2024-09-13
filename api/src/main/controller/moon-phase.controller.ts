import { Body, Controller, Get, UseInterceptors } from '@nestjs/common';
import { MoonPhaseDto } from 'dto/moon-phase';
import { HttpInterceptor } from 'interceptor/http';
import { MoonPhaseService } from 'service/moon-phase';

@Controller('moon-phase')
@UseInterceptors(HttpInterceptor)
export class MoonPhaseController {
  constructor(private readonly moonPhaseService: MoonPhaseService) {}

  @Get()
  async getMoonPhase(@Body() body: MoonPhaseDto) {
    return await this.moonPhaseService.getMoonPhase(body);
  }
}
