import * as orderRepository from '../data-access/repositories/order-repository';
import paymentTermsService from './payment-terms-service';
import { assertNewOrderIsValid } from './order-validators';
import { assertUserExists } from './user-service-client';
import { addOrderDTO } from './order-schema';

// new-order-use-case.ts
// ️️️✅ Best Practice: Start a flow with a 'use case' function that summarizes the flow in high-level
// It should merely tell the feature story without too much information. Kind of a yellow pages of the module
// This kind of function typically  orchestrates multiple services and repositories
export async function addOrder(newOrder: addOrderDTO) {
  assertNewOrderIsValid(newOrder);
  const userWhoOrdered = await assertUserExists(newOrder.userId);
  const finalOrderToSave = { ...newOrder };
  const approvedPaymentTerms = paymentTermsService.determinePaymentTerms(
    finalOrderToSave.paymentTermsInDays,
    userWhoOrdered.terms
  );
  finalOrderToSave.paymentTermsInDays = approvedPaymentTerms;

  const response = await orderRepository.addOrder(finalOrderToSave);

  return response;
}

export async function deleteOrder(userId) {
  return await orderRepository.deleteOrder(userId);
}

export async function getOrder(userId) {
  return await orderRepository.getOrderById(userId);
}
