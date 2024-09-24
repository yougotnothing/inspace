/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Resolver, Query } from '@nestjs/graphql';
import { Geolocation, GeolocationInput } from 'model/geolocation';
import { GeolocationService } from 'service/geolocation';

@Resolver(of => Geolocation)
export class GeolocationResolver {
  constructor(private readonly geolocationService: GeolocationService) {}

  @Query(returns => Geolocation)
  async getLocation(@Args('coordinates') coordinates: GeolocationInput) {
    return this.geolocationService.parseLocation(coordinates);
  }
}
