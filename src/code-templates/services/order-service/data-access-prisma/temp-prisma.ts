import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const orderDetails = {
  userId: 1,
  productId: 2,
  deliveryAddress: '123 Main St, New York, NY 10001',
  paymentTermsInDays: 30,
};

prisma.orders.create({ data: orderDetails }).then((result) => {
  console.log(result);
});

prisma.orders
  .findUnique({
    where: {
      id: 1,
    },
  })
  .then((result) => {
    console.log(result);
  });
