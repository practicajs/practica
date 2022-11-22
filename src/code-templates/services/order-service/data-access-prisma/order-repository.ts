import { PrismaClient } from '.prisma/client';

const prisma = new PrismaClient({
  log: [
    {
      emit: 'stdout',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
});

// ️️️✅ Best Practice: The repository pattern - This is a plain JS object (POJO) that is returned to the domain layer
// This way, the domain/business-logic can focus on its business and avoid delving into DB/ORM narratives
type OrderRecord = {
  id: number;
  userId: number;
  productId: number;
  price: number;
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

export async function playground() {
  // await prisma.order.create({
  //   data: {
  //     userId: 1,
  //     productId: 1,
  //     countryId: 3,
  //     paymentTermsInDays: 1,
  //     deliveryAddress: 'test',
  //   },
  // });
  const result = await prisma.order.findMany({
    select: {
      userId: true,
      country: {
        select: { name: true, id: true },
      },
    },
  });

  return result;
}

export async function addOrder(newOrderRequest: Omit<OrderRecord, 'id'>) {
  await prisma.order.findUnique({
    where: {
      noneExistingField: 1,
    },
    select: {
      noneExistingRelation: {
        select: { id: true },
      },
      noneExistingField: true,
    },
  });

  await prisma.order.findUnique({
    where: { price: 50 },
  });

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
