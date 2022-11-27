/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-shadow */
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

  // eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { PrismaClient } from '.prisma/client';

  const prisma = new PrismaClient();

  await prisma.order.create({
    data: {
      userId: 1,
      productId: 1,
      countryId: 1,
    },
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
  // const result = await prisma.order.findMany({
  //   select: {
  //     userId: true,
  //     productId: true,
  //     country: {
  //       select: { name: true, id: true },
  //     },
  //   },
  // });

  // const result = await prisma.order.groupBy({
  //   by: ['countryId'],
  //   _sum: { paymentTermsInDays: true },
  //   where: {
  //     createdAt: {
  //       gt: new Date('2021-01-01'),
  //     },
  //   },
  //   having: {
  //     paymentTermsInDays: {
  //       _count: {
  //         gt: 20,
  //       },
  //     },
  //   },
  // });

  // const result2 = await prisma.order.findMany({
  //   orderBy: {
  //     country: { name: 'asc' },
  //   },
  //   select: {
  //     userId: true,
  //     productId: true,
  //   },
  // });

  const result3 = await prisma.order.groupBy({
    by: ['countryId'],
    _sum: { paymentTermsInDays: true },
    where: {
      country: {
        name: 'Japan',
      },
    },
  });

  // const groupUsers = await prisma.user.groupBy({
  //   by: ['country'],
  //   where: {
  //     email: {
  //       contains: 'prisma.io',
  //     },
  //   },
  //   _sum: {
  //     profileViews: true,
  //   },
  //   having: {
  //     profileViews: {
  //       _avg: {
  //         gt: 100,
  //       },
  //     },
  //   },
  // })

  return result3;
}

// export async function addOrder(newOrderRequest: Omit<OrderRecord, 'id'>) {
//   await prisma.order.findUnique({
//     where: {
//       noneExistingField: 1,
//     },
//     select: {
//       noneExistingRelation: {
//         select: { id: true },
//       },
//       noneExistingField: true,
//     },
//   });

//   await prisma.order.findUnique({
//     where: { price: 50 },
//   });

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
