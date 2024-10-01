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

    // Если это строка, пытаемся преобразовать в Date
    if (typeof date === 'string') {
      date = new Date(date);
    }

    // Проверяем, является ли это объектом Date и корректен ли он
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new BadRequestException(
        `Invalid date format for field: ${metadata.data}`
      );
    }

    return date;
  }
}
