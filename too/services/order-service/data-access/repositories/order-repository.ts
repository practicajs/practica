import getOrderModel from './order-model';

// ️️️✅ Best Practice: The repository pattern - Wrap the entire DB layer with a simple interface that returns plain JS objects
export async function getOrderById(id: number) {
  return await getOrderModel().findOne({ where: { id } });
}

export async function addOrder(orderDetails) {
  const addingResponse = await getOrderModel().create(orderDetails);

  return addingResponse;
}

export async function deleteOrder(orderIdToDelete: number) {
  await getOrderModel().destroy({ where: { id: orderIdToDelete } });
}

export async function cleanupData() {
  await getOrderModel().truncate();
}
