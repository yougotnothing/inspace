import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { AirPollutionInput } from 'model/air-pollution';

@Injectable()
export class AirPollutionValidationPipe implements PipeTransform {
  transform(value: AirPollutionInput, metadata: ArgumentMetadata) {
    if (metadata.type === 'param') {
      if (typeof value.lat !== 'number') {
        throw new HttpException(
          `'lat' type must be number, not a ${typeof value.lat}`,
          HttpStatus.BAD_REQUEST
        );
      }

      if (typeof value.lon !== 'number') {
        throw new HttpException(
          `'lon' type must be number, not a ${typeof value.lon}`,
          HttpStatus.BAD_REQUEST
        );
      }

      return value;
    }
  }
}
