import { AppError } from '@practica/error-handling';
import ajv from '@practica/validation';
import { ValidateFunction } from 'ajv';
import { orderSchema, addOrderDTO } from './order-schema';

export function assertNewOrderIsValid(newOrderRequest: addOrderDTO) {
  // Since compiling a validation schema is expensive, we always try to use the cached version first
  let validationSchema!: ValidateFunction<addOrderDTO> | undefined;
  validationSchema = ajv.getSchema<addOrderDTO>('new-order');
  if (!validationSchema) {
    ajv.addSchema(orderSchema, 'new-order');
    validationSchema = ajv.getSchema<addOrderDTO>('new-order');
  }

  if (validationSchema === undefined) {
    throw new AppError(
      'unpredictable-validation-failure',
      'An internal validation error occured where schemas cant be obtained',
      500,
      false
    );
  }
  const isValid = validationSchema(newOrderRequest);
  if (!isValid) {
    throw new AppError('invalid-order', `Validation failed`, 400, true);
  }
}
