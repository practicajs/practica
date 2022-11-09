import { getOrderModel, getCountryModel } from './order-model';

// ️️️✅ Best Practice: The repository pattern - Wrap the entire DB layer with a simple interface that returns plain JS objects
export async function getOrderById(id: number) {
  const foundOrder = await getOrderModel().findOne({
    where: { id },
    include: getCountryModel(),
    // ✅ Best Practice: The data access layer should return a plain JS object and avoid leaking DB narratives outside
    // The 'Raw' option below instructs to include only pure data within the response
    raw: true,
    nest: true,
  });

  return foundOrder;
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
