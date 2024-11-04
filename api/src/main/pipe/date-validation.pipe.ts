import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class DateValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): Date {
    if (metadata.data !== 'startTime' && metadata.data !== 'date') return value;

    if (typeof value === 'string') value = new Date(value);

    if (!(value instanceof Date) || isNaN(value.getTime())) {
      throw new BadRequestException(
        `Invalid date format for field: ${metadata.data}`
      );
    }

    return value;
  }
}
