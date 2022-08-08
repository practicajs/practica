import ajv from '@practica/validation';
import { Static, Type } from '@sinclair/typebox';

export const addOrderSchema = Type.Object({
  deliveryAddress: Type.String(),
  paymentTermsInDays: Type.Number(),
  productId: Type.Integer(),
  userId: Type.Integer(),
});

export type addOrderDTO = Static<typeof addOrderSchema>;

export function getNewOrderValidator() {
  const validator = ajv.getSchema<addOrderDTO>('new-order');
  if (!validator) {
    ajv.addSchema(addOrderSchema, 'new-order');
  }

  return ajv.getSchema<addOrderDTO>('new-order');
}
