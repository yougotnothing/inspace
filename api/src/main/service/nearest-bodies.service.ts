import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { NearestBodies, NearestBodiesInput } from 'model/nearest-bodies';

@Injectable()
export class NearestBodiesService {
  constructor(private readonly httpService: HttpService) {}

  async getNearestAsteroids(data: NearestBodiesInput) {
    try {
      const response = await this.httpService.axiosRef.get('/cad.api', {
        params: {
          kind: 'a',
          fullname: true,
          diameter: true,
          limit: 20,
          'limit-from': data.limit_from,
        },
      });

      const bodies = this.convertResponse(response.data);

      if (!bodies.length)
        throw new NotFoundException('no near asteroids found');

      bodies.forEach(body => {
        if (data.distance_in === 'KM') {
          body.dist = (parseFloat(body.dist) * 149597870.7).toString();
          body.dist_max = (parseFloat(body.dist_max) * 149597870.7).toString();
          body.dist_min = (parseFloat(body.dist_min) * 149597870.7).toString();
        }
      });

      return bodies;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getNearestComets(data: NearestBodiesInput): Promise<NearestBodies[]> {
    try {
      const response = await this.httpService.axiosRef.get('/cad.api', {
        params: {
          kind: 'c',
          fullname: true,
          diameter: true,
          limit: 20,
          'limit-from': data.limit_from,
        },
      });

      const bodies = this.convertResponse(response.data);

      if (!bodies.length) throw new NotFoundException('no near comets found');

      bodies.forEach(body => {
        if (data.distance_in === 'KM') {
          body.dist = (parseFloat(body.dist) * 149597870.7).toString();
          body.dist_max = (parseFloat(body.dist_max) * 149597870.7).toString();
          body.dist_min = (parseFloat(body.dist_min) * 149597870.7).toString();
        }
      });

      console.log(response.data);

      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  private convertResponse(data: any): NearestBodies[] {
    const result: NearestBodies[] = [];

    if (!data.total) return [];

    for (let i = 0; i < data.data.length; i++) {
      const obj = {} as NearestBodies;

      (data.fields as string[]).forEach((field: string, j: number) => {
        obj[field as keyof NearestBodies] = data.data[i][j];
      });

      result.push(obj);
    }

    return result;
  }
}
