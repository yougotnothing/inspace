import {
  ArgumentMetadata,
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { RegisterInput } from 'model/register';
import {
  hasDigitRegexp,
  hasLowerCaseRegexp,
  hasSpecialCharRegexp,
  hasUpperCaseRegexp,
} from 'utils/validate-password';

@Injectable()
export class RegisterValidationPipe implements PipeTransform<RegisterInput> {
  transform(value: RegisterInput, metadata: ArgumentMetadata) {
    if (metadata.data !== 'password' && metadata.data !== 'name')
      throw new BadRequestException(`Invalid field: ${metadata.data}`);

    const password = value?.password;
    const name = value?.name;

    if (!name.length) {
      throw new HttpException(
        'Name is required and must be a non-empty string.',
        HttpStatus.CONFLICT
      );
    }

    if (name.length < 3) {
      throw new HttpException('Name is too short.', HttpStatus.CONFLICT);
    }

    if (name.length > 64) {
      throw new HttpException('Name is too long.', HttpStatus.CONFLICT);
    }

    if (!password || typeof password !== 'string') {
      throw new HttpException(
        'Password is required and must be a non-empty string.',
        HttpStatus.BAD_REQUEST
      );
    }

    if (password.length < 8) {
      throw new HttpException(
        'Password length must be at least 8 characters.',
        HttpStatus.CONFLICT
      );
    }

    if (!hasDigitRegexp.test(password)) {
      throw new HttpException(
        'Password must have at least one digit character.',
        HttpStatus.CONFLICT
      );
    }

    if (!hasSpecialCharRegexp.test(password)) {
      throw new HttpException(
        'Password must have a special character, like: "-" or "_".',
        HttpStatus.CONFLICT
      );
    }

    if (!hasUpperCaseRegexp.test(password)) {
      throw new HttpException(
        'Password must have at least one uppercase character.',
        HttpStatus.CONFLICT
      );
    }

    if (!hasLowerCaseRegexp.test(password)) {
      throw new HttpException(
        'Password must have at least one lowercase character.',
        HttpStatus.CONFLICT
      );
    }

    return value;
  }
}
