import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { NearestBodies, NearestBodiesInput } from 'model/nearest-bodies';

@Injectable()
export class NearestBodiesService {
  constructor(private readonly httpService: HttpService) {}

  async getNearestAsteroids(data: NearestBodiesInput) {
    try {
      const response = await this.httpService.axiosRef.get('/cad.api', {
        params: {
          kind: data.kind,
          date_min: data.date,
          date_max: dayjs(data.date).add(7, 'day'),
        },
      });

      return this.convertResponse(response.data);
    } catch (error) {
      throw new Error(error);
    }
  }

  private convertResponse(data: any): NearestBodies[] {
    const result: NearestBodies[] = [];

    for (let index = 0; index < data.data.length; index++) {
      const obj = {} as NearestBodies;

      (data.fields as string[]).forEach((field: string, index: number) => {
        obj[field as keyof NearestBodies] = data.data[index][index];
      });

      result.push(obj);
    }

    return result;
  }
}
