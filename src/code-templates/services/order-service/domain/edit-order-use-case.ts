import { AppError } from '@practica/error-handling';
import { ajv } from '@practica/validation';
import * as orderRepository from '../data-access/repositories/order-repository';
import { editOrderDTO, addOrderSchema } from './order-schema';

// ️️️✅ Best Practice: Start a flow with a 'use case' function that summarizes the flow in high-level
// This function should orchestrate multiple services and repositories
export default async function editOrder(
  orderId: number,
  updatedOrder: editOrderDTO
) {
  assertOrderIsValid(updatedOrder);
  assertEditingIsAllowed(updatedOrder.status, updatedOrder.paymentTermsInDays);

  return await orderRepository.editOrder(orderId, updatedOrder);
}

function assertOrderIsValid(updatedOrder: editOrderDTO) {
  const isValid = ajv.validate(addOrderSchema, updatedOrder);
  if (isValid === false) {
    throw new AppError('invalid-order', `Validation failed`, 400, true);
  }
}
function assertEditingIsAllowed(
  status: string | undefined,
  paymentTermsInDays: number
) {
  if (status === 'delivered' || paymentTermsInDays === 0) {
    throw new AppError(
      'changes-not-allowed',
      `It's not allow to delivered or paid orders`,
      409,
      true
    );
  }
}
