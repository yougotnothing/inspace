import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class DateValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): Date {
    console.log('Incoming value:', value.startTime);

    let date = value.startTime ?? value.date;

    if (typeof date === 'string') {
      date = new Date(date);
    }

    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new BadRequestException(
        `Invalid date format for field: ${metadata.data}`
      );
    }

    return date;
  }
}
