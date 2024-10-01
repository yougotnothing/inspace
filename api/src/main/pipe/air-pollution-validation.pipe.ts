import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { AirPollutionInput } from 'model/air-pollution';

@Injectable()
export class AirPollutionValidationPipe implements PipeTransform {
  transform(value: AirPollutionInput) {
    if (Number.isNaN(value.lat)) {
      throw new HttpException(
        `'lat' type must be number, not a ${typeof value.lat}`,
        HttpStatus.BAD_REQUEST
      );
    }

    if (Number.isNaN(value.lon)) {
      throw new HttpException(
        `'lon' type must be number, not a ${typeof value.lon}`,
        HttpStatus.BAD_REQUEST
      );
    }

    return value;
  }
}
