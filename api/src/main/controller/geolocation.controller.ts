import { Controller, Get, Query } from '@nestjs/common';
import { CoordsPromiseDto } from 'dto/coords';
import { GeolocationService } from 'service/geolocation';

@Controller('geolocation')
export class GeolocationController {
  constructor(private readonly geolocationService: GeolocationService) {}

  @Get()
  async parseGeolocation(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number
  ): Promise<CoordsPromiseDto> {
    return this.geolocationService.parseLocation({ latitude, longitude });
  }
}
