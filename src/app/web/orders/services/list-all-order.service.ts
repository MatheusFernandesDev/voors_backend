import { Orders } from '../../../models/Order';

export default async function listAllOrderService() {
  const orders = await Orders.findAll();
  return orders;
}
