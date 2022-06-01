import axios from "axios";
import * as orderRepository from "../data-access/repositories/order-repository";
import { AppError } from "@practica/error-handling";
import * as paymentTermsService from "./payment-terms-service";
import { addOrderDTO, getNewOrderValidator } from "./order-schema";

// ️️️✅ Best Practice: Start a flow with a 'use case' function that summarizes the flow in high-level
// This function should orchestrate multiple services and repositories
export const addOrder = async function (newOrder: addOrderDTO) {
  assertNewOrderRequest(newOrder);
  const userWhoOrdered = await getUserOrThrowIfNotExist(newOrder.userId);
  paymentTermsService.determinePaymentTerms(
    newOrder.paymentTermsInDays,
    userWhoOrdered.terms
  );

  const response = await orderRepository.addOrder(newOrder);

  return response;
};

async function getUserOrThrowIfNotExist(userId: number) {
  const userVerificationRequest = await axios.get(
    `http://localhost/user/${userId}`,
    {
      validateStatus: (status) => true,
    }
  );
  if (userVerificationRequest.status != 200) {
    throw new AppError(
      "user-doesnt-exist",
      `The user ${userId} doesnt exist`,
      null,
      userVerificationRequest.status
    );
  }

  return userVerificationRequest.data;
}

function assertNewOrderRequest(newOrderRequest: addOrderDTO) {
  const AjvSchemaValidator = getNewOrderValidator();
  const isValid = AjvSchemaValidator(newOrderRequest);
  if (!isValid) {
    throw new AppError("invalid-order", `Validation failed`, null, 400);
  }
}

export const deleteOrder = async function (userId) {
  return await orderRepository.deleteOrder(userId);
};

export const getOrder = async function (userId) {
  return await orderRepository.getOrderById(userId);
};
