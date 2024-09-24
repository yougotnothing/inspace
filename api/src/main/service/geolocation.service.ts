import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { Geolocation, GeolocationInput } from 'model/geolocation';

@Injectable()
export class GeolocationService {
  constructor(private readonly http: HttpService) {}

  async parseLocation(coords: GeolocationInput): Promise<Geolocation> {
    try {
      const response = await this.http.axiosRef.get('/reverse', {
        params: {
          ...coords,
        },
      });

      return response.data;
    } catch (error: any) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }
}
