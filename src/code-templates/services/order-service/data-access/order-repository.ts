import { getCountryModel } from './models/country-model';
import { getOrderModel } from './models/order-model';

// ️️️✅ Best Practice: The repository pattern - This is a plain JS object (POJO) that is returned to the domain layer
// This way, the domain/business-logic can focus on its business and avoid delving into DB/ORM narratives
type OrderRecord = {
  id: number;
  userId: number;
  productId: number;
  countryId: number;
  paymentTermsInDays: number;
  deliveryAddress: string;
};

// ️️️✅ Best Practice: The repository pattern - Wrap the entire DB layer with a simple interface that returns plain JS objects
export async function getOrderById(id: number): Promise<OrderRecord | null> {
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

export async function addOrder(orderDetails: Omit<OrderRecord, 'id'>) {
  const addingResponse = await getOrderModel().create(orderDetails);

  return addingResponse;
}

export async function deleteOrder(orderIdToDelete: number) {
  await getOrderModel().destroy({ where: { id: orderIdToDelete } });
}

export async function cleanupData() {
  await getOrderModel().truncate();
}
