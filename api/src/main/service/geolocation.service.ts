import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { CoordsDto, CoordsPromiseDto } from 'dto/coords';

@Injectable()
export class GeolocationService {
  constructor(private readonly http: HttpService) {}

  async parseLocation(coords: CoordsDto): Promise<CoordsPromiseDto> {
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
