import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AirPollution, AirPollutionInput } from 'model/air-pollution';

@Injectable()
export class AirPollutionService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  async getAirPollutionInfo(coords: AirPollutionInput): Promise<AirPollution> {
    try {
      const response = await this.httpService.axiosRef.get('/air_pollution', {
        params: {
          ...coords,
        },
      });

      console.log(response.data.list);

      return {
        coords: [response.data.coord.lat, response.data.coord.lon],
        components: {
          ...response.data.list[0].components,
        },
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
