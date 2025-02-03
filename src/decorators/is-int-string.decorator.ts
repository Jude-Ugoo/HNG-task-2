import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'isIntString', async: false })
export class IsIntStringConstraint implements ValidatorConstraintInterface {
  validate(text: string) {
    return /^-?\d+$/.test(text);
  }

  defaultMessage(_args: ValidationArguments) {
    return 'The provided value is not a valid integer.';
  }
}

export function IsIntString() {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      validator: IsIntStringConstraint,
    });
  };
}
