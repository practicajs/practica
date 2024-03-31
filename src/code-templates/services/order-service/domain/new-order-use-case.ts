import * as orderRepository from '../data-access/order-repository';
import paymentTermsService from './payment-terms-service';
import { assertNewOrderIsValid } from './order-validators';
import { assertUserExists } from './user-service-client';
import { addOrderDTO } from './order-schema';

// ️️️✅ Best Practice: Start a flow with a 'use case' function that summarizes the flow in high-level
// It should merely tell the feature story without too much information. Kind of a 'yellow pages' of the module
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
  const response = await orderRepository.getOrderById(userId);
  return response;
}
