import { PrismaClient } from '.prisma/client/index';

const prisma = new PrismaClient();

// ️️️✅ Best Practice: The repository pattern - Wrap the entire DB layer with a simple interface that returns plain JS objects
export async function getOrderById(id: number) {
  const resultOrder = await prisma.orders.findUnique({
    where: {
      id,
    },
  });
  return resultOrder;
}

export async function addOrder(orderDetails) {
  const resultOrder = await prisma.orders.create({ data: orderDetails });
  return resultOrder;
}

export async function deleteOrder(orderIdToDelete: number) {
  const deleteResult = await prisma.orders.delete({
    where: {
      id: orderIdToDelete,
    },
  });
  return deleteResult;
}

export async function cleanupData() {
  const deleteResult = await prisma.orders.deleteMany();
  return deleteResult;
}
