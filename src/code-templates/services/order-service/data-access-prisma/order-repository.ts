import * as prismaTypes from './prisma/client/index.d';
// eslint-disable-next-line import/no-relative-packages
import { PrismaClient } from './prisma/client';

const prisma = new PrismaClient();

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
export async function getOrderById(id: number) {
  const resultOrder = await prisma.order.findUnique({
    where: {
      id,
    },
    include: { country: true },
  });

  return resultOrder;
}

export async function addOrder(newOrderRequest: Omit<OrderRecord, 'id'>) {
  const resultOrder = await prisma.order.create({
    data: { ...newOrderRequest },
  });

  return resultOrder;
}

export async function deleteOrder(orderIdToDelete: number) {
  const deleteResult = await prisma.order.delete({
    where: {
      id: orderIdToDelete,
    },
  });
  return deleteResult;
}

export async function cleanupData() {
  const deleteResult = await prisma.order.deleteMany();
  return deleteResult;
}
