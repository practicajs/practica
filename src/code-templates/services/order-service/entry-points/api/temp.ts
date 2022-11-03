/* eslint-disable no-console */
// @ts-nocheck

DB.orders.save(order);
const user = axios.get(`${process.env.USER_SERVICE_URL}/users/${order.user}`);
if (user.allowDiscount) {
  DB.discounts.save({ order, user });
}


