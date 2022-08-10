import { ajv } from '@practica/validation';
import * as orderRepository from '../data-access/repositories/order-repository';
import { editOrderDTO, editOrderValidator } from './order-schema';

// ️️️✅ Best Practice: Start a flow with a 'use case' function that summarizes the flow in high-level
// This function should orchestrate multiple services and repositories
export default async function editOrder(orderToUpdate: editOrderDTO) {
  const editOrderValidator = ajv.addSchema(editOrderDTO, 'edit-order');
  if (!editOrderValidator(orderToUpdate)) {
    throw new AppError('invalid-order', `Validation failed`, 400, true);
  }
  const userWhoOrdered = await getUserOrThrowIfNotExist(orderToUpdate.userId);
  paymentTermsService.determinePaymentTerms(
    orderToUpdate.paymentTermsInDays,
    userWhoOrdered.terms
  );

  const response = await orderRepository.editOrder(orderToUpdate);

  return response;
}
