// @ts-nocheck

function validateOrder(order) {
  if (!order.productId || !order.userId) {
    throw new AppError(
      "order-validation-failed",
      "One of order fields is invalid",
      400
    );
  }
}

