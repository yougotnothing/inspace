import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { validateEmailRegexp } from 'utils/validate-email';

@Injectable()
export class EmailValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const email = metadata.data === 'email' ? value : value?.email;

    if (!validateEmailRegexp.test(email)) {
      throw new HttpException('Email is invalid', HttpStatus.CONFLICT);
    }

    return value;
  }
}
