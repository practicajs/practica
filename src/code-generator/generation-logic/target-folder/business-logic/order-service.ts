const axios = require("axios");
const OrderRepository = require("../data-access/order-repository");
const { AppError } = require("../error-handling");
const MessageQueueClient = require("../libraries/message-queue-client");

const axiosHTTPClient = axios.create();

export const addOrder = async function (newOrder) {
  // validation
  if (!newOrder.productId) {
    throw new AppError("invalid-order", `No product-id specified`, 400);
  }

  // verify user existence by calling external Microservice
  const userWhoOrdered = await getUserFromUsersService(newOrder.userId);

  if (!userWhoOrdered) {
    throw new AppError("user-doesnt-exist", `The user ${newOrder.userId} doesnt exist`, 404);
  }

  // save to DB (Caution: simplistic code without layers and validation)
  const DBResponse = await new OrderRepository().addOrder(newOrder);

  // We should notify others that a new order was added - Let's put a message in a queue
  await new MessageQueueClient().sendMessage("new-order", newOrder);

  return DBResponse;
};

export const deleteUser = async function (userId) {
  return await new OrderRepository().deleteOrder(userId);
};

export const getUser = async function (userId) {
  return await new OrderRepository().getOrderById(userId);
};

async function getUserFromUsersService(userId) {
  try {
    const getUserResponse = await axiosHTTPClient.get(`http://localhost/user/${userId}`, {
      timeout: 2000,
      validateStatus: (status) => {
        return status < 500;
      },
    });
    return getUserResponse.data;
  } catch (error: any) {
    if (error?.code === "ECONNABORTED") {
      throw new AppError("user-verification-failed", `Request to user service failed so user cant be verified`, 503);
    }

    throw error;
  }
}
