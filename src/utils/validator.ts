import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsStringOrNull', async: false })
export class IsStringOrNullConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    return typeof value === 'string' || value === null; // for async validations you must return a Promise<boolean> here
  }

  defaultMessage(args: ValidationArguments) {
    return 'Text ($value) must be a string or null!';
  }
}

export function IsStringOrNull(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsStringOrNull',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsStringOrNullConstraint,
    });
  };
}
