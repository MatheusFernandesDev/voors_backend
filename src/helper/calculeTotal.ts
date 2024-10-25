// helpers/orderHelper.ts
import { Sizes, Flavors, Customizes } from '../app/models'; // Ajuste conforme necessário

export function calculateTotal(
  sizeOrder: Sizes,
  flavorOrder: Flavors,
  extrasOrder: Customizes[],
) {
  let totalPrice = sizeOrder.price;
  let preparationTime = sizeOrder.preparation_time;

  if (flavorOrder?.extra_time) {
    preparationTime += flavorOrder.extra_time;
  }

  extrasOrder.forEach((extra) => {
    preparationTime += extra.extra_time || 0;
    totalPrice += extra.extra_price || 0;
  });

  return { totalPrice, preparationTime };
}
