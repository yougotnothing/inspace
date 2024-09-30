import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AirPollution, AirPollutionInput } from 'model/air-pollution';

@Injectable()
export class AirPollutionService {
  constructor(private readonly httpService: HttpService) {}

  async getAirPollutionInfo(params: AirPollutionInput): Promise<AirPollution> {
    try {
      const response = await this.httpService.axiosRef.get(
        '/air_pollution/forecast',
        {
          params,
        }
      );

      return {
        coords: response.data.coords,
        components: {
          ...response.data.list[0].components,
        },
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
